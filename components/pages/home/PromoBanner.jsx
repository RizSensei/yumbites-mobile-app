import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';
import { promoBannerStyles as styles } from '../../../styles/promo-banner';

const PromoBanner = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <LinearGradient
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
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Weekend Special! 🎉</Text>
          <Text style={styles.description}>Get 20% off on all desserts</Text>
          <Text style={styles.cta}>Tap to claim →</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PromoBanner;