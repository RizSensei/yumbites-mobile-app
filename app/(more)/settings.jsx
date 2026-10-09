import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { Spacer, ThemedText, ThemedView } from "../../components/theme";
import { settingsStyles as styles } from "../../styles/settings";
import { useAuth } from '../../contexts/auth-context';

const Settings = () => {
  const router = useRouter();
  const { logout } = useAuth();

  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Handle navigation to different sections
  const navigateToSection = (section) => {
    switch (section) {
      case "notifications":
        router.push("/settings/notifications");
        break;
      case "password":
        router.push("/settings/change-password");
        break;
      case "addresses":
        router.push("/settings/addresses");
        break;
      case "privacy":
        router.push("/privacy-policy");
        break;
      case "terms":
        router.push("/terms-and-conditions");
        break;
      case "help":
        router.push("/faqs");
        break;
      case "about":
        router.push("/about");
        break;
      default:
        Alert.alert("Coming Soon", "This section will be available soon.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: () => {
            Alert.alert("Account Deleted", "Your account has been deleted.");
          },
        },
      ]
    );
  };

  // Render settings section
  const renderSection = (title, items) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.sectionContent}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={item.onPress}
              disabled={item.disabled}
            >
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.itemIcon,
                    item.id === "delete" && styles.itemIconDanger,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={19}
                    color={item.id === "delete" ? "#C94236" : "#D94A34"}
                  />
                </View>
                <View style={styles.itemTextContainer}>
                  <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
                  {item.description && (
                    <ThemedText style={styles.itemDescription}>
                      {item.description}
                    </ThemedText>
                  )}
                </View>
              </View>

              {item.type === "switch" ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onValueChange}
                  trackColor={{ false: "#E8DED5", true: "#F45B43" }}
                  thumbColor="#fff"
                />
              ) : item.type === "badge" ? (
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>
                    {item.badgeText}
                  </ThemedText>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#C5B5AA" />
              )}
            </TouchableOpacity>

            {index < items.length - 1 && <View style={styles.itemSeparator} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );

  // Settings data
  const notificationItems = [
    {
      id: "push",
      icon: "notifications-outline",
      title: "Push Notifications",
      description: "Order updates, promotions, etc.",
      type: "switch",
      value: notificationsEnabled,
      onValueChange: setNotificationsEnabled,
    },
    {
      id: "email",
      icon: "mail-outline",
      title: "Email Notifications",
      description: "Receipts, order confirmations",
      type: "switch",
      value: marketingEmails,
      onValueChange: setMarketingEmails,
    },
  ];

  const accountItems = [
    {
      id: "password",
      icon: "lock-closed-outline",
      title: "Change Password",
      onPress: () => navigateToSection("password"),
    },
    {
      id: "addresses",
      icon: "location-outline",
      title: "Saved Addresses",
      description: "Manage your delivery addresses",
      onPress: () => navigateToSection("addresses"),
    },
  ];

  const appPreferencesItems = [
    {
      id: "dark-mode",
      icon: "moon-outline",
      title: "Dark Mode",
      type: "switch",
      value: darkModeEnabled,
      onValueChange: setDarkModeEnabled,
    },
    {
      id: "location",
      icon: "navigate-outline",
      title: "Location Services",
      description: "For nearby restaurant recommendations",
      type: "switch",
      value: locationEnabled,
      onValueChange: setLocationEnabled,
    },
    {
      id: "language",
      icon: "language-outline",
      title: "Language",
      description: "English",
      type: "badge",
      badgeText: "EN",
      onPress: () => navigateToSection("language"),
    },
  ];

  const supportItems = [
    {
      id: "help",
      icon: "help-circle-outline",
      title: "Help & Support",
      onPress: () => navigateToSection("help"),
    },
    {
      id: "privacy",
      icon: "shield-checkmark-outline",
      title: "Privacy Policy",
      onPress: () => navigateToSection("privacy"),
    },
    {
      id: "terms",
      icon: "document-text-outline",
      title: "Terms of Service",
      onPress: () => navigateToSection("terms"),
    },
    {
      id: "about",
      icon: "information-circle-outline",
      title: "About YumBites",
      onPress: () => navigateToSection("about"),
    },
  ];

  const accountActionsItems = [
    {
      id: "logout",
      icon: "log-out-outline",
      title: "Logout",
      onPress: handleLogout,
    },
    {
      id: "delete",
      icon: "trash-outline",
      title: "Delete Account",
      onPress: handleDeleteAccount,
    },
  ];

  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={["#F45B43", "#E94E39", "#B83C30"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTopline}>
            <View style={styles.headerEyebrow}>
              <Ionicons name="sparkles" size={13} color="#FFE4A8" />
              <ThemedText style={styles.headerEyebrowText}>YOUR APP, YOUR WAY</ThemedText>
            </View>
            <View style={styles.headerArt}>
              <Ionicons name="options" size={24} color="#D94A34" />
            </View>
          </View>
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Little details that make YumBites feel like yours.
          </ThemedText>
          <View style={styles.headerChips}>
            <View style={styles.headerChip}>
              <Ionicons name="notifications-outline" size={12} color="#FFFFFF" />
              <ThemedText style={styles.headerChipText}>Notifications</ThemedText>
            </View>
            <View style={styles.headerChip}>
              <Ionicons name="person-outline" size={12} color="#FFFFFF" />
              <ThemedText style={styles.headerChipText}>Account</ThemedText>
            </View>
          </View>
        </LinearGradient>

        <Spacer height={20} />

        {/* Notifications Section */}
        {renderSection("Notifications", notificationItems)}

        <Spacer height={24} />

        {/* Account Section */}
        {renderSection("Account", accountItems)}

        <Spacer height={24} />

        {/* App Preferences */}
        {renderSection("App Preferences", appPreferencesItems)}

        <Spacer height={24} />

        {/* Support */}
        {renderSection("Support", supportItems)}

        <Spacer height={24} />

        {/* Account Actions */}
        {renderSection("Account Actions", accountActionsItems)}

        <Spacer height={30} />

        {/* App Info */}
        <View style={styles.appInfo}>
          <ThemedText style={styles.appInfoText}>YumBites v1.0.0</ThemedText>
          <ThemedText style={styles.appInfoText}>
            © 2024 YumBites Inc.
          </ThemedText>
        </View>

        <Spacer height={40} />
      </ScrollView>
    </ThemedView>
  );
};

export default Settings;
