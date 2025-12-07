import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  TextInput,
} from 'react-native';
import { ThemedText, ThemedView, Spacer } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

// Mock favorites data
const initialFavorites = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella & basil',
    price: 12.99,
    originalPrice: 15.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    restaurant: 'Pizza Palace',
    rating: 4.8,
    deliveryTime: '30-45 min',
    isAvailable: true,
    category: 'Pizza',
    tags: ['Vegetarian', 'Popular'],
  },
  {
    id: '2',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar, lettuce & tomato',
    price: 10.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    restaurant: 'Burger Hub',
    rating: 4.5,
    deliveryTime: '25-40 min',
    isAvailable: true,
    category: 'Burgers',
    tags: ['Beef', 'Classic'],
  },
  {
    id: '3',
    name: 'Sushi Platter',
    description: 'Assorted sushi rolls with fresh fish',
    price: 18.75,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    restaurant: 'Sushi Master',
    rating: 4.9,
    deliveryTime: '40-55 min',
    isAvailable: true,
    category: 'Sushi',
    tags: ['Fresh', 'Japanese'],
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Romaine, parmesan, croutons & Caesar dressing',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    restaurant: 'Fresh Greens',
    rating: 4.3,
    deliveryTime: '20-35 min',
    isAvailable: false,
    unavailableReason: 'Out of stock',
    category: 'Salads',
    tags: ['Healthy', 'Vegetarian'],
  },
  {
    id: '5',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with frosting',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    restaurant: 'Sweet Treats',
    rating: 4.7,
    deliveryTime: '15-30 min',
    isAvailable: true,
    category: 'Desserts',
    tags: ['Sweet', 'Chocolate'],
  },
  {
    id: '6',
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce and red onions',
    price: 16.99,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop',
    restaurant: 'Pizza Palace',
    rating: 4.6,
    deliveryTime: '30-45 min',
    isAvailable: true,
    category: 'Pizza',
    tags: ['Chicken', 'BBQ', 'Special'],
  },
];

