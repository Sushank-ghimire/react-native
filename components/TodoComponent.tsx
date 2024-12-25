import React, { act, useReducer, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
} from "react-native";

const TodoComponent = () => {
  const todoState = { todos: [] };

  const [isFocused, setIsFocused] = useState(false);
  
  const [inputTodo, setInputTodo] = useState("");

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "add":
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              text: action.payload,
              id: Date.now(),
            },
          ],
        };
      case "delete":
        return {
          ...state,
          todos: state.todos.filter((todo: any) => todo.id !== action.payload),
        };
      default:
        return state;
    }
  };
  const handleInputChange = (text: any) => {
    setInputTodo(text);
  };

  const [state, dispatch] = useReducer(reducer, todoState);

  const handleAddTodo = () => {
    dispatch({ type: "add", payload: inputTodo });
    setInputTodo("");
  };

  const handleTodoDelete = (id: number) => {
    Alert.alert("Do you really want to delete the todo ?", "", [
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch({ type: "delete", payload: id }),
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Todo List</Text>

      {/* Input and Button Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          placeholder="Enter Your Todo..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={inputTodo}
          onChangeText={handleInputChange}
        />
        <Button
          onPress={handleAddTodo}
          title="Add"
          disabled={inputTodo.length < 6}
          color="#4CAF50"
        />
      </View>

      {/* Todos List */}
      <Text style={styles.subHeading}>Your Todos:</Text>
      {state.todos.length === 0 ? (
        <Text>You don't have any todos</Text>
      ) : (
        <FlatList
          data={state.todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: any) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.text}</Text>
              <Button
                title="Delete"
                color="#FF5252"
                onPress={() => handleTodoDelete(item.id)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TodoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: "#F5F5F5",
    minWidth: "80%",
    margin: "auto",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputFocused: {
    borderColor: "#4CAF50",
  },
  todoItem: {
    padding: 6,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  todoText: {
    fontSize: 22,
    color: "#333",
    padding: 4
  },
  noTodosText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#999",
  },
});
