import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const LandingBackground = () => {
  return (
    <LinearGradient
      // LEGENDARY: Galactic Nebula Gradient
      colors={[
        "#140a29",
        "#291d42",
        "#533a85",
        "#6849a7",
        "#987dc9",
        "#c8b4e5",
      ]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
      style={styles.container}
    >

      {/* Animated glow effects */}
      <View style={styles.glowEffect1} />
      <View style={styles.glowEffect2} />
      <View style={styles.glowEffect3} />
    </LinearGradient>
  );
};

export default LandingBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get("window").height * 0.7,
    position: "relative",
    overflow: "hidden",
  },
  glowEffect1: {
    position: "absolute",
    top: "10%",
    right: "-10%",
    width: 200,
    height: 200,
    backgroundColor: "rgba(104, 73, 167, 0.3)",
    borderRadius: 100,
    shadowColor: "#6849a7"
  },
  glowEffect2: {
    position: "absolute",
    bottom: "-5%",
    left: "-5%",
    width: 150,
    height: 150,
    backgroundColor: "rgba(184, 166, 219, 0.2)",
    borderRadius: 75,
    shadowColor: "#6849a7"
  },
  glowEffect3: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: -75 }],
    width: 150,
    height: 150,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 75,
    shadowColor: "#6849a7"
  },
});
