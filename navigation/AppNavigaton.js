import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../contexts/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import NotebookScreen from "../screens/NotebookScreen";
import CameraScreen from "../screens/CameraScreen";
import ShopsScreen from "../screens/ShopScreen";
import SkinTestScreen from "../screens/SkinTestScreen";
import TestResultScreen from "../screens/TestResultScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {!user && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
      {
        <>
          <Stack.Screen name="Notebook" component={NotebookScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Shops" component={ShopsScreen} />
          <Stack.Screen name="SkinTest" component={SkinTestScreen} />
          <Stack.Screen name="TestResult" component={TestResultScreen} />
        </>
      }
    </Stack.Navigator>
  );
}

export function AppNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: "Home" }}
      />
    </Drawer.Navigator>
  );
}
