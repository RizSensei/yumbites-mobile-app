import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../components/Button';
import { ThemedText, ThemedView } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { profileStyles as styles } from '../../styles/profile';

const moreItems = [
  { 
    icon: "person-outline", 
    label: "Edit Profile", 
    to: "/edit-profile",
    description: "Update your personal information"
  },
  { 
    icon: "heart-outline", 
    label: "Favourites", 
    to: "/favourites",
    description: "View your saved items",
    badge: "12"
  },
  { 
    icon: "settings-outline", 
    label: "Settings", 
    to: "/settings",
    description: "App preferences and notifications"
  },
  { 
    icon: "help-circle-outline", 
    label: "Help & FAQs", 
    to: "/faqs",
    description: "Get help and answers"
  },
  { 
    icon: "document-text-outline", 
    label: "Order History", 
    to: "/order-history",
    description: "View your past orders",
    badge: "5"
  },
  { 
    icon: "star-outline", 
    label: "Reviews", 
    to: "/reviews",
    description: "Your ratings and feedback"
  },
];

const Profile = () => {
  const router = useRouter();
  const isLoggedIn = false; // Change this based on your auth state

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout pressed');
  };

  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Gradient Background */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <ThemedText style={styles.headerTitle}>Profile</ThemedText>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              {isLoggedIn ? (
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={36} color={Colors.primary} />
                </View>
              )}
              {isLoggedIn && (
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Ionicons name="camera" size={16} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.profileInfo}>
              {isLoggedIn ? (
                <>
                  <ThemedText style={styles.userName}>John Doe</ThemedText>
                  <ThemedText style={styles.userEmail}>john.doe@example.com</ThemedText>
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>24</ThemedText>
                      <ThemedText style={styles.statLabel}>Orders</ThemedText>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>18</ThemedText>
                      <ThemedText style={styles.statLabel}>Favorites</ThemedText>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>4.8</ThemedText>
                      <ThemedText style={styles.statLabel}>Rating</ThemedText>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <ThemedText style={styles.userName}>Welcome!</ThemedText>
                  <ThemedText style={styles.userSubtext}>
                    Sign in to access your orders, favorites, and more
                  </ThemedText>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Login/Signup Card */}
          {!isLoggedIn && (
            <Pressable style={styles.loginCard} onPress={handleLogin}>
              <View style={styles.loginCardContent}>
                <Ionicons name="log-in-outline" size={32} color={Colors.primary} />
                <View style={styles.loginTextContainer}>
                  <ThemedText style={styles.loginTitle}>Join YumBites</ThemedText>
                  <ThemedText style={styles.loginSubtitle}>
                    Sign in for personalized recommendations and faster checkout
                  </ThemedText>
                </View>
              </View>
            </Pressable>
          )}

          {/* Quick Actions */}
          {isLoggedIn && (
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={styles.quickActionIcon}>
                  <Ionicons name="time-outline" size={24} color={Colors.primary} />
                </View>
                <ThemedText style={styles.quickActionText}>Recent Orders</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={styles.quickActionIcon}>
                  <Ionicons name="heart-outline" size={24} color={Colors.primary} />
                </View>
                <ThemedText style={styles.quickActionText}>Favorites</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={styles.quickActionIcon}>
                  <Ionicons name="location-outline" size={24} color={Colors.primary} />
                </View>
                <ThemedText style={styles.quickActionText}>Addresses</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={styles.quickActionIcon}>
                  <Ionicons name="card-outline" size={24} color={Colors.primary} />
                </View>
                <ThemedText style={styles.quickActionText}>Payment</ThemedText>
              </TouchableOpacity>
            </View>
          )}

          {/* Menu Items */}
          <View style={styles.menuCard}>
            {moreItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.to}
                asChild
              >
                <TouchableOpacity 
                  style={StyleSheet.flatten([
                    styles.menuItem,
                    index === moreItems.length - 1 && styles.menuItemLast
                  ])}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={[
                      styles.menuIconContainer,
                      { backgroundColor: Colors.primary + '15' }
                    ]}>
                      <Ionicons name={item.icon} size={22} color={Colors.primary} />
                    </View>
                    <View style={styles.menuTextContainer}>
                      <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
                      {item.description && (
                        <ThemedText style={styles.menuDescription}>
                          {item.description}
                        </ThemedText>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>

          {/* Support Section */}
          <View style={styles.supportCard}>
            <ThemedText style={styles.supportTitle}>Need Help?</ThemedText>
            <ThemedText style={styles.supportText}>
              Our support team is here to help you 24/7
            </ThemedText>
            <View style={styles.supportButtons}>
              <TouchableOpacity style={styles.supportButton}>
                <Ionicons name="chatbubble-outline" size={20} color={Colors.primary} />
                <ThemedText style={styles.supportButtonText}>Live Chat</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.supportButton}>
                <Ionicons name="call-outline" size={20} color={Colors.primary} />
                <ThemedText style={styles.supportButtonText}>Call Us</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.supportButton}>
                <Ionicons name="mail-outline" size={20} color={Colors.primary} />
                <ThemedText style={styles.supportButtonText}>Email</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <ThemedText style={styles.appVersion}>YumBites v1.0.0</ThemedText>
            <ThemedText style={styles.appCopyright}>© 2024 YumBites Inc.</ThemedText>
          </View>

          {/* Logout Button (only when logged in) */}
          {isLoggedIn && (
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={20} color={Colors.warning} />
              <ThemedText style={styles.logoutText}>Log Out</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default Profile;
