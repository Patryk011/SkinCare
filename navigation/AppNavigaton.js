import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import CustomDrawer from "./CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export function AppNavigation() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      initialRouteName={user ? "HomeStack" : "AuthStack"}
      drawerContent={user ? (props) => <CustomDrawer {...props} /> : undefined}
    >
      {user ? (
        <>
          <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              title: "Home",
              drawerIcon: ({ color }) => (
                <Ionicons name="home-outline" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Notebook"
            component={NotebookScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="book-outline" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="camera-outline" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Shop"
            component={ShopScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="cart-outline" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="SkinTest"
            component={SkinTestScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="help-outline" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="TestResult"
            component={TestResultScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="analytics-outline" size={20} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <Drawer.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false, title: "Start" }}
        />
      )}
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
