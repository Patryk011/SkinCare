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
      navigation.navigate("NotebookScreen", { photoUri: photo.uri });
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
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "center",
  },

  text: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    margin: "0 auto",
  },
});

export default CameraScreen;
