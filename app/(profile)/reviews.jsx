import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  TextInput,
  Modal,
} from 'react-native';
import { ThemedText, ThemedView, Spacer } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

// Mock reviews data
const initialReviews = [
  {
    id: '1',
    dishId: 'dish1',
    dishName: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    rating: 4,
    comment: 'The pizza was delicious with perfect crust and fresh ingredients. Will definitely order again!',
    date: 'Today, 2:30 PM',
    images: [
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    ],
    dishImage: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    helpfulCount: 12,
    restaurantImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    orderId: 'ORD-789456',
  },
  {
    id: '2',
    dishId: 'dish2',
    dishName: 'Classic Cheeseburger',
    restaurant: 'Burger Hub',
    rating: 5,
    comment: 'Best burger I\'ve ever had! Juicy patty, fresh veggies, perfect bun. Highly recommend!',
    date: 'Yesterday, 7:15 PM',
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
    ],
    dishImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    helpfulCount: 24,
    restaurantImage: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
    orderId: 'ORD-789455',
  },
  {
    id: '3',
    dishId: 'dish3',
    dishName: 'Sushi Platter',
    restaurant: 'Sushi Master',
    rating: 4,
    comment: 'Fresh fish and perfectly rolled sushi. Good variety in the platter.',
    date: 'Dec 15, 12:45 PM',
    images: [
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    ],
    dishImage: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    helpfulCount: 8,
    restaurantImage: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=300&fit=crop',
    orderId: 'ORD-789454',
  },
  {
    id: '4',
    dishId: 'dish4',
    dishName: 'Caesar Salad',
    restaurant: 'Fresh Greens',
    rating: 3,
    comment: 'Good but could use more dressing. Croutons were a bit stale.',
    date: 'Dec 10, 6:30 PM',
    images: [],
    dishImage: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    helpfulCount: 3,
    restaurantImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    orderId: 'ORD-789453',
  },
  {
    id: '5',
    dishId: 'dish5',
    dishName: 'Chocolate Cake',
    restaurant: 'Sweet Treats',
    rating: 5,
    comment: 'Amazing! Rich chocolate flavor, moist cake, perfect frosting. My new favorite dessert!',
    date: 'Dec 5, 1:15 PM',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
    ],
    dishImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    helpfulCount: 18,
    restaurantImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop',
    orderId: 'ORD-789452',
  },
];

// Filter options
const filterOptions = [
  { id: 'all', label: 'All Reviews' },
  { id: '5', label: '5 Stars', icon: 'star' },
  { id: '4', label: '4 Stars', icon: 'star' },
  { id: '3', label: '3 Stars', icon: 'star' },
  { id: '2', label: '2 Stars', icon: 'star' },
  { id: '1', label: '1 Star', icon: 'star' },
  { id: 'with-photos', label: 'With Photos', icon: 'camera' },
];

const MyReviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent'); // recent, helpful, rating-high, rating-low
  const [editingReview, setEditingReview] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = searchQuery === '' || 
      review.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'with-photos') {
      matchesFilter = review.images.length > 0;
    } else if (activeFilter !== 'all') {
      matchesFilter = review.rating === parseInt(activeFilter);
    }
    
    return matchesSearch && matchesFilter;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpfulCount - a.helpfulCount;
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'recent':
      default:
        return 0; // In real app, sort by date
    }
  });

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Get rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  // Start editing review
  const startEditReview = (review) => {
    setEditingReview(review);
    setEditComment(review.comment);
    setEditRating(review.rating);
    setShowEditModal(true);
  };

  // Save edited review
  const saveEditReview = () => {
    if (!editingReview || !editComment.trim() || editRating === 0) return;

    setReviews(reviews.map(review => 
      review.id === editingReview.id 
        ? { ...review, comment: editComment, rating: editRating }
        : review
    ));
    
    setShowEditModal(false);
    setEditingReview(null);
    setEditComment('');
    setEditRating(0);
    // Show success message
  };

  // Delete review
  const deleteReview = (id) => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setReviews(reviews.filter(review => review.id !== id));
            // Show success message
          }
        },
      ]
    );
  };

  // Render stars
  const renderStars = (rating, size = 16) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  // Render rating distribution bar
  const renderDistributionBar = (rating, count) => {
    const totalReviews = reviews.length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    
    return (
      <View style={styles.distributionRow}>
        <View style={styles.distributionLabel}>
          {renderStars(rating, 14)}
          <ThemedText style={styles.distributionCount}>{count}</ThemedText>
        </View>
        <View style={styles.distributionBarContainer}>
          <View 
            style={[
              styles.distributionBar, 
              { width: `${percentage}%`, backgroundColor: getRatingColor(rating) }
            ]} 
          />
        </View>
      </View>
    );
  };

  // Get color for rating
  const getRatingColor = (rating) => {
    switch (rating) {
      case 5: return '#06D6A0';
      case 4: return '#4ECDC4';
      case 3: return '#FFD166';
      case 2: return '#FF9F4A';
      case 1: return '#FF6B6B';
      default: return '#999';
    }
  };

  // Render review card
  const renderReviewCard = (review) => {
    const ratingColor = getRatingColor(review.rating);
    
    return (
      <View key={review.id} style={styles.reviewCard}>
        {/* Review Header */}
        <View style={styles.reviewHeader}>
          <View style={styles.reviewHeaderLeft}>
            <Image source={{ uri: review.dishImage }} style={styles.dishImage} />
            <View style={styles.reviewBasicInfo}>
              <ThemedText style={styles.dishName} numberOfLines={1}>
                {review.dishName}
              </ThemedText>
              <View style={styles.restaurantRow}>
                <Ionicons name="restaurant-outline" size={12} color="#666" />
                <ThemedText style={styles.restaurantName}>{review.restaurant}</ThemedText>
              </View>
              <View style={styles.orderInfo}>
                <Ionicons name="receipt-outline" size={12} color="#999" />
                <ThemedText style={styles.orderId}>{review.orderId}</ThemedText>
              </View>
            </View>
          </View>
          
          <View style={styles.ratingBadge}>
            {renderStars(review.rating)}
            <ThemedText style={styles.ratingText}>{review.rating.toFixed(1)}</ThemedText>
          </View>
        </View>

        {/* Review Content */}
        <View style={styles.reviewContent}>
          <ThemedText style={styles.reviewComment}>{review.comment}</ThemedText>
          
          {/* Review Images */}
          {review.images.length > 0 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.imagesContainer}
            >
              {review.images.map((image, index) => (
                <Image 
                  key={index} 
                  source={{ uri: image }} 
                  style={styles.reviewImage} 
                />
              ))}
            </ScrollView>
          )}
          
          {/* Review Footer */}
          <View style={styles.reviewFooter}>
            <View style={styles.reviewMeta}>
              <ThemedText style={styles.reviewDate}>{review.date}</ThemedText>
              <View style={styles.helpfulContainer}>
                <Ionicons name="thumbs-up-outline" size={14} color={Colors.primary} />
                <ThemedText style={styles.helpfulCount}>{review.helpfulCount} helpful</ThemedText>
              </View>
            </View>
            
            <View style={styles.reviewActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => startEditReview(review)}
              >
                <Ionicons name="create-outline" size={16} color={Colors.primary} />
                <ThemedText style={styles.actionText}>Edit</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deleteReview(review.id)}
              >
                <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
                <ThemedText style={[styles.actionText, styles.deleteText]}>Delete</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <ThemedView safeArea={true} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>My Reviews</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          {reviews.length} review{reviews.length !== 1 ? 's' : ''} • {averageRating} avg rating
        </ThemedText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your reviews..."
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

      {/* Rating Overview */}
      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <View style={styles.averageRatingContainer}>
            <ThemedText style={styles.averageRating}>{averageRating}</ThemedText>
            {renderStars(parseFloat(averageRating), 20)}
            <ThemedText style={styles.totalReviews}>
              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </ThemedText>
          </View>
          
          <View style={styles.ratingDistribution}>
            {[5, 4, 3, 2, 1].map(rating => (
              <React.Fragment key={rating}>
                {renderDistributionBar(rating, ratingDistribution[rating])}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map((filter) => {
          const count = filter.id === 'with-photos' 
            ? reviews.filter(r => r.images.length > 0).length
            : filter.id === 'all' 
              ? reviews.length
              : reviews.filter(r => r.rating === parseInt(filter.id)).length;
          
          return (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.activeFilterButton,
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              {filter.icon && (
                <Ionicons 
                  name={filter.icon} 
                  size={16} 
                  color={activeFilter === filter.id ? '#fff' : Colors.primary} 
                />
              )}
              <ThemedText style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText,
              ]}>
                {filter.label}
              </ThemedText>
              {count > 0 && (
                <View style={[
                  styles.filterCount,
                  activeFilter === filter.id && styles.activeFilterCount,
                ]}>
                  <ThemedText style={[
                    styles.filterCountText,
                    activeFilter === filter.id && styles.activeFilterCountText,
                  ]}>
                    {count}
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <ThemedText style={styles.sortLabel}>Sort by:</ThemedText>
        <View style={styles.sortOptions}>
          {['recent', 'helpful', 'rating-high', 'rating-low'].map((option) => (
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
                {option === 'recent' && 'Most Recent'}
                {option === 'helpful' && 'Most Helpful'}
                {option === 'rating-high' && 'Highest Rated'}
                {option === 'rating-low' && 'Lowest Rated'}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reviews List */}
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
        {sortedReviews.length > 0 ? (
          <>
            {sortedReviews.map(renderReviewCard)}
            
            {/* Stats Card */}
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Ionicons name="camera-outline" size={24} color={Colors.primary} />
                <ThemedText style={styles.statNumber}>
                  {reviews.filter(r => r.images.length > 0).length}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Photos Shared</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="thumbs-up-outline" size={24} color={Colors.primary} />
                <ThemedText style={styles.statNumber}>
                  {reviews.reduce((sum, review) => sum + review.helpfulCount, 0)}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Helpful Votes</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="chatbubble-outline" size={24} color={Colors.primary} />
                <ThemedText style={styles.statNumber}>
                  {reviews.reduce((sum, review) => sum + review.comment.split(' ').length, 0)}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Words Written</ThemedText>
              </View>
            </View>

            {/* Tips Card */}
            <View style={styles.tipsCard}>
              <Ionicons name="bulb-outline" size={32} color={Colors.primary} />
              <ThemedText style={styles.tipsTitle}>Review Tips</ThemedText>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color="#06D6A0" />
                <ThemedText style={styles.tipText}>
                  Add photos to make your reviews more helpful
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color="#06D6A0" />
                <ThemedText style={styles.tipText}>
                  Mention specific details about taste and presentation
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color="#06D6A0" />
                <ThemedText style={styles.tipText}>
                  Update reviews if you order the same dish again
                </ThemedText>
              </View>
            </View>
          </>
        ) : (
          // Empty State
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-ellipses-outline" size={100} color="#e0e0e0" />
            <ThemedText style={styles.emptyTitle}>No reviews yet</ThemedText>
            <ThemedText style={styles.emptyText}>
              {activeFilter === 'all' 
                ? "You haven't reviewed any dishes yet. Share your experience to help others!"
                : `No ${activeFilter.includes('star') ? activeFilter : activeFilter} reviews found.`
              }
            </ThemedText>
            {activeFilter !== 'all' && (
              <Button
                title="Show All Reviews"
                variant="secondary"
                onPress={() => setActiveFilter('all')}
                style={styles.emptyButton}
              />
            )}
          </View>
        )}

        <Spacer height={40} />
      </ScrollView>

      {/* Edit Review Modal */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Edit Review</ThemedText>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Ionicons name="close" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            
            {editingReview && (
              <>
                <View style={styles.modalDishInfo}>
                  <Image source={{ uri: editingReview.dishImage }} style={styles.modalDishImage} />
                  <View style={styles.modalDishDetails}>
                    <ThemedText style={styles.modalDishName}>{editingReview.dishName}</ThemedText>
                    <ThemedText style={styles.modalRestaurant}>{editingReview.restaurant}</ThemedText>
                  </View>
                </View>
                
                <Spacer height={20} />
                
                {/* Rating Stars */}
                <View style={styles.editRatingContainer}>
                  <ThemedText style={styles.editRatingLabel}>Your Rating:</ThemedText>
                  <View style={styles.editStarsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => setEditRating(star)}
                      >
                        <Ionicons
                          name={star <= editRating ? 'star' : 'star-outline'}
                          size={32}
                          color="#FFD700"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <ThemedText style={styles.editRatingText}>{editRating}.0</ThemedText>
                </View>
                
                <Spacer height={20} />
                
                {/* Comment Input */}
                <TextInput
                  style={styles.editCommentInput}
                  value={editComment}
                  onChangeText={setEditComment}
                  placeholder="Share your experience..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
                
                <Spacer height={30} />
                
                {/* Action Buttons */}
                <View style={styles.modalButtons}>
                  <Button
                    title="Cancel"
                    variant="secondary"
                    onPress={() => setShowEditModal(false)}
                    style={styles.modalButton}
                  />
                  <Button
                    title="Save Changes"
                    onPress={saveEditReview}
                    disabled={!editComment.trim() || editRating === 0}
                    style={styles.modalButton}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
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
  overviewCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewHeader: {
    flexDirection: 'row',
  },
  averageRatingContainer: {
    alignItems: 'center',
    marginRight: 30,
    minWidth: 100,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  ratingDistribution: {
    flex: 1,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  distributionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  distributionCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    minWidth: 20,
  },
  distributionBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 8,
  },
  distributionBar: {
    height: '100%',
    borderRadius: 4,
  },
  filterContainer: {
    marginBottom: 16,
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
    color: Colors.primary,
    marginHorizontal: 4,
  },
  activeFilterText: {
    color: '#fff',
  },
  filterCount: {
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
  reviewCard: {
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
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dishImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  reviewBasicInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  restaurantName: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  ratingBadge: {
    alignItems: 'center',
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewContent: {
    padding: 16,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 16,
  },
  imagesContainer: {
    marginBottom: 16,
  },
  reviewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewMeta: {
    flex: 1,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  helpfulContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulCount: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 4,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B' + '10',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
    marginLeft: 4,
  },
  deleteText: {
    color: '#FF6B6B',
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
  tipsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  modalDishInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalDishImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  modalDishDetails: {
    flex: 1,
  },
  modalDishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalRestaurant: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  editRatingContainer: {
    alignItems: 'center',
  },
  editRatingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  editStarsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  editRatingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 8,
  },
  editCommentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});

export default MyReviews;