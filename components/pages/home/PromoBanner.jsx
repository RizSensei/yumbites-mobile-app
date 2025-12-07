import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gradient: {
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  cta: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
  },
});

export default PromoBanner;