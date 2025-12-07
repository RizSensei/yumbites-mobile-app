import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { Spacer, ThemedText, ThemedView } from "../../components/theme";
import { Colors } from "../../constants/Colors";

const Settings = () => {
  const router = useRouter();

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
      case "payment":
        router.push("/settings/payment-methods");
        break;
      case "privacy":
        router.push("/settings/privacy");
        break;
      case "help":
        router.push("/settings/help");
        break;
      case "about":
        router.push("/settings/about");
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
        onPress: () => {
          // Handle logout logic here
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
                <Ionicons name={item.icon} size={22} color={Colors.primary} />
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
                  trackColor={{ false: "#e0e0e0", true: Colors.primary }}
                  thumbColor="#fff"
                />
              ) : item.type === "badge" ? (
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>
                    {item.badgeText}
                  </ThemedText>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={20} color="#999" />
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
      id: "payment",
      icon: "card-outline",
      title: "Payment Methods",
      description: "Add or remove payment cards",
      onPress: () => navigateToSection("payment"),
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
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Manage your account and preferences
          </ThemedText>
        </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 60,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 13,
    color: "#666",
  },
  itemSeparator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginLeft: 48,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 20,
  },
  appInfoText: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
});

export default Settings;
