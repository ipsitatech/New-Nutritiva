import React, { useState, useEffect } from 'react';
import { useApp, aiRecommendedProducts } from '../services/AppContext';
import { 
  Search, Heart, Star, ShoppingCart, Leaf, ChevronRight, 
  ShieldCheck, Truck, Percent, Gift, ArrowRight, StarHalf, Plus,
  ChevronLeft, MessageSquare, Quote, Bell, User, Award,
  MapPin, ShoppingBag, CreditCard, LayoutDashboard, HelpCircle, LogOut
} from 'lucide-react';

// Image assets imports
import heroNutsBowl from '../assets/hero_nuts_bowl.png';
import almondsImg from '../assets/almonds.png';
import cashewsImg from '../assets/cashews.png';
import walnutsImg from '../assets/walnuts.png';
import raisinsImg from '../assets/raisins.png';
import seedsImg from '../assets/seeds.png';
import spicesImg from '../assets/spices.png';
import logoImg from '../assets/logo.png';
import ipsitaAvatar from '../assets/ipsita_avatar.png';
import catDryFruitsImg from '../assets/category_dry_fruits.png';
import catDriedBerriesImg from '../assets/category_dried_berries.png';
import catSeedsImg from '../assets/category_seeds_superfoods.png';
import catExoticNutsImg from '../assets/category_exotic_nuts.png';

// Import new high-fidelity product images
import honeyImg from '../assets/honey.png';
import jaggeryImg from '../assets/jaggery.png';
import juiceImg from '../assets/juice.png';
import ashwagandhaImg from '../assets/ashwagandha.png';
import pumpkinSeedsImg from '../assets/pumpkin_seeds.png';
import flaxSeedsImg from '../assets/flax_seeds.png';
import makhanaImg from '../assets/makhana.png';
import beetrootChipsImg from '../assets/beetroot_chips.png';
import himalayanSaltImg from '../assets/himalayan_salt.png';
import quinoaImg from '../assets/quinoa.png';
import turmericImg from '../assets/turmeric.png';
import pepperImg from '../assets/pepper.png';
import pistachiosImg from '../assets/pistachios.png';

// Maps image names to imported files
const imageMap = {
  almonds: almondsImg,
  cashews: cashewsImg,
  walnuts: walnutsImg,
  raisins: raisinsImg,
  seeds: seedsImg,
  spices: spicesImg,
  pumpkin: pumpkinSeedsImg,
  flax: flaxSeedsImg,
  makhana: makhanaImg,
  chips: beetrootChipsImg,
  salt: himalayanSaltImg,
  quinoa: quinoaImg,
  turmeric: turmericImg,
  pepper: pepperImg,
  honey: honeyImg,
  jaggery: jaggeryImg,
  juice: juiceImg,
  ashwagandha: ashwagandhaImg,
  giftbox: heroNutsBowl,
  seedsbox: heroNutsBowl,
  hero_nuts_bowl: heroNutsBowl,
  // Fallbacks
  pumpkin_seeds: pumpkinSeedsImg,
  himalayan_salt: himalayanSaltImg,
  flax_seeds: flaxSeedsImg,
  beetroot_chips: beetrootChipsImg,
  sunflower_seeds: seedsImg,
  mix_nuts: heroNutsBowl,
  pistachios_small: pistachiosImg,
  cashews_small: cashewsImg,
  almonds_small: almondsImg,
  walnuts_small: walnutsImg,
  pistachios: pistachiosImg
};
const slides = [
  {
    title: <>Eat Healthy <br /><span className="text-amber-400">Live Healthy</span></>,
    description: "Premium Nuts, Dry Fruits & Organic Foods Delivered Fresh to Your Doorstep",
    image: heroNutsBowl,
    bgGradient: "from-emerald-950 via-[#105335] to-emerald-800",
    btnText: "Shop Now",
    accentColor: "bg-amber-500 hover:bg-amber-600 text-[#105335]"
  },
  {
    title: <>Royal Quality <br /><span className="text-[#FFB300]">California Almonds</span></>,
    description: "Freshly harvested, loaded with nutrients. Get up to 30% discount this week.",
    image: almondsImg,
    bgGradient: "from-[#0C1E2A] via-[#112F42] to-[#163F56]",
    btnText: "Shop Almonds",
    accentColor: "bg-amber-500 hover:bg-amber-600 text-slate-900"
  },
  {
    title: <>Crunchy & Fresh <br /><span className="text-amber-400">Roasted Cashews</span></>,
    description: "Lightly salted, roasted to perfection. Perfect addition to your daily healthy diet.",
    image: cashewsImg,
    bgGradient: "from-[#2E1065] via-[#4C1D95] to-[#6D28D9]",
    btnText: "Shop Cashews",
    accentColor: "bg-amber-400 hover:bg-amber-500 text-purple-950"
  },
  {
    title: <>Brain Booster <br /><span className="text-[#FFB300]">Premium Walnuts</span></>,
    description: "Rich in Omega-3 fatty acids, handpicked kernel halves for ultimate wellness.",
    image: walnutsImg,
    bgGradient: "from-emerald-950 via-emerald-900 to-emerald-800",
    btnText: "Shop Walnuts",
    accentColor: "bg-amber-500 hover:bg-amber-600 text-[#105335]"
  }
];

const CustomDialog = ({ isOpen, onClose, title, message, icon }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in text-left" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative border border-slate-100 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 p-1.5 hover:bg-slate-50 rounded-full transition-all cursor-pointer text-lg font-black"
        >
          ✕
        </button>
        <div className="flex items-center gap-3.5 mb-4 border-b border-slate-100 pb-3">
          <span className="text-3xl">{icon || '🌿'}</span>
          <h3 className="text-base font-black text-slate-800 tracking-tight">{title}</h3>
        </div>
        <div className="text-xs font-semibold text-slate-600 leading-relaxed space-y-2 whitespace-pre-line">
          {message}
        </div>
        <button 
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl font-black text-xs text-white transition-all hover:scale-102 active:scale-95 text-center shadow-xs"
          style={{background: 'linear-gradient(135deg, #105335, #0a3d26)'}}
        >
          Okay, Understood
        </button>
      </div>
    </div>
  );
};

