import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ThemedView } from '../../components/theme';
import { menuStyles as styles } from '../../styles/menu';

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

export default Menu;