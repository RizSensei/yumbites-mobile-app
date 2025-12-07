import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  RefreshControl,
  SectionList,
} from 'react-native';
import { ThemedText, ThemedView } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// Mock data for notifications
const notificationsData = [
  {
    id: 'promotions',
    title: 'Promotions',
    data: [
      {
        id: '1',
        type: 'promotion',
        title: 'Weekend Special! 🎉',
        message: 'Get 20% off on all pizza orders this weekend. Limited time offer!',
        time: '2 hours ago',
        icon: 'pizza',
        color: '#FF6B6B',
        read: false,
        action: 'View Offer',
      },
      {
        id: '2',
        type: 'promotion',
        title: 'Free Delivery! 🚚',
        message: 'Enjoy free delivery on orders above $25. Use code: FREEDEL25',
        time: '1 day ago',
        icon: 'bicycle',
        color: '#4ECDC4',
        read: true,
        action: 'Use Code',
      },
      {
        id: '3',
        type: 'promotion',
        title: 'Buy 1 Get 1 Free! 🍔',
        message: 'Special offer on all burgers today only. Limited stock available.',
        time: '2 days ago',
        icon: 'fast-food',
        color: '#FFD166',
        read: true,
        action: 'Order Now',
      },
    ],
  },
  {
    id: 'orders',
    title: 'Order Updates',
    data: [
      {
        id: '4',
        type: 'order',
        title: 'Order Delivered! ✅',
        message: 'Your order #12345 has been delivered. Enjoy your meal!',
        time: 'Just now',
        icon: 'checkmark-circle',
        color: '#06D6A0',
        read: false,
        orderNumber: '#12345',
        status: 'delivered',
      },
      {
        id: '5',
        type: 'order',
        title: 'Order on the way! 🚴',
        message: 'John is delivering your order. Estimated arrival: 15 minutes',
        time: '30 minutes ago',
        icon: 'bicycle',
        color: '#FFD166',
        read: true,
        orderNumber: '#12344',
        status: 'delivering',
      },
      {
        id: '6',
        type: 'order',
        title: 'Order Confirmed! 👨‍🍳',
        message: 'Restaurant has accepted your order. Preparing your food now.',
        time: '2 days ago',
        icon: 'restaurant',
        color: '#118AB2',
        read: true,
        orderNumber: '#12343',
        status: 'preparing',
      },
      {
        id: '7',
        type: 'order',
        title: 'Order Placed! 📝',
        message: 'Your order #12342 has been successfully placed.',
        time: '3 days ago',
        icon: 'receipt',
        color: '#6849a7',
        read: true,
        orderNumber: '#12342',
        status: 'placed',
      },
    ],
  },
  {
    id: 'account',
    title: 'Account Updates',
    data: [
      {
        id: '8',
        type: 'account',
        title: 'Password Updated 🔒',
        message: 'Your password has been successfully updated.',
        time: '3 days ago',
        icon: 'lock-closed',
        color: '#6849a7',
        read: true,
        action: 'Secure Account',
      },
      {
        id: '9',
        type: 'account',
        title: 'Payment Added 💳',
        message: 'Visa ending in 4567 has been added to your account.',
        time: '1 week ago',
        icon: 'card',
        color: '#987dc9',
        read: true,
        action: 'Manage Cards',
      },
      {
        id: '10',
        type: 'account',
        title: 'Welcome to YumBites! 👋',
        message: 'Thank you for joining us. Enjoy your first order with 15% off.',
        time: '2 weeks ago',
        icon: 'gift',
        color: '#FF6B6B',
        read: true,
        action: 'Claim Offer',
      },
    ],
  },
];

const Inbox = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Handle mark as read
  const markAsRead = (id) => {
    console.log('Mark as read:', id);
  };

  // Handle mark all as read
  const markAllAsRead = () => {
    console.log('Mark all as read');
    // In a real app, update all notifications to read
  };

  // Get notification icon component
  const getNotificationIcon = (iconName, color) => {
    return (
      <View style={[styles.notificationIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={iconName} size={24} color={color} />
      </View>
    );
  };

  // Get unread count
  const getUnreadCount = () => {
    let count = 0;
    notificationsData.forEach(section => {
      section.data.forEach(item => {
        if (!item.read) count++;
      });
    });
    return count;
  };

  // Render notification item
  const renderNotificationItem = ({ item }) => (
    <View 
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
    >
      <TouchableOpacity 
        style={styles.notificationContent}
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.7}
      >
        {getNotificationIcon(item.icon, item.color)}
        <View style={styles.notificationText}>
          <View style={styles.notificationHeader}>
            <ThemedText style={styles.notificationTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.notificationTime}>{item.time}</ThemedText>
          </View>
          <ThemedText style={styles.notificationMessage}>{item.message}</ThemedText>
          {item.orderNumber && (
            <View style={styles.orderInfo}>
              <ThemedText style={styles.orderNumber}>{item.orderNumber}</ThemedText>
              <View style={[
                styles.statusBadge,
                { backgroundColor: 
                  item.status === 'delivered' ? '#06D6A020' :
                  item.status === 'delivering' ? '#FFD16620' :
                  item.status === 'preparing' ? '#118AB220' :
                  '#6849a720'
                }
              ]}>
                <ThemedText style={[
                  styles.statusText,
                  { color: 
                    item.status === 'delivered' ? '#06D6A0' :
                    item.status === 'delivering' ? '#FFD166' :
                    item.status === 'preparing' ? '#118AB2' :
                    Colors.primary
                  }
                ]}>
                  {item.status}
                </ThemedText>
              </View>
            </View>
          )}
          {item.action && (
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionText}>{item.action}</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {!item.read && <View style={styles.unreadDot} />}
    </View>
  );

  // Render section header
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
    </View>
  );

  return (
    <ThemedView safeArea={true} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Inbox</ThemedText>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={markAllAsRead}
          >
            <Ionicons name="checkmark-done-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Unread Count Badge */}
      {getUnreadCount() > 0 && (
        <View style={styles.unreadCountBadge}>
          <ThemedText style={styles.unreadCountText}>
            {getUnreadCount()} unread notification{getUnreadCount() > 1 ? 's' : ''}
          </ThemedText>
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notifications..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      <SectionList
        sections={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={80} color="#ccc" />
            <ThemedText style={styles.emptyTitle}>No Notifications</ThemedText>
            <ThemedText style={styles.emptyText}>
              You're all caught up! Check back later for updates.
            </ThemedText>
          </View>
        }
        stickySectionHeadersEnabled={false}
      />
    </ThemedView>
  );
};

// Add missing import
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCountBadge: {
    backgroundColor: Colors.primary + '15',
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  unreadCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  notificationsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    marginBottom: 12,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationText: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 13,
    color: '#666',
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary + '15',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Inbox;