import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userData = JSON.stringify({ username, password });
      await AsyncStorage.setItem(username, userData);
      Alert.alert("Sukces", "Rejestracja zakończona pomyślnie");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się stworzyć konta");
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
      <Button title="Zarejestruj" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
