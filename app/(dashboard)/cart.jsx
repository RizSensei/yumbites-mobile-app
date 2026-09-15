import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
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
import { Colors } from '../../constants/Colors';
import { cartStyles as styles } from '../../styles/cart';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella & basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    quantity: 1,
    restaurant: 'Pizza Palace',
    customizable: true,
  },
  {
    id: '2',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar, lettuce & tomato',
    price: 10.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    quantity: 2,
    restaurant: 'Burger Hub',
    customizable: true,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Romaine, parmesan, croutons & Caesar dressing',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    quantity: 1,
    restaurant: 'Fresh Greens',
    customizable: false,
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with frosting',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    quantity: 1,
    restaurant: 'Sweet Treats',
    customizable: false,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [applyingPromo, setApplyingPromo] = useState(false);

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
  const increaseQuantity = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
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
            setCartItems(items => items.filter(item => item.id !== id));
            Alert.alert('Success', 'Item removed from cart');
          }
        },
      ]
    );
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      Alert.alert('Error', 'Please enter a promo code');
      return;
    }

    setApplyingPromo(true);
    // Simulate API call
    setTimeout(() => {
      setApplyingPromo(false);
      if (promoCode.toUpperCase() === 'YUMMY10') {
        Alert.alert('Success', 'Promo code applied! You got 10% off');
      } else {
        Alert.alert('Error', 'Invalid promo code');
      }
      setPromoCode('');
    }, 1000);
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
            setCartItems([]);
            Alert.alert('Cart Cleared', 'All items have been removed');
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

    Alert.alert(
      'Proceed to Checkout',
      `Total: $${calculateTotal().toFixed(2)}`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { 
          text: 'Checkout', 
          onPress: () => {
            // Navigate to checkout page
            console.log('Proceed to checkout');
          }
        },
      ]
    );
  };

  // Render empty cart
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Ionicons name="cart-outline" size={100} color="#e0e0e0" />
      <ThemedText style={styles.emptyCartTitle}>Your cart is empty</ThemedText>
      <ThemedText style={styles.emptyCartText}>
        Add delicious food from our menu to get started!
      </ThemedText>
      <Button
        title="Browse Menu"
        onPress={() => console.log('Navigate to menu')}
        style={styles.browseButton}
      />
    </View>
  );

  // Render cart item
  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View style={styles.itemInfo}>
            <ThemedText style={styles.itemName}>{item.name}</ThemedText>
            <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
            <ThemedText style={styles.itemRestaurant}>{item.restaurant}</ThemedText>
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
              onPress={() => decreaseQuantity(item.id)}
              disabled={item.quantity <= 1}
            >
              <Ionicons 
                name="remove" 
                size={18} 
                color={item.quantity <= 1 ? '#ccc' : Colors.primary} 
              />
            </TouchableOpacity>
            
            <ThemedText style={styles.quantityText}>{item.quantity}</ThemedText>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item.id)}
            >
              <Ionicons name="add" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.itemPrice}>
            ${(item.price * item.quantity).toFixed(2)}
          </ThemedText>
        </View>

        {item.customizable && (
          <TouchableOpacity style={styles.customizeButton}>
            <Ionicons name="create-outline" size={16} color={Colors.primary} />
            <ThemedText style={styles.customizeText}>Customize</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // Render order summary
  const renderOrderSummary = () => (
    <View style={styles.summaryCard}>
      <ThemedText style={styles.summaryTitle}>Order Summary</ThemedText>
      
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
          <Ionicons name="information-circle" size={16} color={Colors.primary} />
          <ThemedText style={styles.freeDeliveryText}>
            Add ${(25 - calculateSubtotal()).toFixed(2)} more for free delivery
          </ThemedText>
        </View>
      )}

      <View style={styles.promoCodeContainer}>
        <View style={styles.promoInputContainer}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.primary} />
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
          disabled={applyingPromo}
        >
          <ThemedText style={styles.applyButtonText}>
            {applyingPromo ? 'Applying...' : 'Apply'}
          </ThemedText>
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
          <ThemedText style={styles.headerTitle}>Your Cart</ThemedText>
          {cartItems.length > 0 && (
            <TouchableOpacity onPress={clearCart}>
              <ThemedText style={styles.clearCartText}>Clear All</ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            <View style={styles.itemsCountContainer}>
              <ThemedText style={styles.itemsCount}>
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart
              </ThemedText>
            </View>

            <View style={styles.cartItemsContainer}>
              {cartItems.map(renderCartItem)}
            </View>

            {renderOrderSummary()}

            {/* Suggested Items */}
            <View style={styles.suggestedContainer}>
              <ThemedText style={styles.suggestedTitle}>You might also like</ThemedText>
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
    </ThemedView>
  );
};

export default Cart;