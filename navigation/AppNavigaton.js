import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../contexts/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import NotebookScreen from "../screens/NotebookScreen";
import CameraScreen from "../screens/CameraScreen";
import ShopScreen from "../screens/ShopScreen";
import SkinTestScreen from "../screens/SkinTestScreen";
import TestResultScreen from "../screens/TestResultScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export function AppNavigation() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Drawer.Navigator initialRouteName={user ? "HomeStack" : "AuthStack"}>
      {user ? (
        <>
          <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ title: "Home" }}
          />
          <Drawer.Screen name="Notebook" component={NotebookScreen} />
          <Drawer.Screen name="Camera" component={CameraScreen} />
          <Drawer.Screen name="Shop" component={ShopScreen} />
          <Drawer.Screen name="SkinTest" component={SkinTestScreen} />
          <Drawer.Screen name="TestResult" component={TestResultScreen} />
          <Drawer.Screen
            name="Logout"
            component={() => null}
            listeners={({ navigation }) => ({
              focus: () => {
                logout();
                navigation.navigate("AuthStack");
              },
            })}
          />
        </>
      ) : (
        <Drawer.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ title: "Welcome" }}
        />
      )}
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
