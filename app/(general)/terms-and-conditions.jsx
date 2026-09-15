import { ScrollView, View } from 'react-native'
import { ThemedText, ThemedView } from '../../components/theme'
import { termsAndConditionsStyles as styles } from '../../styles/terms-and-conditions'

const TermsAndConditions = () => {
  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={styles.eyebrow}>YumBites Legal</ThemedText>
          <ThemedText style={styles.title}>Terms & Conditions</ThemedText>
          <ThemedText style={styles.intro}>
            These terms explain the rules for using YumBites to browse restaurants, place orders, and receive food through our platform.
          </ThemedText>
          <ThemedText style={styles.updated}>Effective date: September 14, 2026</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>01</ThemedText>
          <ThemedText style={styles.sectionTitle}>Using YumBites</ThemedText>
          <ThemedText style={styles.body}>
            You must provide accurate account information, keep your login details secure, and use the app lawfully. You are responsible for activity performed through your account and must notify us if you believe it has been compromised.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>02</ThemedText>
          <ThemedText style={styles.sectionTitle}>Orders and availability</ThemedText>
          <ThemedText style={styles.body}>
            Restaurant menus, prices, preparation times, and availability may change. An order is not final until YumBites or the restaurant confirms it. We may refuse or cancel an order when an item is unavailable, information is incorrect, payment cannot be completed, or circumstances prevent fulfillment.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>03</ThemedText>
          <ThemedText style={styles.sectionTitle}>Pricing, payment, and refunds</ThemedText>
          <ThemedText style={styles.body}>
            You agree to pay the item prices, delivery charges, taxes, and other fees shown at checkout. Promotions may have additional conditions. Refunds, credits, and adjustments are handled under our support and restaurant resolution process and may depend on the circumstances of the order.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>04</ThemedText>
          <ThemedText style={styles.sectionTitle}>Delivery and handoff</ThemedText>
          <ThemedText style={styles.body}>
            You are responsible for providing a complete delivery address and being available to receive the order. Delivery estimates are not guarantees. If delivery cannot be completed because the address is inaccurate or nobody is available, additional charges or cancellation may apply.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>05</ThemedText>
          <ThemedText style={styles.sectionTitle}>Reviews and acceptable use</ThemedText>
          <ThemedText style={styles.body}>
            Reviews should be honest, relevant, and respectful. Do not submit unlawful, abusive, misleading, promotional, or infringing content. YumBites may remove content or restrict accounts that misuse the platform, interfere with service operation, or violate these terms.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionNumber}>06</ThemedText>
          <ThemedText style={styles.sectionTitle}>Changes and contact</ThemedText>
          <ThemedText style={styles.body}>
            We may update these terms as YumBites evolves. Continued use of the app after an update means you accept the revised terms. Nothing in these terms limits rights that cannot be excluded under applicable law.
          </ThemedText>
        </View>

        <View style={styles.contactCard}>
          <ThemedText style={styles.contactTitle}>Need help with an order?</ThemedText>
          <ThemedText style={styles.contactText}>
            Our support team can help with order questions, delivery issues, refunds, and account concerns.
          </ThemedText>
          <ThemedText style={styles.contactEmail}>support@yumbites.com</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  )
}

export default TermsAndConditions