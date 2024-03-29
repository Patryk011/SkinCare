import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { loginUser } from "../data/api";
import { AuthContext } from "../contexts/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const result = await loginUser(username, password);
    if (result.success) {
      login(result.user);
    } else {
      Alert.alert("Błąd", "Nieprawidłowe dane logowania");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
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
        <Button title="Zaloguj" onPress={handleLogin} color="#007bff" />
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Nie masz konta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Rejestracja")}>
          <Text style={styles.registerButton}>Zarejestruj się</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
  },

  registerContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#333",
  },
  registerButton: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
