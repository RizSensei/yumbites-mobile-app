import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Spacer, ThemedText, ThemedView } from "../components/theme";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { Link, useNavigation } from "expo-router";

const Home = () => {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("/(dashboard)/home"); 
  //   }, 10000);
  // }, []);

  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ThemedText style={styles.title}>Welcome to YumBites</ThemedText>
      <Spacer height={20} />
      <ThemedText style={styles.description}>
        Browse menus, customize your order, and enjoy smooth, reliable
        delivery—every time
      </ThemedText>
      <Spacer height={20} />
      <ActivityIndicator size="large" color={Colors.primary} />
      <Link href="/(dashboard)/home" asChild>
        <TouchableOpacity>
          <ThemedText>Go to Home</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  link: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});
