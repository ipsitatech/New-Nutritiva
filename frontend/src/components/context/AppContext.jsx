import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Initial product catalog
export const initialProducts = [
  // Nuts & Dry Fruits
  { id: 'almonds', name: 'California Almonds', weight: '500g', price: 599, originalPrice: 849, discount: '20% OFF', rating: 4.5, reviews: '2.1k', category: 'Nuts & Dry Fruits', image: 'almonds' },
  { id: 'cashews', name: 'Roasted Cashews', weight: '500g', price: 639, originalPrice: 749, discount: '15% OFF', rating: 4.7, reviews: '1.8k', category: 'Nuts & Dry Fruits', image: 'cashews' },
  { id: 'walnuts', name: 'Premium Walnuts', weight: '500g', price: 679, originalPrice: 899, discount: '25% OFF', rating: 4.6, reviews: '1.2k', category: 'Nuts & Dry Fruits', image: 'walnuts' },
  { id: 'raisins', name: 'Afghani Raisins', weight: '500g', price: 279, originalPrice: 349, discount: '20% OFF', rating: 4.5, reviews: '980', category: 'Nuts & Dry Fruits', image: 'raisins' },
  { id: 'pistachios', name: 'Roasted Pistachios', weight: '500g', price: 899, originalPrice: 1099, discount: '20% OFF', rating: 4.6, reviews: '760', category: 'Nuts & Dry Fruits', image: 'pistachios' },

  // Seeds & Superfoods
  { id: 'seeds', name: 'Chia Seeds', weight: '250g', price: 199, originalPrice: 249, discount: '20% OFF', rating: 4.7, reviews: '890', category: 'Seeds & Superfoods', image: 'seeds' },
  { id: 'pumpkin', name: 'Pumpkin Seeds', weight: '250g', price: 249, originalPrice: 299, discount: '16% OFF', rating: 4.6, reviews: '340', category: 'Seeds & Superfoods', image: 'seeds' },
  { id: 'flax', name: 'Flax Seeds', weight: '250g', price: 129, originalPrice: 169, discount: '23% OFF', rating: 4.5, reviews: '280', category: 'Seeds & Superfoods', image: 'seeds' },

  // Healthy Snacks
  { id: 'makhana', name: 'Roasted Makhana', weight: '150g', price: 180, originalPrice: 240, discount: '25% OFF', rating: 4.6, reviews: '640', category: 'Healthy Snacks', image: 'cashews' },
  { id: 'chips', name: 'Baked Beetroot Chips', weight: '100g', price: 120, originalPrice: 150, discount: '20% OFF', rating: 4.4, reviews: '410', category: 'Healthy Snacks', image: 'seeds' },

  // Organic Food
  { id: 'salt', name: 'Pink Himalayan Salt', weight: '1kg', price: 139, originalPrice: 199, discount: '30% OFF', rating: 4.7, reviews: '920', category: 'Organic Food', image: 'spices' },
  { id: 'quinoa', name: 'Organic Quinoa', weight: '500g', price: 299, originalPrice: 399, discount: '25% OFF', rating: 4.5, reviews: '530', category: 'Organic Food', image: 'seeds' },

  // Spices & Herbs
  { id: 'turmeric', name: 'Organic Turmeric Powder', weight: '250g', price: 99, originalPrice: 149, discount: '33% OFF', rating: 4.8, reviews: '1.1k', category: 'Spices & Herbs', image: 'spices' },
  { id: 'pepper', name: 'Whole Black Pepper', weight: '200g', price: 189, originalPrice: 249, discount: '24% OFF', rating: 4.6, reviews: '720', category: 'Spices & Herbs', image: 'seeds' },

  // Honey & Sweeteners
  { id: 'honey', name: 'Wild Forest Honey', weight: '500g', price: 349, originalPrice: 449, discount: '22% OFF', rating: 4.7, reviews: '1.5k', category: 'Honey & Sweeteners', image: 'raisins' },
  { id: 'jaggery', name: 'Organic Jaggery Powder', weight: '1kg', price: 129, originalPrice: 179, discount: '28% OFF', rating: 4.5, reviews: '840', category: 'Honey & Sweeteners', image: 'walnuts' },

  // Wellness & Immunity
  { id: 'juice', name: 'Giloy Amla Juice', weight: '1L', price: 289, originalPrice: 399, discount: '27% OFF', rating: 4.6, reviews: '310', category: 'Wellness & Immunity', image: 'raisins' },
  { id: 'ashwagandha', name: 'Ashwagandha Capsules', weight: '60 caps', price: 449, originalPrice: 599, discount: '25% OFF', rating: 4.8, reviews: '580', category: 'Wellness & Immunity', image: 'almonds' },

  // Gift Packs
  { id: 'giftbox', name: 'Royal Dry Fruit Gift Box', weight: '800g', price: 1299, originalPrice: 1799, discount: '27% OFF', rating: 4.9, reviews: '1.2k', category: 'Gift Packs', image: 'hero_nuts_bowl' },
  { id: 'seedsbox', name: 'Healthy Seeds Assortment Box', weight: '600g', price: 799, originalPrice: 999, discount: '20% OFF', rating: 4.7, reviews: '420', category: 'Gift Packs', image: 'hero_nuts_bowl' }
];

