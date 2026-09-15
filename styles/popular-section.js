import { StyleSheet } from "react-native";

export const popularSectionStyles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ff6b00",
  },

  chevron: {
    fontSize: 16,
    marginLeft: 4,
    color: "#ff6b00",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginHorizontal: -6,
  },

  cardContainer: {
    width: "48%", // 2 columns
    marginBottom: 16,
    paddingHorizontal: 6,
  },
});
