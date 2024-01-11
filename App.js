import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./navigation/AppNavigaton";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}