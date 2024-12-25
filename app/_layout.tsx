import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, useColorScheme, StyleSheet } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const colorScheme = useColorScheme(); // Detect light or dark mode

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      {/* Ensure StatusBar is the first component */}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <Stack
        screenOptions={{
          headerShown: false,
          statusBarHidden: false,
          statusBarStyle: "auto",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkBackground: {
    backgroundColor: "#121212", // Dark mode background
  },
  lightBackground: {
    backgroundColor: "#FFFFFF", // Light mode background
  },
});
