import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { AuthContext } from "../contexts/AuthContext";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w SkinCare App</Text>
      <Text style={styles.subtitle}>Twoje centrum pielęgnacji skóry</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
});

export default HomeScreen;
