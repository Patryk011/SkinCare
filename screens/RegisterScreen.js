import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import { registerUser, isUserExists } from "../data/api";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const userExists = await isUserExists(username);
    if (userExists) {
      Alert.alert("Błąd", "Użytkownik już istnieje");
      return;
    }

    const result = await registerUser(username, password);
    if (result) {
      Alert.alert("Sukces", "Rejestracja zakończona pomyślnie");
      navigation.navigate("Login");
    } else {
      Alert.alert("Błąd", "Nie udało się stworzyć konta");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#666"
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#666"
      />
      <View style={styles.buttonContainer}>
        <Button title="Zarejestruj" onPress={handleRegister} color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "80%",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default RegisterScreen;
