import { StyleSheet } from "react-native";

export const popularSectionStyles = StyleSheet.create({
  section: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 6,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  eyebrow: {
    color: "#A69588",
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: "800",
    marginBottom: 4,
  },

  title: {
    color: "#30251F",
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  seeAllBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "#FFEAE1",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -4,
  },

  cardContainer: {
    width: "50%",
    marginBottom: 13,
    paddingHorizontal: 4,
  },
});
