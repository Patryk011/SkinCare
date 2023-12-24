import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkinCare App</Text>
      {user ? (
        <>
          <View style={styles.buttonContainer}>
            <Button
              title="Notatnik"
              onPress={() => navigation.navigate("Notebook")}
              color="#007bff"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Aparat"
              onPress={() => navigation.navigate("Camera")}
              color="#28a745"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Sklepy"
              onPress={() => navigation.navigate("Shops")}
              color="#007bff"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Test na Typ Skóry"
              onPress={() => navigation.navigate("SkinTest")}
              color="#28a745"
            />
          </View>
        </>
      ) : (
        <>
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
        </>
      )}
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
    paddingBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default HomeScreen;
