import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../../theme";

const TopSection = () => {
  return (
    <ThemedView style={[styles.container]}>
      <View style={styles.header}>
        {/* Location Info */}
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={18} color="#FF6B6B" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.deliverText}>Deliver to</Text>
            <Text style={styles.addressText}>123 Main Street</Text>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => router.push("/menu")}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default TopSection;

const styles = StyleSheet.create({
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
