import { registerRootComponent } from "expo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./navigation/AppNavigaton";

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
  }
}

registerRootComponent(App);
