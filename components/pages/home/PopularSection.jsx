import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
  View
} from "react-native";
import MenuCard from "../../general/MenuCard";
import { popularSectionStyles as styles } from "../../../styles/popular-section";

export const popularItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella & basil",
    price: 12.99,
    image: "https://via.placeholder.com/150?text=Pizza",
  },
  {
    id: 2,
    name: "Cheeseburger",
    description: "Juicy beef patty with cheddar, lettuce & tomato",
    price: 10.5,
    image: "https://via.placeholder.com/150?text=Burger",
  },
  {
    id: 3,
    name: "Sushi Platter",
    description: "Assorted sushi rolls with fresh fish",
    price: 18.75,
    image: "https://via.placeholder.com/150?text=Sushi",
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Romaine, parmesan, croutons & Caesar dressing",
    price: 9.0,
    image: "https://via.placeholder.com/150?text=Salad",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with frosting",
    price: 6.5,
    image: "https://via.placeholder.com/150?text=Cake",
  },
  {
    id: 6,
    name: "Strawberry Smoothie",
    description: "Fresh strawberries blended with yogurt",
    price: 5.25,
    image: "https://via.placeholder.com/150?text=Smoothie",
  },
];

const SlideUp = ({ index, children }) => {
  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 250,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: 250,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity: fade, transform: [{ translateY: translate }] }}
    >
      {children}
    </Animated.View>
  );
};

const PopularSection = () => {
  return (
    <View style={styles.section}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Popular Now 🔥</Text>

        <Pressable
          onPress={() => router.push("/menu")}
          style={styles.seeAllBtn}
        >
          <Text style={styles.seeAllText}>See All</Text>
        </Pressable>
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {popularItems.map((item, index) => (
          <View style={styles.cardContainer} key={item.id}>
            <SlideUp index={index}>
              <MenuCard item={item} />
            </SlideUp>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PopularSection;
