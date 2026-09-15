import { StyleSheet } from "react-native";

export const quickCategoriesStyles = StyleSheet.create({
  section: {
    paddingVertical: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  categoriesWrapper: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    width: 64,
    height: 64,
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // shadow for Android
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  iconText: {
    fontSize: 32,
    fontWeight: "bold"
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 6,
    textAlign: "center",
  },
});
