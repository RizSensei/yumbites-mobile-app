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
import { useDishes } from "../../../hooks/useDishes";

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
  const { data } = useDishes();
  const popularItems = (Array.isArray(data) ? data : data?.dishes ?? [])
    .filter(item => item.stockAvailable !== false)
    .sort((first, second) => Number(second.rating || 0) - Number(first.rating || 0))
    .slice(0, 6)
    .map(item => ({
      ...item,
      description: item.description || "A delicious dish from our menu",
      price: Number(item.price || 0),
      image: item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    }));

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
