import { StyleSheet } from "react-native";

export const topSectionStyles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: "#FFF9F3",
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  welcome: {
    gap: 3,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: "800",
    color: "#E76A48",
  },
  greeting: {
    fontSize: 27,
    fontWeight: "800",
    color: "#30251F",
    letterSpacing: -0.7,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 9,
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  locationTextContainer: {
    flexDirection: "column",
    marginRight: 5,
  },
  deliverText: {
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: "800",
    color: "#9B8B80",
    marginBottom: 1,
  },
  addressText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#30251F",
  },
  locationIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFF0E9",
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    width: 42,
    height: 42,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 42,
    height: 42,
    backgroundColor: "#30251F",
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
});
