import React from "react";
import { ThemedView, ThemedText, Spacer } from "../../components/theme";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

const Home = () => {
  return (
    <ThemedView safeArea={true}>
      <ThemedText>Rijan</ThemedText>

      <Spacer height={20} />
      <Link href="/(auth)/login" style={styles.link}>
        <ThemedText>Sign In</ThemedText>
      </Link>
      <Spacer height={20} />
      <Link href="/(auth)/register" style={styles.link}>
        <ThemedText>Sign Up</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  link: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
