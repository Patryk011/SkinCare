import React, { useState, useEffect, useContext } from "react";
import { getUserData, updateUser, isUserExists } from "../data/api";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const UserProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const userId = user ? user.id : null;

  const [username, setUsername] = useState("");
  const [skinType, setSkinType] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!userId) {
      console.error("Brak userId");
      console.log(userId);
      return;
    }
    const fetchUserData = async () => {
      const data = await getUserData(userId);
      if (data) {
        setUsername(data.username);
        setSkinType(data.skinType);
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

      if (userData.password === currentPassword) {
        const updatedData = {
          ...userData,
          password: newPassword,
        };

        await updateUser(userId, updatedData);
        alert("Hasło zostało zmienione.");
      } else {
        alert("Aktualne hasło jest nieprawidłowe.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Nie udało się zmienić hasła");
    }
  };

  const resetSkinTypeTest = async () => {
    try {
      const userData = await getUserData(userId);

      if (!userData) {
        alert("Nie znaleziono danych użytkownika");
        return;
      }

      await updateUser(userId, { ...userData, skinType: null });
      setSkinType(null);
      alert("Wynik testu na typ skóry został zresetowany.");
    } catch (err) {
      console.error("Error:", err);
      alert("Nie udało się zresetować wyniku testu na typ skóry");
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
    } catch (err) {
      console.error("Error:", err);
      alert("Nie udało się zaktualizować nazwy użytkownika");
    }
  };

  return (
    <View style={styles.container}>
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
      {skinType ? (
        <View>
          <Text style={styles.skinSection}>{`Typ skóry: ${skinType}`}</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetSkinTypeTest}
          >
            <Text style={styles.resetButtonText}>Resetuj Test Skóry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.skinSection}>
          Musisz najpierw wypełnić test na typ skóry, aby otrzymać wynik.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 100,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
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
});

export default UserProfileScreen;
