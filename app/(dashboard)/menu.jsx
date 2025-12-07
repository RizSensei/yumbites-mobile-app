import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,

  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Spacer, ThemedView } from '../../components/theme';

// Menu data
const menuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella & basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    category: 'Pizza',
    rating: 4.8,
    prepTime: '20-25 min',
    isVegetarian: true,
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    description: 'Spicy pepperoni with mozzarella cheese',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    category: 'Pizza',
    rating: 4.7,
    prepTime: '25-30 min',
    isVegetarian: false,
  },
  {
    id: 3,
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce and red onions',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop',
    category: 'Pizza',
    rating: 4.6,
    prepTime: '30-35 min',
    isVegetarian: false,
  },
  {
    id: 4,
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar, lettuce & tomato',
    price: 10.5,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w-400&h=300&fit=crop',
    category: 'Burgers',
    rating: 4.5,
    prepTime: '15-20 min',
    isVegetarian: false,
  },
  {
    id: 5,
    name: 'Veggie Burger',
    description: 'Plant-based patty with fresh vegetables',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=300&fit=crop',
    category: 'Burgers',
    rating: 4.4,
    prepTime: '10-15 min',
    isVegetarian: true,
  },
  {
    id: 6,
    name: 'Sushi Platter',
    description: 'Assorted sushi rolls with fresh fish',
    price: 18.75,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    category: 'Sushi',
    rating: 4.9,
    prepTime: '30-40 min',
    isVegetarian: false,
  },
  {
    id: 7,
    name: 'Caesar Salad',
    description: 'Romaine, parmesan, croutons & Caesar dressing',
    price: 9.0,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    category: 'Salads',
    rating: 4.3,
    prepTime: '10-15 min',
    isVegetarian: true,
  },
  {
    id: 8,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with frosting',
    price: 6.5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    category: 'Desserts',
    rating: 4.8,
    prepTime: '5-10 min',
    isVegetarian: true,
  },
  {
    id: 9,
    name: 'Strawberry Smoothie',
    description: 'Fresh strawberries blended with yogurt',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    category: 'Drinks',
    rating: 4.6,
    prepTime: '5 min',
    isVegetarian: true,
  },
  {
    id: 10,
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with creamy sauce',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&fit=crop',
    category: 'Pasta',
    rating: 4.7,
    prepTime: '25-30 min',
    isVegetarian: false,
  },
];

const categories = [
  'All',
  'Pizza',
  'Burgers',
  'Sushi',
  'Salads',
  'Desserts',
  'Drinks',
  'Pasta',
];

