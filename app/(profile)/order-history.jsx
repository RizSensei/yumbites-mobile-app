import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../components/Button';
import { Spacer, ThemedText, ThemedView } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { orderHistoryStyles as styles } from '../../styles/order-history';

// Mock order history data from a single restaurant
const orderHistoryData = [
  {
    id: 'ORD-789456',
    date: 'Today, 2:30 PM',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
      { name: 'Garlic Bread Sticks', quantity: 2, price: 4.99 },
      { name: 'Coca-Cola', quantity: 1, price: 2.50 },
    ],
    total: 25.47,
    status: 'delivered',
    statusColor: '#06D6A0',
    rating: 4,
    deliveryAddress: '123 Main Street, Apt 4B',
    deliveryTime: '30-45 min',
    paymentMethod: 'Visa ending in 4567',
    specialInstructions: 'Extra cheese on pizza',
  },
  {
    id: 'ORD-789455',
    date: 'Yesterday, 7:15 PM',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
      { name: 'Caesar Salad', quantity: 1, price: 8.99 },
      { name: 'Garlic Bread Sticks', quantity: 1, price: 4.99 },
      { name: 'Lemonade', quantity: 2, price: 3.50 },
    ],
    total: 35.97,
    status: 'delivered',
    statusColor: '#06D6A0',
    rating: 5,
    deliveryAddress: '123 Main Street, Apt 4B',
    deliveryTime: '35-50 min',
    paymentMethod: 'Apple Pay',
    specialInstructions: 'No onions in salad',
  },
  {
    id: 'ORD-789454',
    date: 'Dec 15, 12:45 PM',
    items: [
      { name: 'BBQ Chicken Pizza', quantity: 1, price: 16.99 },
      { name: 'French Fries', quantity: 1, price: 4.99 },
      { name: 'Chocolate Brownie', quantity: 2, price: 5.50 },
    ],
    total: 32.98,
    status: 'delivered',
    statusColor: '#06D6A0',
    rating: 4,
    deliveryAddress: '456 Oak Avenue, Apt 12',
    deliveryTime: '25-40 min',
    paymentMethod: 'Visa ending in 4567',
    specialInstructions: 'Extra BBQ sauce on side',
  },
  {
    id: 'ORD-789453',
    date: 'Dec 10, 6:30 PM',
    items: [
      { name: 'Vegetarian Pizza', quantity: 1, price: 13.99 },
      { name: 'Mozzarella Sticks', quantity: 1, price: 6.99 },
    ],
    total: 20.98,
    status: 'cancelled',
    statusColor: '#FF6B6B',
    rating: null,
    deliveryAddress: '123 Main Street, Apt 4B',
    deliveryTime: '40-55 min',
    paymentMethod: 'Visa ending in 4567',
    cancellationReason: 'Restaurant was closed',
  },
  {
    id: 'ORD-789452',
    date: 'Dec 5, 1:15 PM',
    items: [
      { name: 'Supreme Pizza', quantity: 1, price: 18.99 },
      { name: 'Chicken Wings', quantity: 1, price: 12.99 },
      { name: 'Garlic Bread Sticks', quantity: 1, price: 4.99 },
    ],
    total: 36.97,
    status: 'delivered',
    statusColor: '#06D6A0',
    rating: 3,
    deliveryAddress: '789 Pine Road, Apt 7C',
    deliveryTime: '45-60 min',
    paymentMethod: 'Google Pay',
    specialInstructions: 'Spicy wings, extra ranch',
  },
];

// Restaurant information
const restaurantInfo = {
  name: 'Pizza Palace',
  image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  rating: 4.5,
  deliveryTime: '30-45 min',
  cuisine: 'Italian, Pizza',
  address: '123 Food Street, City',
};

// Filter options
const filterOptions = [
  { id: 'all', label: 'All Orders' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'cancelled', label: 'Cancelled' },
];

