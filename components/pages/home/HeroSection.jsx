import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heroSectionStyles as styles } from "../../../styles/hero-section";

const HeroSection = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F78355", "#F05B42", "#D9443D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.orbit} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.badge}>
            <Ionicons name="flash" size={13} color="#FFE6A8" />
            <Text style={styles.badgeText}>FRESH OFF THE MENU</Text>
          </View>
          <Text style={styles.heading}>Your next{"\n"}favorite bite.</Text>
          <Text style={styles.description}>
            Big flavor, made fresh and on its way to you.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/menu")}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Explore the menu</Text>
            <Ionicons name="arrow-forward" size={17} color="#D94B3D" />
          </TouchableOpacity>
        </View>
        <View style={styles.foodArt}>
          <View style={styles.plate}>
            <Text style={styles.foodEmoji}>🍜</Text>
          </View>
          <View style={styles.sparkle}>
            <Text style={styles.sparkleText}>✦</Text>
          </View>
          <View style={styles.foodTag}>
            <Ionicons name="star" size={12} color="#FFB53E" />
            <Text style={styles.foodTagText}>made with love</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeroSection;