const filters = [
  { id: 'vegetarian', label: 'Vegetarian', icon: 'leaf-outline' },
  { id: 'fast', label: 'Fast Prep (<15 min)', icon: 'time-outline' },
  { id: 'topRated', label: 'Top Rated', icon: 'star-outline' },
  { id: 'discount', label: 'On Discount', icon: 'pricetag-outline' },
];

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const searchRef = useRef(null);

  // Filter and search logic
  const filteredItems = menuItems.filter(item => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    // Additional filters
    const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => {
      switch (filter) {
        case 'vegetarian': return item.isVegetarian;
        case 'fast': return parseInt(item.prepTime) < 15;
        case 'topRated': return item.rating >= 4.7;
        case 'discount': return item.price < 10; // Example logic
        default: return true;
      }
    });
    
    return matchesSearch && matchesCategory && matchesFilters;
  });

  // Sort logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'prep-time': return parseInt(a.prepTime) - parseInt(b.prepTime);
      default: return b.rating - a.rating; // Default: popular (high rating)
    }
  });

  const toggleFilter = (filterId) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter(f => f !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('popular');
  };

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      activeOpacity={0.9}
      onPress={() => router.push(`/menu/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemHeader}>
          <Text style={styles.menuItemName} numberOfLines={1}>{item.name}</Text>
          {item.isVegetarian && (
            <View style={styles.vegetarianBadge}>
              <Ionicons name="leaf" size={12} color="#4CAF50" />
            </View>
          )}
        </View>
        <Text style={styles.menuItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.menuItemMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.prepTime}> • {item.prepTime}</Text>
          </View>
          <Text style={styles.categoryTag}>{item.category}</Text>
        </View>
        
        <View style={styles.menuItemFooter}>
          <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <ThemedView safeArea={true}>
      {/* Animated Header Background */}
      <Animated.View 
        style={[
          styles.animatedHeader,
          { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] }
        ]}
      >
        <LinearGradient
          colors={['#6849a7', '#533a85', '#291d42']}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6849a7" />
        </TouchableOpacity>
        
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            ref={searchRef}
            style={styles.searchInput}
            placeholder="Search dishes, restaurants..."
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
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="options-outline" size={24} color="#6849a7" />
          {activeFilters.length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilters.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Categories Scroll */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activeFilters.map(filterId => {
              const filter = filters.find(f => f.id === filterId);
              return (
                <View key={filterId} style={styles.activeFilterTag}>
                  <Ionicons name={filter.icon} size={14} color="#6849a7" />
                  <Text style={styles.activeFilterText}>{filter.label}</Text>
                  <TouchableOpacity onPress={() => toggleFilter(filterId)}>
                    <Ionicons name="close" size={14} color="#6849a7" />
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity onPress={clearAllFilters} style={styles.clearAllButton}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Results Count and Sort */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {sortedItems.length} {sortedItems.length === 1 ? 'item' : 'items'} found
        </Text>
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => {
            // Implement sort modal or dropdown
            const sorts = ['popular', 'price-low', 'price-high', 'rating', 'prep-time'];
            const currentIndex = sorts.indexOf(sortBy);
            setSortBy(sorts[(currentIndex + 1) % sorts.length]);
          }}
        >
          <Ionicons name="swap-vertical" size={16} color="#6849a7" />
          <Text style={styles.sortText}>
            {sortBy === 'popular' && 'Popular'}
            {sortBy === 'price-low' && 'Price: Low to High'}
            {sortBy === 'price-high' && 'Price: High to Low'}
            {sortBy === 'rating' && 'Rating'}
            {sortBy === 'prep-time' && 'Prep Time'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items List */}
      <Animated.FlatList
        data={sortedItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={clearAllFilters}>
              <Text style={styles.emptyButtonText}>Clear All Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['#6849a7', '#533a85']}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            
            <ScrollView style={styles.modalBody}>
              <Text style={styles.filterSectionTitle}>Dietary</Text>
              {filters.map(filter => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterOption,
                    activeFilters.includes(filter.id) && styles.filterOptionActive
                  ]}
                  onPress={() => toggleFilter(filter.id)}
                >
                  <Ionicons 
                    name={filter.icon} 
                    size={20} 
                    color={activeFilters.includes(filter.id) ? '#6849a7' : '#666'} 
                  />
                  <Text style={[
                    styles.filterOptionText,
                    activeFilters.includes(filter.id) && styles.filterOptionTextActive
                  ]}>
                    {filter.label}
                  </Text>
                  {activeFilters.includes(filter.id) && (
                    <Ionicons name="checkmark-circle" size={20} color="#6849a7" />
                  )}
                </TouchableOpacity>
              ))}
              
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              {['popular', 'price-low', 'price-high', 'rating', 'prep-time'].map(sortOption => (
                <TouchableOpacity
                  key={sortOption}
                  style={styles.sortOption}
                  onPress={() => setSortBy(sortOption)}
                >
                  <View style={styles.radioButton}>
                    {sortBy === sortOption && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.sortOptionText}>
                    {sortOption === 'popular' && 'Popular'}
                    {sortOption === 'price-low' && 'Price: Low to High'}
                    {sortOption === 'price-high' && 'Price: High to Low'}
                    {sortOption === 'rating' && 'Rating'}
                    {sortOption === 'prep-time' && 'Prep Time'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalButtonSecondary} onPress={clearAllFilters}>
                <Text style={styles.modalButtonSecondaryText}>Reset All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButtonPrimary}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.modalButtonPrimaryText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8f9fa',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    zIndex: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 2,
    // marginBottom: 100,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#6849a7',
  },
  categoryButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  activeFiltersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 100,
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0e6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterText: {
    color: '#6849a7',
    fontSize: 12,
    marginHorizontal: 6,
  },
  clearAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
  },
  clearAllText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: '500',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    marginLeft: 4,
    color: '#6849a7',
    fontSize: 14,
    fontWeight: '500',
  },
  menuList: {
    padding: 16,
    paddingBottom: 100,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemImage: {
    width: 100,
    height: 120,
  },
  menuItemContent: {
    flex: 1,
    padding: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    color: '#333',
  },
  vegetarianBadge: {
    marginLeft: 8,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    lineHeight: 16,
  },
  menuItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
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
  prepTime: {
    fontSize: 12,
    color: '#666',
  },
  categoryTag: {
    fontSize: 10,
    color: '#6849a7',
    backgroundColor: '#f0e6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6849a7',
  },
  addButton: {
    backgroundColor: '#6849a7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#6849a7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalBody: {
    padding: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterOptionActive: {
    backgroundColor: '#f0e6ff',
  },
  filterOptionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  filterOptionTextActive: {
    color: '#6849a7',
    fontWeight: '500',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6849a7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6849a7',
  },
  sortOptionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  modalButtonSecondary: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginRight: 12,
  },
  modalButtonSecondaryText: {
    color: '#666',
    fontWeight: '600',
  },
  modalButtonPrimary: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#6849a7',
    borderRadius: 12,
  },
  modalButtonPrimaryText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Menu;