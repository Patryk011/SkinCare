import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getUserData } from "../data/api";
import { AuthContext } from "../contexts/AuthContext";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isTestDone, setIsTestDone] = useState(false);
  const { user } = useContext(AuthContext);

  const userId = user ? user.id : null;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await getUserData(userId);

        if (data) {
          setUserData(data);
          
        }
        if (data && data.skinType) {
          setIsTestDone(true);
          console.log(data.skinType)
        } else {
          setIsTestDone(false)
        }
      };

      if (userId) {
        fetchData();
      }
    }, [userId])
  );

  console.log("isTest:" + isTestDone);

  return (
    <ImageBackground
      source={require("../assets/Home.png")}
      style={styles.container}
    >
      {userData && (
        <Text style={styles.title}>Witaj {userData.username} w SkinCare</Text>
      )}
      <Text style={[styles.subtitle, styles.underline]}>
        Twoje centrum pielęgnacji skóry
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SkinTest")}
        >
          <Text style={{ fontSize: 18 }}>Test skóry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isTestDone ? null : styles.disabledButton]}
          onPress={() => isTestDone && navigation.navigate("TestResult")}
          disabled={!isTestDone}
        >
          <Text style={{ fontSize: 18 }}>Wyniki</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
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
    position: "absolute",
    top: -70,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    position: "absolute",
    fontWeight: "bold",
    top: -30,
  },
  underline: {
    textDecorationLine: "underline",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
  button: {
    backgroundColor: "#0057d9",
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
});

export default HomeScreen;   