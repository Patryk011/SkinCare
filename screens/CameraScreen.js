import React, { useState, useEffect, useRef } from "react";
import { View, Button, StyleSheet, Alert, Text } from "react-native";
import { Camera } from "expo-camera";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      navigation.navigate("Notebook", { photoUri: photo.uri });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <Text style={{ textAlign: "center", marginTop: 300, fontWeight: "bold" }}>
        No access to camera
      </Text>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <Button title="Zrób zdjęcie" onPress={handleTakePicture} />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
});

export default CameraScreen;
