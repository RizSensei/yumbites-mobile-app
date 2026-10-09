import { Ionicons } from '@expo/vector-icons'
import { ScrollView, View } from 'react-native'
import { ThemedText, ThemedView } from '../../components/theme'
import { deliveryChargeStyles as styles } from '../../styles/delivery-charge'

const DeliveryCharge = () => {
  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.eyebrow}>
            <Ionicons name="bicycle-outline" size={15} color="#D94A34" />
            <ThemedText style={styles.eyebrowText}>DELIVERY, MADE SIMPLE</ThemedText>
          </View>
          <ThemedText style={styles.title}>Delivery charges</ThemedText>
          <ThemedText style={styles.intro}>
            A little clarity before your cravings arrive. Your exact charge is always shown at checkout.
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Ionicons name="fast-food-outline" size={26} color="#FFFFFF" />
          </View>
          <View style={styles.featureCopy}>
            <ThemedText style={styles.featureTitle}>Good food is on its way</ThemedText>
            <ThemedText style={styles.featureText}>Most orders arrive in about 30-45 minutes.</ThemedText>
          </View>
          <Ionicons name="sparkles-outline" size={21} color="#FFD28E" />
        </View>

        <ThemedText style={styles.sectionTitle}>How your delivery fee works</ThemedText>
        <View style={styles.feeCard}>
          <View style={styles.feeIcon}>
            <Ionicons name="bicycle-outline" size={21} color="#D94A34" />
          </View>
          <View style={styles.feeCopy}>
            <ThemedText style={styles.feeLabel}>Orders under $25</ThemedText>
            <ThemedText style={styles.feeHint}>Standard delivery</ThemedText>
          </View>
          <ThemedText style={styles.feeAmount}>$2.99</ThemedText>
        </View>
        <View style={styles.feeCard}>
          <View style={styles.feeIconFree}>
            <Ionicons name="gift-outline" size={21} color="#4E8A61" />
          </View>
          <View style={styles.feeCopy}>
            <ThemedText style={styles.feeLabel}>Orders of $25 or more</ThemedText>
            <ThemedText style={styles.feeHint}>A little extra love from us</ThemedText>
          </View>
          <ThemedText style={styles.freeLabel}>FREE</ThemedText>
        </View>

        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={21} color="#D94A34" />
          <ThemedText style={styles.noteText}>
            Delivery fees and estimated arrival times can vary by location and availability. Review the final breakdown at checkout before placing your order.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  )
}

export default DeliveryCharge