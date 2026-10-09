import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ThemedView } from '../../components/theme';
import { menuStyles as styles } from '../../styles/menu';
import { useDishes } from '../../hooks/useDishes';
import { useFoodCategories } from '../../hooks/useCategories';
import { useCartMutation } from '../../hooks/useAccountQueries';
import { cartApi } from '../../services/api';

const toArray = (data, key) => (Array.isArray(data) ? data : data?.[key] ?? []);

const normalizeDish = (dish) => ({
  ...dish,
  description: dish.description || 'A delicious dish from our menu',
  price: Number(dish.price ?? 0),
  category: dish.category?.name || dish.categoryId?.name || dish.category?.id || dish.categoryId?.id || dish.category || dish.categoryId || 'Other',
  image: dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  rating: Number(dish.rating || 0),
  prepTime: dish.prepTime || 'Standard prep',
  isVegetarian: Boolean(dish.isVegetarian),
});

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
  const { data: dishData, isLoading: dishesLoading } = useDishes();
  const { data: categoryData } = useFoodCategories();
  const addToCartMutation = useCartMutation(cartApi.addItem);
  const menuItems = toArray(dishData, 'dishes').map(normalizeDish);
  const categories = ['All', ...toArray(categoryData, 'categories').map(category => category.name)];

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

  const addToCart = async (item) => {
    try {
      await addToCartMutation.mutateAsync({ dishId: item.id, quantity: 1 });
      Alert.alert('Added to cart', `${item.name} was added to your cart.`);
    } catch (error) {
      Alert.alert('Unable to add item', error.response?.data?.message || 'Please try again.');
    }
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      activeOpacity={0.9}
      onPress={() => router.push(`/menu/${item.id}`)}
    >
      <View style={styles.menuImageFrame}>
        <Image source={{ uri: item.image }} style={styles.menuItemImage} />
        <LinearGradient
          colors={['rgba(40, 24, 18, 0)', 'rgba(40, 24, 18, 0.58)']}
          style={styles.imageShade}
        />
        <View style={styles.imageTopRow}>
          {item.rating >= 4.8 && (
            <View style={styles.popularBadge}>
              <Ionicons name="flame" size={11} color="#9B431D" />
              <Text style={styles.popularBadgeText}>POPULAR</Text>
            </View>
          )}
          {item.isVegetarian && (
            <View style={styles.vegetarianBadge}>
              <Ionicons name="leaf" size={13} color="#397B4E" />
            </View>
          )}
        </View>
        <View style={styles.imageMeta}>
          <View style={styles.imageRating}>
            <Ionicons name="star" size={12} color="#FFD36A" />
            <Text style={styles.imageRatingText}>{item.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.imageTime}>
            <Ionicons name="time-outline" size={12} color="#FFFFFF" />
            <Text style={styles.imageTimeText}>{item.prepTime}</Text>
          </View>
        </View>
      </View>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemHeader}>
          <Text style={styles.menuItemName} numberOfLines={1}>{item.name}</Text>
        </View>
        <Text style={styles.menuItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.menuItemMeta}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>
          <Text style={styles.freshLabel}>MADE FRESH</Text>
        </View>
        
        <View style={styles.menuItemFooter}>
          <Text style={styles.menuItemPrice}>${Number(item.price || 0).toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
            disabled={!item.stockAvailable || addToCartMutation.isPending}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <ThemedView safeArea={true} style={styles.container}>
      <LinearGradient
        colors={['#F45B43', '#E94E39', '#B83C30']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.menuHero}
      >
        <View style={styles.heroCopy}>
          <View style={styles.heroEyebrow}>
            <Ionicons name="sparkles" size={13} color="#FFE4A8" />
            <Text style={styles.heroEyebrowText}>MADE FRESH, JUST FOR YOU</Text>
          </View>
          <Text style={styles.heroTitle}>Find your{'\n'}happy plate.</Text>
          <View style={styles.deliveryPill}>
            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
            <Text style={styles.deliveryPillText}>Fresh picks · 20-35 min</Text>
          </View>
        </View>
        <View style={styles.heroFoodArt}>
          <View style={styles.heroPlate}>
            <Text style={styles.heroFoodEmoji}>🍜</Text>
          </View>
          <View style={styles.heroSparkleTop}>
            <Ionicons name="sparkles" size={18} color="#FFE4A8" />
          </View>
          <View style={styles.heroSparkleBottom}>
            <Ionicons name="star" size={13} color="#FFE4A8" />
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#D94A34" />
        </TouchableOpacity>
        
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={19} color="#D94A34" style={styles.searchIcon} />
          <TextInput
            ref={searchRef}
            style={styles.searchInput}
            placeholder="Find a dish you love..."
            placeholderTextColor="#A3978F"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#A3978F" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
          accessibilityLabel="Filter menu"
        >
          <Ionicons name="options-outline" size={22} color="#D94A34" />
          {activeFilters.length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilters.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Categories Scroll */}
      <View style={styles.categoriesContainer}>
        <View style={styles.categoryHeading}>
          <Text style={styles.categoryHeadingTitle}>What are you craving?</Text>
          <Text style={styles.categoryHeadingNote}>PICK YOUR MOOD</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => {
            const categoryIcons = {
              All: '✨',
              Pizza: '🍕',
              Burgers: '🍔',
              Drinks: '🥤',
              Desserts: '🍰',
              Salads: '🥗',
              Asian: '🍜',
            };
            const selected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selected && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.categoryEmoji}>{categoryIcons[category] || '🍽️'}</Text>
                <Text style={[
                  styles.categoryButtonText,
                  selected && styles.categoryButtonTextActive,
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
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
                  <Ionicons name={filter.icon} size={14} color="#D94A34" />
                  <Text style={styles.activeFilterText}>{filter.label}</Text>
                  <TouchableOpacity onPress={() => toggleFilter(filterId)}>
                    <Ionicons name="close" size={14} color="#D94A34" />
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
        <View>
          <Text style={styles.resultsKicker}>THE GOOD STUFF</Text>
          <Text style={styles.resultsCount}>
            {sortedItems.length} {sortedItems.length === 1 ? 'dish' : 'dishes'} to love
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => {
            const sorts = ['popular', 'price-low', 'price-high', 'rating', 'prep-time'];
            const currentIndex = sorts.indexOf(sortBy);
            setSortBy(sorts[(currentIndex + 1) % sorts.length]);
          }}
        >
          <Ionicons name="swap-vertical" size={16} color="#D94A34" />
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
            <View style={styles.emptyIcon}>
              <Ionicons name="restaurant-outline" size={38} color="#D94A34" />
            </View>
            <Text style={styles.emptyText}>{dishesLoading ? 'Setting the table...' : 'No dishes found'}</Text>
            <Text style={styles.emptySubtext}>Try another craving or clear your filters</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={clearAllFilters}>
              <Text style={styles.emptyButtonText}>Show me everything</Text>
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
              colors={['#F45B43', '#E94E39']}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Make it your kind of meal</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            
            <ScrollView style={styles.modalBody}>
              <Text style={styles.filterSectionTitle}>Dietary & discovery</Text>
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
                    color={activeFilters.includes(filter.id) ? '#D94A34' : '#666'}
                  />
                  <Text style={[
                    styles.filterOptionText,
                    activeFilters.includes(filter.id) && styles.filterOptionTextActive
                  ]}>
                    {filter.label}
                  </Text>
                  {activeFilters.includes(filter.id) && (
                    <Ionicons name="checkmark-circle" size={20} color="#D94A34" />
                  )}
                </TouchableOpacity>
              ))}
              
              <Text style={styles.filterSectionTitle}>Sort your menu</Text>
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
                <Text style={styles.modalButtonSecondaryText}>Reset all</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButtonPrimary}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.modalButtonPrimaryText}>Show my dishes</Text>
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