// Category filter options
const categoryOptions = [
  { id: 'all', label: 'All', icon: 'grid-outline' },
  { id: 'Pizza', label: 'Pizza', icon: 'pizza-outline' },
  { id: 'Burgers', label: 'Burgers', icon: 'fast-food-outline' },
  { id: 'Sushi', label: 'Sushi', icon: 'fish-outline' },
  { id: 'Salads', label: 'Salads', icon: 'leaf-outline' },
  { id: 'Desserts', label: 'Desserts', icon: 'ice-cream-outline' },
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent'); // recent, price-low, price-high, rating
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Filter favorites based on search and category
  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort favorites
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return 0; // In real app, sort by added date
    }
  });

  // Toggle favorite status
  const toggleFavorite = (id) => {
    if (isSelectionMode) {
      // Handle selection mode
      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter(itemId => itemId !== id));
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    } else {
      // Remove from favorites
      Alert.alert(
        'Remove from Favorites',
        'Are you sure you want to remove this item from favorites?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Remove', 
            style: 'destructive',
            onPress: () => {
              setFavorites(favorites.filter(item => item.id !== id));
              // Show success message
            }
          },
        ]
      );
    }
  };

  // Toggle selection mode
  const toggleSelectionMode = () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
      setSelectedItems([]);
    } else {
      setIsSelectionMode(true);
    }
  };

  // Remove selected items
  const removeSelectedItems = () => {
    if (selectedItems.length === 0) return;
    
    Alert.alert(
      'Remove Items',
      `Remove ${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setFavorites(favorites.filter(item => !selectedItems.includes(item.id)));
            setIsSelectionMode(false);
            setSelectedItems([]);
            // Show success message
          }
        },
      ]
    );
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    if (favorites.length === 0) return;
    
    Alert.alert(
      'Clear All Favorites',
      'Are you sure you want to remove all items from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            setFavorites([]);
            // Show success message
          }
        },
      ]
    );
  };

  // Handle add to cart
  const handleAddToCart = (item) => {
    console.log('Add to cart:', item.name);
    // Add item to cart logic
  };

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="heart-dislike-outline" size={100} color="#e0e0e0" />
      <ThemedText style={styles.emptyTitle}>No favorites yet</ThemedText>
      <ThemedText style={styles.emptyText}>
        Save your favorite meals by tapping the heart icon on any menu item
      </ThemedText>
      <Button
        title="Browse Menu"
        onPress={() => console.log('Navigate to menu')}
        style={styles.browseButton}
      />
    </View>
  );

  // Render favorite item
  const renderFavoriteItem = (item) => {
    const isSelected = selectedItems.includes(item.id);
    
    return (
      <View key={item.id} style={styles.favoriteItem}>
        {/* Selection checkbox (only in selection mode) */}
        {isSelectionMode && (
          <TouchableOpacity 
            style={[
              styles.selectionCheckbox,
              isSelected && styles.selectionCheckboxSelected,
            ]}
            onPress={() => toggleFavorite(item.id)}
          >
            {isSelected && <Ionicons name="checkmark" size={16} color="#fff" />}
          </TouchableOpacity>
        )}
        
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <View style={styles.itemInfo}>
              <View style={styles.itemTitleRow}>
                <ThemedText style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </ThemedText>
                {item.originalPrice && (
                  <View style={styles.discountBadge}>
                    <ThemedText style={styles.discountText}>
                      -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                    </ThemedText>
                  </View>
                )}
              </View>
              
              <View style={styles.restaurantRow}>
                <Ionicons name="restaurant-outline" size={14} color="#666" />
                <ThemedText style={styles.restaurantName}>{item.restaurant}</ThemedText>
                <View style={styles.deliveryInfo}>
                  <Ionicons name="time-outline" size={12} color="#666" />
                  <ThemedText style={styles.deliveryTime}>{item.deliveryTime}</ThemedText>
                </View>
              </View>
              
              <ThemedText style={styles.itemDescription} numberOfLines={2}>
                {item.description}
              </ThemedText>
            </View>
            
            {/* Favorite heart button */}
            <TouchableOpacity 
              style={styles.heartButton}
              onPress={() => toggleFavorite(item.id)}
            >
              <Ionicons 
                name={isSelectionMode ? (isSelected ? "checkmark-circle" : "ellipse-outline") : "heart"} 
                size={24} 
                color={isSelectionMode ? (isSelected ? Colors.primary : "#ccc") : Colors.primary} 
              />
            </TouchableOpacity>
          </View>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <ThemedText style={styles.tagText}>{tag}</ThemedText>
                </View>
              ))}
            </View>
          )}

          <View style={styles.itemFooter}>
            <View style={styles.priceRatingContainer}>
              <View style={styles.priceContainer}>
                <ThemedText style={styles.itemPrice}>${item.price.toFixed(2)}</ThemedText>
                {item.originalPrice && (
                  <ThemedText style={styles.originalPrice}>
                    ${item.originalPrice.toFixed(2)}
                  </ThemedText>
                )}
              </View>
              
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <ThemedText style={styles.ratingText}>{item.rating}</ThemedText>
              </View>
            </View>
            
            {item.isAvailable ? (
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            ) : (
              <View style={styles.unavailableBadge}>
                <Ionicons name="close-circle" size={14} color="#FF6B6B" />
                <ThemedText style={styles.unavailableText}>
                  {item.unavailableReason || 'Unavailable'}
                </ThemedText>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ThemedView safeArea={true} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <ThemedText style={styles.headerTitle}>Favorites</ThemedText>
          <View style={styles.headerActions}>
            {favorites.length > 0 && (
              <>
                <TouchableOpacity 
                  style={styles.headerButton}
                  onPress={toggleSelectionMode}
                >
                  <Ionicons 
                    name={isSelectionMode ? "close" : "checkbox-outline"} 
                    size={24} 
                    color={Colors.primary} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.headerButton}
                  onPress={clearAllFavorites}
                >
                  <Ionicons name="trash-outline" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        
        <ThemedText style={styles.headerSubtitle}>
          {favorites.length} saved item{favorites.length !== 1 ? 's' : ''}
        </ThemedText>
      </View>

      {/* Selection Mode Actions */}
      {isSelectionMode && (
        <View style={styles.selectionModeBar}>
          <ThemedText style={styles.selectionCount}>
            {selectedItems.length} selected
          </ThemedText>
          <TouchableOpacity 
            style={styles.removeSelectedButton}
            onPress={removeSelectedItems}
            disabled={selectedItems.length === 0}
          >
            <Ionicons name="trash" size={20} color="#fff" />
            <ThemedText style={styles.removeSelectedText}>Remove</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search favorites..."
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

      {/* Category Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categoryOptions.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Ionicons 
              name={category.icon} 
              size={18} 
              color={activeCategory === category.id ? '#fff' : Colors.primary} 
            />
            <ThemedText style={[
              styles.categoryText,
              activeCategory === category.id && styles.activeCategoryText,
            ]}>
              {category.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <ThemedText style={styles.sortLabel}>Sort by:</ThemedText>
        <View style={styles.sortOptions}>
          {['recent', 'price-low', 'price-high', 'rating'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortOption,
                sortBy === option && styles.activeSortOption,
              ]}
              onPress={() => setSortBy(option)}
            >
              <ThemedText style={[
                styles.sortOptionText,
                sortBy === option && styles.activeSortOptionText,
              ]}>
                {option === 'recent' && 'Recent'}
                {option === 'price-low' && 'Price: Low'}
                {option === 'price-high' && 'Price: High'}
                {option === 'rating' && 'Rating'}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Favorites List */}
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
        {sortedFavorites.length > 0 ? (
          <>
            {sortedFavorites.map(renderFavoriteItem)}
            
            {/* Quick Order Suggestions */}
            <View style={styles.suggestionsCard}>
              <ThemedText style={styles.suggestionsTitle}>Quick Order</ThemedText>
              <ThemedText style={styles.suggestionsText}>
                Add all your favorites to cart with one tap
              </ThemedText>
              <Button
                title="Add All to Cart"
                variant="secondary"
                onPress={() => console.log('Add all to cart')}
                leftIcon={<Ionicons name="cart-outline" size={20} color={Colors.primary} />}
                style={styles.suggestionsButton}
              />
            </View>

            {/* Statistics */}
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Ionicons name="pizza-outline" size={24} color={Colors.primary} />
                <ThemedText style={styles.statNumber}>
                  {favorites.filter(f => f.category === 'Pizza').length}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Pizza</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="fast-food-outline" size={24} color={Colors.primary} />
                <ThemedText style={styles.statNumber}>
                  {favorites.filter(f => f.category === 'Burgers').length}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Burgers</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="ice-cream-outline" size={24} color={Colors.primary} />
                <ThemedText style={styles.statNumber}>
                  {favorites.filter(f => f.category === 'Desserts').length}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Desserts</ThemedText>
              </View>
            </View>
          </>
        ) : (
          renderEmptyState()
        )}

        <Spacer height={40} />
      </ScrollView>
    </ThemedView>
  );
};

// Add missing import
import { Alert } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  selectionModeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '20',
  },
  selectionCount: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  removeSelectedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  removeSelectedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    marginBottom: 16,
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
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    marginLeft: 6,
  },
  activeCategoryText: {
    color: '#fff',
  },
  sortContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  activeSortOption: {
    backgroundColor: Colors.primary,
  },
  sortOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  activeSortOptionText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  favoriteItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    position: 'relative',
  },
  selectionCheckbox: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  selectionCheckboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  itemImage: {
    width: 100,
    height: 120,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  itemContent: {
    flex: 1,
    padding: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  discountBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  discountText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  restaurantName: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 12,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  heartButton: {
    padding: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
  },
  tag: {
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  priceRatingContainer: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FF6B6B' + '20',
    borderRadius: 8,
  },
  unavailableText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
    marginLeft: 4,
  },
  suggestionsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  suggestionsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  suggestionsButton: {
    minWidth: 200,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
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
  browseButton: {
    minWidth: 180,
  },
});

export default Favorites;