export const aiRecommendedProducts = [
  { id: 'rec-pumpkin', name: 'Pumpkin Seeds', price: 249, category: 'Seeds & Superfoods', image: 'pumpkin_seeds' },
  { id: 'rec-salt', name: 'Himalayan Salt', price: 139, category: 'Organic Food', image: 'himalayan_salt' },
  { id: 'rec-flax', name: 'Flax Seeds', price: 129, category: 'Seeds & Superfoods', image: 'flax_seeds' },
  { id: 'rec-sunflower', name: 'Sunflower Seeds', price: 199, category: 'Seeds & Superfoods', image: 'sunflower_seeds' },
  { id: 'rec-mixnuts', name: 'Mix Nuts', price: 549, category: 'Nuts & Dry Fruits', image: 'mix_nuts' },
  { id: 'rec-pistachio', name: 'Pistachios', price: 899, category: 'Nuts & Dry Fruits', image: 'pistachios_small' },
  { id: 'rec-cashew', name: 'Cashews', price: 639, category: 'Nuts & Dry Fruits', image: 'cashews_small' },
  { id: 'rec-almond', name: 'Almonds', price: 599, category: 'Nuts & Dry Fruits', image: 'almonds_small' },
  { id: 'rec-walnut', name: 'Walnuts', price: 679, category: 'Nuts & Dry Fruits', image: 'walnuts_small' }
];
export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('store'); // 'store' | 'dashboard' | 'promo' | 'category'
  const [promoType, setPromoType] = useState('40off'); // '40off' | 'new_arrivals' | 'combos'
  const [categoryPageKey, setCategoryPageKey] = useState('Premium Dry Fruits Mix');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Always logged in by default
  const [activeOrder, setActiveOrder] = useState(null); // Active order tracking
  const [activeDashboardTab, setActiveDashboardTab] = useState('orders'); // Dashboard tab selection

  // --- MOCK DATABASE SCHEMAS --- //
  
  // Base user for UI auth mapping, combining some profile info
  const [user, setUser] = useState({
    id: 'b_123',
    name: 'Ipsita Panda',
    status: 'Premium Member',
    email: 'ipsita@nutritiva.in',
    phone: '+91 99887 76655',
    dob: '1995-03-15',
    gender: 'Female',
    city: 'Noida, Uttar Pradesh',
    avatar: ''
  });

  // Buyer Profiles Table (Table 4)
  const [buyerProfile, setBuyerProfile] = useState({
    buyer_id: 'b_123',
    bio: 'Premium Member | Loves healthy snacking',
    preferred_language: 'en',
    newsletter_subscribed: true,
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2025-03-01T12:00:00Z'
  });

  // Buyer Devices Table (Table 5)
  const [buyerDevices, setBuyerDevices] = useState([
    { id: 'dev_1', buyer_id: 'b_123', device_type: 'iOS', device_token: 'ios_tok_123', created_at: '2024-05-12T10:00:00Z', updated_at: '2025-02-15T08:30:00Z' },
    { id: 'dev_2', buyer_id: 'b_123', device_type: 'Web', device_token: 'web_tok_456', created_at: '2025-01-20T14:20:00Z', updated_at: '2025-03-02T09:15:00Z' }
  ]);

  // Cart Table (Table 6)
  const [cart, setCart] = useState([]); // Array of { id, buyer_id, product_id, quantity, created_at, updated_at }
  
  // Wishlist Table (Table 7)
  const [wishlist, setWishlist] = useState([]); // Array of { id, buyer_id, product_id, created_at }

  // Orders Table (Table 8)
  const [orders, setOrders] = useState([
    { id: 'ord_1', buyer_id: 'b_123', order_number: 'NT12458', total_amount: 899, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-03-01', created_at: '2025-02-28T14:30:00Z', updated_at: '2025-03-01T16:00:00Z' },
    { id: 'ord_2', buyer_id: 'b_123', order_number: 'NT12457', total_amount: 639, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-02-25', created_at: '2025-02-24T09:15:00Z', updated_at: '2025-02-25T11:45:00Z' },
    { id: 'ord_3', buyer_id: 'b_123', order_number: 'NT12456', total_amount: 499, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-02-15', created_at: '2025-02-14T18:20:00Z', updated_at: '2025-02-15T14:10:00Z' },
    { id: 'ord_4', buyer_id: 'b_123', order_number: 'NT12455', total_amount: 1299, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-02-01', created_at: '2025-01-31T10:05:00Z', updated_at: '2025-02-01T13:30:00Z' },
    { id: 'ord_5', buyer_id: 'b_123', order_number: 'NT12454', total_amount: 899, payment_status: 'PAID', order_status: 'DELIVERED', delivery_date: '2025-01-20', created_at: '2025-01-19T11:50:00Z', updated_at: '2025-01-20T16:20:00Z' }
  ]);

  // Order Items Table (Table 9)
  const [orderItems, setOrderItems] = useState([
    { id: 'oi_1', order_id: 'ord_1', product_id: 'almonds', quantity: 1, price: 899, subtotal: 899 },
    { id: 'oi_2', order_id: 'ord_2', product_id: 'cashews', quantity: 1, price: 639, subtotal: 639 },
    { id: 'oi_3', order_id: 'ord_3', product_id: 'seeds', quantity: 1, price: 499, subtotal: 499 },
    { id: 'oi_4', order_id: 'ord_4', product_id: 'giftbox', quantity: 1, price: 1299, subtotal: 1299 },
    { id: 'oi_5', order_id: 'ord_5', product_id: 'pistachios', quantity: 1, price: 899, subtotal: 899 }
  ]);

  // Payments Table (Table 10)
  const [payments, setPayments] = useState([
    { id: 'pay_1', order_id: 'ord_1', payment_method: 'UPI', transaction_id: 'TXN1234567891', amount: 899, payment_status: 'SUCCESS', paid_at: '2025-02-28T14:31:00Z', created_at: '2025-02-28T14:30:05Z' },
    { id: 'pay_2', order_id: 'ord_2', payment_method: 'CREDIT_CARD', transaction_id: 'TXN1234567892', amount: 639, payment_status: 'SUCCESS', paid_at: '2025-02-24T09:16:00Z', created_at: '2025-02-24T09:15:05Z' },
    { id: 'pay_3', order_id: 'ord_3', payment_method: 'DEBIT_CARD', transaction_id: 'TXN1234567893', amount: 499, payment_status: 'SUCCESS', paid_at: '2025-02-14T18:21:00Z', created_at: '2025-02-14T18:20:05Z' },
    { id: 'pay_4', order_id: 'ord_4', payment_method: 'UPI', transaction_id: 'TXN1234567894', amount: 1299, payment_status: 'SUCCESS', paid_at: '2025-01-31T10:06:00Z', created_at: '2025-01-31T10:05:05Z' },
    { id: 'pay_5', order_id: 'ord_5', payment_method: 'NET_BANKING', transaction_id: 'TXN1234567895', amount: 899, payment_status: 'SUCCESS', paid_at: '2025-01-19T11:51:00Z', created_at: '2025-01-19T11:50:05Z' }
  ]);

  // Reviews & Ratings Table (Table 13)
  const [reviews, setReviews] = useState([
    { id: 'rev_1', buyer_id: 'b_123', product_id: 'almonds', rating: 5, review: 'Premium quality and perfectly roasted. Will buy again!', created_at: '2025-03-02T10:00:00Z', updated_at: '2025-03-02T10:00:00Z' },
    { id: 'rev_2', buyer_id: 'b_123', product_id: 'giftbox', rating: 4, review: 'Great packaging, perfect for gifting.', created_at: '2025-02-05T14:20:00Z', updated_at: '2025-02-05T14:20:00Z' }
  ]);

  // Notifications Table (Table 14)
  const [notifications, setNotifications] = useState([
    { id: 'not_1', buyer_id: 'b_123', title: 'Order Delivered', message: 'Your order NT12458 has been delivered.', is_read: false, created_at: '2025-03-01T16:00:00Z' },
    { id: 'not_2', buyer_id: 'b_123', title: 'New Offer!', message: 'Get 40% OFF on all seeds and superfoods today.', is_read: false, created_at: '2025-03-10T09:00:00Z' }
  ]);

  // Subscription Table (Table 15)
  const [subscriptions, setSubscriptions] = useState([
    { id: 'sub_1', buyer_id: 'b_123', plan_name: 'Nutritiva VIP Club', start_date: '2025-01-01', end_date: '2026-12-31', status: 'ACTIVE', created_at: '2025-01-01T10:00:00Z' },
    { id: 'sub_2', buyer_id: 'b_123', plan_name: 'Monthly Wellness Box', start_date: '2025-02-15', end_date: '2025-08-15', status: 'ACTIVE', created_at: '2025-02-15T12:00:00Z' }
  ]);

  // Health Preferences Table (Table 16)
  const [healthPreferences, setHealthPreferences] = useState([
    { id: 'hp_1', buyer_id: 'b_123', preference: 'Vegetarian', created_at: '2025-01-15T10:05:00Z' },
    { id: 'hp_2', buyer_id: 'b_123', preference: 'High Protein', created_at: '2025-01-15T10:05:00Z' }
  ]);

  const [totalOrdersCount, setTotalOrdersCount] = useState(24);
  const [monthlySavings, setMonthlySavings] = useState(3250);
  const [rewardPoints, setRewardPoints] = useState(1450);

  // Cart operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product_id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product_id === product.id ? { ...item, quantity: item.quantity + 1, updated_at: new Date().toISOString() } : item
        );
      }
      return [...prevCart, { 
        id: `c_${Date.now()}`, 
        buyer_id: user.id, 
        product_id: product.id, 
        quantity: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }];
    });
  };

  const toggleHealthPreference = (preference) => {
    setHealthPreferences((prev) => {
      const exists = prev.find(p => p.preference === preference);
      if (exists) {
        return prev.filter(p => p.preference !== preference);
      }
      return [...prev, {
        id: `hp_${Date.now()}`,
        buyer_id: user.id,
        preference: preference,
        created_at: new Date().toISOString()
      }];
    });
  };

  const markNotificationRead = (notificationId) => {
    setNotifications((prev) => 
      prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product_id === productId ? { ...item, quantity, updated_at: new Date().toISOString() } : item))
    );
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const existing = prev.find(item => item.product_id === productId);
      if (existing) {
        return prev.filter(item => item.product_id !== productId);
      } else {
        return [...prev, {
          id: `wl_${Date.now()}`,
          buyer_id: user.id,
          product_id: productId,
          created_at: new Date().toISOString()
        }];
      }
    });
  };

  // Live Tracking Simulation for Blinkit / Zepto feel
  const startOrderTrackingSimulation = (orderId, items, totalAmount) => {
    let secondsElapsed = 0;
    
    // Initial order tracking structure
    const initialTracking = {
      id: orderId,
      items: items,
      amount: totalAmount,
      status: 'placed', // 'placed' | 'packing' | 'on_the_way' | 'arrived' | 'delivered'
      eta: '8 Mins',
      riderName: 'Assigning Partner...',
      riderRating: '4.9',
      riderStatus: 'Nutritiva store is packing your items...',
      riderPhone: '+91 9988776655',
      riderProgress: 0,
    };
    
    setActiveOrder(initialTracking);

    const trackingInterval = setInterval(() => {
      secondsElapsed += 5;
      
      setActiveOrder(prev => {
        if (!prev) {
          clearInterval(trackingInterval);
          return null;
        }

        let newStatus = prev.status;
        let newEta = prev.eta;
        let newRiderName = prev.riderName;
        let newRiderStatus = prev.riderStatus;
        let newProgress = prev.riderProgress;

        if (secondsElapsed < 15) {
          newStatus = 'placed';
          newEta = '8 Mins';
          newRiderName = 'Assigning Partner...';
          newRiderStatus = 'Nutritiva store confirmed your order';
          newProgress = 0;
        } else if (secondsElapsed < 30) {
          newStatus = 'packing';
          newEta = '7 Mins';
          newRiderName = 'Ramesh Kumar (Assigned)';
          newRiderStatus = 'Items are being packed under hygienic conditions';
          newProgress = 15;
        } else if (secondsElapsed < 75) {
          newStatus = 'on_the_way';
          newRiderName = 'Ramesh Kumar';
          
          // Progress interpolation: goes from 15 to 90
          const fraction = (secondsElapsed - 30) / 45;
          newProgress = Math.round(15 + fraction * 75);
          
          // Decrement ETA
          const mins = Math.max(1, Math.round(5 - fraction * 4));
          newEta = `${mins} Mins`;
          newRiderStatus = 'Rider is on the way (Vaccinated, Temp 98.4°F)';
        } else if (secondsElapsed < 90) {
          newStatus = 'arrived';
          newEta = 'Arrived!';
          newRiderName = 'Ramesh Kumar';
          newRiderStatus = 'Rider Ramesh is at your doorstep!';
          newProgress = 100;
        } else {
          newStatus = 'delivered';
          newEta = 'Delivered';
          newRiderName = 'Ramesh Kumar';
          newRiderStatus = 'Delivered safely! Rate your order experience.';
          newProgress = 100;
          clearInterval(trackingInterval);
        }

        return {
          ...prev,
          status: newStatus,
          eta: newEta,
          riderName: newRiderName,
          riderStatus: newRiderStatus,
          riderProgress: newProgress
        };
      });
    }, 2500); // Visual progress updates every 2.5 seconds
  };

  // Mock checkout flow using Database schemas
  const checkout = () => {
    if (cart.length === 0) return;

    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ord_new_${orderNum}`;
    
    // Resolve product details for calculation
    const cartItemsWithPrice = cart.map(cartItem => {
      const prod = initialProducts.find(p => p.id === cartItem.product_id);
      return {
        ...cartItem,
        price: prod ? prod.price : 0,
        name: prod ? prod.name : 'Unknown Product',
        weight: prod ? prod.weight : ''
      };
    });

    const totalSpent = cartItemsWithPrice.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create Orders Table entry
    const newOrder = {
      id: orderId,
      buyer_id: user.id,
      order_number: `NT${orderNum}`,
      total_amount: totalSpent,
      payment_status: 'PAID',
      order_status: 'PLACED',
      delivery_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Create Order Items Table entries
    const newOrderItems = cartItemsWithPrice.map((item, idx) => ({
      id: `oi_new_${Date.now()}_${idx}`,
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity
    }));

    setOrderItems((prev) => [...newOrderItems, ...prev]);

    // Create Payments Table entry
    const newPayment = {
      id: `pay_new_${Date.now()}`,
      order_id: orderId,
      payment_method: 'UPI',
      transaction_id: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      amount: totalSpent,
      payment_status: 'SUCCESS',
      paid_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    setPayments((prev) => [newPayment, ...prev]);

    // Update stats
    setTotalOrdersCount((prev) => prev + 1);
    setMonthlySavings((prev) => prev + Math.round(totalSpent * 0.25));
    setRewardPoints((prev) => prev + Math.round(totalSpent * 0.1));

    // Start simulation (pass mapped items for visual tracking)
    const itemsInOrder = cartItemsWithPrice.map(i => ({ ...i, id: i.product_id }));
    setCart([]);
    startOrderTrackingSimulation(orderId, itemsInOrder, totalSpent);

    // Redirect to Dashboard (which will automatically focus on live tracking)
    setCurrentPage('dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        promoType,
        setPromoType,
        categoryPageKey,
        setCategoryPageKey,
        cart,
        wishlist,
        user,
        buyerProfile,
        buyerDevices,
        setUser,
        orders,
        orderItems,
        payments,
        totalOrdersCount,
        monthlySavings,
        rewardPoints,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        checkout,
        isLoggedIn,
        setIsLoggedIn,
        activeOrder,
        setActiveOrder,
        activeDashboardTab,
        setActiveDashboardTab,
        reviews,
        notifications,
        subscriptions,
        healthPreferences,
        toggleHealthPreference,
        markNotificationRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
