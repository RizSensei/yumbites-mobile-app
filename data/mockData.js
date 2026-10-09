export const mockCategories = [
  { id: 'cat-pizza', name: 'Pizza', icon: '🍕' },
  { id: 'cat-burgers', name: 'Burgers', icon: '🍔' },
  { id: 'cat-drinks', name: 'Drinks', icon: '🥤' },
  { id: 'cat-desserts', name: 'Desserts', icon: '🍰' },
  { id: 'cat-salads', name: 'Salads', icon: '🥗' },
  { id: 'cat-asian', name: 'Asian', icon: '🍜' },
]

export const mockDishes = [
  {
    id: 'dish-margherita',
    name: 'Garden Margherita',
    description: 'Stone-baked crust, ripe tomato, creamy mozzarella and fresh basil.',
    price: 12.5,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=450&fit=crop',
    category: { id: 'cat-pizza', name: 'Pizza' },
    rating: 4.9,
    prepTime: '20 min',
    isVegetarian: true,
    stockAvailable: true,
  },
  {
    id: 'dish-crispy-burger',
    name: 'The Crispy Classic',
    description: 'Juicy grilled patty, cheddar, crisp lettuce and house sauce.',
    price: 10.75,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop',
    category: { id: 'cat-burgers', name: 'Burgers' },
    rating: 4.8,
    prepTime: '15 min',
    isVegetarian: false,
    stockAvailable: true,
  },
  {
    id: 'dish-salmon-bowl',
    name: 'Sunshine Salmon Bowl',
    description: 'Glazed salmon, fluffy rice, avocado and crunchy greens.',
    price: 14.25,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop',
    category: { id: 'cat-asian', name: 'Asian' },
    rating: 4.8,
    prepTime: '18 min',
    isVegetarian: false,
    stockAvailable: true,
  },
  {
    id: 'dish-avocado-salad',
    name: 'Green Goddess Salad',
    description: 'Avocado, cucumber, greens, seeds and a bright lemon dressing.',
    price: 9.5,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=450&fit=crop',
    category: { id: 'cat-salads', name: 'Salads' },
    rating: 4.7,
    prepTime: '12 min',
    isVegetarian: true,
    stockAvailable: true,
  },
  {
    id: 'dish-chocolate-cake',
    name: 'Midnight Chocolate Cake',
    description: 'Rich chocolate layers with silky frosting and a brownie crumb.',
    price: 6.5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=450&fit=crop',
    category: { id: 'cat-desserts', name: 'Desserts' },
    rating: 4.9,
    prepTime: '5 min',
    isVegetarian: true,
    stockAvailable: true,
  },
  {
    id: 'dish-berry-smoothie',
    name: 'Berry Blush Smoothie',
    description: 'Strawberry, blueberry and banana blended until creamy.',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=450&fit=crop',
    category: { id: 'cat-drinks', name: 'Drinks' },
    rating: 4.6,
    prepTime: '5 min',
    isVegetarian: true,
    stockAvailable: true,
  },
  {
    id: 'dish-noodles',
    name: 'Sesame Street Noodles',
    description: 'Wok-tossed noodles with sesame, scallion and seasonal vegetables.',
    price: 11.25,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=450&fit=crop',
    category: { id: 'cat-asian', name: 'Asian' },
    rating: 4.6,
    prepTime: '14 min',
    isVegetarian: true,
    stockAvailable: true,
  },
  {
    id: 'dish-bbq-pizza',
    name: 'Smoky BBQ Pizza',
    description: 'Smoky barbecue chicken, red onion and a golden cheese finish.',
    price: 15.5,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&h=450&fit=crop',
    category: { id: 'cat-pizza', name: 'Pizza' },
    rating: 4.5,
    prepTime: '22 min',
    isVegetarian: false,
    stockAvailable: true,
  },
]

export const mockOffers = [
  {
    id: 'offer-welcome',
    title: 'A little treat for you',
    description: 'Take 20% off something delicious.',
    code: 'YUM20',
    discount: 20,
    isActive: true,
  },
  {
    id: 'offer-delivery',
    title: 'Free delivery, on us',
    description: 'Enjoy free delivery on orders over $25.',
    code: 'FREESHIP',
    discount: 0,
    isActive: true,
  },
]

const cartItem = (dishId, quantity) => {
  const dish = mockDishes.find((item) => item.id === dishId)
  return {
    id: `cart-${dishId}`,
    dishId,
    dish,
    name: dish.name,
    description: dish.description,
    image: dish.image,
    price: dish.price,
    quantity,
    restaurant: 'YumBites Kitchen',
    customizable: true,
  }
}

export const createMockCart = () => [
  cartItem('dish-margherita', 1),
  cartItem('dish-crispy-burger', 1),
  cartItem('dish-berry-smoothie', 2),
]

export const createMockFavourites = () => [
  {
    ...mockDishes[0],
    restaurant: 'YumBites Kitchen',
    deliveryTime: '20-35 min',
    isAvailable: true,
    category: 'Pizza',
    tags: ['Vegetarian', 'Popular'],
    originalPrice: 15,
  },
  {
    ...mockDishes[1],
    restaurant: 'YumBites Kitchen',
    deliveryTime: '20-35 min',
    isAvailable: true,
    category: 'Burgers',
    tags: ['Classic', 'Popular'],
  },
  {
    ...mockDishes[4],
    restaurant: 'YumBites Bakery',
    deliveryTime: '15-25 min',
    isAvailable: true,
    category: 'Desserts',
    tags: ['Sweet', 'Vegetarian'],
  },
]

export const createMockOrders = () => [
  {
    id: 'DEMO-1042',
    createdAt: '2026-09-28T11:30:00.000Z',
    status: 'delivered',
    total: 28.5,
    deliveryAddress: '123 Main Street, Apt 4B',
    deliveryTime: '30-45 min',
    paymentMethod: 'Card',
    items: [
      { name: 'Garden Margherita', quantity: 1, price: 12.5 },
      { name: 'Midnight Chocolate Cake', quantity: 1, price: 6.5 },
    ],
  },
  {
    id: 'DEMO-1038',
    createdAt: '2026-09-26T17:15:00.000Z',
    status: 'confirmed',
    total: 25.25,
    deliveryAddress: '45 Market Avenue, Floor 2',
    deliveryTime: '25-40 min',
    paymentMethod: 'Card',
    items: [
      { name: 'The Crispy Classic', quantity: 1, price: 10.75 },
      { name: 'Sunshine Salmon Bowl', quantity: 1, price: 14.25 },
    ],
  },
  {
    id: 'DEMO-1029',
    createdAt: '2026-09-22T13:45:00.000Z',
    status: 'cancelled',
    total: 11.25,
    deliveryAddress: '123 Main Street, Apt 4B',
    deliveryTime: 'Not available',
    paymentMethod: 'Card',
    cancellationReason: 'Cancelled in demo order history.',
    items: [
      { name: 'Sesame Street Noodles', quantity: 1, price: 11.25 },
    ],
  },
]

export const mockUser = {
  id: 'demo-user',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 010-2048',
}
