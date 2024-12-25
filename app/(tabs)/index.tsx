import { View, StyleSheet } from "react-native";
import React from "react";
import Counter from "@/components/counter";
import TodoComponent from "@/components/TodoComponent";
import { Link } from "expo-router";

const index = () => {
  return (
    <View style={styles.container}>
      {/* <Counter /> */}
      <Link style={{ marginBottom: 10 }} href={"/profile"}>
        Go to profile
      </Link>
      <TodoComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "column",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 35,
    width: "100%",
    textAlign: "center",
  },
});

export default index;
