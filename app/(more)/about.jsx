import { Ionicons } from '@expo/vector-icons'
import { ScrollView, View } from 'react-native'
import { ThemedText, ThemedView } from '../../components/theme'
import { aboutStyles as styles } from '../../styles/about'

const About = () => {
  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.logo}>
            <Ionicons name="restaurant-outline" size={34} color="#fff" />
          </View>
          <ThemedText style={styles.title}>YumBites</ThemedText>
          <ThemedText style={styles.subtitle}>Good food, brought closer.</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>About YumBites</ThemedText>
          <ThemedText style={styles.body}>
            YumBites makes it easy to discover local restaurants, order your
            favorites, and follow every delivery from checkout to your door.
          </ThemedText>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="sparkles-outline" size={22} color={styles.icon.color} />
          <View style={styles.infoText}>
            <ThemedText style={styles.infoTitle}>Made for everyday cravings</ThemedText>
            <ThemedText style={styles.body}>Browse, choose, and enjoy without the fuss.</ThemedText>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="heart-outline" size={22} color={styles.icon.color} />
          <View style={styles.infoText}>
            <ThemedText style={styles.infoTitle}>Supporting local food spots</ThemedText>
            <ThemedText style={styles.body}>Every order helps restaurants serve more of what they love.</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.version}>Version 1.0.0</ThemedText>
      </ScrollView>
    </ThemedView>
  )
}

export default About