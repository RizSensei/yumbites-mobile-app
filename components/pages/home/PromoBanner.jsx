import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';
import { promoBannerStyles as styles } from '../../../styles/promo-banner';

const PromoBanner = () => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => router.push("/menu")}
      accessibilityLabel="Browse this week's special offers"
    >
      <LinearGradient
        colors={["#30251F", "#573A35", "#87443A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.copy}>
            <Text style={styles.eyebrow}>A LITTLE TREAT FOR YOU</Text>
            <Text style={styles.title}>Sweeten your day</Text>
            <Text style={styles.description}>Take 20% off something delicious.</Text>
            <View style={styles.cta}>
              <Text style={styles.ctaText}>Find your treat</Text>
              <Ionicons name="arrow-forward" size={14} color="#30251F" />
            </View>
          </View>
          <View style={styles.art}>
            <Text style={styles.dessert}>🍰</Text>
            <View style={styles.discount}>
              <Text style={styles.discountText}>-20%</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PromoBanner;