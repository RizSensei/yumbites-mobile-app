import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText, ThemedView } from "../../theme";
import { heroSectionStyles as styles } from "../../../styles/hero-section";

const HeroSection = () => {
  return (
    <ThemedView style={styles.container}>

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["#6849a7", "#b8a6db", "#6849a7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.textContainer}>
          {/* Badge */}
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>
              🍕 Free delivery on orders $25+
            </ThemedText>
          </View>

          {/* Heading */}
          <ThemedText style={styles.heading}>
            Delicious Food{"\n"}Delivered Fast
          </ThemedText>

          {/* Description */}
          <ThemedText style={styles.description}>
            Fresh ingredients, amazing flavors. Order your favorites from the
            best local restaurants.
          </ThemedText>

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Menu")}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Order Now</ThemedText>
            <Ionicons name="arrow-forward" size={20} color="#000" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Blur Circle */}
      <ThemedView style={styles.blurCircle} />
    </ThemedView>
  );
};

export default HeroSection;
