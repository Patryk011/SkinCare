import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotebookScreen = ({ navigation }) => {
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);

  const loadNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem("notes");
      if (notes !== null) {
        setNotesList(JSON.parse(notes));
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSaveNote = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    const newNote = `${formattedDate}: ${note}`;
    const newNotesList = [...notesList, newNote];

    try {
      await AsyncStorage.setItem("notes", JSON.stringify(newNotesList));
      setNotesList(newNotesList);
      setNote("");
    } catch (e) {
      console.error(e.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Wpisz notatkę..."
        value={note}
        onChangeText={setNote}
      />
      <Button title="Zapisz notatkę" onPress={handleSaveNote} />
      <FlatList
        data={notesList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  noteItem: {
    backgroundColor: "lightgrey",
    padding: 10,
    marginTop: 10,
  },
  noteText: {
    fontSize: 16,
  },
});

export default NotebookScreen;
