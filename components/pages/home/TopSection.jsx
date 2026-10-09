import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { topSectionStyles as styles } from "../../../styles/top-section";

const TopSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcome}>
          <Text style={styles.eyebrow}>GOOD FOOD, GOOD MOOD</Text>
          <Text style={styles.greeting}>Hungry today?</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => router.push("/menu")}
            activeOpacity={0.75}
            accessibilityLabel="Search the menu"
          >
            <Ionicons name="search" size={20} color="#30251F" />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationIcon}>
          <Ionicons name="location" size={15} color="#E95738" />
        </View>
        <View style={styles.locationTextContainer}>
          <Text style={styles.deliverText}>DELIVERING TO</Text>
          <Text style={styles.addressText}>123 Main Street</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/settings/addresses")}
          activeOpacity={0.7}
          accessibilityLabel="Change delivery address"
        >
          <Ionicons name="chevron-down" size={18} color="#77675D" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopSection;
