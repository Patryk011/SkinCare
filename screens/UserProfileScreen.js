import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import {
  getUserData,
  updateUser,
  isUserExists,
  updateProfileImage,
} from "../data/api";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const UserProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const userId = user ? user.id : null;

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error("Brak userId");
      return;
    }
    const fetchUserData = async () => {
      const data = await getUserData(userId);
      if (data) {
        setUsername(data.username);
        loadImageUri(userId);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChangePassword = async () => {
    try {
      const userData = await getUserData(userId);

      if (!userData) {
        alert("Nie znaleziono danych użytkownika");
        return;
      }

      if (userData.password === newPassword) {
        alert("Hasła muszą się różnić");
        return;
      }

      if (userData.password === currentPassword) {
        const updatedData = {
          ...userData,
          password: newPassword,
        };

        await updateUser(userId, updatedData);
        alert("Hasło zostało zmienione.");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        alert("Aktualne hasło jest nieprawidłowe.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Nie udało się zmienić hasła");
    }
  };

  const updateUsername = async () => {
    try {
      const userExists = await isUserExists(newUsername);
      if (userExists) {
        alert("Ta nazwa użytkownika jest już zajęta.");
        return;
      }

      const currentData = await getUserData(userId);

      if (!currentData) {
        alert("Nie znaleziono danych użytkownika");
        return;
      }

      const updatedData = {
        ...currentData,
        username: newUsername,
      };

      await updateUser(userId, updatedData);
      setUsername(newUsername);
      alert("Nazwa użytkownika została zaktualizowana");

      setNewUsername("");
    } catch (err) {
      console.error("Error:", err);
      alert("Nie udało się zaktualizować nazwy użytkownika");
    }
  };

  const saveImage = async (imageUri) => {
    const fileName = imageUri.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      console.log("newPath" + newPath);
      return newPath;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const storeImageUri = async (userId, imageUri) => {
    try {
      await AsyncStorage.setItem(`profileImage_${userId}`, imageUri);
    } catch (e) {
      console.error(e);
    }
  };

  const loadImageUri = async (userId) => {
    try {
      const savedImageUri = await AsyncStorage.getItem(
        `profileImage_${userId}`
      );
      if (savedImageUri !== null) {
        setProfileImage(savedImageUri);
      } else {
        setProfileImage(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        const savedUri = await saveImage(selectedAsset.uri);
        if (savedUri) {
          setProfileImage(savedUri);
          await storeImageUri(userId, savedUri);
          try {
            await updateProfileImage(userId, selectedAsset);
          } catch (error) {
            console.error("Error", error);
          }
        }
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.profileImageContainerAdd}>
                <Text style={styles.addPhoto}>Dodaj zdjęcie</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.userTitle}> Użytkownik: {username}</Text>
        <Text style={styles.header}>Edytuj profil</Text>

        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Nowa nazwa użytkownika"
        />
        <Button
          title="Zmień nazwe użytkownika"
          onPress={updateUsername}
          color="#007bff"
        />

        <Text style={styles.sectionHeader}>Zmiana hasła</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          placeholder="Aktualne hasło"
        />
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholder="Nowe hasło"
        />
        <Button
          title="Zmień hasło"
          onPress={handleChangePassword}
          color="#28a745"
        />
        {user.skinType ? (
          <View>
            <Text
              style={styles.skinSection}
            >{`Typ skóry: ${user.skinType}`}</Text>
          </View>
        ) : (
          <Text style={styles.skinSection}>
            Musisz najpierw wypełnić test na typ skóry, aby otrzymać wynik.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  addPhoto: {
    paddingTop: 60,
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
  },
  userTitle: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  skinSection: {
    fontSize: 18,
    color: "#666",
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  profileImageContainer: {
    borderRadius: 75,
    overflow: "hidden",
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  profileImageContainerAdd: {
    borderRadius: 75,
    overflow: "hidden",
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "black",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default UserProfileScreen;
