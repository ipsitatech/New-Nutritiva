import React, { createContext, useContext, useState, useEffect } from 'react';

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
  { id: 'pumpkin', name: 'Pumpkin Seeds', weight: '250g', price: 249, originalPrice: 299, discount: '16% OFF', rating: 4.6, reviews: '340', category: 'Seeds & Superfoods', image: 'pumpkin_seeds' },
  { id: 'flax', name: 'Flax Seeds', weight: '250g', price: 129, originalPrice: 169, discount: '23% OFF', rating: 4.5, reviews: '280', category: 'Seeds & Superfoods', image: 'flax_seeds' },

  // Healthy Snacks
  { id: 'makhana', name: 'Roasted Makhana', weight: '150g', price: 180, originalPrice: 240, discount: '25% OFF', rating: 4.6, reviews: '640', category: 'Healthy Snacks', image: 'makhana' },
  { id: 'chips', name: 'Baked Beetroot Chips', weight: '100g', price: 120, originalPrice: 150, discount: '20% OFF', rating: 4.4, reviews: '410', category: 'Healthy Snacks', image: 'beetroot_chips' },

  // Organic Food
  { id: 'salt', name: 'Pink Himalayan Salt', weight: '1kg', price: 139, originalPrice: 199, discount: '30% OFF', rating: 4.7, reviews: '920', category: 'Organic Food', image: 'himalayan_salt' },
  { id: 'quinoa', name: 'Organic Quinoa', weight: '500g', price: 299, originalPrice: 399, discount: '25% OFF', rating: 4.5, reviews: '530', category: 'Organic Food', image: 'quinoa' },

  // Spices & Herbs
  { id: 'turmeric', name: 'Organic Turmeric Powder', weight: '250g', price: 99, originalPrice: 149, discount: '33% OFF', rating: 4.8, reviews: '1.1k', category: 'Spices & Herbs', image: 'turmeric' },
  { id: 'pepper', name: 'Whole Black Pepper', weight: '200g', price: 189, originalPrice: 249, discount: '24% OFF', rating: 4.6, reviews: '720', category: 'Spices & Herbs', image: 'pepper' },

  // Honey & Sweeteners
  { id: 'honey', name: 'Wild Forest Honey', weight: '500g', price: 349, originalPrice: 449, discount: '22% OFF', rating: 4.7, reviews: '1.5k', category: 'Honey & Sweeteners', image: 'honey' },
  { id: 'jaggery', name: 'Organic Jaggery Powder', weight: '1kg', price: 129, originalPrice: 179, discount: '28% OFF', rating: 4.5, reviews: '840', category: 'Honey & Sweeteners', image: 'jaggery' },

  // Wellness & Immunity
  { id: 'juice', name: 'Giloy Amla Juice', weight: '1L', price: 289, originalPrice: 399, discount: '27% OFF', rating: 4.6, reviews: '310', category: 'Wellness & Immunity', image: 'juice' },
  { id: 'ashwagandha', name: 'Ashwagandha Capsules', weight: '60 caps', price: 449, originalPrice: 599, discount: '25% OFF', rating: 4.8, reviews: '580', category: 'Wellness & Immunity', image: 'ashwagandha' },

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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, _setCurrentPage] = useState(() => {
    return sessionStorage.getItem('nutritva_current_page') || 'store';
  });
  const [products, setProducts] = useState(initialProducts);
  const [promoType, _setPromoType] = useState(() => {
    return sessionStorage.getItem('nutritva_promo_type') || '40off';
  });
  const setPromoType = (type) => {
    _setPromoType(type);
    sessionStorage.setItem('nutritva_promo_type', type);
  };
  const [categoryPageKey, _setCategoryPageKey] = useState(() => {
    return sessionStorage.getItem('nutritva_category_page_key') || 'Premium Dry Fruits Mix';
  });
  const setCategoryPageKey = (key) => {
    _setCategoryPageKey(key);
    sessionStorage.setItem('nutritva_category_page_key', key);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Always logged in by default
  const [activeOrder, setActiveOrder] = useState(null); // Active order tracking
  const [activeDashboardTab, _setActiveDashboardTab] = useState(() => {
    return sessionStorage.getItem('nutritva_active_dashboard_tab') || 'orders';
  });
  const setActiveDashboardTab = (tab) => {
    _setActiveDashboardTab(tab);
    sessionStorage.setItem('nutritva_active_dashboard_tab', tab);
  };

  const setCurrentPage = (page) => {
    _setCurrentPage(page);
    sessionStorage.setItem('nutritva_current_page', page);
    if (!window.history.state || window.history.state.page !== page) {
      window.history.pushState({ page }, '', '');
    }
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        _setCurrentPage(event.state.page);
        sessionStorage.setItem('nutritva_current_page', event.state.page);
      }
    };
    window.addEventListener('popstate', handlePopState);

    if (!window.history.state || !window.history.state.page) {
      const initialPage = sessionStorage.getItem('nutritva_current_page') || 'store';
      window.history.replaceState({ page: initialPage }, '', '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // --- DATABASE PERSISTED STATES --- //
  const [user, _setUser] = useState({
    id: 'b_123',
    name: 'Ipsita Panda',
    status: 'Premium Member',
    email: 'ipsita@nutritiva.in',
    phone: '+91 99887 76655',
    dob: '1995-03-15',
    gender: 'Female',
    city: 'Noida, Uttar Pradesh',
    avatar: '',
    reward_points: 1450,
    monthly_savings: 3250,
    total_orders: 24
  });

  const [buyerProfile, setBuyerProfile] = useState({
    buyer_id: 'b_123',
    bio: 'Premium Member | Loves healthy snacking',
    preferred_language: 'en',
    newsletter_subscribed: true,
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2025-03-01T12:00:00Z'
  });

  const [buyerDevices, setBuyerDevices] = useState([
    { id: 'dev_1', buyer_id: 'b_123', device_type: 'iOS', device_token: 'ios_tok_123', created_at: '2024-05-12T10:00:00Z', updated_at: '2025-02-15T08:30:00Z' },
    { id: 'dev_2', buyer_id: 'b_123', device_type: 'Web', device_token: 'web_tok_456', created_at: '2025-01-20T14:20:00Z', updated_at: '2025-03-02T09:15:00Z' }
  ]);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      buyer_id: 'buyer_99',
      type: 'Both',
      full_name: 'Ipsita Panda',
      phone: '+91 9988776655',
      address_line1: 'Flat 402, Block C, Green Apartments',
      address_line2: 'Sector 62',
      landmark: 'Near Green Park',
      city: 'Noida',
      state: 'Uttar Pradesh',
      postal_code: '201301',
      country: 'India',
      latitude: '28.6284',
      longitude: '77.3769',
      delivery_instructions: 'Leave at reception if not available',
      address_type: 'Home',
      is_default: true,
      created_at: '2026-01-10T10:00:00Z',
      updated_at: '2026-01-10T10:00:00Z'
    },
    {
      id: 2,
      buyer_id: 'buyer_99',
      type: 'Shipping',
      full_name: 'Ipsita Panda Office',
      phone: '+91 9988776655',
      address_line1: 'Nutritva Tech Park, Tower A',
      address_line2: 'Sector 135',
      landmark: 'Opposite Metro Station',
      city: 'Noida',
      state: 'Uttar Pradesh',
      postal_code: '201304',
      country: 'India',
      latitude: '28.5355',
      longitude: '77.3910',
      delivery_instructions: 'Deliver to 4th floor reception',
      address_type: 'Office',
      is_default: false,
      created_at: '2026-02-15T09:00:00Z',
      updated_at: '2026-02-15T09:00:00Z'
    }
  ]);

  const [savedCards, setSavedCards] = useState([
    { id: 1, type: 'Visa', number: '•••• •••• •••• 4242', holder: 'IPSITA PANDA', expiry: '09 / 29', tag: 'Primary', isPrimary: true, theme: 'emerald' },
    { id: 2, type: 'Mastercard', number: '•••• •••• •••• 8899', holder: 'IPSITA PANDA', expiry: '12 / 28', tag: 'Personal', isPrimary: false, theme: 'dark' }
  ]);

  const [upiHandles, setUpiHandles] = useState([
    { id: 1, handle: 'ipsita@oksbi', status: 'Active Primary', isPrimary: true },
    { id: 2, handle: 'ipsitapanda@paytm', status: 'Verified Backup', isPrimary: false }
  ]);

  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [healthPreferences, setHealthPreferences] = useState([]);

  // Derived user statistics variables
  const totalOrdersCount = user ? user.total_orders : 0;
  const monthlySavings = user ? user.monthly_savings : 0;
  const rewardPoints = user ? user.reward_points : 0;

  // Helper function to attach Authorization JWT token header to API requests
  const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("nutritva_token");
    const headers = {
      ...options.headers,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(url, {
      ...options,
      headers
    }).then(res => {
      if (res.status === 401) {
        localStorage.removeItem("nutritva_token");
        localStorage.removeItem("nutritva_role");
        setIsLoggedIn(false);
        window.location.href = "/signin";
      }
      return res;
    });
  };

  // Intercept and wrap setUser to sync user profile edits directly to backend MySQL
  const setUser = (update) => {
    _setUser(prev => {
      const nextVal = typeof update === 'function' ? update(prev) : { ...prev, ...update };
      
      authFetch('http://localhost:5000/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextVal)
      })
      .then(res => res.json())
      .then(freshUser => _setUser(freshUser))
      .catch(err => console.error('Failed to sync user profile:', err));

      return nextVal;
    });
  };

  // Initialization moved to the end of component body to prevent ReferenceErrors

  // Cart operations
  const addToCart = (product) => {
    if (product.stock_quantity <= 0) {
      alert('This product is currently out of stock.');
      return;
    }
    authFetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id })
    })
    .then(res => res.json())
    .then(setCart)
    .catch(err => console.error('Error adding item to cart:', err));
  };

  const removeFromCart = (productId) => {
    authFetch(`http://localhost:5000/api/cart?product_id=${productId}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(setCart)
    .catch(err => console.error('Error removing item from cart:', err));
  };

  const updateQuantity = (productId, quantity) => {
    const prod = products.find(p => p.id === productId);
    if (prod && quantity > prod.stock_quantity) {
      alert(`Only ${prod.stock_quantity} units of ${prod.name} are available in stock.`);
      return;
    }
    authFetch('http://localhost:5000/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity })
    })
    .then(res => res.json())
    .then(setCart)
    .catch(err => console.error('Error updating quantity:', err));
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    authFetch('http://localhost:5000/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId })
    })
    .then(res => res.json())
    .then(setWishlist)
    .catch(err => console.error('Error toggling wishlist:', err));
  };

  // Health preference operations
  const toggleHealthPreference = (preference) => {
    authFetch('http://localhost:5000/api/health-preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preference })
    })
    .then(res => res.json())
    .then(setHealthPreferences)
    .catch(err => console.error('Error toggling health preference:', err));
  };

  // Notifications operations
  const markNotificationRead = (notificationId) => {
    authFetch('http://localhost:5000/api/notifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notification_id: notificationId })
    })
    .then(res => res.json())
    .then(setNotifications)
    .catch(err => console.error('Error marking notification as read:', err));
  };

  // Live Tracking Simulation for Blinkit / Zepto feel linked to Delivery Partner API
  const startOrderTrackingSimulation = (orderId, items, totalAmount, trackingId) => {
    // Initial order tracking structure
    const initialTracking = {
      id: orderId,
      trackingId: trackingId,
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

    // Poll the backend Delivery tracking status every 3 seconds
    const trackingInterval = setInterval(() => {
      authFetch(`http://localhost:5000/api/delivery/track/${trackingId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setActiveOrder(prev => {
            if (!prev) {
              clearInterval(trackingInterval);
              return null;
            }
            
            const serverStatus = data.status.toLowerCase();
            let newEta = '8 Mins';
            
            if (serverStatus === 'packing') {
              newEta = '7 Mins';
            } else if (serverStatus === 'on_the_way') {
              const mins = Math.max(1, Math.round(5 - (data.riderProgress / 100) * 4));
              newEta = `${mins} Mins`;
            } else if (serverStatus === 'arrived') {
              newEta = 'Arrived!';
            } else if (serverStatus === 'delivered') {
              newEta = 'Delivered';
              clearInterval(trackingInterval);
              
              // Refresh user orders & notifications list to show final status
              authFetch('http://localhost:5000/api/orders')
                .then(res => res.json())
                .then(setOrders)
                .catch(err => console.error(err));
                
              authFetch('http://localhost:5000/api/notifications')
                .then(res => res.json())
                .then(setNotifications)
                .catch(err => console.error(err));
            }
            
            return {
              ...prev,
              status: serverStatus,
              eta: newEta,
              riderName: data.rider ? data.rider.name : (serverStatus === 'placed' ? 'Assigning Partner...' : 'Ramesh Kumar'),
              riderStatus: data.detail,
              riderProgress: data.riderProgress
            };
          });
        }
      })
      .catch(err => {
        console.error('Error tracking shipment:', err);
        clearInterval(trackingInterval);
      });
    }, 3000);
  };

  // Real checkout flow joined with Database schemas via backend
  const checkout = (checkoutDetails = {}) => {
    if (cart.length === 0) return Promise.reject(new Error('Cart is empty'));

    return authFetch('http://localhost:5000/api/orders/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkoutDetails)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        _setUser(data.user);
        setOrders(data.orders);
        setOrderItems(data.orderItems);
        setPayments(data.payments);
        
        // Match cart items list details for visual simulation tracking before clearing cart
        const itemsToTrack = cart.map(cartItem => {
          const prod = products.find(p => p.id === cartItem.product_id);
          return {
            id: cartItem.product_id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            name: prod ? prod.name : 'Unknown Item',
            price: prod ? prod.price : 0
          };
        });

        setCart([]);
        startOrderTrackingSimulation(data.orderId, itemsToTrack, data.orders[0] ? data.orders[0].total_amount : 0, data.trackingId);
        setCurrentPage('dashboard');
        return data;
      } else {
        throw new Error(data.error || 'Checkout failed');
      }
    });
  };
  const cancelOrder = (orderId) => {
    return authFetch('http://localhost:5000/api/orders/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setOrders(data.orders);
        setNotifications(data.notifications);
        setUser(data.user);
        
        // If the cancelled order was the active order, clear it
        setActiveOrder(prev => {
          if (prev && prev.id === orderId) {
            return null;
          }
          return prev;
        });
        
        return data;
      } else {
        throw new Error(data.error || 'Cancellation failed');
      }
    });
  };

  const fetchInitialData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const uRes = await authFetch('http://localhost:5000/api/user');
      if (uRes.ok) {
        _setUser(await uRes.json());
      } else if (uRes.status === 401) {
        return;
      } else {
        throw new Error('Failed to retrieve user profile');
      }

      // Fetch products dynamically from backend MySQL database
      const prodRes = await authFetch('http://localhost:5000/api/products');
      if (prodRes.ok) {
        const prodList = await prodRes.json();
        if (prodList && prodList.length > 0) {
          setProducts(prodList);
        }
      } else {
        throw new Error('Failed to load products');
      }

      const cRes = await authFetch('http://localhost:5000/api/cart');
      if (cRes.ok) setCart(await cRes.json());

      const wRes = await authFetch('http://localhost:5000/api/wishlist');
      if (wRes.ok) setWishlist(await wRes.json());

      const oRes = await authFetch('http://localhost:5000/api/orders');
      let fetchedOrders = [];
      if (oRes.ok) {
        fetchedOrders = await oRes.json();
        setOrders(fetchedOrders);
      } else {
        throw new Error('Failed to load orders');
      }

      const oiRes = await authFetch('http://localhost:5000/api/orders/items');
      let fetchedOrderItems = [];
      if (oiRes.ok) {
        fetchedOrderItems = await oiRes.json();
        setOrderItems(fetchedOrderItems);
      }

      const pRes = await authFetch('http://localhost:5000/api/payments');
      if (pRes.ok) setPayments(await pRes.json());

      const rRes = await authFetch('http://localhost:5000/api/reviews');
      if (rRes.ok) setReviews(await rRes.json());

      const nRes = await authFetch('http://localhost:5000/api/notifications');
      if (nRes.ok) setNotifications(await nRes.json());

      const sRes = await authFetch('http://localhost:5000/api/subscriptions');
      if (sRes.ok) setSubscriptions(await sRes.json());

      const hpRes = await authFetch('http://localhost:5000/api/health-preferences');
      if (hpRes.ok) setHealthPreferences(await hpRes.json());

      // Auto-resume active order tracking if one exists in the database
      const activeOrd = fetchedOrders.find(ord => 
        ord.tracking_id && 
        !['DELIVERED', 'CANCELLED', 'RETURNED'].includes(ord.order_status?.toUpperCase())
      );
      
      if (activeOrd) {
        const itemsToTrack = fetchedOrderItems
          .filter(oi => oi.order_id === activeOrd.id)
          .map(oi => ({
            id: oi.product_id,
            product_id: oi.product_id,
            quantity: oi.quantity,
            name: oi.name || 'Product',
            price: oi.price || 0
          }));
        
        startOrderTrackingSimulation(
          activeOrd.id, 
          itemsToTrack, 
          activeOrd.total_amount, 
          activeOrd.tracking_id
        );
      }

    } catch (err) {
      console.error('Error loading database tables from API backend:', err);
      setErrorMessage('Failed to connect to the backend server. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load database tables from backend on mount and restore active shipment tracking
  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        promoType,
        setPromoType,
        categoryPageKey,
        setCategoryPageKey,
        products,
        addresses,
        setAddresses,
        savedCards,
        setSavedCards,
        upiHandles,
        setUpiHandles,
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
        cancelOrder,
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
        markNotificationRead,
        authFetch,
        setCart,
        setOrders,
        setOrderItems,
        setPayments,
        isLoading,
        errorMessage,
        fetchInitialData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
