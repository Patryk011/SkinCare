import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./navigation/AppNavigaton";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
