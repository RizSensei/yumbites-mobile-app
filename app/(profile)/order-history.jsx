import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { ThemedText, ThemedView, Spacer } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  restaurantImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  restaurantRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  restaurantRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#666',
  },
  restaurantDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantDeliveryText: {
    fontSize: 13,
    color: Colors.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  filterCount: {
    marginLeft: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  activeFilterCount: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  activeFilterCountText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderBasicInfo: {
    flex: 1,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 6,
  },
  orderDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  orderHeaderRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  expandIcon: {
    marginTop: 4,
  },
  orderSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#f0f0f0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  noRatingText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  orderDetails: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#f8f9fa',
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
    marginLeft: 6,
  },
  favoritesCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoritesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  favoritesSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  favoriteItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  favoriteRankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  favoriteItemName: {
    fontSize: 14,
    color: '#333',
  },
  favoriteItemCount: {
    fontSize: 12,
    color: '#666',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
  },
  reorderSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reorderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  reorderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  reorderButton: {
    minWidth: 200,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  emptyButton: {
    minWidth: 180,
  },
});

export default OrderHistory;