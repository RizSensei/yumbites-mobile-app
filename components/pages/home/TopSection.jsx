import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../../theme";
import { topSectionStyles as styles } from "../../../styles/top-section";

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
