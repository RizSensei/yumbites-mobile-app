import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { ThemedView } from "../../components/theme";
import { faqsStyles as styles } from "../../styles/faqs";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  !globalThis.nativeFabricUIManager &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      "To place an order, simply browse our menu, select your desired items, customize them if needed, and proceed to checkout. You can pay using various methods including credit/debit cards, digital wallets, or cash on delivery.",
    category: "ordering",
  },
  {
    id: 2,
    question: "What are your delivery hours?",
    answer:
      "We deliver from 10:00 AM to 11:00 PM daily. However, some restaurants may have different hours. You can check the specific restaurant's hours when placing your order.",
    category: "delivery",
  },
  {
    id: 3,
    question: "Is there a minimum order amount?",
    answer:
      "Yes, we have a minimum order amount of $10 for delivery orders. This helps us ensure efficient delivery service. For pickup orders, there is no minimum amount.",
    category: "ordering",
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, you can track it in real-time through the 'My Orders' section in the app. You'll receive updates when your order is being prepared, out for delivery, and delivered.",
    category: "delivery",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and cash on delivery for eligible locations.",
    category: "payment",
  },
  {
    id: 6,
    question: "Can I modify or cancel my order?",
    answer:
      "You can modify or cancel your order within 5 minutes of placing it. After that, the restaurant starts preparing your food and we cannot guarantee changes. Please contact customer support immediately if you need assistance.",
    category: "ordering",
  },
  {
    id: 7,
    question: "How do I apply promo codes?",
    answer:
      "You can apply promo codes during checkout. Look for the 'Promo Code' field, enter your code, and tap 'Apply'. The discount will be reflected in your total immediately.",
    category: "promotions",
  },
  {
    id: 8,
    question: "Are there any delivery fees?",
    answer:
      "Delivery fees vary by restaurant and distance. The fee will be clearly displayed before you confirm your order. Some restaurants offer free delivery for orders above a certain amount.",
    category: "delivery",
  },
  {
    id: 9,
    question: "How do I create an account?",
    answer:
      "You can create an account by tapping 'Sign Up' on the login screen. You'll need to provide your email address, phone number, and create a password. Alternatively, you can sign up with Google or Apple.",
    category: "account",
  },
  {
    id: 10,
    question: "What if I receive the wrong order?",
    answer:
      "If you receive the wrong order, please contact our customer support immediately within 30 minutes of delivery. We'll work to resolve the issue by either sending the correct items or providing a refund.",
    category: "support",
  },
  {
    id: 11,
    question: "Do you offer vegetarian/vegan options?",
    answer:
      "Yes! We have a wide range of vegetarian and vegan options. You can filter restaurants and dishes by dietary preferences using the filters on our menu pages.",
    category: "dietary",
  },
  {
    id: 12,
    question: "How can I contact customer support?",
    answer:
      "You can contact us through the 'Help' section in the app, email us at support@yumbites.com, or call our hotline at 1-800-YUM-BITE. We're available 24/7 to assist you.",
    category: "support",
  },
  {
    id: 13,
    question: "Can I schedule orders in advance?",
    answer:
      "Yes, you can schedule orders up to 7 days in advance. During checkout, select the 'Schedule Order' option and choose your preferred date and time.",
    category: "ordering",
  },
  {
    id: 14,
    question: "How do I rate my delivery experience?",
    answer:
      "After each delivery, you'll receive a prompt to rate your experience. You can also rate restaurants and delivery partners through the 'My Orders' section.",
    category: "account",
  },
  {
    id: 15,
    question: "Are my payment details secure?",
    answer:
      "Absolutely. We use industry-standard encryption and secure payment gateways to protect your information. We never store your full credit card details on our servers.",
    category: "payment",
  },
];

const categories = [
  { id: "all", label: "All Questions", icon: "grid-outline" },
  { id: "ordering", label: "Ordering", icon: "cart-outline" },
  { id: "delivery", label: "Delivery", icon: "bicycle-outline" },
  { id: "payment", label: "Payment", icon: "card-outline" },
  { id: "account", label: "Account", icon: "person-outline" },
  { id: "support", label: "Support", icon: "help-circle-outline" },
];

