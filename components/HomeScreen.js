import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w aplikacji do pielęgnacji skóry</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Zaloguj się"
          onPress={() => navigation.navigate("Login")}
          color="#007bff"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Zarejestruj się"
          onPress={() => navigation.navigate("Register")}
          color="#28a745"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
});

export default HomeScreen;
