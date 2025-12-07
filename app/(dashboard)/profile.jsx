import React from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Image 
} from 'react-native';
import { ThemedView, ThemedText } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from 'expo-router';
import Button from '../../components/Button';

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
            <View style={styles.loginCard}>
              <View style={styles.loginCardContent}>
                <Ionicons name="log-in-outline" size={32} color={Colors.primary} />
                <View style={styles.loginTextContainer}>
                  <ThemedText style={styles.loginTitle}>Join YumBites</ThemedText>
                  <ThemedText style={styles.loginSubtitle}>
                    Sign in for personalized recommendations and faster checkout
                  </ThemedText>
                </View>
              </View>
              <Button
                title="Sign In / Sign Up"
                onPress={handleLogin}
                style={styles.loginButton}
              />
            </View>
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
                  style={[
                    styles.menuItem,
                    index === moreItems.length - 1 && styles.menuItemLast
                  ]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  userSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -24,
  },
  loginCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  loginCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  loginButton: {
    borderRadius: 12,
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  menuItem: {
    width: "100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    paddingHorizontal: 10,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: '#999',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  supportCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  supportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  supportButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 13,
    color: '#999',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.warning,
    fontWeight: '500',
    marginLeft: 8,
  },
});