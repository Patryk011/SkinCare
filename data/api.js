const API_URL = "http://10.0.2.2:3000";

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