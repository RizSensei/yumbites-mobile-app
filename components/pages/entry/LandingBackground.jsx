import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { landingBackgroundStyles as styles } from "../../../styles/landing-background";

const LandingBackground = () => {
  return (
    <LinearGradient
      colors={[
        "#A9362B",
        "#D94A34",
        "#F45B43",
        "#F4875A",
        "#F7B46C",
        "#FFE0A9",
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
