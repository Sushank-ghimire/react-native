import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import HomePageBackground from "@/assets/images/wallpaper.jpg";

const index = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={HomePageBackground} style={styles.image}>
        <Text style={styles.text}>Home Page</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    width: "100%",
    textAlign: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

export default index;