const OrderHistory = () => {
  const [orders, setOrders] = useState(orderHistoryData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Handle filter change
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    if (filterId === 'all') {
      setOrders(orderHistoryData);
    } else {
      const filtered = orderHistoryData.filter(order => order.status === filterId);
      setOrders(filtered);
    }
  };

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // Handle reorder
  const handleReorder = (order) => {
    console.log('Reorder:', order.id);
    // Add all items from this order to cart
  };

  // Handle rate order
  const handleRateOrder = (order) => {
    console.log('Rate order:', order.id);
    // Open rating modal
  };

  // Handle help with order
  const handleHelp = (order) => {
    console.log('Help with order:', order.id);
    // Navigate to help/contact support
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return { name: 'checkmark-circle', color: '#06D6A0' };
      case 'preparing':
        return { name: 'time', color: '#FFD166' };
      case 'on-the-way':
        return { name: 'bicycle', color: '#118AB2' };
      case 'cancelled':
        return { name: 'close-circle', color: '#FF6B6B' };
      default:
        return { name: 'receipt', color: '#6849a7' };
    }
  };

  // Get order count by status
  const getOrderCount = (status) => {
    if (status === 'all') return orderHistoryData.length;
    return orderHistoryData.filter(order => order.status === status).length;
  };

  // Calculate popular items
  const getPopularItems = () => {
    const itemCount = {};
    orderHistoryData.forEach(order => {
      order.items.forEach(item => {
        if (itemCount[item.name]) {
          itemCount[item.name] += item.quantity;
        } else {
          itemCount[item.name] = item.quantity;
        }
      });
    });
    
    return Object.entries(itemCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  };

  // Render order card
  const renderOrderCard = (order) => {
    const statusIcon = getStatusIcon(order.status);
    const isExpanded = expandedOrder === order.id;
    
    return (
      <View key={order.id} style={styles.orderCard}>
        {/* Order Header */}
        <TouchableOpacity 
          style={styles.orderHeader}
          onPress={() => toggleOrderDetails(order.id)}
          activeOpacity={0.7}
        >
          <View style={styles.orderHeaderLeft}>
            <View style={styles.orderBasicInfo}>
              <View style={styles.orderIdRow}>
                <Ionicons name="receipt-outline" size={16} color={Colors.primary} />
                <ThemedText style={styles.orderId}>{order.id}</ThemedText>
              </View>
              <ThemedText style={styles.orderDate}>{order.date}</ThemedText>
              <View style={styles.deliveryInfo}>
                <Ionicons name="time-outline" size={12} color="#666" />
                <ThemedText style={styles.deliveryTimeText}>{order.deliveryTime}</ThemedText>
              </View>
            </View>
          </View>
          
          <View style={styles.orderHeaderRight}>
            <View style={[styles.statusBadge, { backgroundColor: order.statusColor + '20' }]}>
              <Ionicons name={statusIcon.name} size={14} color={order.statusColor} />
              <ThemedText style={[styles.statusText, { color: order.statusColor }]}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </ThemedText>
            </View>
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#999" 
              style={styles.expandIcon}
            />
          </View>
        </TouchableOpacity>

        {/* Quick Summary */}
        <View style={styles.orderSummary}>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Items</ThemedText>
            <ThemedText style={styles.summaryValue}>
              {order.items.reduce((total, item) => total + item.quantity, 0)}
            </ThemedText>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Total</ThemedText>
            <ThemedText style={styles.totalAmount}>${order.total.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Rating</ThemedText>
            <View style={styles.ratingContainer}>
              {order.rating ? (
                <>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <ThemedText style={styles.ratingText}>{order.rating}/5</ThemedText>
                </>
              ) : (
                <ThemedText style={styles.noRatingText}>Not rated</ThemedText>
              )}
            </View>
          </View>
        </View>

        {/* Expanded Details */}
        {isExpanded && (
          <View style={styles.orderDetails}>
            {/* Order Items */}
            <View style={styles.detailsSection}>
              <ThemedText style={styles.detailsTitle}>Order Items</ThemedText>
              {order.items.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <View style={styles.itemInfo}>
                    <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                    <ThemedText style={styles.itemQuantity}>x{item.quantity}</ThemedText>
                  </View>
                  <ThemedText style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</ThemedText>
                </View>
              ))}
            </View>

            {/* Order Info */}
            <View style={styles.detailsSection}>
              <ThemedText style={styles.detailsTitle}>Order Information</ThemedText>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <ThemedText style={styles.infoText}>{order.deliveryAddress}</ThemedText>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="card-outline" size={16} color="#666" />
                <ThemedText style={styles.infoText}>{order.paymentMethod}</ThemedText>
              </View>
              {order.specialInstructions && (
                <View style={styles.infoRow}>
                  <Ionicons name="document-text-outline" size={16} color="#666" />
                  <ThemedText style={styles.infoText}>{order.specialInstructions}</ThemedText>
                </View>
              )}
              {order.cancellationReason && (
                <View style={styles.infoRow}>
                  <Ionicons name="alert-circle-outline" size={16} color="#FF6B6B" />
                  <ThemedText style={[styles.infoText, { color: '#FF6B6B' }]}>
                    {order.cancellationReason}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {order.status === 'delivered' && !order.rating && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleRateOrder(order)}
                >
                  <Ionicons name="star-outline" size={18} color={Colors.primary} />
                  <ThemedText style={styles.actionButtonText}>Rate Order</ThemedText>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleReorder(order)}
              >
                <Ionicons name="refresh-outline" size={18} color={Colors.primary} />
                <ThemedText style={styles.actionButtonText}>Reorder</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleHelp(order)}
              >
                <Ionicons name="help-circle-outline" size={18} color={Colors.primary} />
                <ThemedText style={styles.actionButtonText}>Get Help</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const popularItems = getPopularItems();

  return (
    <ThemedView safeArea={true} style={styles.container}>

      <ThemedText style={styles.sectionTitle}>Your Orders</ThemedText>
      <ThemedText style={styles.sectionSubtitle}>Past orders from {restaurantInfo.name}</ThemedText>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.activeFilterButton,
            ]}
            onPress={() => handleFilterChange(filter.id)}
          >
            <ThemedText style={[
              styles.filterText,
              activeFilter === filter.id && styles.activeFilterText,
            ]}>
              {filter.label}
            </ThemedText>
            <View style={[
              styles.filterCount,
              activeFilter === filter.id && styles.activeFilterCount,
            ]}>
              <ThemedText style={[
                styles.filterCountText,
                activeFilter === filter.id && styles.activeFilterCountText,
              ]}>
                {getOrderCount(filter.id)}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      >
        {orders.length > 0 ? (
          <>
            {orders.map(renderOrderCard)}
            
            {/* Your Favorites */}
            {popularItems.length > 0 && (
              <View style={styles.favoritesCard}>
                <ThemedText style={styles.favoritesTitle}>Your Favorites</ThemedText>
                <ThemedText style={styles.favoritesSubtitle}>
                  Most ordered items from {restaurantInfo.name}
                </ThemedText>
                {popularItems.map((item, index) => (
                  <View key={index} style={styles.favoriteItem}>
                    <View style={styles.favoriteItemLeft}>
                      <View style={styles.favoriteRank}>
                        <ThemedText style={styles.favoriteRankText}>#{index + 1}</ThemedText>
                      </View>
                      <ThemedText style={styles.favoriteItemName}>{item.name}</ThemedText>
                    </View>
                    <ThemedText style={styles.favoriteItemCount}>
                      {item.count} time{item.count > 1 ? 's' : ''}
                    </ThemedText>
                  </View>
                ))}
              </View>
            )}

            {/* Stats Card */}
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>{orderHistoryData.length}</ThemedText>
                <ThemedText style={styles.statLabel}>Total Orders</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>
                  ${orderHistoryData.reduce((total, order) => total + order.total, 0).toFixed(2)}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Total Spent</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>
                  {orderHistoryData.filter(o => o.rating).length}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Rated Orders</ThemedText>
              </View>
            </View>

            {/* Quick Reorder Section */}
            <View style={styles.reorderSection}>
              <Ionicons name="refresh-circle-outline" size={40} color={Colors.primary} />
              <ThemedText style={styles.reorderTitle}>Quick Reorder</ThemedText>
              <ThemedText style={styles.reorderText}>
                Reorder your favorite meals with one tap
              </ThemedText>
              <Button
                title="Reorder Last Order"
                variant="secondary"
                onPress={() => orders.length > 0 && handleReorder(orders[0])}
                style={styles.reorderButton}
              />
            </View>
          </>
        ) : (
          // Empty State
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={100} color="#e0e0e0" />
            <ThemedText style={styles.emptyTitle}>No orders found</ThemedText>
            <ThemedText style={styles.emptyText}>
              {activeFilter === 'all' 
                ? `You haven't ordered from ${restaurantInfo.name} yet. Try their delicious food!`
                : `No ${activeFilter} orders found from ${restaurantInfo.name}. Try a different filter.`
              }
            </ThemedText>
            {activeFilter !== 'all' && (
              <Button
                title="Show All Orders"
                variant="secondary"
                onPress={() => handleFilterChange('all')}
                style={styles.emptyButton}
              />
            )}
          </View>
        )}

        <Spacer height={40} />
      </ScrollView>
    </ThemedView>
  );
};

export default OrderHistory;