import React, { useRef, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Animated, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "../../../constants/Colors";

export const categories = [
  { id: 0, name: "All", icon: "⭐" },
  { id: 1, name: "Pizza", icon: "🍕" },
  { id: 2, name: "Burgers", icon: "🍔" },
  { id: 3, name: "Drinks", icon: "🥤" },
  { id: 4, name: "Desserts", icon: "🍰" },
  { id: 5, name: "Salads", icon: "🥗" },
  { id: 6, name: "Sushi", icon: "🍣" },
];

// Fade-in animation wrapper
const FadeInItem = ({ index, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(5)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      delay: index * 50,
      useNativeDriver: true,
    }).start();

    Animated.timing(translate, {
      toValue: 0,
      duration: 250,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: translate }] }}
    >
      {children}
    </Animated.View>
  );
};

const QuickCategories = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Categories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoriesWrapper}>
          {categories.slice(1).map((category, index) => (
            <FadeInItem key={category.id} index={index}>
              <Pressable
                onPress={() => router.push("/menu")}
                style={styles.categoryItem}
              >
                <View style={styles.iconBox}>
                  <Text style={styles.iconText}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryLabel}>{category.name}</Text>
              </Pressable>
            </FadeInItem>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default QuickCategories


const styles = StyleSheet.create({
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