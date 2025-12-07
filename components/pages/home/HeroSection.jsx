import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import { ThemedText, ThemedView } from "../../theme";
const HeroSection = () => {
  return (
    <ThemedView style={styles.container}>

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["#6849a7", "#b8a6db", "#6849a7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.textContainer}>
          {/* Badge */}
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>
              🍕 Free delivery on orders $25+
            </ThemedText>
          </View>

          {/* Heading */}
          <ThemedText style={styles.heading}>
            Delicious Food{"\n"}Delivered Fast
          </ThemedText>

          {/* Description */}
          <ThemedText style={styles.description}>
            Fresh ingredients, amazing flavors. Order your favorites from the
            best local restaurants.
          </ThemedText>

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Menu")}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Order Now</ThemedText>
            <Ionicons name="arrow-forward" size={20} color="#000" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Blur Circle */}
      <ThemedView style={styles.blurCircle} />
    </ThemedView>
  );
};

export default HeroSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    minHeight: Dimensions.get("window").height * 0.35,
    position: "relative",
    overflow: "hidden",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 32,
  },
  textContainer: {
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  heading: {
    fontFamily: "System", // Use your custom font here
    fontWeight: "800",
    fontSize: 32,
    lineHeight: 36,
    color: "#FFFFFF",
    marginBottom: 12,
  },
  description: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  blurCircle: {
    position: "absolute",
    bottom: -16,
    right: -32,
    width: 160,
    height: 160,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 80,
    blurRadius: 60,
  },
});
