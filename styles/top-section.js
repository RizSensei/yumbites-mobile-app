import { StyleSheet } from "react-native";

export const topSectionStyles = StyleSheet.create({
  container: {
    zIndex: 40,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationTextContainer: {
    flexDirection: "column",
  },
  deliverText: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
