import { StyleSheet } from "react-native";

export const quickCategoriesStyles = StyleSheet.create({
  section: {
    paddingTop: 24,
    paddingBottom: 6,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  eyebrow: {
    color: "#A69588",
    fontSize: 8,
    letterSpacing: 1.1,
    fontWeight: "800",
    marginBottom: 4,
  },
  heading: {
    color: "#30251F",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  seeAll: {
    color: "#E65D40",
    fontSize: 12,
    fontWeight: "800",
    paddingBottom: 3,
  },
  categoriesWrapper: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 66,
  },
  categoryPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },
  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxes: [
    { backgroundColor: "#FFE9D9" },
    { backgroundColor: "#FFF0C9" },
    { backgroundColor: "#DBF2E9" },
    { backgroundColor: "#F4E5F7" },
    { backgroundColor: "#E2EDFF" },
    { backgroundColor: "#FFE3E2" },
  ],
  iconText: {
    fontSize: 29,
  },
  categoryLabel: {
    color: "#55483F",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },
});
