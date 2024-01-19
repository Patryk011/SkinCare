import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { fetchNotes, saveNote, updateNote, deleteNote } from "../data/api";
import { AuthContext } from "../contexts/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";

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
      const newNote = {
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
    if (note.trim() === "") {
      Alert.alert("Notatka nie może być pusta");
      return;
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const newNote = { date: formattedDate, text: note };

    try {
      const savedNote = await saveNote(user.id, newNote);
      setNotesList([...notesList, savedNote]);
      setNote("");
    } catch (e) {
      console.log(e.message);
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

  const renderItem = ({ item }) => {
    if (item.photo) {
      return (
        <View style={styles.noteItem}>
          <Image source={{ uri: item.photo }} style={styles.imageStyle} />
          <View style={styles.iconStyles}>
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
              <Icon name="close" size={40} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.noteItem}>
          {editingNoteId === item.id ? (
            <TextInput
              style={styles.input}
              onChangeText={setEditingText}
              value={editingText}
            />
          ) : (
            <Text style={styles.noteText}>{`${item.date} ${item.text}`}</Text>
          )}
          {editingNoteId === item.id ? (
            <View style={styles.iconStyles}>
              <TouchableOpacity onPress={() => handleUpdateNote(item.id)}>
                <Icon name="check" size={24} color="green" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.iconStyles}>
              <TouchableOpacity
                onPress={() => handleEditNote(item.id, item.text)}
              >
                <Icon name="edit" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
            <Icon name="close" size={24} color="red" />
          </TouchableOpacity>
        </View>
      );
    }
  };
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
  noteItem: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    padding: 10,
    marginTop: 10,
    alignItems: "center",

  },

  noteText: {
    fontSize: 16,
    flex: 5,
    maxWidth: '100%',

  },

  iconStyles: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },

  imageStyle: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default NotebookScreen;