const Storefront = () => {
  const { 
    cart, 
    wishlist, 
    addToCart, 
    updateQuantity,
    toggleWishlist, 
    setCurrentPage, 
    setPromoType,
    checkout,
    isLoggedIn,
    setIsLoggedIn,
    activeDashboardTab,
    setActiveDashboardTab,
    user,
    setUser,
    setCategoryPageKey,
    healthPreferences,
    products,
    addresses,
    savedCards,
    upiHandles,
    authFetch,
    refreshNotifications,
    setCart,
    setOrders,
    setOrderItems,
    setPayments
  } = useApp();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Checkout modal states
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [selectedPaymentType, setSelectedPaymentType] = useState('UPI'); // 'UPI' | 'Card'
  const [selectedCardId, setSelectedCardId] = useState(1);
  const [selectedUpiId, setSelectedUpiId] = useState(1);
  const [checkoutCoupon, setCheckoutCoupon] = useState('');
  const [activeDiscountPercent, setActiveDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const [vipBillingYearly, setVipBillingYearly] = useState(() => {
    const saved = localStorage.getItem('vipBillingYearly');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [vipJoined, setVipJoined] = useState(false);
  const [vipSelectedPlan, setVipSelectedPlan] = useState(() => {
    const saved = localStorage.getItem('vipSelectedPlan');
    return saved !== null ? saved : 'gold';
  });
  const [favToast, setFavToast] = useState({ show: false, msg: '', added: true });
  const [vipActivationError, setVipActivationError] = useState('');
  const [vipActivating, setVipActivating] = useState(false);

  const [genericToast, setGenericToast] = useState({ show: false, msg: '', icon: 'ℹ️' });
  const showToastNotification = (msg, icon = 'ℹ️') => {
    setGenericToast({ show: true, msg, icon });
    setTimeout(() => setGenericToast(prev => ({ ...prev, show: false })), 3500);
  };

  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', icon: '🌿' });
  const openDialog = (title, message, icon = '🌿') => {
    setDialog({ isOpen: true, title, message, icon });
  };

  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState('');

  const handleToggleFav = (product) => {
    const isNowAdding = !wishlist.some(w => w.product_id === product.id);
    toggleWishlist(product.id);
    setFavToast({ show: true, msg: product.name, added: isNowAdding });
    setTimeout(() => setFavToast(f => ({ ...f, show: false })), 2500);
  };

  const handlePromoClick = (type) => {
    setPromoType(type);
    setCurrentPage('promo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryImageMap = {
    'Nuts & Dry Fruits': almondsImg,
    'Seeds & Superfoods': seedsImg,
    'Healthy Snacks': cashewsImg,
    'Organic Food': spicesImg,
    'Spices & Herbs': spicesImg,
    'Honey & Sweeteners': raisinsImg,
    'Wellness & Immunity': almondsImg,
    'Gift Packs': heroNutsBowl
  };

  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const q = sessionStorage.getItem('storefront_search_query');
    const cat = sessionStorage.getItem('storefront_active_category');
    if (q !== null) {
      setSearchQuery(q);
      sessionStorage.removeItem('storefront_search_query');
    }
    if (cat !== null) {
      setActiveCategory(cat);
      sessionStorage.removeItem('storefront_active_category');
    }
    if (q !== null || cat !== null) {
      setTimeout(() => {
        const grid = document.getElementById('products-grid');
        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vipBillingYearly', JSON.stringify(vipBillingYearly));
  }, [vipBillingYearly]);

  useEffect(() => {
    localStorage.setItem('vipSelectedPlan', vipSelectedPlan);
  }, [vipSelectedPlan]);

  // Delivery Location Modal States & Helpers
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('Noida - 201301');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeError, setPincodeError] = useState('');

  const popularLocations = [
    { label: 'Noida Sector 62', name: 'Sector 62, Noida - 201301' },
    { label: 'Noida Sector 15', name: 'Sector 15, Noida - 201301' },
    { label: 'Indirapuram, GZB', name: 'Indirapuram, Ghaziabad - 201014' },
    { label: 'Connaught Place', name: 'Connaught Place, New Delhi - 110001' },
    { label: 'Gurgaon Phase 3', name: 'DLF Phase 3, Gurugram - 122002' },
    { label: 'Sector 18, Noida', name: 'Sector 18, Noida - 201301' }
  ];

  const mockLocationsList = [
    { name: 'Sector 62, Noida - 201301' },
    { name: 'Sector 15, Noida - 201301' },
    { name: 'Sector 18, Noida - 201301' },
    { name: 'Indirapuram, Ghaziabad - 201014' },
    { name: 'Connaught Place, New Delhi - 110001' },
    { name: 'DLF Phase 3, Gurugram - 122002' },
    { name: 'Vasant Kunj, New Delhi - 110070' },
    { name: 'Saket, New Delhi - 110017' },
    { name: 'Whitefield, Bengaluru - 560066' },
    { name: 'Indiranagar, Bengaluru - 560038' },
    { name: 'Andheri West, Mumbai - 400053' },
    { name: 'Bandra West, Mumbai - 400050' }
  ];

  const filteredLocations = mockLocationsList.filter(loc =>
    loc.name.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  const handlePincodeChange = (val) => {
    const cleaned = val.replace(/\D/g, '');
    setPincodeInput(cleaned);
    if (pincodeError) setPincodeError('');
  };

  const confirmPincode = () => {
    if (pincodeInput.length !== 6) {
      setPincodeError('Please enter a valid 6-digit PIN code');
      return;
    }
    
    const pinMappings = {
      '201301': 'Noida - 201301',
      '201303': 'Noida - 201303',
      '110001': 'New Delhi - 110001',
      '110011': 'New Delhi - 110011',
      '110020': 'New Delhi - 110020',
      '400001': 'Mumbai - 400001',
      '400050': 'Mumbai - 400050',
      '560001': 'Bengaluru - 560001',
      '560038': 'Bengaluru - 560038',
      '600001': 'Chennai - 600001',
      '700001': 'Kolkata - 700001',
      '500001': 'Hyderabad - 500001',
      '380001': 'Ahmedabad - 380001',
      '122001': 'Gurugram - 122001',
      '122002': 'Gurugram - 122002',
    };

    const resolved = pinMappings[pincodeInput];
    if (resolved) {
      setDeliveryLocation(resolved);
    } else {
      setDeliveryLocation(`PIN - ${pincodeInput}`);
    }
    
    setShowLocationModal(false);
    setPincodeInput('');
  };

  const selectLocation = (locName) => {
    setDeliveryLocation(locName);
    setShowLocationModal(false);
    setLocationSearchQuery('');
  };

  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselIndex, isCarouselHovered]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
    setTimeout(() => {
      const grid = document.getElementById('products-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleQuickLinkClick = (name) => {
    setSearchQuery('');
    if (name === 'Seeds') {
      setActiveCategory('Seeds & Superfoods');
    } else if (name === 'Organic Spices') {
      setActiveCategory('Spices & Herbs');
    } else {
      setActiveCategory('Nuts & Dry Fruits');
      setSearchQuery(name);
    }
    setTimeout(() => {
      const grid = document.getElementById('products-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const categories = [
    'All Categories',
    'Nuts & Dry Fruits', 'Seeds & Superfoods', 'Healthy Snacks', 
    'Organic Food', 'Spices & Herbs', 'Honey & Sweeteners', 
    'Wellness & Immunity', 'Gift Packs'
  ];

  const categoryQuickLinks = [
    { name: 'Almonds', img: almondsImg },
    { name: 'Cashews', img: cashewsImg },
    { name: 'Walnuts', img: walnutsImg },
    { name: 'Raisins', img: raisinsImg },
    { name: 'Seeds', img: seedsImg },
    { name: 'Organic Spices', img: spicesImg },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma', role: 'Verified Customer', location: 'Noida, UP',
      text: 'Excellent quality nuts and super fast delivery. Nutritiva is my go-to store for healthy snacking every day!',
      rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      favProducts: ['almonds', 'walnuts'], date: 'March 2025', accent: '#FFF8F0'
    },
    {
      name: 'Amit Verma', role: 'Premium Member', location: 'Gurugram, HR',
      text: 'Products are always fresh and packaging is excellent. Highly recommended for daily nutrition requirements.',
      rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      favProducts: ['cashews', 'pistachios'], date: 'Feb 2025', accent: '#F0FFF4'
    },
    {
      name: 'Sneha Iyer', role: 'Fitness Trainer', location: 'Bengaluru, KA',
      text: 'I love the variety and premium quality. Seeds and superfoods have become part of my daily diet routine.',
      rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      favProducts: ['seeds', 'honey'], date: 'Jan 2025', accent: '#F5F0FF'
    },
    {
      name: 'Rohit Patel', role: 'Regular Buyer', location: 'Mumbai, MH',
      text: 'Great customer service and authentic products. The raisins and pumpkin seeds are absolutely amazing!',
      rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      favProducts: ['raisins', 'pumpkin'], date: 'March 2025', accent: '#FFF0F0'
    },
    {
      name: 'Kavya Nair', role: 'Health Enthusiast', location: 'Kochi, KL',
      text: 'Ordering every month now! The gift box was perfect for Diwali — everyone loved it. Fast and safe delivery!',
      rating: 5, avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150',
      favProducts: ['giftbox', 'turmeric'], date: 'Feb 2025', accent: '#F0F8FF'
    },
    {
      name: 'Arjun Mehta', role: 'Nutritionist', location: 'Delhi, DL',
      text: 'I recommend Nutritiva to all my clients. Ashwagandha capsules and Giloy juice are top-notch quality!',
      rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      favProducts: ['ashwagandha', 'juice'], date: 'Jan 2025', accent: '#FDF0FF'
    },
    {
      name: 'Meera Reddy', role: 'Home Chef', location: 'Hyderabad, TS',
      text: 'The organic turmeric and black pepper are incredibly aromatic! Best spices I have ever used in cooking.',
      rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      favProducts: ['turmeric', 'pepper'], date: 'March 2025', accent: '#FFFBF0'
    },
    {
      name: 'Sanjay Gupta', role: 'VIP Member', location: 'Jaipur, RJ',
      text: 'Subscribed to the monthly wellness box and it is worth every rupee. Forest honey is pure and delicious.',
      rating: 5, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      favProducts: ['honey', 'jaggery'], date: 'Feb 2025', accent: '#F0FFF8'
    },
  ];

  const filteredProducts = products.filter(p => {
    const name = p.name || '';
    const description = p.description || '';
    const category = p.category || '';
    const weight = p.weight || '';
    const price = String(p.price || '');
    
    const matchesSearch = name.toLowerCase().includes(searchQuery.trim().toLowerCase()) || 
                          description.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          category.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          weight.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          price.includes(searchQuery.trim());
    
    if (searchQuery) {
      return matchesSearch;
    }
    return activeCategory === 'All Categories' || p.category === activeCategory;
  });

  const resolveProductDetails = (p) => {
    if (!p) return null;
    const lookupId = p.id.startsWith('rec-') ? p.id.replace('rec-', '') : p.id;
    const catalogProduct = products.find(item => item.id === lookupId);
    return {
      ...p,
      weight: p.weight || (catalogProduct ? catalogProduct.weight : '250g'),
      originalPrice: p.originalPrice || (catalogProduct ? catalogProduct.originalPrice : Math.round(p.price * 1.3)),
    };
  };



  if (!isLoggedIn) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative p-4 overflow-hidden" 
        style={{
          background: 'linear-gradient(135deg, #0d4a2e 0%, #105335 40%, #062817 100%)',
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-white/5 filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-400/5 filter blur-3xl pointer-events-none"></div>

        <div 
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-white/10 text-center animate-slide-up z-10"
          style={{background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(20px)'}}
        >
          <img src={logoImg} alt="Nutritiva Logo" className="h-24 w-auto object-contain mx-auto mb-4" />
          
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Welcome to Nutritiva</h2>
          <p className="text-xs text-slate-400 font-bold mb-6 font-semibold">Premium Dry Fruits, Seeds & Organic Superfoods</p>

          {!otpMode ? (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (phoneNumber.length !== 10) {
                  showToastNotification("⚠️ Please enter a valid 10-digit phone number");
                  return;
                }
                setOtpMode(true);
                showToastNotification("📲 OTP sent! Use mock OTP 123456 to login.", "📲");
              }}
              className="space-y-4"
            >
              <div className="text-left font-semibold">
                <label className="text-xs font-black text-slate-700 block mb-1.5">Enter Mobile Number</label>
                <div className="flex gap-2">
                  <span className="bg-slate-100 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs font-black text-slate-600 flex items-center justify-center">+91</span>
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-250 rounded-2xl px-4 py-3 text-xs font-black text-slate-750 focus:outline-none focus:bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-black text-xs text-white transition-all hover:scale-102 active:scale-95 text-center flex items-center justify-center gap-2 shadow-md mt-4"
                style={{background: 'linear-gradient(135deg, #105335, #0a3d26)', boxShadow: '0 8px 24px rgba(16, 83, 53, 0.25)'}}
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (otp !== '123456') {
                  showToastNotification("❌ Incorrect OTP. Use code 123456.");
                  return;
                }
                setIsLoggedIn(true);
                setOtpMode(false);
                setOtp('');
                setUser(prev => ({ 
                  ...prev, 
                  phone: `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}` 
                }));
                setPhoneNumber('');
                showToastNotification("🎉 Welcome back, Ipsita! Logged in successfully.", "🎉");
              }}
              className="space-y-4"
            >
              <div className="text-left font-semibold">
                <label className="text-xs font-black text-slate-700 block mb-1.5">Enter Verification Code</label>
                <input
                  type="password"
                  required
                  placeholder="Enter 6-digit OTP (123456)"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-black text-slate-750 focus:outline-none focus:bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all text-center tracking-widest text-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-black text-xs text-white transition-all hover:scale-102 active:scale-95 text-center flex items-center justify-center gap-2 shadow-md mt-4"
                style={{background: 'linear-gradient(135deg, #105335, #0a3d26)', boxShadow: '0 8px 24px rgba(16, 83, 53, 0.25)'}}
              >
                Verify & Login
              </button>

              <button
                type="button"
                onClick={() => setOtpMode(false)}
                className="text-xs text-slate-450 hover:text-emerald-700 font-bold block mx-auto mt-2 underline"
              >
                Change Phone Number
              </button>
            </form>
          )}

          <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-semibold leading-relaxed">
            By logging in, you agree to Nutritiva's <br />
            <span className="text-[#105335] font-black cursor-pointer">Terms of Service</span> and <span className="text-[#105335] font-black cursor-pointer">Privacy Policy</span>.
          </div>
        </div>

        {/* Global Toast inside Login View */}
        <div
          className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-2xl transition-all duration-500 border ${
            genericToast.show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'rgba(16, 83, 53, 0.2)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <span className="text-xl">{genericToast.icon}</span>
          <p className="text-xs font-black text-slate-800">{genericToast.msg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{background: 'linear-gradient(135deg, #ffdae7 0%, #fff5f9 35%, #ffeaf2 65%, #ffd6e5 100%)', backgroundAttachment: 'fixed'}}>
      {/* Search & Top Actions Navigation Section (High Fidelity Header) */}
      <header className="sticky top-0 z-50" style={{background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,180,200,0.35)', boxShadow: '0 4px 24px rgba(255,100,150,0.08)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Location Picker matching Blinkit / Zepto style */}
          <div className="flex items-center gap-1 cursor-pointer shrink-0">
            <div onClick={() => setCurrentPage('store')}>
              <img src={logoImg} alt="Nutritiva Logo" className="h-28 w-auto object-contain py-1" />
            </div>
            
            {/* Delivery address widget */}
            <div 
              onClick={() => setShowLocationModal(true)}
              className="hidden lg:flex flex-col border-l border-slate-200 pl-4 ml-2.5 text-left py-0.5 cursor-pointer hover:opacity-85 transition-all"
            >
              <span className="text-[9px] text-slate-400 font-extrabold tracking-wider uppercase">Delivering to</span>
              <span className="text-xs font-black text-slate-705 flex items-center gap-1 mt-0.5 hover:text-emerald-700 transition-colors">
                <span>{deliveryLocation}</span>
                <span className="text-xs">📍</span>
              </span>
            </div>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const grid = document.getElementById('products-grid');
              if (grid) {
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="flex-1 max-w-2xl hidden md:flex items-center border border-slate-200 rounded-xl relative shadow-xs hover:border-emerald-600 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 transition-all bg-white"
          >
            {/* Custom Category Dropdown */}
            <div 
              className="relative shrink-0"
              onMouseEnter={() => setShowCategoryDropdown(true)}
              onMouseLeave={() => setShowCategoryDropdown(false)}
            >
              <div 
                className="bg-slate-50 border-r border-slate-200 px-4 py-2.5 text-sm text-slate-600 font-semibold flex items-center justify-between gap-1.5 cursor-pointer select-none hover:bg-slate-100/70 transition-colors min-w-[170px] rounded-l-xl"
              >
                <span>{activeCategory}</span>
                <span className="text-[10px] text-slate-450">▼</span>
              </div>
 
              {showCategoryDropdown && (
                <div className="absolute left-0 pt-1.5 w-60 z-50">
                  <div className="bg-white border border-slate-100 rounded-2xl shadow-xl py-2 px-1 max-h-80 overflow-y-auto animate-fade-in text-left">
                    {categories.map((category) => (
                      <button
                        type="button"
                        key={category}
                        onClick={() => {
                          handleCategoryClick(category);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                          activeCategory === category 
                            ? 'bg-[#E6F4EA] text-[#105335]' 
                            : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-800'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <input 
              type="text" 
              placeholder="Search for nuts, dry fruits, seeds, spices & more..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              maxLength={255}
              className="flex-grow px-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
            />
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 transition-colors shrink-0 rounded-r-xl">
              <Search className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
 
          {/* Right Navigation Controls */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                window.location.href = '/';
              }}
              className="flex flex-col items-center gap-0.5 text-slate-700 hover:text-brand-green font-bold text-xs transition-colors"
            >
              <div className="p-1 rounded-lg hover:bg-slate-50">
                <Leaf className="w-5.5 h-5.5" />
              </div>
              <span>Home</span>
            </button>

            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-brand-green font-bold text-xs transition-colors relative"
            >
              <div className="p-1 rounded-lg hover:bg-slate-50">
                <User className="w-5.5 h-5.5" />
              </div>
              <span>Dashboard</span>
            </button>



            {/* Profile button with dropdown */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 shrink-0 select-none">
                <div className="w-9 h-9 rounded-full overflow-hidden shadow-md" style={{border: '2px solid #105335'}}>
                  <img src={user.avatar || ipsitaAvatar} alt="Ipsita Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:flex flex-col leading-tight text-left">
                  <span className="text-xs font-black text-slate-800">{user.name.split(' ')[0]}</span>
                  <span className="text-[9px] font-bold text-amber-500">{user.status.includes('VIP') ? `${user.status.replace('Member', '')} ✦` : user.status}</span>
                </div>
                <span className="text-[10px] text-slate-400 hidden sm:inline">▼</span>
              </div>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 pt-2 w-72 z-50">
                  <div className="rounded-2xl py-3 px-2 animate-fade-in text-left" style={{background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,180,200,0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(255,100,150,0.1)'}}>
                    
                    {/* Profile Header */}
                    <div className="flex items-center gap-3 px-4 py-3 mb-1 rounded-xl mx-1" style={{background: 'linear-gradient(135deg, #f0faf5, #e8f5ee)'}}>
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md" style={{border: '2px solid #105335'}}>
                        <img src={user.avatar || ipsitaAvatar} alt="Ipsita" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black text-slate-900 leading-tight">{user.name}</p>
                        <p className="text-xs text-slate-500 font-semibold">{user.email}</p>
                        <span 
                          onClick={() => { setActiveDashboardTab('vip'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                          className="inline-flex items-center gap-1 text-[10px] font-black text-amber-600 mt-0.5 cursor-pointer hover:underline"
                        >
                          ✦ {user.status}
                        </span>
                      </div>
                      <button
                        onClick={() => { setActiveDashboardTab('profile'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="text-[10px] font-black px-2.5 py-1.5 rounded-xl transition-all shrink-0 hover:scale-105"
                        style={{background: '#105335', color: 'white'}}
                      >
                        Edit
                      </button>
                    </div>

                    <div className="px-1 space-y-0.5 mb-1">

                      <button 
                        onClick={() => { setActiveDashboardTab('profile'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-[#E6F4EA]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #e8f5ee, #d4eddd)'}}>
                          <User className="w-4 h-4 text-[#105335]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-[#105335]">My Profile</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Edit personal info & preferences</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setActiveDashboardTab('orders'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-[#E6F4EA]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #fff8e6, #fef3c7)'}}>
                          <ShoppingBag className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-[#105335]">My Orders</p>
                          <p className="text-[10px] text-slate-400 font-semibold">View all past purchases</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setActiveDashboardTab('tracking'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-[#E6F4EA]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #eff6ff, #dbeafe)'}}>
                          <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-[#105335]">Track Order</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Live delivery map & status</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setActiveDashboardTab('favourites'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-[#E6F4EA]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #fff0f5, #fce4ec)'}}>
                          <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-[#105335]">My Favourites</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{wishlist.length} saved product{wishlist.length !== 1 ? 's' : ''}</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setActiveDashboardTab('payments'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-[#E6F4EA]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #fdf4ff, #ede9fe)'}}>
                          <CreditCard className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-[#105335]">Payments & UPI</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Cards, UPI & transactions</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setActiveDashboardTab('addresses'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-[#E6F4EA]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #fff0f5, #fce4ec)'}}>
                          <MapPin className="w-4 h-4 text-rose-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-[#105335]">Saved Addresses</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Home, Work & more</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setActiveDashboardTab('spending'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-[#E6F4EA]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)'}}>
                          <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-[#105335]">Spendings & Charts</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Analytics & spending insights</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setActiveDashboardTab('support'); setCurrentPage('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-[#E6F4EA]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)'}}>
                          <HelpCircle className="w-4 h-4 text-sky-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-[#105335]">Help & Support</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Chat with our team</p>
                        </div>
                      </button>



                    </div>

                    {/* Divider + Logout */}
                    <div className="border-t mx-3 pt-2 mt-1" style={{borderColor: 'rgba(255,180,200,0.4)'}}>
                      <button
                        onClick={() => { 
                          setShowProfileDropdown(false); 
                          localStorage.removeItem("nutritva_token");
                          localStorage.removeItem("nutritva_role");
                          window.location.reload();
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 group hover:bg-red-50"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                          <LogOut className="w-4 h-4 text-red-500" />
                        </div>
                        <p className="text-xs font-black text-red-500 group-hover:text-red-600">Logout</p>
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Favourites Nav Icon */}
            <button
              onClick={() => { setActiveDashboardTab('favourites'); setCurrentPage('dashboard'); }}
              className="relative flex flex-col items-center gap-0.5 text-slate-500 hover:text-rose-500 font-bold text-xs transition-colors"
              title="My Favourites"
            >
              <div className="p-1 rounded-lg hover:bg-rose-50 relative">
                <Heart className={`w-5 h-5 transition-all ${wishlist.length > 0 ? 'fill-rose-400 stroke-rose-400' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[10px]">Favourites</span>
            </button>


            {/* Cart Dropdown — hover to open, fully clickable */}
            <div
              className="relative py-1"
              onMouseEnter={() => setShowCartDropdown(true)}
              onMouseLeave={() => setShowCartDropdown(false)}
            >
              {/* Cart Icon Button */}
              <button
                className={`flex flex-col items-center gap-0.5 font-bold text-xs transition-colors relative ${showCartDropdown ? 'text-brand-green' : 'text-slate-500 hover:text-brand-green'}`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${showCartDropdown ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}>
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-brand-green text-white text-[9px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white shadow-sm px-0.5 animate-bounce">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">Cart</span>
              </button>

              {/* Cart Dropdown Panel */}
              {showCartDropdown && (
                <div className="absolute right-0 pt-3 w-96 z-50">
                  <div className="rounded-2xl overflow-hidden animate-fade-in" style={{background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,180,200,0.35)', boxShadow: '0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(16,83,53,0.08)'}}>

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4" style={{borderBottom: '1px solid rgba(255,180,200,0.2)'}}>
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-brand-green" />
                        <h4 className="font-black text-slate-900 text-sm">Shopping Cart</h4>
                      </div>
                      {cart.length > 0 && (
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{background: '#105335', color: 'white'}}>
                          {cart.reduce((sum, item) => sum + item.quantity, 0)} item{cart.reduce((sum, i) => sum + i.quantity, 0) !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {cart.length === 0 ? (
                      /* Empty Cart */
                      <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                          <ShoppingCart className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-sm font-black text-slate-700 mb-1">Your cart is empty</p>
                        <p className="text-xs text-slate-400 font-semibold mb-4">Browse our products and add items!</p>
                        <button
                          onClick={() => { setShowCartDropdown(false); window.scrollTo({top: 400, behavior: 'smooth'}); }}
                          className="text-xs font-black px-5 py-2.5 rounded-xl text-white transition-all hover:scale-105"
                          style={{background: 'linear-gradient(135deg, #105335, #0a3d26)'}}
                        >
                          Browse Products
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Cart Items List */}
                        <div className="max-h-72 overflow-y-auto px-4 py-3 space-y-3" style={{scrollbarWidth: 'thin'}}>
                          {cart.map(cartItem => {
                            const item = products.find(p => p.id === cartItem.product_id) || aiRecommendedProducts.find(p => p.id === cartItem.product_id);
                            if (!item) return null;
                            return (
                            <div key={cartItem.id} className="flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-slate-50 group/item">
                              {/* Product image */}
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shrink-0 p-1.5">
                                <img src={imageMap[item.image]} alt={item.name} className="w-full h-full object-contain" />
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-black text-slate-800 truncate leading-tight">{item.name}</p>
                                <p className="text-[10px] text-slate-400 font-semibold">{item.weight}</p>
                                <p className="text-xs font-black text-brand-green mt-0.5">₹{item.price * cartItem.quantity}</p>
                              </div>

                              {/* Quantity controls + remove */}
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                                  className="w-7 h-7 rounded-lg font-black text-sm flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                                  style={{background: '#105335', color: 'white'}}
                                >
                                  −
                                </button>
                                <span className="text-xs font-black text-slate-800 min-w-[16px] text-center">{cartItem.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                                  className="w-7 h-7 rounded-lg font-black text-sm flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                                  style={{background: '#105335', color: 'white'}}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )})}
                        </div>

                        {/* Summary + Checkout */}
                        <div className="px-5 pb-5 pt-3" style={{borderTop: '1px solid rgba(255,180,200,0.2)'}}>
                          {/* Savings row */}
                          <div className="flex items-center justify-between text-[11px] font-bold mb-2">
                            <span className="text-slate-400">Subtotal</span>
                            <span className="text-slate-700">₹{cart.reduce((sum, cartItem) => {
                              const p = products.find(prod => prod.id === cartItem.product_id) || aiRecommendedProducts.find(prod => prod.id === cartItem.product_id);
                              return sum + (p ? p.price * cartItem.quantity : 0);
                            }, 0)}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-bold mb-3">
                            <span className="text-emerald-600">🎉 You save</span>
                            <span className="text-emerald-600">₹{cart.reduce((sum, cartItem) => {
                              const p = products.find(prod => prod.id === cartItem.product_id) || aiRecommendedProducts.find(prod => prod.id === cartItem.product_id);
                              return sum + (p ? ((p.originalPrice || p.price) - p.price) * cartItem.quantity : 0);
                            }, 0)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm font-black mb-4" style={{borderTop: '1px solid rgba(255,180,200,0.2)', paddingTop: '10px'}}>
                            <span className="text-slate-900">Total</span>
                            <span style={{color: '#105335'}}>₹{cart.reduce((sum, cartItem) => {
                              const p = products.find(prod => prod.id === cartItem.product_id) || aiRecommendedProducts.find(prod => prod.id === cartItem.product_id);
                              return sum + (p ? p.price * cartItem.quantity : 0);
                            }, 0)}</span>
                          </div>

                          {/* Checkout button */}
                          <button
                            onClick={() => { setShowCartDropdown(false); setShowCheckoutModal(true); }}
                            className="w-full text-white font-black text-sm py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                            style={{background: 'linear-gradient(135deg, #105335, #0a3d26)', boxShadow: '0 8px 24px rgba(16,83,53,0.3)'}}
                          >
                            <span>Checkout & Pay</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <p className="text-center text-[10px] text-slate-400 font-semibold mt-2.5">🔒 Secure checkout · Free delivery above ₹499</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 animate-fade-in">
        
        {/* Top Grid: Category Sidebar & Banner Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Category Sidebar - Exact Blinkit / Zepto Style matching user screenshot */}
          <div className="rounded-3xl overflow-hidden h-fit lg:col-span-1 sticky top-24" style={{background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,180,200,0.3)', boxShadow: '0 8px 32px rgba(255,100,150,0.1)'}}>
            {/* Header */}
            <div className="bg-[#105335] text-white px-4 py-3.5 flex items-center gap-3">
              {/* Hamburger Icon */}
              <div className="flex flex-col gap-1 w-5 justify-center cursor-pointer shrink-0">
                <span className="h-0.5 w-5 bg-white rounded-full"></span>
                <span className="h-0.5 w-5 bg-white rounded-full"></span>
                <span className="h-0.5 w-5 bg-white rounded-full"></span>
              </div>
              <span className="text-xs font-black tracking-wide uppercase">Shop by Category</span>
            </div>

            {/* List */}
            <nav className="divide-y divide-slate-100">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCategoryClick(c)}
                  className={`w-full text-left px-5 py-3.5 text-xs font-bold transition-all flex items-center justify-between group ${
                    activeCategory === c 
                      ? 'bg-[#E6F4EA] text-[#105335] font-black' 
                      : 'text-slate-700 bg-white hover:bg-slate-50/80 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate pr-2">{c}</span>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                    activeCategory === c ? 'text-[#105335] stroke-[3]' : 'text-slate-400'
                  }`} />
                </button>
              ))}
            </nav>

            {/* Bottom Button */}
            <div className="p-4 border-t border-slate-100 flex justify-center bg-slate-50/50">
              <button 
                onClick={() => handleCategoryClick('All Categories')}
                className="w-full py-2 border border-slate-200 rounded-xl text-[11px] font-black text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs text-center"
              >
                View All Categories
              </button>
            </div>
          </div>

          {/* Right Banner Carousel matching image 1 */}
          <div 
            onClick={() => {
              if (carouselIndex === 0) {
                setActiveCategory('All Categories');
                setSearchQuery('');
              } else if (carouselIndex === 1) {
                setActiveCategory('Nuts & Dry Fruits');
                setSearchQuery('Almonds');
              } else if (carouselIndex === 2) {
                setActiveCategory('Nuts & Dry Fruits');
                setSearchQuery('Cashews');
              } else if (carouselIndex === 3) {
                setActiveCategory('Nuts & Dry Fruits');
                setSearchQuery('Walnuts');
              }
              setTimeout(() => {
                const grid = document.getElementById('products-grid');
                if (grid) {
                  grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}
            className={`lg:col-span-3 rounded-3xl overflow-hidden shadow-md relative text-white flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[380px] transition-all duration-700 bg-gradient-to-tr ${slides[carouselIndex].bgGradient} cursor-pointer`}
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
            
            {/* Text and Actions */}
            <div className="flex-1 max-w-lg z-10 text-center md:text-left mb-6 md:mb-0 animate-fade-in" key={carouselIndex}>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4">
                {slides[carouselIndex].title}
              </h2>
              <p className="text-emerald-50/90 text-sm md:text-base font-semibold max-w-sm mb-8 leading-relaxed">
                {slides[carouselIndex].description}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <button 
                  className={`font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 ${slides[carouselIndex].accentColor}`}
                >
                  {slides[carouselIndex].btnText}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextIndex = (carouselIndex + 1) % slides.length;
                    setCarouselIndex(nextIndex);
                  }}
                  className="border-2 border-white/40 hover:border-white text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all active:scale-95"
                >
                  Next Offer
                </button>
              </div>
            </div>

            {/* Bowl Image container */}
            <div className="flex-1 flex justify-center z-10 max-w-[280px] md:max-w-xs animate-fade-in" key={`img-${carouselIndex}`}>
              <img 
                src={slides[carouselIndex].image} 
                alt="Product slide banner" 
                className="w-full h-48 md:h-64 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] scale-110 md:scale-125 transition-transform hover:scale-130 duration-500"
              />
            </div>

            {/* Carousel Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex gap-2">
              {slides.map((_, dot) => (
                <button 
                  key={dot} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselIndex(dot);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${dot === carouselIndex ? 'bg-white w-6' : 'bg-white/30'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Circular Quick Category Links */}
        <div className="my-10 p-6 rounded-3xl" style={{background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,180,200,0.25)', boxShadow: '0 8px 32px rgba(255,100,150,0.08)'}}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Shop by Ingredient</h3>
            <span className="text-emerald-600 font-bold text-xs flex items-center gap-1 cursor-pointer hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
            {categoryQuickLinks.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleQuickLinkClick(item.name)} 
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center p-2 mb-3 group-hover:scale-110 transition-all duration-300" style={{background: 'linear-gradient(135deg, #fff0f5, white)', border: '2px solid rgba(255,180,200,0.4)', boxShadow: '0 4px 16px rgba(255,100,150,0.12)'}}>
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-600 group-hover:text-brand-green transition-colors text-center leading-tight">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Shop by Category ── */}
        <section className="my-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Shop by Category</h2>
            <button
              onClick={() => {
                const el = document.getElementById('products-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all hover:underline"
            >
              View all categories <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4-Column Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                img: catDryFruitsImg,
                name: 'Premium Dry Fruits Mix',
                tagline: 'Healthy, delicious & energy packed.',
                category: 'Nuts & Dry Fruits',
                accent: 'from-amber-50 to-orange-50',
                border: 'border-amber-100',
                btnColor: 'bg-[#105335] hover:bg-emerald-700',
              },
              {
                img: catDriedBerriesImg,
                name: 'Premium Dried Berries',
                tagline: 'Rich in antioxidants & vitamins.',
                category: 'Healthy Snacks',
                accent: 'from-rose-50 to-pink-50',
                border: 'border-rose-100',
                btnColor: 'bg-[#105335] hover:bg-emerald-700',
              },
              {
                img: catSeedsImg,
                name: 'Organic Seeds & Superfoods',
                tagline: 'Nutrient dense superfoods for you.',
                category: 'Seeds & Superfoods',
                accent: 'from-emerald-50 to-teal-50',
                border: 'border-emerald-100',
                btnColor: 'bg-[#105335] hover:bg-emerald-700',
              },
              {
                img: catExoticNutsImg,
                name: 'Exotic Premium Nuts',
                tagline: 'Finest quality handpicked nuts.',
                category: 'Nuts & Dry Fruits',
                accent: 'from-yellow-50 to-amber-50',
                border: 'border-yellow-100',
                btnColor: 'bg-[#105335] hover:bg-emerald-700',
              },
            ].map((cat, i) => (
              <div
                key={i}
                className={`group bg-gradient-to-b ${cat.accent} border ${cat.border} rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col`}
                onClick={() => {
                  setCategoryPageKey(cat.name);
                  setCurrentPage('category');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text + CTA */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="font-black text-slate-800 text-sm leading-snug">{cat.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">{cat.tagline}</p>
                  </div>

                  <button
                    className={`mt-auto ${cat.btnColor} text-white text-xs font-black px-4 py-2.5 rounded-xl transition-colors w-full`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategoryPageKey(cat.name);
                      setCurrentPage('category');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Sellers Grid matching image 1 */}
        <section id="products-grid" className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800">
                {searchQuery ? `Search Results: "${searchQuery}"` : "Best Sellers"}
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                {searchQuery 
                  ? 'Showing matching products found in our catalog' 
                  : `Premium selection of fresh organic ${activeCategory.toLowerCase()}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-emerald-50 hover:text-brand-green hover:border-emerald-100 transition-all shadow-xs"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-emerald-50 hover:text-brand-green hover:border-emerald-100 transition-all shadow-xs"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-xs flex flex-col items-center w-full col-span-full">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 text-3xl mb-4 border border-slate-100">
                🔍
              </div>
              <h3 className="text-base font-black text-slate-800 mb-1">No Products Found</h3>
              <p className="text-xs text-slate-500 font-semibold mb-6 max-w-sm leading-relaxed">
                We couldn't find any products matching "{searchQuery}". Try verifying the spelling or exploring another category.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-[#105335] hover:bg-emerald-800 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                Clear Search & View All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {filteredProducts.map((p) => {
              const isWishlisted = wishlist.includes(p.id);
              const inCart = cart.find(item => item.product_id === p.id);
              
              // Match screenshot discount tag colors:
              // California Almonds, walnuts, chia seeds, salt -> green. Others -> orange.
              const isEvenGreen = ['almonds', 'walnuts', 'seeds', 'rec-pumpkin', 'rec-flax', 'rec-mixnuts', 'rec-sunflower', 'salt', 'quinoa'].includes(p.id);
              const badgeBg = isEvenGreen ? 'bg-[#2E7D32]' : 'bg-[#E65100]';
              
              return (
                <div key={p.id} className="rounded-2xl flex flex-col p-3.5 relative overflow-hidden group card-hover" style={{background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,180,200,0.2)', boxShadow: '0 2px 12px rgba(255,100,150,0.07)'}}>
                  {/* Discount tag */}
                  <span className={`absolute top-3.5 left-3.5 ${badgeBg} text-white font-extrabold text-[9px] px-2 py-0.5 rounded-lg z-10 shadow-3xs`}>
                    {p.discount}
                  </span>

                  {/* Wishlist toggle */}
                  <button 
                    onClick={() => handleToggleFav(p)}
                    className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm active:scale-90 transition-all duration-200 ${
                      wishlist.includes(p.id)
                        ? 'bg-rose-50 border border-rose-200 text-rose-500'
                        : 'bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50'
                    }`}
                    title={wishlist.includes(p.id) ? 'Remove from Favourites' : 'Add to Favourites'}
                  >
                    <Heart className={`w-4 h-4 transition-all duration-200 ${wishlist.includes(p.id) ? 'fill-rose-500 stroke-rose-500 scale-110' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 mb-3">
                    <img 
                      src={imageMap[p.image]} 
                      alt={p.name} 
                      className="max-h-24 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Weight */}
                  <h4 className="font-extrabold text-slate-800 text-xs tracking-tight line-clamp-2 min-h-[32px] mb-0.5 text-left" title={p.name}>{p.name}</h4>
                  <span className="text-[10px] text-slate-400 font-extrabold block text-left mb-2">{p.weight}</span>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[10px] font-extrabold mb-3">
                    <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                    <span className="text-slate-800 font-extrabold">{p.rating}</span>
                    <span className="text-slate-400 font-semibold">({p.reviews})</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-1.5 mt-auto mb-3">
                    <span className="text-sm font-black text-slate-800">₹{p.price}</span>
                    <span className="text-[10px] text-slate-400 font-semibold line-through">₹{p.originalPrice}</span>
                  </div>

                   {/* Add to Cart button */}
                  {p.stock_quantity <= 0 ? (
                    <button
                      disabled
                      className="w-full bg-slate-100 text-slate-400 text-xs font-extrabold py-2 rounded-xl cursor-not-allowed text-center border border-slate-200"
                    >
                      Out of Stock
                    </button>
                  ) : inCart ? (
                    /* Blinkit Style quantity selector */
                    <div className="w-full bg-[#105335] text-white text-xs font-black py-2 rounded-xl flex items-center justify-between px-3 shadow-xs">
                      <button 
                        onClick={() => updateQuantity(p.id, inCart.quantity - 1)}
                        className="hover:scale-110 active:scale-90 px-1 text-sm font-bold text-emerald-250 hover:text-white"
                      >
                        -
                      </button>
                      <span>{inCart.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(p.id, inCart.quantity + 1)}
                        className="hover:scale-110 active:scale-90 px-1 text-sm font-bold text-emerald-250 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-[#105335] hover:bg-emerald-800 text-white text-xs font-extrabold py-2 rounded-xl transition-all shadow-sm active:scale-95 text-center"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          )}
        </section>

        {/* Promo Grid Banners styled exactly like the screenshot */}
        {/* Promo Grid Banners styled exactly like the screenshot */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 animate-fade-in">
          
          {/* Banner 1: Flat 40% (Dark Slate Blue) */}
          <div 
            onClick={() => handlePromoClick('40off')}
            className="bg-[#0F222B] rounded-3xl p-6 relative overflow-hidden text-white flex justify-between min-h-[160px] shadow-sm border border-slate-800 group cursor-pointer active:scale-98 transition-all"
          >
            <div className="z-10 flex flex-col justify-between max-w-[60%]">
              <div>
                <span className="text-[#FFB300] font-black text-[10px] tracking-wider uppercase">Exclusive Offer</span>
                <h3 className="text-xl font-black mt-1 leading-tight">Flat 40% OFF</h3>
                <p className="text-[10px] text-slate-350 font-medium mt-1">On Premium Dry Fruits • Expires: Dec 31, 2026</p>
                <div className="mt-2 text-[9px] bg-white/10 w-fit px-2.5 py-0.5 rounded-lg border border-white/10 font-bold">Use Code: NUTRITIVA40</div>
              </div>
              <button className="bg-white text-slate-900 hover:bg-[#FFB300] font-extrabold text-[10px] px-5 py-2 rounded-xl transition-all w-fit shadow-md">
                Shop Now
              </button>
            </div>
            <img src={heroNutsBowl} alt="Promo nuts" className="w-[110px] h-[110px] object-contain absolute bottom-2 right-2 drop-shadow-md group-hover:scale-105 transition-transform" />
          </div>

          {/* Banner 2: New Arrivals (Yellow-Orange) */}
          <div 
            onClick={() => handlePromoClick('new_arrivals')}
            className="bg-[#FFB300] rounded-3xl p-6 relative overflow-hidden text-slate-900 flex justify-between min-h-[160px] shadow-sm group cursor-pointer active:scale-98 transition-all"
          >
            <div className="z-10 flex flex-col justify-between max-w-[60%] text-left">
              <div>
                <span className="text-slate-800/80 font-black text-[10px] tracking-wider uppercase">Fresh Stock</span>
                <h3 className="text-xl font-black mt-1 leading-tight">New Arrivals</h3>
                <p className="text-[10px] text-slate-800 font-bold mt-1">Fresh & Healthy • Expires: Dec 31, 2026</p>
              </div>
              <span className="text-xs font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Now <ArrowRight className="w-4 h-4 stroke-[3]" />
              </span>
            </div>
            <img src={cashewsImg} alt="Cashews" className="w-[100px] h-[100px] object-contain absolute bottom-3 right-3 drop-shadow-md group-hover:rotate-6 transition-transform" />
          </div>

          {/* Banner 3: Combo Offers (Purple) */}
          <div 
            onClick={() => handlePromoClick('combos')}
            className="bg-[#4C1D95] rounded-3xl p-6 relative overflow-hidden text-white flex justify-between min-h-[160px] shadow-sm border border-purple-900 group cursor-pointer active:scale-98 transition-all"
          >
            <div className="z-10 flex flex-col justify-between max-w-[60%] text-left">
              <div>
                <span className="text-purple-300 font-black text-[10px] tracking-wider uppercase">Big Savings</span>
                <h3 className="text-xl font-black mt-1 leading-tight">Combo Offers</h3>
                <p className="text-[10px] text-purple-100 font-bold mt-1">Save More With Exclusive Combos • Expires: Dec 31, 2026</p>
              </div>
              <span className="text-xs font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Shop Combos <ArrowRight className="w-4 h-4 stroke-[3]" />
              </span>
            </div>
            <img src={walnutsImg} alt="Walnuts" className="w-[105px] h-[105px] object-contain absolute bottom-2 right-2 drop-shadow-md group-hover:scale-105 transition-transform" />
          </div>

        </section>

        {/* Features Row matching image 1 & latest upload */}
        <section className="rounded-3xl p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 my-12" style={{background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,180,200,0.25)', boxShadow: '0 8px 32px rgba(255,100,150,0.08)'}}>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-green shrink-0" style={{background: 'linear-gradient(135deg, #e8f5ee, #d4eddd)'}}>
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">100% Natural</h4>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-relaxed">No artificial additives</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-amber-500 shrink-0" style={{background: 'linear-gradient(135deg, #fff8e6, #fef3c7)'}}>
              <Truck className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">Fast Delivery</h4>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-relaxed">Quick delivery at doorstep</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 shrink-0" style={{background: 'linear-gradient(135deg, #eff6ff, #dbeafe)'}}>
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">Secure Payment</h4>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-relaxed">100% safe & secure</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-500 shrink-0" style={{background: 'linear-gradient(135deg, #fdf4ff, #ede9fe)'}}>
              <Gift className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">Fresh Packaging</h4>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-relaxed">Hygienic & well packed</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-green shrink-0" style={{background: 'linear-gradient(135deg, #fce4ec, #f8bbd9)'}}>
              <Award className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">Quality Assured</h4>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-relaxed">Lab tested & premium</p>
            </div>
          </div>

        </section>

        {/* Three Columns: AI Recommended, Trending, Recently Viewed matching latest screenshot */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12 animate-fade-in">
          
          {/* Column 1: AI Recommended */}
          <div className="rounded-3xl p-6 card-hover" style={{background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,180,200,0.25)', boxShadow: '0 4px 20px rgba(255,100,150,0.08)'}}>
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-amber-50 rounded-lg text-sm flex items-center justify-center w-7 h-7">🔥</span>
                <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">AI Recommended for You</h4>
              </div>
              <span className="text-[10px] text-emerald-600 hover:text-emerald-700 font-extrabold hover:underline tracking-wide uppercase transition-colors cursor-pointer">View All</span>
            </div>
            <div className="flex flex-col gap-3.5">
              {aiRecommendedProducts.slice(0, 4).filter(Boolean).map(resolveProductDetails).map((p) => {
                const inCart = cart.find(item => item.product_id === p.id);
                return (
                  <div key={p.id} className="p-3 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-emerald-100 hover:shadow-xs flex items-center justify-between transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-100 shadow-3xs group-hover:scale-105 transition-transform duration-300">
                        <img src={imageMap[p.image] || almondsImg} alt={p.name} className="w-full h-full object-contain drop-shadow-sm" />
                      </div>
                      <div className="text-left min-w-0">
                        <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm group-hover:text-emerald-950 transition-colors truncate" title={p.name}>{p.name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{p.weight}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs sm:text-sm font-black text-[#105335]">₹{p.price}</span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through font-semibold">₹{p.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="shrink-0 pl-2">
                      {inCart ? (
                        <div className="flex items-center bg-[#105335] text-white rounded-xl px-2 py-1.5 shadow-sm border border-emerald-750 min-w-[76px] justify-between h-8">
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, inCart.quantity - 1); }}
                            className="hover:scale-125 px-1.5 text-xs font-black text-emerald-250 hover:text-white transition-all"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-xs select-none min-w-[16px] text-center">{inCart.quantity}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, inCart.quantity + 1); }}
                            className="hover:scale-125 px-1.5 text-xs font-black text-emerald-250 hover:text-white transition-all"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                          className="bg-white hover:bg-[#105335] text-brand-green hover:text-white border border-emerald-600 hover:border-transparent font-black text-xs px-4 py-1.5 rounded-xl shadow-3xs hover:shadow-2xs active:scale-95 transition-all text-center min-w-[76px] h-8 flex items-center justify-center"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Trending Now */}
          <div className="rounded-3xl p-6 card-hover" style={{background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,180,200,0.25)', boxShadow: '0 4px 20px rgba(255,100,150,0.08)'}}>
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-amber-50 rounded-lg text-sm flex items-center justify-center w-7 h-7">⭐</span>
                <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">Trending Now</h4>
              </div>
              <span className="text-[10px] text-emerald-600 hover:text-emerald-700 font-extrabold hover:underline tracking-wide uppercase transition-colors cursor-pointer">View All</span>
            </div>
            <div className="flex flex-col gap-3.5">
              {[
                aiRecommendedProducts.find(p => p.id === 'rec-mixnuts'),
                products.find(p => p.id === 'pistachios'),
                products.find(p => p.id === 'cashews'),
                products.find(p => p.id === 'almonds')
              ].filter(Boolean).map(resolveProductDetails).map((p) => {
                const inCart = cart.find(item => item.product_id === p.id);
                return (
                  <div key={p.id} className="p-3 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-emerald-100 hover:shadow-xs flex items-center justify-between transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-100 shadow-3xs group-hover:scale-105 transition-transform duration-300">
                        <img src={imageMap[p.image] || almondsImg} alt={p.name} className="w-full h-full object-contain drop-shadow-sm" />
                      </div>
                      <div className="text-left min-w-0">
                        <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm group-hover:text-emerald-950 transition-colors truncate" title={p.name}>{p.name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{p.weight}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs sm:text-sm font-black text-[#105335]">₹{p.price}</span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through font-semibold">₹{p.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="shrink-0 pl-2">
                      {inCart ? (
                        <div className="flex items-center bg-[#105335] text-white rounded-xl px-2 py-1.5 shadow-sm border border-emerald-750 min-w-[76px] justify-between h-8">
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, inCart.quantity - 1); }}
                            className="hover:scale-125 px-1.5 text-xs font-black text-emerald-250 hover:text-white transition-all"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-xs select-none min-w-[16px] text-center">{inCart.quantity}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, inCart.quantity + 1); }}
                            className="hover:scale-125 px-1.5 text-xs font-black text-emerald-250 hover:text-white transition-all"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                          className="bg-white hover:bg-[#105335] text-brand-green hover:text-white border border-emerald-600 hover:border-transparent font-black text-xs px-4 py-1.5 rounded-xl shadow-3xs hover:shadow-2xs active:scale-95 transition-all text-center min-w-[76px] h-8 flex items-center justify-center"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Recently Viewed */}
          <div className="rounded-3xl p-6 card-hover" style={{background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,180,200,0.25)', boxShadow: '0 4px 20px rgba(255,100,150,0.08)'}}>
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-emerald-50 rounded-lg text-sm flex items-center justify-center w-7 h-7">👁️</span>
                <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">Recently Viewed</h4>
              </div>
              <span className="text-[10px] text-emerald-600 hover:text-emerald-700 font-extrabold hover:underline tracking-wide uppercase transition-colors cursor-pointer">View All</span>
            </div>
            <div className="flex flex-col gap-3.5">
              {[
                products.find(p => p.id === 'walnuts'),
                products.find(p => p.id === 'raisins'),
                products.find(p => p.id === 'seeds'),
                products.find(p => p.id === 'honey')
              ].filter(Boolean).map(resolveProductDetails).map((p) => {
                const inCart = cart.find(item => item.product_id === p.id);
                return (
                  <div key={p.id} className="p-3 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-emerald-100 hover:shadow-xs flex items-center justify-between transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-100 shadow-3xs group-hover:scale-105 transition-transform duration-300">
                        <img src={imageMap[p.image] || almondsImg} alt={p.name} className="w-full h-full object-contain drop-shadow-sm" />
                      </div>
                      <div className="text-left min-w-0">
                        <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm group-hover:text-emerald-950 transition-colors truncate" title={p.name}>{p.name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{p.weight}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs sm:text-sm font-black text-[#105335]">₹{p.price}</span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through font-semibold">₹{p.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="shrink-0 pl-2">
                      {inCart ? (
                        <div className="flex items-center bg-[#105335] text-white rounded-xl px-2 py-1.5 shadow-sm border border-emerald-750 min-w-[76px] justify-between h-8">
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, inCart.quantity - 1); }}
                            className="hover:scale-125 px-1.5 text-xs font-black text-emerald-250 hover:text-white transition-all"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-xs select-none min-w-[16px] text-center">{inCart.quantity}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, inCart.quantity + 1); }}
                            className="hover:scale-125 px-1.5 text-xs font-black text-emerald-250 hover:text-white transition-all"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                          className="bg-white hover:bg-[#105335] text-brand-green hover:text-white border border-emerald-600 hover:border-transparent font-black text-xs px-4 py-1.5 rounded-xl shadow-3xs hover:shadow-2xs active:scale-95 transition-all text-center min-w-[76px] h-8 flex items-center justify-center"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* ── Infinite Scrolling Reviews Marquee ── */}
        <div className="my-14 animate-fade-in">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-3">
            <div>
              <h3 className="font-black text-slate-900 text-3xl tracking-tight">What Our Customers Say</h3>
              <p className="text-sm text-slate-500 font-semibold mt-1">Real reviews · Real people · Across India 🇮🇳</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700">{testimonials.length * 2}+ Verified Reviews</span>
            </div>
          </div>

          {/* Marquee container — fade edges */}
          <div
            className="relative overflow-hidden"
            style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)' }}
          >
            {/* Track: two sets for seamless loop */}
            <div
              className="flex gap-5"
              style={{ animation: 'marquee-reviews 40s linear infinite', width: 'max-content' }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {[...testimonials, ...testimonials].map((t, idx) => {
                const productLabels = {
                  almonds: '🥜 Almonds', walnuts: '🌰 Walnuts', cashews: '🥜 Cashews',
                  pistachios: '🟢 Pistachios', seeds: '🌱 Chia Seeds', honey: '🍯 Honey',
                  raisins: '🍇 Raisins', pumpkin: '🎃 Pumpkin Seeds', giftbox: '🎁 Gift Box',
                  turmeric: '🌿 Turmeric', ashwagandha: '💊 Ashwagandha', juice: '🧃 Giloy Juice',
                  pepper: '🌶️ Black Pepper', jaggery: '🍬 Jaggery',
                };
                return (
                  <div
                    key={idx}
                    onClick={() => { setActiveTestimonial(t); setShowTestimonialModal(true); }}
                    className="shrink-0 w-72 rounded-2xl p-5 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                    style={{
                      background: t.accent || '#ffffff',
                      border: '1.5px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      minHeight: '240px',
                    }}
                  >
                    {/* Top: quote + text + product tags */}
                    <div>
                      <Quote className="w-6 h-6 mb-2 opacity-20" />
                      <p className="text-sm font-semibold text-slate-700 leading-relaxed line-clamp-3 italic">"{t.text}"</p>

                      {/* Product emoji chips */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {t.favProducts.map(pid => (
                          <span key={pid} className="text-[10px] font-bold bg-white/80 border border-black/8 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {productLabels[pid] || pid}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: avatar + name + rating */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/6">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="font-black text-slate-900 text-sm truncate leading-tight">{t.name}</h5>
                        <p className="text-[10px] font-bold text-slate-400">{t.role} · {t.location}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="flex gap-0.5 justify-end mb-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <p className="text-[9px] font-semibold text-slate-400">{t.date}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── VIP Member Banner (full width) ── */}
        <div
          onClick={() => {
            if (!isLoggedIn) {
              alert("Please log in to view and choose VIP Plans.");
              setShowLoginModal(true);
              return;
            }
            setVipJoined(false);
            setShowVipModal(true);
          }}
          className="text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all my-8"
          style={{ background: 'linear-gradient(135deg, #0d4a2e 0%, #105335 50%, #0a3d26 100%)', border: '1px solid rgba(16,83,53,0.4)', boxShadow: '0 12px 40px rgba(16,83,53,0.35)' }}
        >
          <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <div className="absolute top-6 right-32 w-20 h-20 rounded-full pointer-events-none" style={{ background: 'rgba(255,179,0,0.06)' }} />

          <div className="z-10">
            <span className="text-[10px] font-black tracking-widest uppercase text-amber-400 block mb-2">🌿 Membership Club</span>
            <h3 className="text-2xl font-black tracking-tight leading-tight">Become a <span className="text-amber-400">Nutritiva Member</span></h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-emerald-100 font-bold">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Exclusive Discounts</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Early Access to Offers</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Priority Support</li>
            </ul>
          </div>
          <button
            className="shrink-0 font-black text-sm px-8 py-3 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 z-10"
            style={{ background: 'linear-gradient(135deg, #FFB300, #FF8C00)', color: '#0d4a2e' }}
          >
            Join Now — It's Free!
          </button>
        </div>

      </main>

      {/* 5. Footer */}
      <footer className="bg-[#0B1519] text-slate-300 pt-16 pb-8 border-t border-slate-950 mt-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            
            {/* Logo and Description */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center cursor-pointer shrink-0" onClick={() => setCurrentPage('store')}>
                <img src={logoImg} alt="Nutritiva Logo" className="h-16 w-auto object-contain rounded-xl" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
                We bring you the finest range of nuts, dry fruits, seeds, spices & healthy foods for a better you.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 hover:scale-110 transition-all flex items-center justify-center text-white shadow-md">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5C13 5.3 13.5 5 14.5 5H16V2h-3C9.8 2 9 3.5 9 5.8V8z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-500 hover:scale-110 transition-all flex items-center justify-center text-white shadow-md">
                  <svg className="w-4 h-4 fill-none stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 hover:scale-110 transition-all flex items-center justify-center text-white shadow-md">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1.1-1.1-2-2.2-2.2C19.3 3.6 12 3.6 12 3.6s-7.3 0-9.3.4C1.6 4.2.8 5.1.5 6.2.1 8.2.1 12 .1 12s0 3.8.4 5.8c.3 1.1 1.1 2 2.2 2.2 2 .4 9.3.4 9.3.4s7.3 0 9.3-.4c1.1-.2 1.9-1.1 2.2-2.2.4-2 .4-5.8.4-5.8s0-3.8-.4-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter / X" className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-400 hover:scale-110 transition-all flex items-center justify-center text-white shadow-md">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>

            {/* Shop Links — each sets the active category and scrolls to product grid */}
            <div>
              <h5 className="font-black text-white text-sm uppercase tracking-wider mb-5">Shop</h5>
              <ul className="space-y-3 text-sm text-slate-400 font-semibold">
                <li>
                  <button onClick={() => { setActiveCategory('Nuts & Dry Fruits'); setSearchQuery(''); setCurrentPage('store'); window.scrollTo({top: 0, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors text-left">All Products</button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('Nuts & Dry Fruits'); setSearchQuery(''); window.scrollTo({top: 400, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors text-left">Nuts & Dry Fruits</button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('Seeds & Superfoods'); setSearchQuery(''); window.scrollTo({top: 400, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors text-left">Seeds & Superfoods</button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('Healthy Snacks'); setSearchQuery(''); window.scrollTo({top: 400, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors text-left">Healthy Snacks</button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('Organic Food'); setSearchQuery(''); window.scrollTo({top: 400, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors text-left">Organic Food</button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('Spices & Herbs'); setSearchQuery(''); window.scrollTo({top: 400, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors text-left">Spices & Herbs</button>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h5 className="font-black text-white text-sm uppercase tracking-wider mb-5">Company</h5>
              <ul className="space-y-3 text-sm text-slate-400 font-semibold text-left">
                <li><button onClick={() => openDialog('About Nutritiva', 'Founded in 2020, Nutritiva is India\'s premium destination for organic nuts, dry fruits & superfoods.\n\nWe source directly from farms and process all items under clean, hygienic conditions to deliver unmatched freshness.', '🌿')} className="hover:text-amber-400 transition-colors text-left">About Us</button></li>
                <li><button onClick={() => openDialog('Our Story', 'Nutritiva started from a simple kitchen table idea — making healthy eating accessible, premium, and delightful.\n\nToday, we serve 50,000+ happy customers across India, delivering top-quality superfoods daily.', '📖')} className="hover:text-amber-400 transition-colors text-left">Our Story</button></li>
                <li><button onClick={() => openDialog('Careers at Nutritiva', 'We\'re hiring!\n\nSend your CV and cover letter to careers@nutritiva.in\n\nOpen roles:\n• Operations Executive\n• Customer Experience Lead\n• Frontend Developer (React)\n• Logistics Analyst', '💼')} className="hover:text-amber-400 transition-colors text-left">Careers</button></li>
                <li><button onClick={() => openDialog('Nutritiva Blog', 'Read our latest health tips, nutrient breakdowns, recipes & wellness guides at blog.nutritiva.in\n\n(Full blog interface coming soon!)', '📝')} className="hover:text-amber-400 transition-colors text-left">Blog</button></li>
                <li><button onClick={() => openDialog('Press & Media', 'For press inquiries and media kits, please contact:\npress@nutritiva.in\n\nNutritiva has been featured in Economic Times, YourStory, and The Hindu.', '📰')} className="hover:text-amber-400 transition-colors text-left">Press</button></li>
                <li><button onClick={() => openDialog('Sustainability at Nutritiva', 'Nutritiva is dedicated to a green future:\n• 100% recyclable glass and paper packaging.\n• Working with local certified organic farm co-ops.\n• Sourcing zero-emission deliveries where possible.\n• Sowing 1 tree for every 50 orders placed! 🌱', '🌱')} className="hover:text-amber-400 transition-colors text-left">Sustainability</button></li>
              </ul>
            </div>

            {/* Customer Service — routes to Dashboard support tab */}
            <div>
              <h5 className="font-black text-white text-sm uppercase tracking-wider mb-5">Customer Service</h5>
              <ul className="space-y-3 text-sm text-slate-400 font-semibold text-left">
                <li>
                  <button onClick={() => { setActiveDashboardTab('support'); setCurrentPage('dashboard'); }} className="hover:text-amber-400 transition-colors text-left">Contact Us</button>
                </li>
                <li>
                  <button onClick={() => openDialog('Frequently Asked Questions', '1. How long does delivery take?\n• Express delivery takes 2-4 hours, or 8-15 minutes for VIP members!\n\n2. Are products certified organic?\n• Yes, all our ingredients are 100% certified organic and laboratory tested.\n\n3. Can I return my products?\n• Yes, we offer a hassle-free 7-day return policy on unopened items.\n\n4. Do you deliver pan-India?\n• Yes! We deliver to over 500 cities across India.', '❓')} className="hover:text-amber-400 transition-colors text-left">FAQs</button>
                </li>
                <li>
                  <button onClick={() => openDialog('Shipping Policy', '• Free shipping on orders above ₹499.\n• Same-day express delivery in Delhi-NCR, Mumbai, and Bengaluru.\n• Standard shipping takes 24-48 hours for other cities.\n• All items are carefully packed in eco-friendly protective sleeves.', '🚚')} className="hover:text-amber-400 transition-colors text-left">Shipping Policy</button>
                </li>
                <li>
                  <button onClick={() => openDialog('Returns & Refunds', '• Return window: 7 days from the delivery date.\n• Refund processing: 3-5 business days once approved.\n• Refunds go directly to your primary card or UPI handle.\n• To initiate a return, contact support@nutritiva.in or click the chat bubble.', '↩️')} className="hover:text-amber-400 transition-colors text-left">Returns & Refunds</button>
                </li>
                <li>
                  <button onClick={() => { setActiveDashboardTab('tracking'); setCurrentPage('dashboard'); }} className="hover:text-amber-400 transition-colors text-left">Track Order</button>
                </li>
              </ul>
            </div>

            {/* My Account — routes to correct dashboard tabs */}
            <div>
              <h5 className="font-black text-white text-sm uppercase tracking-wider mb-5">My Account</h5>
              <ul className="space-y-3 text-sm text-slate-400 font-semibold text-left">
                <li>
                  <button onClick={() => { setActiveDashboardTab('orders'); setCurrentPage('dashboard'); }} className="hover:text-amber-400 transition-colors text-left">My Profile</button>
                </li>
                <li>
                  <button onClick={() => { setActiveDashboardTab('orders'); setCurrentPage('dashboard'); }} className="hover:text-amber-400 transition-colors text-left">Orders</button>
                </li>
                <li>
                  <button onClick={() => { setActiveDashboardTab('orders'); setCurrentPage('dashboard'); }} className="hover:text-amber-400 transition-colors text-left">Wishlist</button>
                </li>
                <li>
                  <button onClick={() => { setActiveDashboardTab('addresses'); setCurrentPage('dashboard'); }} className="hover:text-amber-400 transition-colors text-left">Addresses</button>
                </li>
                <li>
                  <button onClick={() => { setActiveDashboardTab('payments'); setCurrentPage('dashboard'); }} className="hover:text-amber-400 transition-colors text-left">Payments & UPI</button>
                </li>
                <li>
                  <button onClick={() => { 
                    localStorage.removeItem("nutritva_token");
                    localStorage.removeItem("nutritva_role");
                    window.location.reload();
                  }} className="hover:text-red-400 transition-colors text-left text-slate-500">Logout</button>
                </li>
              </ul>
            </div>

          </div>

          <hr className="border-slate-800 my-8" />

          {/* Footer Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-semibold">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span>© 2026 Nutritiva. All Rights Reserved.</span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <button onClick={() => openDialog('Privacy Policy', 'Nutritiva collects minimal data to process orders and improve your experience.\n• We never sell or share your data with third parties.\n• Your credit card and payment details are fully tokenized and secure.', '📄')} className="hover:text-amber-400 transition-colors">Privacy Policy</button>
              <span className="hidden sm:inline text-slate-700">|</span>
              <button onClick={() => openDialog('Terms & Conditions', 'By using the Nutritiva storefront, you agree to our terms of service.\n• All orders are subject to product availability.\n• Pricing is inclusive of taxes.\n• Special offers cannot be combined unless stated otherwise.', '📋')} className="hover:text-amber-400 transition-colors">Terms & Conditions</button>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="flex items-center gap-2 max-w-sm w-full md:w-auto">
              <input 
                id="footer-newsletter-email"
                type="email" 
                placeholder="Your email for updates..." 
                className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none w-full md:w-56 focus:border-emerald-600 transition-colors placeholder-slate-600"
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('footer-newsletter-email');
                  if (input && input.value && input.value.includes('@')) {
                    alert(`✅ Subscribed!\n\nThank you for subscribing with ${input.value}!\nYou'll receive exclusive offers, health tips & new arrivals. 🌿`);
                    input.value = '';
                  } else {
                    alert('⚠️ Please enter a valid email address to subscribe.');
                  }
                }}
                className="bg-brand-green hover:bg-emerald-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-emerald-950/30 shrink-0 active:scale-95"
              >
                Subscribe
              </button>
            </div>

            {/* Payment badges */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-600 mr-1">We Accept:</span>
              <span className="text-[9px] font-black tracking-widest text-slate-400 border border-slate-800 px-2 py-1 rounded bg-slate-900">VISA</span>
              <span className="text-[9px] font-black tracking-widest text-slate-400 border border-slate-800 px-2 py-1 rounded bg-slate-900">MC</span>
              <span className="text-[9px] font-black tracking-widest text-slate-400 border border-slate-800 px-2 py-1 rounded bg-slate-900">UPI</span>
              <span className="text-[9px] font-black tracking-widest text-slate-400 border border-slate-800 px-2 py-1 rounded bg-slate-900">RUPAY</span>
            </div>

          </div>

        </div>


      {/* Location Modal matching Blinkit / Zepto screenshot style with PIN Code option */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[100] animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl relative border border-slate-100 text-left animate-slide-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <h3 className="text-base font-black text-slate-800 mb-4 tracking-tight">Select delivery location</h3>

            {/* Search Input Container */}
            <div className="relative mb-4">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search for area, street name..." 
                value={locationSearchQuery}
                onChange={(e) => setLocationSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 placeholder-slate-450 focus:outline-none focus:border-brand-green focus:bg-white transition-all shadow-3xs"
              />
            </div>

            {/* Search Suggestions or Popular Areas */}
            {locationSearchQuery ? (
              <div className="space-y-1 max-h-48 overflow-y-auto mb-4 border border-slate-100 rounded-2xl p-1 bg-slate-50/50">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <button
                      key={loc.name}
                      onClick={() => selectLocation(loc.name)}
                      className="w-full text-left px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-[#E6F4EA] hover:text-[#105335] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-slate-450" />
                      <span>{loc.name}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-450 font-semibold p-3 text-center">No matching locations found</p>
                )}
              </div>
            ) : (
              <div className="mb-4">
                <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase block mb-2.5">Popular Delivery Areas</span>
                <div className="grid grid-cols-2 gap-2">
                  {popularLocations.map((loc) => (
                    <button
                      key={loc.name}
                      onClick={() => selectLocation(loc.name)}
                      className="text-left px-3 py-2.5 text-xs font-bold text-slate-655 bg-slate-50 border border-slate-100 hover:border-emerald-600 hover:bg-[#E6F4EA] hover:text-[#105335] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-slate-450 shrink-0" />
                      <span className="truncate">{loc.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="relative flex py-2 items-center mb-4">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-black uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* PIN Code Direct Option */}
            <div>
              <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase block mb-2.5">Enter PIN Code directly</span>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">📍</span>
                  <input 
                    type="text" 
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code" 
                    value={pincodeInput}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 placeholder-slate-450 focus:outline-none focus:border-brand-green focus:bg-white transition-all shadow-3xs"
                  />
                </div>
                <button 
                  onClick={confirmPincode}
                  disabled={pincodeInput.length !== 6}
                  className={`px-5 py-3 rounded-2xl text-xs font-black transition-all shadow-sm ${
                    pincodeInput.length === 6
                      ? 'bg-brand-green text-white hover:bg-emerald-800 active:scale-95 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Confirm
                </button>
              </div>
              {pincodeError && (
                <p className="text-[10px] text-red-500 font-bold mt-1.5 pl-1 animate-pulse">
                  {pincodeError}
                </p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Floating Chat Icon bottom right */}
      {/* ====== VIP MEMBERSHIP MODAL ====== */}
      {showVipModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{background: 'rgba(10,15,20,0.75)', backdropFilter: 'blur(12px)'}}
          onClick={(e) => { if (e.target === e.currentTarget) { setShowVipModal(false); setVipJoined(false); } }}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl animate-fade-in"
            style={{background: 'linear-gradient(160deg, #0d1f17 0%, #0f2a1c 40%, #111f18 100%)', border: '1px solid rgba(255,179,0,0.25)', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,179,0,0.1)'}}
          >
            {/* Close Button */}
            <button
              onClick={() => { setShowVipModal(false); setVipJoined(false); }}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all text-xl font-black"
            >
              ✕
            </button>

            {!vipJoined ? (
              <div className="p-8">
                {/* Modal Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-amber-400 mb-3 px-4 py-1.5 rounded-full" style={{background: 'rgba(255,179,0,0.12)', border: '1px solid rgba(255,179,0,0.25)'}}>
                    👑 Nutritiva Club Membership
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight mb-2">
                    Choose Your <span className="text-amber-400">VIP Plan</span>
                  </h2>
                  <p className="text-emerald-300/70 text-sm font-semibold">
                    Join 50,000+ members enjoying premium health benefits
                  </p>

                  {/* Billing Toggle */}
                  <div className="flex items-center justify-center gap-3 mt-5">
                    <span className={`text-sm font-bold transition-colors ${!vipBillingYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                    <button
                      onClick={() => setVipBillingYearly(v => !v)}
                      className="w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 relative"
                      style={{background: vipBillingYearly ? '#FFB300' : '#334155'}}
                    >
                      <span className="w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 absolute" style={{left: '4px', transform: vipBillingYearly ? 'translateX(26px)' : 'translateX(0px)'}}></span>
                    </button>
                    <span className={`text-sm font-bold transition-colors ${vipBillingYearly ? 'text-white' : 'text-slate-500'}`}>
                      Yearly
                      <span className="ml-2 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">Save 20%</span>
                    </span>
                  </div>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  {[
                    {
                      id: 'silver',
                      name: 'Silver',
                      icon: '🥈',
                      color: '#94a3b8',
                      glow: 'rgba(148,163,184,0.15)',
                      border: 'rgba(148,163,184,0.3)',
                      monthlyPrice: 0,
                      yearlyPrice: 0,
                      tagline: 'Great to start',
                      badge: null,
                      perks: [
                        { text: '5% discount on all orders', ok: true },
                        { text: 'Free delivery above ₹499', ok: true },
                        { text: 'Access to member-only deals', ok: true },
                        { text: 'Priority customer support', ok: false },
                        { text: 'Early sale access', ok: false },
                        { text: 'Free birthday gift', ok: false },
                      ]
                    },
                    {
                      id: 'gold',
                      name: 'Gold',
                      icon: '🥇',
                      color: '#FFB300',
                      glow: 'rgba(255,179,0,0.18)',
                      border: 'rgba(255,179,0,0.45)',
                      monthlyPrice: 149,
                      yearlyPrice: 1199,
                      tagline: 'Most popular choice',
                      badge: '⭐ Most Popular',
                      perks: [
                        { text: '15% discount on all orders', ok: true },
                        { text: 'Free delivery always', ok: true },
                        { text: 'Priority packing & support', ok: true },
                        { text: 'Early access to flash sales', ok: true },
                        { text: 'Free birthday gift box', ok: true },
                        { text: 'Dedicated account manager', ok: false },
                      ]
                    },
                    {
                      id: 'platinum',
                      name: 'Platinum',
                      icon: '💎',
                      color: '#818cf8',
                      glow: 'rgba(129,140,248,0.18)',
                      border: 'rgba(129,140,248,0.4)',
                      monthlyPrice: 299,
                      yearlyPrice: 2399,
                      tagline: 'Ultimate experience',
                      badge: '💎 Best Value',
                      perks: [
                        { text: '25% discount on all orders', ok: true },
                        { text: 'Free delivery always', ok: true },
                        { text: 'Priority packing & support', ok: true },
                        { text: 'Early access to flash sales', ok: true },
                        { text: 'Free birthday gift box', ok: true },
                        { text: 'Dedicated account manager', ok: true },
                      ]
                    }
                  ].map(plan => (
                    <div
                      key={plan.id}
                      onClick={() => setVipSelectedPlan(plan.id)}
                      className="rounded-2xl p-6 cursor-pointer transition-all duration-300 relative flex flex-col"
                      style={{
                        background: vipSelectedPlan === plan.id
                          ? `linear-gradient(145deg, ${plan.glow}, rgba(255,255,255,0.04))`
                          : 'rgba(255,255,255,0.03)',
                        border: `2px solid ${vipSelectedPlan === plan.id ? plan.border : 'rgba(255,255,255,0.07)'}`,
                        boxShadow: vipSelectedPlan === plan.id ? `0 0 32px ${plan.glow}, 0 8px 32px rgba(0,0,0,0.3)` : 'none',
                        transform: vipSelectedPlan === plan.id ? 'scale(1.03)' : 'scale(1)'
                      }}
                    >
                      {/* Popular Badge */}
                      {plan.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap" style={{background: plan.color, color: plan.id === 'gold' ? '#0d1f17' : 'white'}}>
                          {plan.badge}
                        </div>
                      )}

                      {/* Selected indicator */}
                      {vipSelectedPlan === plan.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{background: plan.color, color: '#0d1f17'}}>
                          ✓
                        </div>
                      )}

                      <div className="text-3xl mb-3">{plan.icon}</div>
                      <h3 className="text-xl font-black mb-1" style={{color: plan.color}}>{plan.name}</h3>
                      <p className="text-xs text-slate-400 font-semibold mb-4">{plan.tagline}</p>

                      {/* Price */}
                      <div className="mb-5">
                        {plan.monthlyPrice === 0 ? (
                          <div>
                            <span className="text-3xl font-black text-white">FREE</span>
                            <span className="text-slate-400 text-sm ml-1">forever</span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-3xl font-black text-white">₹{vipBillingYearly ? Math.round(plan.yearlyPrice/12) : plan.monthlyPrice}</span>
                            <span className="text-slate-400 text-sm">/mo</span>
                            {vipBillingYearly && (
                              <div className="text-[10px] text-emerald-400 font-bold mt-0.5">₹{plan.yearlyPrice}/year · Save ₹{(plan.monthlyPrice * 12) - plan.yearlyPrice}</div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Perks List */}
                      <ul className="space-y-2 flex-1">
                        {plan.perks.map((perk, i) => (
                          <li key={i} className={`flex items-start gap-2 text-xs font-semibold ${perk.ok ? 'text-slate-200' : 'text-slate-600 line-through'}`}>
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${perk.ok ? 'text-white' : 'text-slate-600'}`} style={{background: perk.ok ? plan.color : 'rgba(255,255,255,0.05)'}}>
                              {perk.ok ? '✓' : '✕'}
                            </span>
                            {perk.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex flex-col items-center gap-3 w-full">
                  {/* Activation Error Display (TC66, TC67) */}
                  {vipActivationError && (
                    <div className="w-full max-w-sm mb-2 p-3 rounded-xl border border-red-500/30 text-red-400 bg-red-500/10 text-xs font-semibold text-center flex flex-col gap-1.5 animate-fade-in">
                      <p>⚠️ {vipActivationError}</p>
                      <button
                        type="button"
                        onClick={() => {
                          const activateBtn = document.getElementById('vip-activate-btn');
                          if (activateBtn) activateBtn.click();
                        }}
                        className="text-[10px] font-black underline uppercase text-white hover:text-amber-400 transition-colors"
                      >
                        🔄 Retry Activation
                      </button>
                    </div>
                  )}

                  <button
                    id="vip-activate-btn"
                    disabled={vipActivating}
                    onClick={() => {
                      const validPlans = ['silver', 'gold', 'platinum'];
                      if (!validPlans.includes(vipSelectedPlan)) {
                        setVipActivationError("Invalid Plan ID selected. Please select a valid membership plan.");
                        return;
                      }

                      const oldStatus = user.status || 'Regular Member';
                      const newStatus = vipSelectedPlan === 'silver' ? 'VIP Silver Member' : vipSelectedPlan === 'gold' ? 'VIP Gold Member' : 'VIP Platinum Member';
                      
                      const oldRank = oldStatus.includes('Platinum') ? 3 : oldStatus.includes('Gold') ? 2 : oldStatus.includes('Silver') ? 1 : 0;
                      const newRank = vipSelectedPlan === 'platinum' ? 3 : vipSelectedPlan === 'gold' ? 2 : 1;

                      const currentPlanShort = oldStatus.includes('Silver') ? 'silver' : oldStatus.includes('Gold') ? 'gold' : oldStatus.includes('Platinum') ? 'platinum' : 'none';
                      if (currentPlanShort === vipSelectedPlan) {
                        alert("You are already subscribed to this membership plan.");
                        return;
                      }

                      setVipActivating(true);
                      setVipActivationError('');

                      authFetch('http://localhost:5000/api/user', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...user, status: newStatus })
                      })
                      .then(async res => {
                        const data = await res.json();
                        if (!res.ok) {
                          throw new Error(data.error || 'Failed to update membership.');
                        }
                        return data;
                      })
                      .then(freshUser => {
                        setUser(freshUser);
                        setVipJoined(true);
                        setVipActivating(false);
                        refreshNotifications();
                        
                        if (oldRank !== 0) {
                          if (newRank > oldRank) {
                            showToastNotification("👑 Membership Upgraded Successfully!", "👑");
                          } else if (newRank < oldRank) {
                            showToastNotification("✅ Membership Changed Successfully!", "✅");
                          } else {
                            showToastNotification("✅ Membership Re-activated Successfully!", "✅");
                          }
                        } else {
                          showToastNotification("🎉 Membership Activated Successfully!", "🎉");
                        }
                      })
                      .catch(err => {
                        console.error('Failed to update membership:', err);
                        setVipActivating(false);
                        setVipActivationError("Network interruption: Could not activate membership. Please check your connection and try again.");
                      });
                    }}
                    className={`w-full max-w-sm font-black text-base py-4 rounded-2xl transition-all flex items-center justify-center gap-3 ${vipActivating ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                    style={{
                      background: vipSelectedPlan === 'silver'
                        ? 'linear-gradient(135deg, #94a3b8, #64748b)'
                        : vipSelectedPlan === 'gold'
                        ? 'linear-gradient(135deg, #FFB300, #FF8C00)'
                        : 'linear-gradient(135deg, #818cf8, #6366f1)',
                      color: vipSelectedPlan === 'gold' ? '#0d1f17' : 'white',
                      boxShadow: vipSelectedPlan === 'silver'
                        ? '0 8px 24px rgba(148,163,184,0.3)'
                        : vipSelectedPlan === 'gold'
                        ? '0 8px 24px rgba(255,179,0,0.4)'
                        : '0 8px 24px rgba(129,140,248,0.4)'
                    }}
                  >
                    <span>
                      {vipActivating ? 'Activating Plan...' : vipSelectedPlan === 'silver' ? 'Join Free — Silver Plan' : `Activate ${vipSelectedPlan.charAt(0).toUpperCase() + vipSelectedPlan.slice(1)} Plan`}
                    </span>
                    <span className="text-xl">{vipSelectedPlan === 'silver' ? '🥈' : vipSelectedPlan === 'gold' ? '🥇' : '💎'}</span>
                  </button>
                  <p className="text-xs text-slate-500 font-semibold">🔒 Cancel anytime · No hidden charges · Instant activation</p>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="p-10 flex flex-col items-center text-center relative overflow-hidden">
                {/* Confetti Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(24)].map((_, i) => {
                    const emojis = ['🎉', '✨', '🥈', '🥇', '💎', '⭐', '🎈', '🌿'];
                    const emoji = emojis[i % emojis.length];
                    const leftPos = Math.random() * 100;
                    const delay = Math.random() * 2.5;
                    const duration = 2 + Math.random() * 1.5;
                    return (
                      <span 
                        key={i} 
                        className="absolute text-2xl animate-float-up opacity-0"
                        style={{
                          left: `${leftPos}%`,
                          bottom: '-20px',
                          animationDelay: `${delay}s`,
                          animationDuration: `${duration}s`,
                          animationIterationCount: 'infinite'
                        }}
                      >
                        {emoji}
                      </span>
                    );
                  })}
                </div>

                <div className="text-7xl mb-4 animate-bounce">🎉</div>
                <div className="text-5xl mb-6">
                  {vipSelectedPlan === 'silver' ? '🥈' : vipSelectedPlan === 'gold' ? '🥇' : '💎'}
                </div>
                <h2 className="text-3xl font-black text-white mb-2">
                  {(() => {
                    const oldStatus = user.status || 'Regular Member';
                    const oldRank = oldStatus.includes('Platinum') ? 3 : oldStatus.includes('Gold') ? 2 : oldStatus.includes('Silver') ? 1 : 0;
                    const newRank = vipSelectedPlan === 'platinum' ? 3 : vipSelectedPlan === 'gold' ? 2 : 1;
                    if (oldRank === 0) {
                      return `Welcome to Nutritiva ${vipSelectedPlan.charAt(0).toUpperCase() + vipSelectedPlan.slice(1)}!`;
                    } else if (newRank > oldRank) {
                      return "Membership Upgraded Successfully!";
                    } else {
                      return "Membership Changed Successfully!";
                    }
                  })()}
                </h2>
                <p className="text-emerald-300 font-semibold mb-8 text-sm max-w-sm">
                  {(() => {
                    const oldStatus = user.status || 'Regular Member';
                    const oldRank = oldStatus.includes('Platinum') ? 3 : oldStatus.includes('Gold') ? 2 : oldStatus.includes('Silver') ? 1 : 0;
                    const newRank = vipSelectedPlan === 'platinum' ? 3 : vipSelectedPlan === 'gold' ? 2 : 1;
                    if (oldRank === 0) {
                      return "Your membership is now active. Enjoy exclusive perks starting from your very next order!";
                    } else if (newRank > oldRank) {
                      return `Congratulations! You have successfully upgraded to the ${vipSelectedPlan.charAt(0).toUpperCase() + vipSelectedPlan.slice(1)} plan.`;
                    } else {
                      return `Your membership has been successfully updated to the ${vipSelectedPlan.charAt(0).toUpperCase() + vipSelectedPlan.slice(1)} plan.`;
                    }
                  })()}
                </p>

                <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
                  {[
                    { emoji: '🚀', label: 'Instant Activation', sub: 'Active right now' },
                    { emoji: '📦', label: 'Free Delivery', sub: 'On every order' },
                    { emoji: '🎁', label: 'Welcome Gift', sub: 'Check your email' },
                    { emoji: '⚡', label: 'Priority Packing', sub: 'Faster dispatch' }
                  ].map(b => (
                    <div key={b.label} className="rounded-2xl p-4 text-left" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,179,0,0.2)'}}>
                      <div className="text-2xl mb-1">{b.emoji}</div>
                      <p className="text-xs font-black text-white">{b.label}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{b.sub}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setShowVipModal(false); setVipJoined(false); }}
                  className="font-black text-sm px-10 py-3.5 rounded-2xl transition-all hover:scale-105"
                  style={{background: 'linear-gradient(135deg, #FFB300, #FF8C00)', color: '#0d1f17'}}
                >
                  Start Shopping Now 🛒
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <a 
        href={`https://wa.me/919832627196?text=${encodeURIComponent(`Hi! I'm contacting Nutritiva support for help.${isLoggedIn ? ` My name is ${user?.name || ''} and my registered email is ${user?.email || ''}.` : ''}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white transition-all flex items-center justify-center hover:scale-110 active:scale-95 animate-pulse-glow"
        style={{background: '#25D366', boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)'}}
        title="Chat with support on WhatsApp"
      >
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm5.735-3.305c1.62.96 3.238 1.455 4.881 1.456 5.485 0 9.95-4.463 9.953-9.94.002-2.653-1.03-5.148-2.905-7.025C15.845 3.311 13.354 2.28 10.701 2.28c-5.49 0-9.956 4.466-9.96 9.943-.001 1.765.487 3.418 1.417 4.907L1.137 20.89l3.968-.971-1.313 1.306zM18.006 14.86c-.328-.164-1.944-.96-2.247-1.07-.303-.11-.524-.165-.744.165-.22.329-.853 1.07-1.045 1.29-.193.22-.386.247-.714.083-.328-.164-1.385-.51-2.637-1.627-.975-.87-1.632-1.947-1.823-2.275-.192-.329-.02-.507.144-.67.147-.147.329-.384.493-.576.164-.192.219-.329.329-.548.11-.22.055-.411-.027-.575-.082-.164-.744-1.793-1.02-2.457-.27-.648-.544-.56-.744-.57l-.63-.01c-.22 0-.576.082-.88.411-.303.329-1.157 1.13-1.157 2.756 0 1.626 1.184 3.197 1.348 3.417.164.22 2.328 3.555 5.64 4.986.788.34 1.402.544 1.882.697.79.25 1.512.215 2.08.13.635-.094 1.944-.795 2.218-1.564.275-.769.275-1.427.193-1.565-.083-.138-.303-.22-.63-.385z" />
        </svg>
      </a>


      {/* Favourites Toast Notification */}
      <div
        className={`fixed bottom-24 left-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl transition-all duration-500 ${
          favToast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{background: favToast.added ? 'linear-gradient(135deg,#fff0f5,#fce4ec)' : '#f1f5f9', border: favToast.added ? '1.5px solid rgba(244,63,94,0.3)' : '1.5px solid #e2e8f0', backdropFilter: 'blur(16px)', minWidth: '260px'}}
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${favToast.added ? 'bg-rose-100' : 'bg-slate-200'}`}>
          <Heart className={`w-5 h-5 ${favToast.added ? 'fill-rose-500 stroke-rose-500' : 'text-slate-400'}`} />
        </div>
        <div>
          <p className={`text-xs font-black ${favToast.added ? 'text-rose-700' : 'text-slate-600'}`}>
            {favToast.added ? '❤️ Added to Favourites!' : '💔 Removed from Favourites'}
          </p>
          <p className="text-[10px] text-slate-500 font-semibold truncate max-w-[180px]">{favToast.msg}</p>
        </div>
        {favToast.added && (
          <button
            onClick={() => { setActiveDashboardTab('favourites'); setCurrentPage('dashboard'); }}
            className="ml-auto text-[10px] font-black text-rose-600 hover:text-rose-700 shrink-0 underline"
          >
            View
          </button>
        )}
      </div>

      <CustomDialog 
        isOpen={dialog.isOpen} 
        onClose={() => setDialog(d => ({ ...d, isOpen: false }))} 
        title={dialog.title} 
        message={dialog.message} 
        icon={dialog.icon} 
      />

      {/* Testimonial Spotlight Modal */}
      {showTestimonialModal && activeTestimonial && (
        <div 
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in text-left"
          onClick={() => { setShowTestimonialModal(false); setActiveTestimonial(null); }}
        >
          <div 
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative border border-slate-100 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => { setShowTestimonialModal(false); setActiveTestimonial(null); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 p-1.5 hover:bg-slate-50 rounded-full transition-all cursor-pointer text-lg font-black"
            >
              ✕
            </button>
            <span className="text-[10px] bg-emerald-50 text-[#105335] font-black px-2.5 py-1 rounded-full border border-emerald-100 tracking-wider uppercase inline-block mb-4">
              Verified Spotlight ✦
            </span>
            <div className="flex items-center gap-4 mb-4">
              <img src={activeTestimonial.avatar} alt={activeTestimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-sm shrink-0" />
              <div>
                <h3 className="text-base font-black text-slate-900 leading-tight flex items-center gap-1.5">
                  {activeTestimonial.name}
                  <span className="text-xs">✅</span>
                </h3>
                <p className="text-xs text-slate-450 font-extrabold mt-0.5">{activeTestimonial.role}</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-600 italic leading-relaxed mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              "{activeTestimonial.text}"
            </p>
            <div>
              <h4 className="text-xs font-black text-slate-755 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                <span>🛒 {activeTestimonial.name}'s Favorites</span>
              </h4>
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {activeTestimonial.favProducts.map(pid => {
                  const prod = products.find(p => p.id === pid);
                  if (!prod) return null;
                  return (
                    <div key={pid} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 p-1 flex items-center justify-center shrink-0">
                          <img src={imageMap[prod.image]} alt={prod.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-xs font-black text-slate-800 truncate leading-tight">{prod.name}</p>
                          <span className="text-[9px] text-slate-400 font-bold block">{prod.weight}</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-brand-green">₹{prod.price}</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  activeTestimonial.favProducts.forEach(pid => {
                    const prod = products.find(p => p.id === pid);
                    if (prod) addToCart(prod);
                  });
                  setShowTestimonialModal(false);
                  setActiveTestimonial(null);
                  showToastNotification(`🛒 Added ${activeTestimonial.name}'s favorites to your cart!`, "🛒");
                }}
                className="mt-6 w-full py-3.5 rounded-xl font-black text-sm text-white transition-all hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-2 shadow-md animate-pulse-glow"
                style={{background: 'linear-gradient(135deg, #105335, #0a3d26)', boxShadow: '0 8px 20px rgba(16,83,53,0.3)'}}
              >
                <span>Add All to Cart</span>
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Checkout Confirmation Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden max-h-[90vh] animate-scale-up text-left">
            
            {/* Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Confirm Checkout</h3>
                <p className="text-[10px] font-semibold text-slate-400">Review items & choose delivery preferences</p>
              </div>
              <button 
                onClick={() => {
                  setShowCheckoutModal(false);
                  setCouponError('');
                  setCouponSuccess('');
                  setActiveDiscountPercent(0);
                }} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ scrollbarWidth: 'thin' }}>
              
              {/* Shipping Address Selection */}
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">1. Select Delivery Address</h4>
                <div className="space-y-3">
                  {addresses.map(addr => (
                    <label 
                      key={addr.id} 
                      className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAddressId === addr.id 
                          ? 'border-brand-green bg-emerald-50/20 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input 
                          type="radio" 
                          name="checkoutAddress" 
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 accent-[#105335]"
                        />
                        <div className="text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-800">{addr.full_name || addr.fullName}</span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">
                              {addr.address_type}
                            </span>
                            {(addr.is_default || addr.isDefault) && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-slate-500 font-semibold mt-1">
                            {addr.address_line1}, {addr.address_line2 ? addr.address_line2 + ', ' : ''}{addr.city}, {addr.state} - {addr.postal_code || addr.postalCode}
                          </p>
                          <p className="text-slate-400 font-semibold mt-0.5">📞 {addr.phone}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                  
                  {addresses.length === 0 && (
                    <p className="text-xs font-bold text-amber-600 bg-amber-50 p-3.5 rounded-xl border border-amber-100">
                      ⚠️ No saved addresses found. Please go to your Profile settings to add one.
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">2. Select Payment Method</h4>
                
                {/* Method Type tabs */}
                <div className="grid grid-cols-2 gap-2 mb-3 bg-slate-50 p-1 rounded-xl">
                  <button 
                    onClick={() => setSelectedPaymentType('UPI')}
                    className={`text-xs font-black py-2 rounded-lg transition-all ${
                      selectedPaymentType === 'UPI' ? 'bg-white text-brand-green shadow-xs' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    UPI / QR Code
                  </button>
                  <button 
                    onClick={() => setSelectedPaymentType('Card')}
                    className={`text-xs font-black py-2 rounded-lg transition-all ${
                      selectedPaymentType === 'Card' ? 'bg-white text-brand-green shadow-xs' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                </div>

                {/* Sub-Selection based on type */}
                <div className="space-y-3">
                  {selectedPaymentType === 'UPI' ? (
                    upiHandles.map(upi => (
                      <label 
                        key={upi.id} 
                        className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedUpiId === upi.id 
                            ? 'border-brand-green bg-emerald-50/20' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="checkoutUpi"
                            checked={selectedUpiId === upi.id}
                            onChange={() => setSelectedUpiId(upi.id)}
                            className="accent-[#105335]"
                          />
                          <div className="text-xs font-bold text-slate-700">
                            <span>{upi.handle}</span>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-2">
                              {upi.status}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))
                  ) : (
                    savedCards.map(card => (
                      <label 
                        key={card.id} 
                        className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedCardId === card.id 
                            ? 'border-brand-green bg-emerald-50/20' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="checkoutCard"
                              checked={selectedCardId === card.id}
                              onChange={() => setSelectedCardId(card.id)}
                              className="accent-[#105335]"
                            />
                            <div className="text-xs font-bold text-slate-700">
                              <span>{card.type} ({card.number.slice(-4)})</span>
                              <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Expires: {card.expiry}</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
                            {card.tag}
                          </span>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Promo / Coupon Code Section */}
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">3. Apply Promo Coupon</h4>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon (e.g. NUTRITVA40, WELCOME10)" 
                    value={checkoutCoupon}
                    onChange={(e) => setCheckoutCoupon(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-755 focus:outline-none focus:bg-white focus:border-brand-green"
                  />
                  <button 
                    onClick={() => {
                      const code = checkoutCoupon.trim().toUpperCase();
                      if (code === 'NUTRITVA40') {
                        setActiveDiscountPercent(40);
                        setCouponSuccess('🎉 Coupon NUTRITVA40 applied! 40% discount added.');
                        setCouponError('');
                      } else if (code === 'WELCOME10') {
                        setActiveDiscountPercent(10);
                        setCouponSuccess('🎉 Coupon WELCOME10 applied! 10% discount added.');
                        setCouponError('');
                      } else if (code === 'VIPGOLD') {
                        setActiveDiscountPercent(15);
                        setCouponSuccess('🎉 Coupon VIPGOLD applied! 15% discount added.');
                        setCouponError('');
                      } else if (code === '') {
                        setActiveDiscountPercent(0);
                        setCouponSuccess('');
                        setCouponError('');
                      } else {
                        setActiveDiscountPercent(0);
                        setCouponError('⚠️ Invalid coupon code.');
                        setCouponSuccess('');
                      }
                    }}
                    className="px-5 py-2.5 rounded-2xl text-xs font-black text-white transition-all hover:scale-105 active:scale-95 shrink-0"
                    style={{ background: '#105335' }}
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && <p className="text-[10px] text-emerald-600 font-bold mt-1.5">{couponSuccess}</p>}
                {couponError && <p className="text-[10px] text-rose-600 font-bold mt-1.5">{couponError}</p>}
                
                {/* Available Coupons Hint */}
                <div className="mt-2 flex gap-1.5 items-center flex-wrap">
                  <span className="text-[9px] text-slate-400 font-bold">Suggested:</span>
                  {['NUTRITVA40', 'WELCOME10', 'VIPGOLD'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setCheckoutCoupon(c)}
                      className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full hover:bg-emerald-100/70 border border-emerald-100/50"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Billing breakdown details */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">Order Price Summary</h4>
                
                {(() => {
                  const subtotal = cart.reduce((sum, cartItem) => {
                    const p = products.find(prod => prod.id === cartItem.product_id);
                    return sum + (p ? p.price * cartItem.quantity : 0);
                  }, 0);

                  const discount = Math.round(subtotal * (activeDiscountPercent / 100));
                  const shippingFee = subtotal > 499 ? 0 : 40;
                  const gstTax = Math.round(subtotal * 0.05);
                  const grandTotal = subtotal - discount + shippingFee + gstTax;

                  return (
                    <div className="space-y-2 text-xs font-semibold">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Cart Subtotal</span>
                        <span className="text-slate-800 font-black">₹{subtotal.toLocaleString()}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between items-center text-emerald-600">
                          <span>Coupon Discount ({activeDiscountPercent}%)</span>
                          <span className="font-black">− ₹{discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Delivery Charges</span>
                        <span className="text-slate-800 font-black">
                          {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Estimated Taxes (GST 5%)</span>
                        <span className="text-slate-800 font-black">₹{gstTax.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm font-black pt-3 mt-2 border-t border-slate-200" style={{ color: '#105335' }}>
                        <span>Grand Total</span>
                        <span className="text-base font-black">₹{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setShowCheckoutModal(false);
                  setCouponError('');
                  setCouponSuccess('');
                  setActiveDiscountPercent(0);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  const subtotal = cart.reduce((sum, cartItem) => {
                    const p = products.find(prod => prod.id === cartItem.product_id);
                    return sum + (p ? p.price * cartItem.quantity : 0);
                  }, 0);
                  const discount = Math.round(subtotal * (activeDiscountPercent / 100));
                  const shippingFee = subtotal > 499 ? 0 : 40;
                  const gstTax = Math.round(subtotal * 0.05);
                  const grandTotal = subtotal - discount + shippingFee + gstTax;

                  const selectedAddressObj = addresses.find(a => a.id === selectedAddressId);
                  const addressString = selectedAddressObj 
                    ? `${selectedAddressObj.address_line1}, ${selectedAddressObj.city}, ${selectedAddressObj.state}` 
                    : 'Noida, Uttar Pradesh';
                  
                  const selectedPayMethodStr = selectedPaymentType === 'UPI' 
                    ? `UPI: ${upiHandles.find(u => u.id === selectedUpiId)?.handle || 'Primary'}`
                    : `Card: ${savedCards.find(c => c.id === selectedCardId)?.type || 'Saved Card'} (${savedCards.find(c => c.id === selectedCardId)?.number.slice(-4) || '••••'})`;

                  try {
                    // --- LOCAL SIMULATED CHECKOUT MODE ---
                    const data = await checkout({
                      paymentMethod: selectedPayMethodStr,
                      couponCode: checkoutCoupon,
                      shippingAddress: addressString
                    });

                    if (data.success && data.simulatedCheckout) {
                      // Sync state context dynamically
                      setUser(data.user);
                      setOrders(data.orders);
                      setOrderItems(data.orderItems);
                      setPayments(data.payments);
                      setCart([]);
                      setCurrentPage('dashboard');
                      setActiveDashboardTab('orders');
                      
                      setShowCheckoutModal(false);
                      setCouponError('');
                      setCouponSuccess('');
                      setActiveDiscountPercent(0);
                      
                      showToastNotification("🎉 Order placed successfully! (Simulated payment completed)", "🎉");
                    }

                    /* 
                    ===========================================================================
                    UNCOMMENT THIS BLOCK TO LAUNCH THE LIVE RAZORPAY MODAL (PRODUCTION)
                    ===========================================================================
                    if (data.success && data.checkoutSession) {
                      const loaded = await loadRazorpayScript();
                      if (!loaded) {
                        openDialog("SDK Error", "Failed to load Razorpay checkout script. Check your internet connection.", "⚠️");
                        return;
                      }

                      const options = {
                        key: data.rzpKey,
                        amount: data.amount,
                        currency: 'INR',
                        name: 'Nutritiva Store',
                        description: 'Organic Nuts & Superfoods Delivery',
                        order_id: data.rzpOrderId,
                        handler: async function (response) {
                          try {
                            const verifyRes = await authFetch('http://localhost:5000/api/orders/verify-payment', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: data.orderId,
                                paymentMethod: selectedPayMethodStr,
                                shippingAddress: addressString,
                                couponCode: checkoutCoupon
                              })
                            });
                            const verifyData = await verifyRes.json();

                            if (verifyData.success) {
                              setUser(verifyData.user);
                              setOrders(verifyData.orders);
                              setOrderItems(verifyData.orderItems);
                              setPayments(verifyData.payments);
                              setCart([]);
                              setCurrentPage('dashboard');
                              setActiveDashboardTab('orders');
                              
                              setShowCheckoutModal(false);
                              setCouponError('');
                              setCouponSuccess('');
                              setActiveDiscountPercent(0);
                              
                              showToastNotification("🎉 Payment verified and order placed successfully!", "🎉");
                            } else {
                              openDialog("Payment Verification Failed", verifyData.error || "Verify signature mismatch", "⚠️");
                            }
                          } catch (err) {
                            openDialog("Verification Error", err.message, "⚠️");
                          }
                        },
                        prefill: {
                          name: user.name || 'Ipsita Panda',
                          email: user.email || 'ipsita@nutritiva.in',
                          contact: selectedAddressObj ? selectedAddressObj.phone : '+91 9988776655'
                        },
                        theme: {
                          color: '#105335'
                        }
                      };

                      const paymentObject = new window.Razorpay(options);
                      paymentObject.open();
                    } else {
                      openDialog("Checkout Error", "Failed to construct Razorpay session parameters.", "⚠️");
                    }
                    ===========================================================================
                    */
                  } catch (err) {
                    openDialog("Checkout Error", err.message, "⚠️");
                  }
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-black text-white hover:scale-105 active:scale-95 transition-all shadow-md"
                style={{ background: 'linear-gradient(135deg, #105335, #0a3d26)' }}
              >
                Place Order & Pay
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Generic Toast Notification */}
      <div
        className={`fixed bottom-24 right-6 z-[100] flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-2xl transition-all duration-500 border ${
          genericToast.show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(16, 83, 53, 0.2)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 12px 32px rgba(16, 83, 53, 0.12)'
        }}
      >
        <span className="text-xl">{genericToast.icon}</span>
        <p className="text-xs font-black text-slate-800">{genericToast.msg}</p>
      </div>

      </footer>

    </div>

  );
};

export default Storefront;
