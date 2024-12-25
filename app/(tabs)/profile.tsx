import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import React, { useReducer, useState } from "react";

interface User {
  name: string;
  age: number;
  id: number;
}

interface StateType {
  users: User[];
}

type ActionType =
  | { type: "ADD"; payload: { name: string; age: number } }
  | { type: "DELETE"; payload: { id: number } }
  | { type: "EDIT"; payload: { id: number; name: string; age: number } };

const Profile = () => {
  const [focused, setFocused] = useState({
    userName: false,
    userAge: false,
  });

  const initialState: StateType = { users: [] };

  function reducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          users: [
            ...state.users,
            {
              name: action.payload.name,
              age: action.payload.age,
              id: Date.now(),
            },
          ],
        };
      case "DELETE":
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload.id),
        };
      case "EDIT":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id
              ? { ...user, name: action.payload.name, age: action.payload.age }
              : user
          ),
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const handleInputChange = (field: "userName" | "userAge", value: string) => {
    if (field === "userName") {
      setUserName(value);
    } else {
      if (/^\d*$/.test(value)) {
        setUserAge(value);
      }
    }
  };

  const handleFocus = (field: "userName" | "userAge") => {
    setFocused({
      userName: field === "userName",
      userAge: field === "userAge",
    });
  };

  const handleBlur = () => {
    setFocused({ userName: false, userAge: false });
  };

  const isFormValid = userName.trim() && parseInt(userAge) >= 18;

  const handleAddOrEditUser = () => {
    if (editingUserId) {
      // Edit user if `editingUserId` is set
      dispatch({
        type: "EDIT",
        payload: {
          id: editingUserId,
          name: userName.trim(),
          age: parseInt(userAge),
        },
      });
      setEditingUserId(null); // Reset editing state
    } else {
      // Add user if not editing
      dispatch({
        type: "ADD",
        payload: { name: userName.trim(), age: parseInt(userAge) },
      });
    }
    setUserName("");
    setUserAge("");
  };

  const handleDeleteUser = (id: number) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  const handleEditUser = (user: User) => {
    setUserName(user.name);
    setUserAge(user.age.toString());
    setEditingUserId(user.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Users Profile</Text>
      <View style={styles.inputContainer}>
        {/* User Name Input */}
        <TextInput
          value={userName}
          onChangeText={(text) => handleInputChange("userName", text)}
          style={[styles.input, focused.userName && styles.inputFocused]}
          placeholder="Enter user's name..."
          onFocus={() => handleFocus("userName")}
          onBlur={handleBlur}
        />

        {/* User Age Input */}
        <TextInput
          value={userAge}
          onChangeText={(text) => handleInputChange("userAge", text)}
          style={[styles.input, focused.userAge && styles.inputFocused]}
          placeholder="Enter user's age..."
          keyboardType="numeric"
          onFocus={() => handleFocus("userAge")}
          onBlur={handleBlur}
        />

        {/* Add or Edit Button */}
        <Button
          title={editingUserId ? "Edit User" : "Add User"}
          onPress={handleAddOrEditUser}
          disabled={!isFormValid}
        />
      </View>

      {/* Users List */}
      <View>
        <Text style={styles.heading}>Users</Text>
        <FlatList
          data={state.users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.userText}>
                {item.name}, {item.age}
              </Text>
              <View style={styles.actions}>
                <Button title="Edit" onPress={() => handleEditUser(item)} />
                <Button
                  title="Delete"
                  color={"crimson"}
                  onPress={() => handleDeleteUser(item.id)}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 16,
    marginBottom: 24,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputFocused: {
    borderColor: "#4CAF50",
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userText: {
    fontSize: 16,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
});
