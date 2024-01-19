import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const WelcomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
      <Text style={styles.title}>
        Witaj, zarejestruj się lub jeśli masz konto zaloguj.
      </Text>
      {!user && (
        <>
          <View style={styles.buttonContainer}>
            <Button
              title="Zaloguj się"
              onPress={() => navigation.navigate("Logowanie")}
              color="#007bff"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Zarejestruj się"
              onPress={() => navigation.navigate("Rejestracja")}
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 80,
  },
});

export default WelcomeScreen;
