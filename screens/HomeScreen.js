import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getUserData } from "../data/api";
import { AuthContext } from "../contexts/AuthContext";

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const { user } = useContext(AuthContext);

  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(userId);

      console.log("data: " + data);
      if (data) {
        setUserData(data);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      {userData && (
        <Text style={styles.title}>
          Witaj {userData.username} w SkinCare App
        </Text>
      )}
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
