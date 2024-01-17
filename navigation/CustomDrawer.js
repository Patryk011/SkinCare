import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../contexts/AuthContext";
import { DrawerActions } from "@react-navigation/native";

function CustomDrawer(props) {
  const { logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <DrawerItemList {...props} />
      <View style={styles.bottomDrawerSection}>
        <View style={styles.separator} />
        <DrawerItem
          label="Logout"
          onPress={() => {
            logout();
            props.navigation.dispatch(DrawerActions.closeDrawer());
            // props.navigation.navigate("AuthStack");
          }}
          icon={() => <Ionicons name="log-out-outline" size={20} />}
          labelStyle={styles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    marginTop: "auto",
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginHorizontal: 10,
  },
  logoutLabel: {
    color: "red",
  },
});

export default CustomDrawer;