const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState([]);
  const [activeTab, setActiveTab] = useState("faq"); // 'faq' or 'contact'

  const scrollY = useRef(new Animated.Value(0)).current;

  // Filter FAQs based on search and category
  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((itemId) => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const expandAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItems(filteredFaqs.map((faq) => faq.id));
  };

  const collapseAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItems([]);
  };

  const scrollViewRef = useRef(null);

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const renderFAQItem = (faq, index) => {
    const isExpanded = expandedItems.includes(faq.id);

    return (
      <View key={faq.id} style={styles.faqItem}>
        <TouchableOpacity
          style={[
            styles.faqQuestionContainer,
            isExpanded && styles.faqQuestionContainerExpanded,
          ]}
          onPress={() => toggleItem(faq.id)}
          activeOpacity={0.8}
        >
          <View style={styles.faqQuestionContent}>
            <View style={styles.questionNumber}>
              <LinearGradient
                colors={["#6849a7", "#987dc9"]}
                style={styles.numberGradient}
              >
                <Text style={styles.numberText}>{index + 1}</Text>
              </LinearGradient>
            </View>
            <View style={styles.questionTextContainer}>
              <Text style={styles.faqQuestion} numberOfLines={2}>
                {faq.question}
              </Text>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={isExpanded ? "#6849a7" : "#666"}
          />
        </TouchableOpacity>

        {isExpanded && (
          <Animated.View
            style={[
              styles.faqAnswerContainer,
              {
                opacity: scrollY.interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 1],
                  extrapolate: "clamp",
                }),
              },
            ]}
          >
            <View style={styles.answerLine} />
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
            <View style={styles.answerFooter}>
              <View style={styles.categoryTag}>
                <Ionicons
                  name={
                    categories.find((c) => c.id === faq.category)?.icon ||
                    "help"
                  }
                  size={12}
                  color="#6849a7"
                />
                <Text style={styles.categoryTagText}>
                  {categories.find((c) => c.id === faq.category)?.label}
                </Text>
              </View>
              <TouchableOpacity style={styles.helpfulButton}>
                <Ionicons name="thumbs-up-outline" size={16} color="#6849a7" />
                <Text style={styles.helpfulText}>Helpful?</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <ThemedView safeArea={true} style={styles.container}>
      {/* Animated Header Background */}
      <Animated.View
        style={[styles.animatedHeader, { opacity: headerOpacity }]}
      >
        <LinearGradient
          colors={["#6849a7", "#533a85", "#291d42"]}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#6849a7", "#533a85"]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Help Center</Text>
            <Text style={styles.headerSubtitle}>
              Find answers to common questions
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search questions..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "faq" && styles.activeTab]}
          onPress={() => setActiveTab("faq")}
        >
          <Ionicons
            name="help-circle"
            size={20}
            color={activeTab === "faq" ? "#fff" : "#6849a7"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "faq" && styles.activeTabText,
            ]}
          >
            FAQ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "contact" && styles.activeTab]}
          onPress={() => setActiveTab("contact")}
        >
          <Ionicons
            name="chatbubble"
            size={20}
            color={activeTab === "contact" ? "#fff" : "#6849a7"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "contact" && styles.activeTabText,
            ]}
          >
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "faq" ? (
        <>
          {/* Categories */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
            >
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id &&
                      styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Ionicons
                    name={category.icon}
                    size={18}
                    color={
                      selectedCategory === category.id ? "#fff" : "#6849a7"
                    }
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category.id &&
                        styles.categoryButtonTextActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          {/* Controls */}
          <View style={styles.controlsContainer}>
            <Text style={styles.resultsText}>
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "question" : "questions"} found
            </Text>
            <View style={styles.controlButtons}>
              {expandedItems.length > 0 ? (
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={collapseAll}
                >
                  <Ionicons name="chevron-up" size={16} color="#6849a7" />
                  <Text style={styles.controlButtonText}>Collapse All</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={expandAll}
                >
                  <Ionicons name="chevron-down" size={16} color="#6849a7" />
                  <Text style={styles.controlButtonText}>Expand All</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* FAQ List */}
          <Animated.ScrollView
            ref={scrollViewRef}
            style={styles.faqListContainer}
            contentContainerStyle={styles.faqList}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
            scrollEventThrottle={16}
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => renderFAQItem(faq, index))
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="help-circle-outline" size={80} color="#ccc" />
                <Text style={styles.emptyTitle}>No questions found</Text>
                <Text style={styles.emptyText}>
                  Try adjusting your search or select a different category
                </Text>
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  <Text style={styles.emptyButtonText}>Reset Filters</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Contact CTA */}
            <View style={styles.contactCta}>
              <LinearGradient
                colors={["#f0e6ff", "#ffffff"]}
                style={styles.contactCtaGradient}
              >
                <Ionicons
                  name="chatbubble-ellipses"
                  size={40}
                  color="#6849a7"
                />
                <Text style={styles.contactCtaTitle}>Still need help?</Text>
                <Text style={styles.contactCtaText}>
                  Can't find what you're looking for? Our support team is here
                  to help you.
                </Text>
                <TouchableOpacity
                  style={styles.contactCtaButton}
                  onPress={() => setActiveTab("contact")}
                >
                  <Text style={styles.contactCtaButtonText}>
                    Contact Support
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </Animated.ScrollView>
        </>
      ) : (
        /* Contact Us Tab */
        <ScrollView
          style={styles.contactContainer}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={["#f8f4ff", "#ffffff"]}
            style={styles.contactCard}
          >
            <View style={styles.contactHeader}>
              <Ionicons name="headset" size={48} color="#6849a7" />
              <Text style={styles.contactTitle}>Get in Touch</Text>
              <Text style={styles.contactSubtitle}>
                We're here to help! Choose your preferred contact method
              </Text>
            </View>

            <View style={styles.contactMethods}>
              {/* Live Chat */}
              <TouchableOpacity style={styles.contactMethod}>
                <LinearGradient
                  colors={["#6849a7", "#987dc9"]}
                  style={styles.methodIconContainer}
                >
                  <Ionicons name="chatbubbles" size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.methodContent}>
                  <Text style={styles.methodTitle}>Live Chat</Text>
                  <Text style={styles.methodDescription}>
                    Chat with our support team in real-time
                  </Text>
                  <Text style={styles.methodAvailability}>Available 24/7</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              {/* Email */}
              <TouchableOpacity style={styles.contactMethod}>
                <LinearGradient
                  colors={["#6849a7", "#987dc9"]}
                  style={styles.methodIconContainer}
                >
                  <Ionicons name="mail" size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.methodContent}>
                  <Text style={styles.methodTitle}>Email Us</Text>
                  <Text style={styles.methodDescription}>
                    support@yumbites.com
                  </Text>
                  <Text style={styles.methodAvailability}>
                    Response within 24 hours
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              {/* Phone */}
              <TouchableOpacity style={styles.contactMethod}>
                <LinearGradient
                  colors={["#6849a7", "#987dc9"]}
                  style={styles.methodIconContainer}
                >
                  <Ionicons name="call" size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.methodContent}>
                  <Text style={styles.methodTitle}>Call Us</Text>
                  <Text style={styles.methodDescription}>1-800-YUM-BITE</Text>
                  <Text style={styles.methodAvailability}>
                    8 AM - 10 PM daily
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* FAQ Quick Links */}
            <View style={styles.quickLinks}>
              <Text style={styles.quickLinksTitle}>Quick Links</Text>
              <View style={styles.quickLinksGrid}>
                {[
                  "Order Issues",
                  "Payment Help",
                  "Account Problems",
                  "Delivery Questions",
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickLinkItem}
                    onPress={() => {
                      setActiveTab("faq");
                      setTimeout(() => {
                        scrollViewRef.current?.scrollTo({
                          y: 0,
                          animated: true,
                        });
                      }, 100);
                    }}
                  >
                    <Text style={styles.quickLinkText}>{item}</Text>
                    <Ionicons
                      name="arrow-forward-circle"
                      size={16}
                      color="#6849a7"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Feedback */}
            <View style={styles.feedbackSection}>
              <Text style={styles.feedbackTitle}>How can we improve?</Text>
              <Text style={styles.feedbackText}>
                Your feedback helps us make YumBites better
              </Text>
              <TouchableOpacity style={styles.feedbackButton}>
                <Text style={styles.feedbackButtonText}>Give Feedback</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ScrollView>
      )}
    </ThemedView>
  );
};

export default Faqs;
