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
import { fetchNotes, saveNote, updateNote, deleteNote, updateNoteWithPhoto } from "../data/api";
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
        description: '',
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

  const handleUpdatePhotoNote = async (noteId, newDescription) => {
    try {
      const currentNote = notesList.find((note) => note.id === noteId);
      if (!currentNote.photo) {
        console.error("No photo found for the note");
        return;
      }
  
      const updatedNoteData = {
        ...currentNote,
        description: newDescription,
      };
  
      const updatedNote = await updateNoteWithPhoto(noteId, updatedNoteData);
  
      setNotesList(
        notesList.map((note) => (note.id === noteId ? updatedNote : note))
      );
  
    } catch (e) {
      console.error(e.message);
    }
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
    
    const isEditing = editingNoteId === item.id;
  
    if (item.photo) {
      
      return (
        <View style={styles.noteItem}>
          <Image source={{ uri: item.photo }} style={styles.imageStyle} />
          {isEditing ? (
            <TextInput
              style={styles.inputEdit}
              onChangeText={setEditingText}
              value={editingText}
              placeholder="Add a description..."
            />
          ) : (
            <Text style={styles.noteText}>{item.description || "No description"}</Text>
          )}
          <View style={styles.iconStyles}>
            {isEditing ? (
              <TouchableOpacity onPress={() => handleUpdatePhotoNote(item.id, editingText)}>
                <Icon name="check" size={24} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleEditNote(item.id, item.description)}>
                <Icon name="edit" size={24} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
              <Icon name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      
      return (
        <View style={styles.noteItem}>
          {isEditing ? (
            <TextInput
              style={styles.inputEdit}
              onChangeText={setEditingText}
              value={editingText}
            />
          ) : (
            <View style={styles.noteContainer}>
              <Text style={[styles.noteText, styles.noteDate]}>{item.date}</Text>
              <Text style={styles.noteText}>{item.text}</Text>
            </View>
          )}
          <View style={styles.iconStyles}>
            {isEditing ? (
              <TouchableOpacity onPress={() => handleUpdateNote(item.id)}>
                <Icon name="check" size={24} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleEditNote(item.id, item.text)}>
                <Icon name="edit" size={24} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
              <Icon name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
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

  noteContainer: {
    maxWidth: '100%',
    flex: 5,
  },

  noteText: {
    fontSize: 16,
    maxWidth: '100%',

  },

  iconStyles: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },

  noteDate: {
    fontWeight: 'bold'
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

  inputEdit: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    maxWidth: '100%',
    flex: 5
  },
});

export default NotebookScreen;
