import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import LogoImage from "@/assets/images/react-logo.png";

const explore = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={LogoImage}
        resizeMode="cover"
      >
        <Text style={styles.text}>explore</Text>
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
    width: "50%",
    textAlign: "center",
    backgroundColor: "rgba(82, 3, 3, 0.7)",
    padding: 4,
    textTransform: "capitalize",
    margin: "auto",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundSize: "contain",
    resizeMode: "cover",
    alignItems: "center",
  },
});

export default explore;
