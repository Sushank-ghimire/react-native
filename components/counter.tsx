import { Button, StyleSheet, Text, View } from "react-native";
import React, { useReducer } from "react";

const Counter = () => {
  const initialState = { count: 0 };

  function countReducer(state: any, action: any) {
    switch (action.type) {
      case "increment":
        return { count: (state.count += 1) };
      case "decrement":
        if (state.count === 0) return state;
        return { count: (state.count -= 1) };
      case "inc10":
        return { count: (state.count += action.payload) };
      case "dec10":
        if (state.count === 0 || state.count < action.payload) return state;
        return { count: (state.count -= action.payload) };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(countReducer, initialState);

  return (
    <View>
      <Text style={styles.heading}>Counter</Text>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 24,
          padding: 5,
        }}
      >
        {state.count}
      </Text>
      <View style={{ flex: 1, gap: 3 }}>
        <Button
          title="Increment"
          onPress={() => dispatch({ type: "increment" })}
        />
        <Button
          title="Decrement"
          disabled={state.count == 0}
          color={"crimson"}
          onPress={() => dispatch({ type: "decrement" })}
        />
        <Button
          title="Increment By 10"
          onPress={() => dispatch({ type: "inc10", payload: 10 })}
        />
        <Button
          title="Decrement By 10"
          color={"crimson"}
          disabled={state.count < 10 || state.count == 0}
          onPress={() => dispatch({ type: "dec10", payload: 10 })}
        />
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
