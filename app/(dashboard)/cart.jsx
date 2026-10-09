import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../components/Button';
import { ThemedText, ThemedView } from '../../components/theme';
import { cartStyles as styles } from '../../styles/cart';
import { useCartMutation, useCartQuery } from '../../hooks/useAccountQueries';
import { cartApi, ordersApi } from '../../services/api';

const toArray = (data) => (Array.isArray(data) ? data : data?.items ?? data?.cartItems ?? []);

const normalizeCartItem = (item) => ({
  ...item,
  name: item.dish?.name || item.name || 'Dish',
  description: item.dish?.description || item.description || '',
  image: item.dish?.image || item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  restaurant: item.dish?.restaurant?.name || item.restaurant || '',
  customizable: Boolean(item.dish?.customizable || item.customizable),
});

const Cart = () => {
  const { data: cartData } = useCartQuery();
  const updateCartMutation = useCartMutation(({ id, ...data }) => cartApi.updateItem(id, data));
  const removeCartMutation = useCartMutation(cartApi.removeItem);
  const orderMutation = useMutation({ mutationFn: ordersApi.create });
  const [promoCode, setPromoCode] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const cartItems = toArray(cartData).map(normalizeCartItem);
  const itemCount = cartItems.reduce((count, item) => count + Number(item.quantity || 1), 0);

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price || 0) * Number(item.quantity || 1),
      0,
    );
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 25 ? 0 : 2.99;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = calculateDeliveryFee();
    const tax = calculateTax();
    return subtotal + deliveryFee + tax;
  };

  // Handle quantity changes
  const updateQuantity = async (item, quantity) => {
    try {
      await updateCartMutation.mutateAsync({
        id: item.id,
        dishId: item.dishId || item.dish?.id,
        quantity,
      });
    } catch (error) {
      Alert.alert('Unable to update cart', error.response?.data?.message || 'Please try again.');
    }
  };

  const increaseQuantity = (item) => {
    updateQuantity(item, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) updateQuantity(item, item.quantity - 1);
  };

  // Remove item from cart
  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            removeCartMutation.mutate(id);
          }
        },
      ]
    );
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      Alert.alert('Error', 'Please enter a promo code');
    }
  };

  // Clear cart
  const clearCart = () => {
    if (cartItems.length === 0) return;

    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            Promise.all(cartItems.map(item => removeCartMutation.mutateAsync(item.id)))
              .then(() => Alert.alert('Cart Cleared', 'All items have been removed'))
              .catch(() => Alert.alert('Unable to clear cart', 'Please try again.'));
          }
        },
      ]
    );
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Add some items to your cart first');
      return;
    }

    if (!deliveryAddress.trim()) {
      Alert.alert('Delivery address required', 'Enter a delivery address before checking out.');
      return;
    }

    Alert.alert(
      'Proceed to Checkout',
      `Total: $${calculateTotal().toFixed(2)}`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { 
          text: 'Checkout', 
          onPress: () => {
            orderMutation.mutate({
              deliveryAddress: deliveryAddress.trim(),
              ...(promoCode.trim() ? { promoCode: promoCode.trim() } : {}),
            }, {
              onSuccess: () => {
                Alert.alert('Order placed', 'Your order has been created.');
                router.push('/(profile)/order-history');
              },
              onError: (error) => Alert.alert('Checkout failed', error.response?.data?.message || 'Please try again.'),
            });
          }
        },
      ]
    );
  };

  // Render empty cart
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <View style={styles.emptyCartArt}>
        <Ionicons name="bag-handle-outline" size={52} color="#F45B43" />
        <View style={styles.emptyCartSparkle}>
          <Ionicons name="sparkles" size={17} color="#E9A842" />
        </View>
      </View>
      <ThemedText style={styles.emptyCartTitle}>Your cart is empty</ThemedText>
      <ThemedText style={styles.emptyCartText}>
        Your next favorite meal is just a few taps away.
      </ThemedText>
      <Button
        title="Browse Menu"
        onPress={() => router.push('/menu')}
        style={styles.browseButton}
      />
    </View>
  );

  // Render cart item
  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.itemImageFrame}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <LinearGradient
          colors={['rgba(40, 24, 18, 0)', 'rgba(40, 24, 18, 0.62)']}
          style={styles.imageShade}
        />
        <View style={styles.imageTopRow}>
          <View style={styles.cartItemBadge}>
            <Ionicons name="bag-handle" size={11} color="#9B431D" />
            <ThemedText style={styles.cartItemBadgeText}>IN CART</ThemedText>
          </View>
        </View>
        <View style={styles.imageMeta}>
          {item.rating ? (
            <View style={styles.imageRating}>
              <Ionicons name="star" size={12} color="#FFD36A" />
              <ThemedText style={styles.imageRatingText}>{Number(item.rating).toFixed(1)}</ThemedText>
            </View>
          ) : (
            <View />
          )}
          {item.prepTime && (
            <ThemedText style={styles.imageTimeText}>{item.prepTime}</ThemedText>
          )}
        </View>
      </View>
      
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View style={styles.itemInfo}>
            <ThemedText style={styles.itemName}>{item.name}</ThemedText>
            <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
            <ThemedText style={styles.itemRestaurant}>{item.restaurant || 'YumBites kitchen'}</ThemedText>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
          >
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.itemFooter}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(item)}
              disabled={item.quantity <= 1}
            >
              <Ionicons 
                name="remove" 
                size={18} 
                color={item.quantity <= 1 ? '#ccc' : '#D94A34'}
              />
            </TouchableOpacity>
            
            <ThemedText style={styles.quantityText}>{item.quantity}</ThemedText>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item)}
            >
              <Ionicons name="add" size={18} color="#D94A34" />
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.itemPrice}>
            ${Number(item.price || 0).toFixed(2)}
          </ThemedText>
        </View>

        {item.customizable && (
          <TouchableOpacity style={styles.customizeButton}>
            <Ionicons name="create-outline" size={16} color="#D94A34" />
            <ThemedText style={styles.customizeText}>Customize</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // Render order summary
  const renderOrderSummary = () => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <View style={styles.summaryIcon}>
          <Ionicons name="receipt-outline" size={19} color="#D94A34" />
        </View>
        <View>
          <ThemedText style={styles.summaryEyebrow}>THE DETAILS</ThemedText>
          <ThemedText style={styles.summaryTitle}>Order summary</ThemedText>
        </View>
      </View>
      
      <View style={styles.summaryRow}>
        <ThemedText style={styles.summaryLabel}>Subtotal</ThemedText>
        <ThemedText style={styles.summaryValue}>
          ${calculateSubtotal().toFixed(2)}
        </ThemedText>
      </View>
      
      <View style={styles.summaryRow}>
        <ThemedText style={styles.summaryLabel}>Delivery Fee</ThemedText>
        <ThemedText style={styles.summaryValue}>
          {calculateDeliveryFee() === 0 ? 'FREE' : `$${calculateDeliveryFee().toFixed(2)}`}
        </ThemedText>
      </View>
      
      <View style={styles.summaryRow}>
        <ThemedText style={styles.summaryLabel}>Tax</ThemedText>
        <ThemedText style={styles.summaryValue}>
          ${calculateTax().toFixed(2)}
        </ThemedText>
      </View>

      {calculateDeliveryFee() > 0 && calculateSubtotal() < 25 && (
        <View style={styles.freeDeliveryNote}>
          <Ionicons name="information-circle" size={16} color="#D94A34" />
          <ThemedText style={styles.freeDeliveryText}>
            Add ${(25 - calculateSubtotal()).toFixed(2)} more for free delivery
          </ThemedText>
        </View>
      )}

      <View style={styles.addressField}>
        <Ionicons name="location-outline" size={20} color="#D94A34" />
        <TextInput
          style={styles.addressInput}
          placeholder="Add your delivery address"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
          placeholderTextColor="#A3978F"
        />
      </View>

      <View style={styles.promoCodeContainer}>
        <View style={styles.promoInputContainer}>
          <Ionicons name="pricetag-outline" size={20} color="#D94A34" />
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            value={promoCode}
            onChangeText={setPromoCode}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={applyPromoCode}
        >
          <ThemedText style={styles.applyButtonText}>Save</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.totalRow}>
        <ThemedText style={styles.totalLabel}>Total</ThemedText>
        <ThemedText style={styles.totalValue}>
          ${calculateTotal().toFixed(2)}
        </ThemedText>
      </View>

      <ThemedText style={styles.deliveryEstimate}>
        Estimated delivery: 30-45 minutes
      </ThemedText>
    </View>
  );

  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.headerEyebrow}>GOOD TASTE STARTS HERE</ThemedText>
            <ThemedText style={styles.headerTitle}>Your cart</ThemedText>
          </View>
          {cartItems.length > 0 && (
            <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
              <Ionicons name="trash-outline" size={15} color="#D94A34" />
              <ThemedText style={styles.clearCartText}>Clear All</ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            <LinearGradient
              colors={['#F45B43', '#E94E39', '#B83C30']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cartHero}
            >
              <View style={styles.cartHeroCopy}>
                <View style={styles.cartHeroEyebrow}>
                  <Ionicons name="sparkles" size={13} color="#FFE4A8" />
                  <ThemedText style={styles.cartHeroEyebrowText}>A LITTLE JOY IS ON ITS WAY</ThemedText>
                </View>
                <ThemedText style={styles.cartHeroTitle}>Your picks,{'\n'}made fresh.</ThemedText>
                <ThemedText style={styles.cartHeroCaption}>
                  {calculateDeliveryFee() === 0
                    ? 'You unlocked free delivery!'
                    : `Add $${Math.max(0, 25 - calculateSubtotal()).toFixed(2)} for free delivery`}
                </ThemedText>
              </View>
              <View style={styles.cartHeroArt}>
                <View style={styles.cartHeroPlate}>
                  <ThemedText style={styles.cartHeroEmoji}>🥡</ThemedText>
                </View>
                <View style={styles.cartHeroCount}>
                  <ThemedText style={styles.cartHeroCountText}>{itemCount}</ThemedText>
                </View>
              </View>
              <View style={styles.deliveryProgressTrack}>
                <View
                  style={[
                    styles.deliveryProgressFill,
                    { width: `${Math.min((calculateSubtotal() / 25) * 100, 100)}%` },
                  ]}
                />
              </View>
            </LinearGradient>
            <View style={styles.itemsCountContainer}>
              <View>
                <ThemedText style={styles.itemsCountTitle}>Your delicious picks</ThemedText>
                <ThemedText style={styles.itemsCount}>
                  {itemCount} item{itemCount === 1 ? '' : 's'} in your bag
                </ThemedText>
              </View>
              <View style={styles.itemsCountBadge}>
                <Ionicons name="restaurant-outline" size={15} color="#D94A34" />
              </View>
            </View>

            <View style={styles.cartItemsContainer}>
              {cartItems.map(renderCartItem)}
            </View>

            {renderOrderSummary()}

            {/* Suggested Items */}
            <View style={styles.suggestedContainer}>
              <ThemedText style={styles.suggestedEyebrow}>A LITTLE SOMETHING EXTRA</ThemedText>
              <ThemedText style={styles.suggestedTitle}>Perfect sidekicks</ThemedText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.suggestedItem}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=150&fit=crop' }}
                    style={styles.suggestedImage}
                  />
                  <ThemedText style={styles.suggestedName}>French Fries</ThemedText>
                  <ThemedText style={styles.suggestedPrice}>$3.99</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.suggestedItem}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' }}
                    style={styles.suggestedImage}
                  />
                  <ThemedText style={styles.suggestedName}>Smoothie</ThemedText>
                  <ThemedText style={styles.suggestedPrice}>$5.50</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.suggestedItem}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=200&h=150&fit=crop' }}
                    style={styles.suggestedImage}
                  />
                  <ThemedText style={styles.suggestedName}>Garlic Bread</ThemedText>
                  <ThemedText style={styles.suggestedPrice}>$4.99</ThemedText>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutInfo}>
            <ThemedText style={styles.checkoutTotal}>
              ${calculateTotal().toFixed(2)}
            </ThemedText>
            <ThemedText style={styles.checkoutItems}>
              {itemCount} item{itemCount === 1 ? '' : 's'} - estimated total
            </ThemedText>
          </View>
          <View style={styles.checkoutButton}>
            <Button
              title="Checkout"
              onPress={handleCheckout}
              loading={orderMutation.isPending}
            />
          </View>
        </View>
      )}
    </ThemedView>
  );
};

export default Cart;