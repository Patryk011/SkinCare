import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkinCare App</Text>
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
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 250,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default HomeScreen;
