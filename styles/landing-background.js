import { Dimensions, StyleSheet } from "react-native";

export const landingBackgroundStyles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get("window").height * 0.7,
    position: "relative",
    overflow: "hidden",
  },
  lightBandTop: {
    position: "absolute",
    top: "16%",
    right: "-24%",
    width: "110%",
    height: 72,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    transform: [{ rotate: "-18deg" }],
  },
  lightBandBottom: {
    position: "absolute",
    bottom: "13%",
    left: "-24%",
    width: "110%",
    height: 110,
    backgroundColor: "rgba(20, 10, 41, 0.28)",
    transform: [{ rotate: "-18deg" }],
  },
  frameLine: {
    position: "absolute",
    top: 32,
    left: 20,
    right: 20,
    bottom: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
});
