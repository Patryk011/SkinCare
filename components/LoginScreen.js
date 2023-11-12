import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem(username);
      if (userData !== null) {
        const user = JSON.parse(userData);
        if (user.password === password) {
          navigation.navigate("Home");
        } else {
          Alert.alert("Błąd", "Nieprawidłowe hasło");
        }
      } else {
        Alert.alert("Błąd", "Użytkownik nie istnieje");
      }
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się zalogować");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Zaloguj" onPress={handleLogin} />
      <Button
        title="Zarejestruj się"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
