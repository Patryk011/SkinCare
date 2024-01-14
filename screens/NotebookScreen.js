import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { fetchNotes, saveNote, updateNote, deleteNote } from "../data/api";
import { AuthContext } from "../contexts/AuthContext";

const NotebookScreen = ({ navigation, route }) => {
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadNotes = async () => {
      const fetchedNotes = await fetchNotes(user.id);
      setNotesList(fetchedNotes || []);
    };

    loadNotes();
  }, [user.id]);

  useEffect(() => {
    const createNoteWithPhoto = async (photoUri) => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const newNote = {
        date: formattedDate,
        text: "Nowa notatka",
        photo: photoUri,
      };

      try {
        const savedNote = await saveNote(user.id, newNote);
        setNotesList([...notesList, savedNote]);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (route.params?.photoUri) {
      createNoteWithPhoto(route.params.photoUri);
    }
  }, [route.params?.photoUri]);

  const handleSaveNote = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const newNote = { date: formattedDate, text: note };

    try {
      const savedNote = await saveNote(user.id, newNote);
      setNotesList([...notesList, savedNote]);
      setNote("");
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleEditNote = (noteId, text) => {
    setEditingNoteId(noteId);
    setEditingText(text);
  };

  const handleUpdateNote = async (noteId) => {
    try {
      const currentNote = notesList.find((note) => note.id === noteId);

      const updatedNoteData = {
        ...currentNote,
        text: editingText,
      };

      const updatedNote = await updateNote(noteId, updatedNoteData);

      setNotesList(
        notesList.map((note) => (note.id === noteId ? updatedNote : note))
      );

      setEditingNoteId(null);
      setEditingText("");
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);

      setNotesList(notesList.filter((note) => note.id !== noteId));
    } catch (e) {
      console.error(e.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteItem}>
      {item.photo && (
        <Image source={{ uri: item.photo }} style={styles.noteImage} />
      )}
      {editingNoteId === item.id ? (
        <TextInput
          style={styles.input}
          onChangeText={setEditingText}
          value={editingText}
        />
      ) : (
        <Text style={styles.noteText}>{`${item.date}: ${item.text}`}</Text>
      )}
      {editingNoteId === item.id ? (
        <Button title="Save" onPress={() => handleUpdateNote(item.id)} />
      ) : (
        <Button
          title="Edit"
          onPress={() => handleEditNote(item.id, item.text)}
        />
      )}
      <Button title="Delete" onPress={() => handleDeleteNote(item.id)} />
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
        keyExtractor={(item) => item.id.toString()}
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
