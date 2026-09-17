import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import LandingBackground from "../components/pages/entry/LandingBackground";
import { ThemedText } from "../components/theme";
import { indexStyles as styles } from "../styles/index";

const Home = () => {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/home');
    }, 3000);

    return () => {
      clearTimeout(timer);
      fade.stopAnimation();
      slide.stopAnimation();
    };
  }, [fade, router, slide]);

  return (
    <View style={styles.fullContainer}>
      <LandingBackground />
      <Animated.View
        style={[
          styles.contentContainer,
          { opacity: fade, transform: [{ translateY: slide }] },
        ]}
      >

        <View style={styles.brandBlock}>
          <View style={styles.mark}>
            <View style={styles.markInner}>
              <Ionicons name="fast-food" size={34} color="#6849a7" />
            </View>
          </View>
          <ThemedText style={styles.appName}>YumBites</ThemedText>
          <ThemedText style={styles.tagline}>Discover delicious moments</ThemedText>
        </View>
      </Animated.View>
    </View>
  );
};

export default Home;
