import { ScrollView, View } from 'react-native'
import { ThemedText, ThemedView } from '../../components/theme'
import { privacyPolicyStyles as styles } from '../../styles/privacy-policy'

const PrivacyPolicy = () => {
  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={styles.eyebrow}>YumBites Legal</ThemedText>
          <ThemedText style={styles.title}>Privacy Policy</ThemedText>
          <ThemedText style={styles.intro}>
            This policy explains how YumBites handles the information you share while discovering food, placing orders, and using our delivery services.
          </ThemedText>
          <ThemedText style={styles.updated}>Effective date: September 14, 2026</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>01</ThemedText>
          <ThemedText style={styles.sectionTitle}>Information we collect</ThemedText>
          <ThemedText style={styles.body}>
            We collect information needed to provide and improve YumBites, including your name, email address, phone number, delivery addresses, order details, and account preferences.
          </ThemedText>
          <View style={styles.bulletRow}>
            <ThemedText style={styles.bullet}>-</ThemedText>
            <ThemedText style={styles.bulletText}>Account and contact details you provide when you register or update your profile.</ThemedText>
          </View>
          <View style={styles.bulletRow}>
            <ThemedText style={styles.bullet}>-</ThemedText>
            <ThemedText style={styles.bulletText}>Order, payment status, delivery, and restaurant information needed to complete your purchase.</ThemedText>
          </View>
          <View style={styles.bulletRow}>
            <ThemedText style={styles.bullet}>-</ThemedText>
            <ThemedText style={styles.bulletText}>Device, app usage, and approximate location information when you enable relevant permissions.</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>02</ThemedText>
          <ThemedText style={styles.sectionTitle}>How we use information</ThemedText>
          <ThemedText style={styles.body}>
            Your information helps us authenticate your account, process orders, coordinate delivery, provide support, personalize recommendations, prevent misuse, and communicate important service updates.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>03</ThemedText>
          <ThemedText style={styles.sectionTitle}>Payments and sharing</ThemedText>
          <ThemedText style={styles.body}>
            Payment details are handled by our payment providers. YumBites shares only the information required with restaurants, delivery partners, service providers, and authorities when legally required or necessary to protect users and the service.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>04</ThemedText>
          <ThemedText style={styles.sectionTitle}>Your choices and rights</ThemedText>
          <ThemedText style={styles.body}>
            You can review or update your profile details in the app, manage device permissions, and opt out of promotional messages. You may also request access to, correction of, or deletion of personal information, subject to applicable law and records we must retain.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>05</ThemedText>
          <ThemedText style={styles.sectionTitle}>Security and retention</ThemedText>
          <ThemedText style={styles.body}>
            We use reasonable administrative and technical safeguards to protect your information. We retain information only for as long as needed to provide the service, meet legal obligations, resolve disputes, and enforce our agreements.
          </ThemedText>
        </View>

        <View style={styles.contactCard}>
          <ThemedText style={styles.contactTitle}>Questions about privacy?</ThemedText>
          <ThemedText style={styles.contactText}>
            Contact the YumBites support team for privacy requests or questions about this policy.
          </ThemedText>
          <ThemedText style={styles.contactEmail}>support@yumbites.com</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  )
}

export default PrivacyPolicy