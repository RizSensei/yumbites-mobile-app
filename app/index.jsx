import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import LandingBackground from "../components/pages/entry/LandingBackground";
import { Spacer, ThemedText } from "../components/theme";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home'); // Or '/onboarding' if you have one
    }, 3000); // Consider 3 seconds for better UX

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.fullContainer}>
      <LandingBackground />
      <View style={styles.contentContainer}>
        {/* Logo/App Name with animation */}
        <ThemedText style={styles.appName}>YumBites</ThemedText>
        <ThemedText style={styles.tagline}>Discover Delicious Moments</ThemedText>
        
        <Spacer height={40} />
        
        {/* Animated Food Icon (Optional) */}
        <Ionicons name="fast-food-outline" size={60} color="#fff" />
        
        <Spacer height={40} />
        
        {/* Loading Indicator with text */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <ThemedText style={styles.loadingText}>Loading delicious content...</ThemedText>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  }
});
