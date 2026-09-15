import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { landingBackgroundStyles as styles } from "../../../styles/landing-background";

const LandingBackground = () => {
  return (
    <LinearGradient
      // LEGENDARY: Galactic Nebula Gradient
      colors={[
        "#140a29",
        "#291d42",
        "#533a85",
        "#6849a7",
        "#987dc9",
        "#c8b4e5",
      ]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
      style={styles.container}
    >

      {/* Animated glow effects */}
      <View style={styles.lightBandTop} />
      <View style={styles.lightBandBottom} />
      <View style={styles.frameLine} />
    </LinearGradient>
  );
};

export default LandingBackground;
