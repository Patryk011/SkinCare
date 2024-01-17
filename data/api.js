// const API_URL = "http://localhost:3000";
const API_URL = "http://10.0.2.2:3002";

export const isUserExists = async (username) => {
  try {
    const response = await fetch(`${API_URL}/users?username=${username}`);
    const users = await response.json();
    return users.length > 0;
  } catch (error) {
    console.error("Error during checking user:", error);
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users?username=${username}`);

    const users = await response.json();
    if (users.length > 0) {
      const user = users[0];
      if (user.password === password) {
        return { success: true, user };
      }
    }
    return { success: false };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false };
  }
};

export const getUserData = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error during fetching user data:", error);
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  } catch (error) {
    console.error("Error during updating user data:", error);
  }
};

export const fetchNotes = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/notes?userId=${userId}`);
    return response.json();
  } catch (error) {
    console.error("Error during fetching notes:", error);
  }
};

export const saveNote = async (userId, note) => {
  try {
    const noteWithUserId = { ...note, userId };
    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteWithUserId),
    });
    return response.json();
  } catch (error) {
    console.error("Error during saving note:", error);
  }
};

export const updateNoteWithPhoto = async (userId, noteId, photoUrl) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photo: photoUrl }),
    });
    return response.json();
  } catch (error) {
    console.error("Error during updating note:", error);
  }
};

export const updateNote = async (noteId, updatedNote) => {
  try {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });
    return response.json();
  } catch (error) {
    console.error("Error during updating note:", error);
  }
};

export const deleteNote = async (noteId) => {
  try {
    await fetch(`${API_URL}/notes/${noteId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error during deleting note:", error);
  }
};
