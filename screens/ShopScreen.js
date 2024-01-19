import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import shopsData from "../utils/shopsData";
import { AuthContext } from "../contexts/AuthContext";

const ShopsScreen = () => {
  const { user } = useContext(AuthContext);
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink(item.url)}
      >
        <Text style={styles.buttonText}>Odwiedź sklep</Text>
      </TouchableOpacity>
    </View>
  );

  if (user.skinType) {
    return (
      <FlatList
        data={shopsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Wypełnij test na typ skóry, wyświetlimy wtedy tutaj liste polecanych
          sklepów.
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    fontWeight: "bold",
    fontSize: 20,
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555555",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export default ShopsScreen;
