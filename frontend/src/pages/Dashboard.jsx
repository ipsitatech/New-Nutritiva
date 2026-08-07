import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../services/AppContext';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import SpendSavingsChart from '../components/SpendSavingsChart';
import CategoryBreakdown from '../components/CategoryBreakdown';
import { 
  Search, Bell, ShoppingCart, ShoppingBag, Wallet, Gift, 
  Award, MoreVertical, ArrowRight, Calendar, Plus, 
  Heart, Leaf, LogOut, LayoutDashboard, Layers, Sprout, 
  HelpCircle, Settings, Crown, Check, CreditCard, Trash2,
  ArrowUpRight, ArrowDownLeft, QrCode, Phone, User, MapPin, 
  MessageSquare, Compass, Star, Repeat, Clock, Truck
} from 'lucide-react';

// Image assets imports
import ipsitaAvatar from '../assets/ipsita_avatar.png';
import logoImg from '../assets/logo.png';
import almondsImg from '../assets/almonds.png';
import cashewsImg from '../assets/cashews.png';
import walnutsImg from '../assets/walnuts.png';
import raisinsImg from '../assets/raisins.png';
import seedsImg from '../assets/seeds.png';
import spicesImg from '../assets/spices.png';
import heroNutsBowl from '../assets/hero_nuts_bowl.png';

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
const COUNTRIES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' }
];

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

const VipMembershipPage = ({ onClose }) => {
  const { setUser } = useApp();
  const [yearly, setYearly] = useState(true);
  const [selected, setSelected] = useState('gold');
  const [joined, setJoined] = useState(false);

  const plans = [
    {
      id: 'silver', name: 'Silver', icon: '🥈', color: '#94a3b8',
      glow: 'rgba(148,163,184,0.2)', border: 'rgba(148,163,184,0.45)',
      monthly: 0, yearly: 0, tagline: 'Perfect to get started', badge: null,
      perks: [
        { t: '5% off on all orders', ok: true },
        { t: 'Free delivery above ₹499', ok: true },
        { t: 'Member-only deals access', ok: true },
        { t: 'Priority customer support', ok: false },
        { t: 'Early flash sale access', ok: false },
        { t: 'Free birthday gift box', ok: false },
      ]
    },
    {
      id: 'gold', name: 'Gold', icon: '🥇', color: '#FFB300',
      glow: 'rgba(255,179,0,0.2)', border: 'rgba(255,179,0,0.55)',
      monthly: 149, yearly: 1199, tagline: 'Most loved by members', badge: '⭐ Most Popular',
      perks: [
        { t: '15% off on all orders', ok: true },
        { t: 'Free delivery always', ok: true },
        { t: 'Priority packing & support', ok: true },
        { t: 'Early flash sale access', ok: true },
        { t: 'Free birthday gift box', ok: true },
        { t: 'Dedicated account manager', ok: false },
      ]
    },
    {
      id: 'platinum', name: 'Platinum', icon: '💎', color: '#a78bfa',
      glow: 'rgba(167,139,250,0.2)', border: 'rgba(167,139,250,0.5)',
      monthly: 299, yearly: 2399, tagline: 'The ultimate experience', badge: '💎 Best Value',
      perks: [
        { t: '25% off on all orders', ok: true },
        { t: 'Free delivery always', ok: true },
        { t: 'Priority packing & support', ok: true },
        { t: 'Early flash sale access', ok: true },
        { t: 'Free birthday gift box', ok: true },
        { t: 'Dedicated account manager', ok: true },
      ]
    }
  ];

  const activePlan = plans.find(p => p.id === selected);

  if (joined) {
    return (
      <div className="relative overflow-hidden w-full py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none z-0">
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
        <div className="text-8xl animate-bounce z-10">🎉</div>
        <div className="text-6xl z-10">{activePlan.icon}</div>
        <div className="z-10">
          <h2 className="text-4xl font-black text-slate-900 mb-2">
            Welcome, <span style={{color: activePlan.color}}>VIP {activePlan.name}!</span>
          </h2>
          <p className="text-slate-500 font-semibold text-sm max-w-md mx-auto">
            Your Nutritiva {activePlan.name} membership is now active. Enjoy your exclusive benefits on every order!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-sm w-full z-10">
          {[
            { e: '🚀', t: 'Instant Activation', s: 'Active right now' },
            { e: '📦', t: 'Free Delivery', s: 'Every order' },
            { e: '🎁', t: 'Welcome Gift', s: 'Sent to your email' },
            { e: '⚡', t: 'Priority Packing', s: 'Faster dispatch' }
          ].map(b => (
            <div key={b.t} className="rounded-2xl p-4 text-left" style={{background: 'rgba(255,255,255,0.9)', border: `1.5px solid ${activePlan.border}`, boxShadow: `0 4px 16px ${activePlan.glow}`}}>
              <div className="text-2xl mb-1">{b.e}</div>
              <p className="text-xs font-black text-slate-800">{b.t}</p>
              <p className="text-[10px] text-slate-400 font-semibold">{b.s}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="font-black text-sm px-10 py-3.5 rounded-2xl transition-all hover:scale-105 active:scale-95 z-10"
          style={{background: `linear-gradient(135deg, ${activePlan.color}, ${activePlan.id === 'gold' ? '#FF8C00' : activePlan.id === 'silver' ? '#64748b' : '#6366f1'})`, color: activePlan.id === 'gold' ? '#0d1f17' : 'white', boxShadow: `0 8px 24px ${activePlan.glow}`}}
        >
          Start Shopping Now 🛒
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8 text-left">
      {/* Header */}
      <div className="rounded-3xl p-8 text-white relative overflow-hidden text-center" style={{background: 'linear-gradient(135deg, #0d1f17 0%, #0f2a1c 60%, #0a1a10 100%)', boxShadow: '0 16px 48px rgba(16,83,53,0.3)'}}>
        <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at 70% 30%, rgba(255,179,0,0.08) 0%, transparent 70%)'}}></div>
        <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-amber-400 mb-4 px-4 py-1.5 rounded-full" style={{background: 'rgba(255,179,0,0.12)', border: '1px solid rgba(255,179,0,0.25)'}}>
          👑 Nutritiva Club
        </div>
        <h1 className="text-3xl font-black mb-2">Choose Your <span className="text-amber-400">VIP Plan</span></h1>
        <p className="text-emerald-300/70 text-sm font-semibold mb-6">Join 50,000+ members enjoying exclusive health benefits</p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-bold transition-colors ${!yearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setYearly(y => !y)}
            className="w-14 h-7 rounded-full relative transition-all duration-300"
            style={{background: yearly ? '#FFB300' : '#334155'}}
          >
            <span className="w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-all duration-300" style={{left: yearly ? '28px' : '4px'}}></span>
          </button>
          <span className={`text-sm font-bold transition-colors flex items-center gap-2 ${yearly ? 'text-white' : 'text-slate-500'}`}>
            Yearly
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {plans.map(plan => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className="rounded-3xl p-6 cursor-pointer flex flex-col relative transition-all duration-300"
            style={{
              background: selected === plan.id
                ? `linear-gradient(145deg, white, #fafafa)`
                : 'rgba(255,255,255,0.85)',
              border: `2px solid ${selected === plan.id ? plan.color : 'rgba(255,200,220,0.3)'}`,
              boxShadow: selected === plan.id
                ? `0 0 0 4px ${plan.glow}, 0 12px 40px ${plan.glow}`
                : '0 4px 16px rgba(255,100,150,0.06)',
              transform: selected === plan.id ? 'translateY(-4px)' : 'translateY(0)'
            }}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap shadow-md"
                style={{background: plan.color, color: plan.id === 'gold' ? '#0d1f17' : 'white'}}>
                {plan.badge}
              </div>
            )}

            {/* Selected check */}
            {selected === plan.id && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                style={{background: plan.color, color: plan.id === 'gold' ? '#0d1f17' : 'white'}}>
                ✓
              </div>
            )}

            <div className="text-4xl mb-3">{plan.icon}</div>
            <h3 className="text-2xl font-black mb-0.5" style={{color: plan.id === 'gold' ? '#b45309' : plan.id === 'silver' ? '#64748b' : '#7c3aed'}}>{plan.name}</h3>
            <p className="text-xs text-slate-500 font-semibold mb-4">{plan.tagline}</p>

            {/* Price */}
            <div className="mb-5 pb-5" style={{borderBottom: '1.5px solid rgba(255,180,200,0.2)'}}>
              {plan.monthly === 0 ? (
                <div>
                  <span className="text-3xl font-black text-slate-900">FREE</span>
                  <span className="text-slate-400 text-sm ml-1">forever</span>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">₹{yearly ? Math.round(plan.yearly/12) : plan.monthly}</span>
                    <span className="text-slate-400 text-sm">/mo</span>
                  </div>
                  {yearly && (
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">₹{plan.yearly}/year · You save ₹{(plan.monthly * 12) - plan.yearly}</p>
                  )}
                </div>
              )}
            </div>

            {/* Perks */}
            <ul className="space-y-2.5 flex-1">
              {plan.perks.map((perk, i) => (
                <li key={i} className={`flex items-center gap-2.5 text-xs font-semibold ${perk.ok ? 'text-slate-700' : 'text-slate-300 line-through'}`}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                    style={{background: perk.ok ? plan.color : '#f1f5f9', color: perk.ok ? (plan.id === 'gold' ? '#0d1f17' : 'white') : '#cbd5e1'}}>
                    {perk.ok ? '✓' : '✕'}
                  </span>
                  {perk.t}
                </li>
              ))}
            </ul>

            {/* Select button */}
            <button
              className="mt-6 w-full py-2.5 rounded-xl font-black text-sm transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: selected === plan.id ? plan.color : 'rgba(255,255,255,0.5)',
                color: selected === plan.id ? (plan.id === 'gold' ? '#0d1f17' : 'white') : '#94a3b8',
                border: `1.5px solid ${selected === plan.id ? plan.color : 'rgba(255,180,200,0.3)'}`
              }}
            >
              {selected === plan.id ? '✓ Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5"
        style={{background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(255,180,200,0.3)', boxShadow: '0 4px 20px rgba(255,100,150,0.08)'}}>
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Selected Plan</p>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            {activePlan.icon} {activePlan.name}
            <span className="text-sm font-bold text-slate-500">
              {activePlan.monthly === 0 ? '— Free' : `— ₹${yearly ? activePlan.yearly : activePlan.monthly * 12}/yr`}
            </span>
          </h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">🔒 Cancel anytime · No hidden charges · Instant activation</p>
        </div>
        <button
          onClick={() => {
            const statusName = selected === 'silver' ? 'VIP Silver Member' : selected === 'gold' ? 'VIP Gold Member' : 'VIP Platinum Member';
            setUser(prev => ({ ...prev, status: statusName }));
            setJoined(true);
          }}
          className="shrink-0 font-black text-sm px-8 py-3.5 rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${activePlan.color}, ${selected === 'gold' ? '#FF8C00' : selected === 'silver' ? '#64748b' : '#6366f1'})`,
            color: selected === 'gold' ? '#0d1f17' : 'white',
            boxShadow: `0 8px 24px ${activePlan.glow}`
          }}
        >
          {selected === 'silver' ? 'Join Free — Silver' : `Activate ${activePlan.name} Plan`}
          <span className="text-lg">{activePlan.icon}</span>
        </button>
      </div>
    </div>
  );
};

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
        <div className="text-xs font-semibold text-slate-600 leading-relaxed space-y-2 whitespace-pre-line text-left">
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

const Dashboard = () => {

  const { 
    cart, 
    wishlist,
    toggleWishlist,
    addToCart,
    setCurrentPage, 
    orders,
    cancelOrder, 
    orderItems,
    payments,
    totalOrdersCount, 
    monthlySavings, 
    rewardPoints,
    activeOrder,
    setActiveOrder,
    activeDashboardTab: activeSidebarTab,
    setActiveDashboardTab: setActiveSidebarTab,
    user,
    buyerProfile,
    buyerDevices,
    setUser,
    reviews,
    notifications,
    subscriptions,
    healthPreferences,
    toggleHealthPreference,
    markNotificationRead,
    products,
    addresses,
    setAddresses,
    savedCards,
    setSavedCards,
    upiHandles,
    setUpiHandles
  } = useApp();

  const [tableSearch, setTableSearch] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUpgradeToast, setShowUpgradeToast] = useState(false);

  // Compute dynamic stats adjusting for new purchases and cancelled orders (TC61, TC62)
  const dynamicOrdersCount = useMemo(() => {
    const cancelledCount = (orders || []).filter(o => (o.order_status || '').toUpperCase() === 'CANCELLED').length;
    return Math.max(0, totalOrdersCount - cancelledCount);
  }, [orders, totalOrdersCount]);

  const dynamicTotalSpent = useMemo(() => {
    const baseline = totalOrdersCount * 650;
    const cancelledAmount = (orders || []).filter(o => (o.order_status || '').toUpperCase() === 'CANCELLED').reduce((sum, o) => sum + (Number(o.total_amount) || 650), 0);
    return Math.max(0, baseline - cancelledAmount);
  }, [orders, totalOrdersCount]);

  const [tempProfile, setTempProfile] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    dob: user.dob,
    gender: user.gender,
    city: user.city,
    avatar: user.avatar || ''
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  useEffect(() => {
    setTempProfile({
      name: user.name,
      phone: user.phone,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      city: user.city,
      avatar: user.avatar || ''
    });
  }, [user]);

  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', icon: '🌿' });
  const openDialog = (title, message, icon = '🌿') => {
    setDialog({ isOpen: true, title, message, icon });
  };

  const [genericToast, setGenericToast] = useState({ show: false, msg: '', icon: 'ℹ️' });
  const showToastNotification = (msg, icon = 'ℹ️') => {
    setGenericToast({ show: true, msg, icon });
    setTimeout(() => setGenericToast(prev => ({ ...prev, show: false })), 3500);
  };


  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddressTag, setNewAddressTag] = useState('Home');
  const [newAddressText, setNewAddressText] = useState('');
  const [newAddressPhone, setNewAddressPhone] = useState('');

  // Structured input states for address creation
  const [newAddressCategory, setNewAddressCategory] = useState('Both');
  const [newAddressFullName, setNewAddressFullName] = useState('Ipsita Panda');
  const [newAddressLine1, setNewAddressLine1] = useState('');
  const [newAddressLine2, setNewAddressLine2] = useState('');
  const [newAddressLandmark, setNewAddressLandmark] = useState('');
  const [newAddressCity, setNewAddressCity] = useState('Noida');
  const [newAddressState, setNewAddressState] = useState('Uttar Pradesh');
  const [newAddressPostalCode, setNewAddressPostalCode] = useState('');
  const [newAddressCountry, setNewAddressCountry] = useState('India');
  const [newAddressLat, setNewAddressLat] = useState('28.6284');
  const [newAddressLng, setNewAddressLng] = useState('77.3769');
  const [newAddressInstructions, setNewAddressInstructions] = useState('');
  const [newAddressIsDefault, setNewAddressIsDefault] = useState(false);

  // Support State
  const [supportHistory, setSupportHistory] = useState([
    { sender: 'bot', text: 'Hi Ipsita! How can I assist you with your orders or delivery today?', time: '11:00 PM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('IPSITA PANDA');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardType, setNewCardType] = useState('Visa');
  const [newCardTag, setNewCardTag] = useState('Personal');
  const [newCardCvv, setNewCardCvv] = useState('');

  const [showAddUpi, setShowAddUpi] = useState(false);
  const [newUpiId, setNewUpiId] = useState('');

  const handleCardClick = (id) => {
    setSavedCards(savedCards.map(c => ({
      ...c,
      isPrimary: c.id === id,
      tag: c.id === id ? 'Primary' : c.tag === 'Primary' ? 'Personal' : c.tag
    })));
    // Remove primary flag from UPI handles if a card is chosen as primary
    setUpiHandles(upiHandles.map(h => ({ ...h, isPrimary: false, status: 'Verified Backup' })));
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!newCardNumber || !newCardExpiry || !newCardHolder || !newCardCvv) return;

    // 1. Validate Cardholder Name
    if (!/^[A-Za-z\s]+$/.test(newCardHolder)) {
      openDialog("Invalid Name", "Cardholder name must contain only alphabets and spaces.", "⚠️");
      return;
    }

    // 2. Validate Card Number (Luhn check)
    const cleanNumber = newCardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      openDialog("Invalid Card Number", "Please enter a valid 13 to 19 digit card number.", "⚠️");
      return;
    }
    
    // Luhn Algorithm (Mod 10 Checksum)
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    if (sum % 10 !== 0) {
      openDialog("Invalid Card Number", "The card number failed the mathematical Luhn checksum validation.", "⚠️");
      return;
    }

    // 3. Validate Expiry Date (MM/YY format and future date validation)
    const expiryRegex = /^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/;
    if (!expiryRegex.test(newCardExpiry)) {
      openDialog("Invalid Expiry Date", "Expiry date must be in MM/YY format.", "⚠️");
      return;
    }
    
    const parts = newCardExpiry.split('/');
    const month = parseInt(parts[0].trim(), 10);
    const year = parseInt(parts[1].trim(), 10) + 2000;
    const now = new Date();
    const curMonth = now.getMonth() + 1;
    const curYear = now.getFullYear();
    
    if (year < curYear || (year === curYear && month < curMonth)) {
      openDialog("Expired Card", "The card expiration date cannot be in the past.", "⚠️");
      return;
    }

    // 4. Validate CVV Code
    if (!/^\d{3,4}$/.test(newCardCvv)) {
      openDialog("Invalid CVV", "CVV code must be a 3 or 4-digit number.", "⚠️");
      return;
    }

    const last4 = cleanNumber.slice(-4);
    const formattedNum = `•••• •••• •••• ${last4}`;
    const newId = savedCards.length > 0 ? Math.max(...savedCards.map(c => c.id)) + 1 : 1;
    const theme = newCardType === 'Visa' ? 'emerald' : 'dark';
    
    setSavedCards([
      ...savedCards,
      { 
        id: newId, 
        type: newCardType, 
        number: formattedNum, 
        holder: newCardHolder.toUpperCase(), 
        expiry: newCardExpiry, 
        tag: newCardTag, 
        isPrimary: false,
        theme: theme
      }
    ]);
    
    setNewCardNumber('');
    setNewCardExpiry('');
    setNewCardCvv('');
    setNewCardTag('Personal');
    setShowAddCard(false);
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    if (!newUpiId.trim()) return;

    // Strict validation for UPI ID: alphanumeric/dot/hyphen followed by '@' and bank handle
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(newUpiId.trim())) {
      openDialog("Invalid UPI ID", "Please enter a valid UPI ID (e.g. username@bankname). Only letters, numbers, dots, and hyphens before '@' are allowed.", "⚠️");
      return;
    }

    const newId = upiHandles.length > 0 ? Math.max(...upiHandles.map(h => h.id)) + 1 : 1;
    setUpiHandles([
      ...upiHandles,
      { id: newId, handle: newUpiId.trim(), status: 'Verified Backup', isPrimary: false }
    ]);
    setNewUpiId('');
    setShowAddUpi(false);
  };

  const handleDeleteUpi = (id) => {
    setUpiHandles(upiHandles.filter(h => h.id !== id));
  };

  const getPrimaryPaymentMethodName = () => {
    const primaryCard = savedCards.find(c => c.isPrimary);
    if (primaryCard) {
      return `${primaryCard.type} **${primaryCard.number.slice(-4)}`;
    }
    const primaryUpi = upiHandles.find(h => h.isPrimary);
    if (primaryUpi) {
      return `UPI - ${primaryUpi.handle}`;
    }
    return 'Saved Method';
  };

  // Automatically focus on tracking when checkout occurs
  useEffect(() => {
    if (activeOrder && activeOrder.status !== 'delivered') {
      setActiveSidebarTab('tracking');
    }
  }, [activeOrder?.id]);

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddressLine1 || !newAddressPhone || !newAddressFullName) return;
    
    const newId = addresses.length + 1;
    const nowStr = new Date().toISOString();
    
    const newAddressObj = {
      id: newId,
      buyer_id: 'buyer_99',
      type: newAddressCategory,
      full_name: newAddressFullName,
      phone: newAddressPhone,
      address_line1: newAddressLine1,
      address_line2: newAddressLine2,
      landmark: newAddressLandmark,
      city: newAddressCity,
      state: newAddressState,
      postal_code: newAddressPostalCode,
      country: newAddressCountry,
      latitude: newAddressLat || '0.0',
      longitude: newAddressLng || '0.0',
      delivery_instructions: newAddressInstructions,
      address_type: newAddressTag,
      is_default: newAddressIsDefault,
      created_at: nowStr,
      updated_at: nowStr
    };
    
    let updatedAddresses = [...addresses];
    if (newAddressIsDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, is_default: false }));
    }
    
    setAddresses([...updatedAddresses, newAddressObj]);
    
    // Clear inputs
    setNewAddressLine1('');
    setNewAddressLine2('');
    setNewAddressLandmark('');
    setNewAddressPostalCode('');
    setNewAddressInstructions('');
    setNewAddressIsDefault(false);
    setShowAddAddress(false);
    
    showToastNotification("🎉 Address saved successfully!", "🎉");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile(prev => ({ ...prev, avatar: reader.result }));
        setUser(prev => ({ ...prev, avatar: reader.result }));
        showToastNotification("📸 Profile picture updated successfully!", "📸");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSupportSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text: chatInput, time: timeNow };
    setSupportHistory(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulated automated response
    setTimeout(() => {
      let botText = "Thank you for reaching out. A support executive is looking into your request and will connect with you shortly.";
      if (chatInput.toLowerCase().includes('order') || chatInput.toLowerCase().includes('delivery')) {
        botText = activeOrder 
          ? `Your active order ${activeOrder.id} is currently in the "${activeOrder.status}" stage and will arrive in approx ${activeOrder.eta}.`
          : "I see you don't have any active deliveries. Your past orders are listed under 'My Orders'. Is there a specific transaction you need help with?";
      } else if (chatInput.toLowerCase().includes('refund') || chatInput.toLowerCase().includes('money')) {
        botText = "For refund queries, it generally takes 3-5 business days to reflect in your original payment source. You can check the transaction status under 'Payments & UPI'.";
      }
      setSupportHistory(prev => [...prev, { sender: 'bot', text: botText, time: timeNow }]);
    }, 1000);
  };

  // Interpolate rider coordinates on Noida SVG map
  const getRiderCoords = (progress) => {
    // Street path coordinates on 400x300 canvas:
    // Start: Nutritiva Warehouse at (60, 240)
    // Turning corner 1: (160, 240)
    // Turning corner 2: (160, 100)
    // End: Ipsita's Home at (340, 100)
    if (progress <= 22) {
      const f = progress / 22;
      return { x: 60 + f * 100, y: 240, angle: 0 };
    } else if (progress <= 55) {
      const f = (progress - 22) / 33;
      return { x: 160, y: 240 - f * 140, angle: -90 };
    } else {
      const f = Math.min(1, (progress - 55) / 45);
      return { x: 160 + f * 180, y: 100, angle: 0 };
    }
  };

  const riderPos = activeOrder ? getRiderCoords(activeOrder.riderProgress) : { x: 60, y: 240, angle: 0 };

  const handleUpgradeClick = () => {
    setShowUpgradeToast(true);
    setTimeout(() => setShowUpgradeToast(false), 3000);
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toUpperCase() : 'PENDING';
    let classes = 'bg-amber-50 text-amber-700 border-amber-100'; // Default / Pending
    
    if (s === 'DELIVERED') {
      classes = 'bg-emerald-50 text-emerald-700 border-emerald-100';
    } else if (s === 'CANCELLED') {
      classes = 'bg-rose-50 text-rose-700 border-rose-100';
    } else if (s === 'RETURNED') {
      classes = 'bg-purple-50 text-purple-700 border-purple-100';
    } else if (['PLACED', 'PACKING', 'ON_THE_WAY', 'ARRIVED'].includes(s)) {
      classes = 'bg-blue-50 text-blue-700 border-blue-100';
    }
    
    return (
      <span className={`px-2.5 py-0.5 text-[9px] border font-black tracking-wide rounded-full ${classes}`}>
        {s}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex relative" style={{background: 'linear-gradient(135deg, #ffdae7 0%, #fff5f9 35%, #ffeaf2 65%, #ffd6e5 100%)', backgroundAttachment: 'fixed'}}>
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-64 hidden lg:flex flex-col justify-between py-6 px-4 shrink-0 h-screen sticky top-0 z-40" style={{background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRight: '1px solid rgba(255,180,200,0.35)', boxShadow: '4px 0 24px rgba(255,100,150,0.06)'}}>
        
        <div className="flex flex-col">
          {/* Logo */}
          <div className="flex justify-center mb-6 cursor-pointer" onClick={() => setCurrentPage('store')}>
            <img src={logoImg} alt="Nutritiva Logo" className="h-28 w-auto object-contain" />
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">

            {/* My Profile */}
            <button
              onClick={() => setActiveSidebarTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'profile'
                  ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                  : 'text-slate-600 hover:bg-[#ffe5ec] hover:text-[#105335]'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>My Profile</span>
            </button>

            {/* My Favourites */}
            <button
              onClick={() => setActiveSidebarTab('favourites')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'favourites'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-900/20'
                  : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 shrink-0 ${activeSidebarTab === 'favourites' ? 'fill-white stroke-white' : wishlist.length > 0 ? 'fill-rose-400 stroke-rose-400' : ''}`} />
              <span>My Favourites</span>
              {wishlist.length > 0 && (
                <span className={`ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  activeSidebarTab === 'favourites' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600'
                }`}>{wishlist.length}</span>
              )}
            </button>
            
            {/* Live Tracking (Only if active order exists) */}
            {activeOrder && (
              <button
                onClick={() => setActiveSidebarTab('tracking')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all relative ${
                  activeSidebarTab === 'tracking'
                    ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                    : 'text-[#105335] bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/50'
                }`}
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>Live Tracking</span>
                {activeOrder.status !== 'delivered' && (
                  <span className="absolute right-3 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
                )}
              </button>
            )}

            {/* My Orders */}
            <button
              onClick={() => setActiveSidebarTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'orders'
                  ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                  : 'text-slate-600 hover:bg-[#ffe5ec] hover:text-[#105335]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>My Orders</span>
            </button>

            {/* Spendings & Charts */}
            <button
              onClick={() => setActiveSidebarTab('spending')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'spending'
                  ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                  : 'text-slate-600 hover:bg-[#ffe5ec] hover:text-[#105335]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Spendings & Charts</span>
            </button>

            {/* Saved Addresses */}
            <button
              onClick={() => setActiveSidebarTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'addresses'
                  ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                  : 'text-slate-600 hover:bg-[#ffe5ec] hover:text-[#105335]'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Saved Addresses</span>
            </button>

            {/* Payments */}
            <button
              onClick={() => setActiveSidebarTab('payments')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'payments'
                  ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                  : 'text-slate-600 hover:bg-[#ffe5ec] hover:text-[#105335]'
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>Payments & UPI</span>
            </button>

            {/* Support */}
            <button
              onClick={() => setActiveSidebarTab('support')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'support'
                  ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                  : 'text-slate-600 hover:bg-[#ffe5ec] hover:text-[#105335]'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Help & Support</span>
            </button>

            {/* Subscriptions */}
            <button
              onClick={() => setActiveSidebarTab('subscriptions')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'subscriptions'
                  ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                  : 'text-slate-600 hover:bg-[#ffe5ec] hover:text-[#105335]'
              }`}
            >
              <Repeat className="w-4 h-4 shrink-0" />
              <span>My Subscriptions</span>
            </button>

            {/* Reviews */}
            <button
              onClick={() => setActiveSidebarTab('reviews')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSidebarTab === 'reviews'
                  ? 'bg-brand-green text-white shadow-sm shadow-emerald-950/20'
                  : 'text-slate-600 hover:bg-[#ffe5ec] hover:text-[#105335]'
              }`}
            >
              <Star className="w-4 h-4 shrink-0" />
              <span>Reviews & Ratings</span>
            </button>

          </nav>
        </div>

        {/* Bottom Sidebar */}
        <div className="space-y-4">
          <hr className="border-[#ffd8e2]" />

          <div className="space-y-1">
            <button 
              onClick={() => setCurrentPage('store')}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-[#ffe5ec] hover:text-[#105335] transition-all text-left"
            >
              <LogOut className="w-4 h-4 shrink-0 rotate-180" />
              <span>Back to Shop</span>
            </button>
          </div>

          {/* Premium Membership Banner */}
          <div
            className="rounded-2xl p-4 relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-all"
            style={{background: 'linear-gradient(135deg, #0d4a2e, #105335)', border: '1px solid rgba(255,179,0,0.25)', boxShadow: '0 8px 24px rgba(16,83,53,0.3)'}}
            onClick={() => setActiveSidebarTab('vip')}
          >
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full opacity-10" style={{background: '#FFB300'}}></div>
            <p className="text-[9px] font-black tracking-widest uppercase text-amber-400 mb-1">👑 Membership</p>
            <h4 className="font-black text-white text-xs leading-tight mb-2">Nutritiva VIP Club</h4>
            <p className="text-[9px] text-emerald-200/80 font-semibold mb-3 leading-tight">Save ₹240/month in deliveries + exclusive perks!</p>
            <div className="w-full text-[10px] font-black py-1.5 rounded-xl flex items-center justify-center gap-1.5" style={{background: 'linear-gradient(135deg, #FFB300, #FF8C00)', color: '#0d1f17'}}>
              <span>View VIP Perks</span>
              <Crown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

      </aside>

      {/* 2. Main Content Frame */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Navigation Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-pink-200/50 sticky top-0 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <img 
                src={logoImg} 
                alt="Nutritiva Logo" 
                className="h-16 w-auto object-contain cursor-pointer lg:hidden"
                onClick={() => setCurrentPage('store')}
              />
              <div>
                <h2 className="text-lg font-black text-slate-800 leading-none capitalize">
                  {activeSidebarTab === 'tracking' ? 'Live Order Tracking' : activeSidebarTab === 'profile' ? 'My Profile' : activeSidebarTab.replace('&', ' & ')}
                </h2>
                <p className="text-xs text-slate-450 font-semibold mt-1">
                  Customer Portal — <span className="text-emerald-600 font-bold">{user.name} 👋</span>
                </p>
              </div>
            </div>

            {/* Quick Switch Menu for Mobile Users */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl lg:hidden text-[10px] font-bold">
              {activeOrder && (
                <button 
                  onClick={() => setActiveSidebarTab('tracking')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${activeSidebarTab === 'tracking' ? 'bg-white shadow-xs text-brand-green' : 'text-slate-500'}`}
                >
                  Tracking
                </button>
              )}
              <button 
                onClick={() => setActiveSidebarTab('orders')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeSidebarTab === 'orders' ? 'bg-white shadow-xs text-brand-green' : 'text-slate-500'}`}
              >
                Orders
              </button>
              <button 
                onClick={() => setActiveSidebarTab('spending')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeSidebarTab === 'spending' ? 'bg-white shadow-xs text-brand-green' : 'text-slate-500'}`}
              >
                Spendings
              </button>
            </div>

            {/* Header toolbar */}
            <div className="flex items-center gap-4">
              
              <button 
                onClick={() => setCurrentPage('store')}
                className="hidden sm:flex items-center gap-1.5 border-2 border-brand-green text-brand-green font-black text-xs px-4 py-1.5 rounded-xl hover:bg-emerald-50 transition-colors shadow-2xs"
              >
                Shop Store
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center transition-all hover:bg-slate-200 relative"
                >
                  <Bell className="w-4 h-4 text-slate-700" />
                  {notifications.filter(n => !n.is_read).length > 0 && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black text-white shadow-xs">
                      {notifications.filter(n => !n.is_read).length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute top-12 right-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in text-left">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-800">Notifications</h4>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{notifications.filter(n => !n.is_read).length} New</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto" style={{scrollbarWidth: 'thin'}}>
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs font-semibold">No notifications yet!</div>
                      ) : (
                        notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            onClick={() => markNotificationRead(notification.id)}
                            className={`px-4 py-3 border-b border-slate-50 cursor-pointer transition-colors ${!notification.is_read ? 'bg-emerald-50/30 hover:bg-emerald-50' : 'hover:bg-slate-50 opacity-75'}`}
                          >
                            <div className="flex items-start justify-between mb-1">
                              <h5 className={`text-xs font-black ${!notification.is_read ? 'text-slate-800' : 'text-slate-600'}`}>{notification.title}</h5>
                              {!notification.is_read && <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"></span>}
                            </div>
                            <p className="text-[10px] font-semibold text-slate-500 leading-tight mb-2">{notification.message}</p>
                            <p className="text-[9px] font-black text-slate-400">{new Date(notification.created_at).toLocaleDateString()} at {new Date(notification.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <img 
                  src={user.avatar || ipsitaAvatar} 
                  alt="Ipsita Profile" 
                  className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500 shadow-xs" 
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-none">{user.name}</p>
                  <span className="text-[9px] text-amber-500 font-extrabold">{user.status}</span>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Inner Content Grid */}
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">

          {/* MY PROFILE TAB */}
          {activeSidebarTab === 'profile' && (
            <div className="animate-fade-in space-y-6 text-left">
              
              {/* Profile Header Card */}
              <div className="rounded-3xl p-8 text-white relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0d4a2e 0%, #105335 50%, #0a3d26 100%)', boxShadow: '0 12px 40px rgba(16,83,53,0.3)'}}>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 -mr-16 -mt-16" style={{background: 'rgba(255,255,255,0.2)'}}></div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl" style={{border: '4px solid rgba(255,255,255,0.3)'}}>
                      <img src={user.avatar || ipsitaAvatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div 
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => document.getElementById('profile-photo-upload').click()}
                    >
                      📸
                    </div>
                    <input
                      type="file"
                      id="profile-photo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h2 className="text-2xl font-black leading-tight">{user.name}</h2>
                    <p className="text-emerald-250 text-sm font-semibold mt-0.5">{user.email}</p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full" style={{background: 'rgba(255,179,0,0.2)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.3)'}}>
                        ✦ {user.status}
                      </span>
                      <span className="text-xs font-bold text-emerald-300">Since Jan 2024</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto sm:ml-auto grid grid-cols-3 gap-4 sm:gap-6 text-center border-t border-emerald-800/40 sm:border-0 pt-4 sm:pt-0 mt-4 sm:mt-0">
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-amber-400">24</p>
                      <p className="text-[10px] sm:text-xs text-emerald-200 font-semibold">Orders</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-amber-400">₹8.4K</p>
                      <p className="text-[10px] sm:text-xs text-emerald-200 font-semibold">Spent</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-amber-400">1,240</p>
                      <p className="text-[10px] sm:text-xs text-emerald-200 font-semibold">Reward Pts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Personal Info (Editable) */}
                <div className="lg:col-span-2 rounded-3xl p-6" style={{background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,160,190,0.3)', boxShadow: '0 4px 20px rgba(255,100,150,0.08)'}}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-slate-900">Personal Information</h3>
                    <button
                      onClick={() => {
                        const errors = {};
                        const nameVal = (tempProfile.name || '').trim();
                        if (!nameVal) {
                          errors.name = "Full Name is required.";
                        } else if (/\d/.test(nameVal)) {
                          errors.name = "Full Name cannot contain numbers.";
                        } else if (/[^a-zA-Z\s.-]/.test(nameVal)) {
                          errors.name = "Full Name cannot contain special characters.";
                        } else if (nameVal.length > 100) {
                          errors.name = "Full Name cannot exceed 100 characters.";
                        }

                        const phoneVal = (tempProfile.phone || '').trim();
                        if (!phoneVal) {
                          errors.phone = "Phone Number is required.";
                        } else if (/[^\d]/.test(phoneVal)) {
                          errors.phone = "Phone Number must contain only numeric digits.";
                        } else if (selectedCountry.code === "+91") {
                          if (phoneVal.length !== 10) {
                            errors.phone = "Indian Phone Number must be exactly 10 digits.";
                          } else if (!/^[5-9]/.test(phoneVal)) {
                            errors.phone = "Indian Phone Number must start with a valid mobile digit (5-9).";
                          }
                        } else {
                          if (phoneVal.length < 7 || phoneVal.length > 15) {
                            errors.phone = `International Phone Number for ${selectedCountry.code} must be between 7 and 15 digits.`;
                          }
                        }

                        const emailVal = (tempProfile.email || '').trim();
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailVal) {
                          errors.email = "Email Address is required.";
                        } else if (!emailRegex.test(emailVal)) {
                          errors.email = "Invalid Email Address format.";
                        }

                        const dobVal = tempProfile.dob;
                        if (dobVal) {
                          const dobDate = new Date(dobVal);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          if (isNaN(dobDate.getTime())) {
                            errors.dob = "Invalid Date of Birth format.";
                          } else if (dobDate > today) {
                            errors.dob = "Date of Birth cannot be in the future.";
                          }
                        }

                        const cityVal = (tempProfile.city || '').trim();
                        if (!cityVal) {
                          errors.city = "City is required.";
                        } else if (/\d/.test(cityVal)) {
                          errors.city = "City cannot contain numbers.";
                        }

                        if (Object.keys(errors).length > 0) {
                          setProfileErrors(errors);
                          openDialog("Validation Error", errors.name || errors.phone || errors.email || errors.dob || errors.city, "⚠️");
                          return;
                        }

                        // Save without changes check (TC57)
                        const isUnchanged = 
                          tempProfile.name === user.name &&
                          tempProfile.phone === user.phone &&
                          tempProfile.email === user.email &&
                          tempProfile.dob === user.dob &&
                          tempProfile.gender === user.gender &&
                          tempProfile.city === user.city;
                        
                        if (isUnchanged) {
                          openDialog("No Changes", "No changes detected to save. Profile details are already up to date!", "ℹ️");
                          return;
                        }

                        setProfileErrors({});
                        setUser(prev => ({ ...prev, ...tempProfile }));
                        showToastNotification("🎉 Profile saved successfully!", "🎉");
                      }}
                      className="text-xs font-black px-4 py-2 rounded-xl text-white transition-all hover:scale-105 active:scale-95"
                      style={{background: 'linear-gradient(135deg, #105335, #0a3d26)'}}
                    >
                      Save Changes
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={tempProfile.name}
                        onChange={e => setTempProfile({ ...tempProfile, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none transition-all"
                        style={{
                          background: '#f8fafc',
                          border: profileErrors.name ? '1.5px solid #ef4444' : '1.5px solid rgba(255,160,190,0.4)'
                        }}
                        onFocus={e => e.target.style.borderColor = '#105335'}
                        onBlur={e => e.target.style.borderColor = profileErrors.name ? '#ef4444' : 'rgba(255,160,190,0.4)'}
                      />
                      {profileErrors.name && (
                        <p className="text-red-500 text-[10px] font-bold mt-1">{profileErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1.5">Phone Number</label>
                      <div className="flex gap-2">
                        {/* Custom Hover-Triggered Dropdown */}
                        <div 
                          className="relative"
                          onMouseEnter={() => setIsDropdownHovered(true)}
                          onMouseLeave={() => setIsDropdownHovered(false)}
                        >
                          <button
                            type="button"
                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 border bg-white hover:bg-slate-50 transition-all h-full shrink-0"
                            style={{
                              borderColor: 'rgba(255,160,190,0.4)'
                            }}
                          >
                            <span>{selectedCountry.flag}</span>
                            <span>{selectedCountry.code}</span>
                            <span className="text-[10px] text-slate-400">▼</span>
                          </button>
                          
                          {isDropdownHovered && (
                            <div className="absolute left-0 mt-1 w-52 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1 animate-fade-in text-left">
                              {COUNTRIES.map((c, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setIsDropdownHovered(false);
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#f4fef5] hover:text-[#105335] flex items-center gap-2.5 transition-colors"
                                >
                                  <span className="text-sm">{c.flag}</span>
                                  <span className="font-bold">{c.code}</span>
                                  <span className="text-slate-450 text-[10px] truncate">({c.name})</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <input
                            type="text"
                            value={tempProfile.phone}
                            onChange={e => setTempProfile({ ...tempProfile, phone: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none transition-all"
                            style={{
                              background: '#f8fafc',
                              border: profileErrors.phone ? '1.5px solid #ef4444' : '1.5px solid rgba(255,160,190,0.4)'
                            }}
                            onFocus={e => e.target.style.borderColor = '#105335'}
                            onBlur={e => e.target.style.borderColor = profileErrors.phone ? '#ef4444' : 'rgba(255,160,190,0.4)'}
                          />
                        </div>
                      </div>
                      {profileErrors.phone && (
                        <p className="text-red-500 text-[10px] font-bold mt-1">{profileErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={e => setTempProfile({ ...tempProfile, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none transition-all"
                        style={{
                          background: '#f8fafc',
                          border: profileErrors.email ? '1.5px solid #ef4444' : '1.5px solid rgba(255,160,190,0.4)'
                        }}
                        onFocus={e => e.target.style.borderColor = '#105335'}
                        onBlur={e => e.target.style.borderColor = profileErrors.email ? '#ef4444' : 'rgba(255,160,190,0.4)'}
                      />
                      {profileErrors.email && (
                        <p className="text-red-500 text-[10px] font-bold mt-1">{profileErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1.5">Date of Birth</label>
                      <input
                        type="date"
                        value={tempProfile.dob}
                        onChange={e => setTempProfile({ ...tempProfile, dob: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none transition-all"
                        style={{
                          background: '#f8fafc',
                          border: profileErrors.dob ? '1.5px solid #ef4444' : '1.5px solid rgba(255,160,190,0.4)'
                        }}
                        onFocus={e => e.target.style.borderColor = '#105335'}
                        onBlur={e => e.target.style.borderColor = profileErrors.dob ? '#ef4444' : 'rgba(255,160,190,0.4)'}
                      />
                      {profileErrors.dob && (
                        <p className="text-red-500 text-[10px] font-bold mt-1">{profileErrors.dob}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1.5">Gender</label>
                      <select
                        value={tempProfile.gender}
                        onChange={e => setTempProfile({ ...tempProfile, gender: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none transition-all appearance-none cursor-pointer"
                        style={{background: '#f8fafc', border: '1.5px solid rgba(255,160,190,0.4)'}}
                      >
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1.5">City</label>
                      <input
                        type="text"
                        list="city-suggestions"
                        value={tempProfile.city}
                        onChange={e => setTempProfile({ ...tempProfile, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none transition-all"
                        style={{
                          background: '#f8fafc',
                          border: profileErrors.city ? '1.5px solid #ef4444' : '1.5px solid rgba(255,160,190,0.4)'
                        }}
                        onFocus={e => e.target.style.borderColor = '#105335'}
                        onBlur={e => e.target.style.borderColor = profileErrors.city ? '#ef4444' : 'rgba(255,160,190,0.4)'}
                      />
                      {profileErrors.city && (
                        <p className="text-red-500 text-[10px] font-bold mt-1">{profileErrors.city}</p>
                      )}
                      <datalist id="city-suggestions">
                        <option value="Noida, Uttar Pradesh" />
                        <option value="Delhi, NCR" />
                        <option value="Gurugram, Haryana" />
                        <option value="Bengaluru, Karnataka" />
                        <option value="Mumbai, Maharashtra" />
                        <option value="Kolkata, West Bengal" />
                        <option value="Hyderabad, Telangana" />
                        <option value="Chennai, Tamil Nadu" />
                        <option value="Pune, Maharashtra" />
                      </datalist>
                    </div>
                  </div>

                  {/* Dietary Preferences */}
                  <div className="mt-6">
                    <h4 className="text-sm font-black text-slate-800 mb-3">Dietary Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Vegetarian', 'No Added Sugar', 'Gluten-Free', 'High Protein', 'Organic Only'].map(tag => {
                        const isActive = healthPreferences.some(h => h.preference === tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleHealthPreference(tag)}
                            className="text-xs font-black px-3 py-1.5 rounded-xl transition-all"
                            style={{
                              background: isActive ? '#105335' : '#f8fafc',
                              color: isActive ? 'white' : '#475569',
                              border: '1.5px solid rgba(255,160,190,0.3)'
                            }}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => {
                        showToastNotification("🎉 Dietary preferences updated successfully!", "🎉");
                      }}
                      className="mt-4 text-xs font-black px-4 py-2 rounded-xl text-white transition-all hover:scale-105 active:scale-95 text-center"
                      style={{background: 'linear-gradient(135deg, #105335, #0a3d26)'}}
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>

                {/* Right: Membership + Notification Settings */}
                <div className="space-y-4">

                  {/* Membership Card */}
                  <div className="rounded-3xl p-5 text-white relative overflow-hidden" style={{background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', boxShadow: '0 8px 24px rgba(124,58,237,0.3)'}}>
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20" style={{background: 'rgba(255,255,255,0.3)'}}></div>
                    <p className="text-[10px] font-black tracking-widest uppercase text-purple-300 mb-2">Membership</p>
                    <h3 className="text-xl font-black mb-0.5">{user.status}</h3>
                    <p className="text-[10px] text-purple-200 font-bold mb-3 uppercase tracking-wider">ID: MID-{user.id ? user.id.toString().replace('u_', '').toUpperCase() : 'NUTR001'}</p>
                    <p className="text-xs text-purple-200 font-semibold mb-4">Renews: Dec 31, 2026</p>
                    <div className="space-y-1.5 mb-4">
                      {['Unlimited Free Delivery', 'Priority Packing', 'Exclusive Member Deals', 'Early Sale Access'].map(b => (
                        <div key={b} className="flex items-center gap-2 text-xs font-semibold text-purple-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span> {b}
                        </div>
                      ))}
                    </div>
                    {!user.status.includes('Platinum') && (
                      <button
                        onClick={() => openDialog('Upgrade to Platinum', 'Platinum membership is available for just ₹299/month or ₹2399/yearly.\n\nBenefits:\n• 25% off on all orders\n• Free birthday gift box\n• Dedicated account manager\n• Zero delivery fees always\n\nYou can activate it under the VIP Membership Tab! 💎', '💎')}
                        className="w-full text-xs font-black py-2 rounded-xl transition-all hover:scale-[1.02]" style={{background: 'rgba(255,179,0,0.9)', color: '#4c1d95'}}
                      >
                        Upgrade to Platinum ✦
                      </button>
                    )}
                  </div>

                  {/* Notification Settings */}
                  <div className="rounded-3xl p-5" style={{background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,160,190,0.3)', boxShadow: '0 4px 16px rgba(255,100,150,0.07)'}}>
                    <h4 className="text-sm font-black text-slate-900 mb-4">Notifications</h4>
                    {[
                      { label: 'Order Updates', sub: 'Packing, dispatch, delivery', on: true },
                      { label: 'Offers & Deals', sub: 'Flash sales & coupons', on: true },
                      { label: 'Newsletter', sub: 'Health tips & recipes', on: false },
                      { label: 'Account Alerts', sub: 'Login & security', on: true }
                    ].map(n => (
                      <div key={n.label} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{borderColor: 'rgba(255,180,200,0.2)'}}>
                        <div>
                          <p className="text-xs font-black text-slate-800">{n.label}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{n.sub}</p>
                        </div>
                        <button
                          onClick={e => {
                            const btn = e.currentTarget;
                            const isOn = btn.dataset.on === '1';
                            btn.dataset.on = isOn ? '0' : '1';
                            btn.style.background = isOn ? '#e2e8f0' : '#105335';
                            btn.querySelector('span').style.transform = isOn ? 'translateX(0px)' : 'translateX(16px)';
                          }}
                          data-on={n.on ? '1' : '0'}
                          className="w-10 h-6 rounded-full flex items-center px-1 transition-all duration-300 shrink-0"
                          style={{background: n.on ? '#105335' : '#e2e8f0'}}
                        >
                          <span className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300" style={{transform: n.on ? 'translateX(16px)' : 'translateX(0px)'}}></span>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        showToastNotification("🎉 Preferences saved successfully!", "🎉");
                      }}
                      className="mt-4 w-full text-xs font-black py-2 rounded-xl text-white transition-all hover:scale-105 active:scale-95 text-center"
                      style={{background: 'linear-gradient(135deg, #105335, #0a3d26)'}}
                    >
                      Save Preferences
                    </button>
                  </div>

                  {/* Account Actions */}
                  <div className="rounded-3xl p-5" style={{background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,160,190,0.3)', boxShadow: '0 4px 16px rgba(255,100,150,0.07)'}}>
                    <h4 className="text-sm font-black text-slate-900 mb-3">Account Actions</h4>
                    <div className="space-y-2">
                      <button onClick={() => openDialog('Change Password', 'A password reset link has been sent to ' + user.email + '.', '🔑')} className="w-full text-left text-xs font-bold px-3 py-2 rounded-xl transition-all hover:bg-slate-50 text-slate-700 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs">🔑</span> Change Password
                      </button>
                      <button onClick={() => openDialog('Two-Factor Authentication', 'Please scan the QR code in the Nutritiva app to enable 2FA.\n\n(Feature coming soon)', '🔐')} className="w-full text-left text-xs font-bold px-3 py-2 rounded-xl transition-all hover:bg-slate-50 text-slate-700 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs">🔐</span> Enable 2-Factor Auth
                      </button>
                      <button onClick={() => openDialog('Delete Account', 'This will permanently delete your account and all data. This action cannot be undone.\n\nPlease email support@nutritiva.in to proceed.', '⚠️')} className="w-full text-left text-xs font-bold px-3 py-2 rounded-xl transition-all hover:bg-red-50 text-red-500 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center text-xs">🗑️</span> Delete Account
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* VIP MEMBERSHIP TAB */}
          {activeSidebarTab === 'vip' && (
            <VipMembershipPage onClose={() => setActiveSidebarTab('orders')} />
          )}

          {/* FAVOURITES TAB */}

          {activeSidebarTab === 'favourites' && (
            <div className="animate-fade-in space-y-6 text-left">

              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 fill-rose-500 stroke-rose-500" />
                    </span>
                    My Favourites
                  </h2>
                  <p className="text-sm text-slate-500 font-semibold mt-1 ml-13">
                    {wishlist.length > 0 ? `${wishlist.length} product${wishlist.length !== 1 ? 's' : ''} saved` : 'No saved products yet'}
                  </p>
                </div>
                {wishlist.length > 0 && (
                  <button
                    onClick={() => setCurrentPage('store')}
                    className="text-sm font-black px-5 py-2.5 rounded-xl text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    style={{background: 'linear-gradient(135deg, #105335, #0a3d26)'}}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Shop More
                  </button>
                )}
              </div>

              {wishlist.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-20 rounded-3xl" style={{background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(255,160,190,0.3)'}}>
                  <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center mb-6">
                    <Heart className="w-12 h-12 text-rose-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">No Favourites Yet</h3>
                  <p className="text-sm text-slate-400 font-semibold mb-8 text-center max-w-xs">Tap the ❤️ heart on any product to save it here for quick access.</p>
                  <button
                    onClick={() => setCurrentPage('store')}
                    className="font-black text-sm px-8 py-3 rounded-2xl text-white transition-all hover:scale-105"
                    style={{background: 'linear-gradient(135deg, #105335, #0a3d26)'}}
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {wishlist.map(w => {
                    const product = products.find(p => p.id === w.product_id);
                    if (!product) return null;
                    const inCart = cart.find(c => c.product_id === product.id);
                    return (
                      <div key={w.id} className="rounded-2xl p-4 flex flex-col relative group card-hover" style={{background: 'rgba(255,255,255,0.97)', border: '1.5px solid rgba(255,160,190,0.25)', boxShadow: '0 4px 20px rgba(255,100,150,0.08)'}}>
                        
                        {/* Remove from Favourites */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition-all active:scale-90 z-10"
                          title="Remove from Favourites"
                        >
                          <Heart className="w-4 h-4 fill-rose-400 stroke-rose-400" />
                        </button>

                        {/* Discount Badge */}
                        {product.discount && (
                          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg z-10">
                            {product.discount}
                          </span>
                        )}

                        {/* Product Image */}
                        <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-3 mb-3">
                          <img
                            src={imageMap[product.image]}
                            alt={product.name}
                            className="max-h-28 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <h4 className="font-black text-slate-800 text-sm tracking-tight line-clamp-2 mb-1">{product.name}</h4>
                        <p className="text-xs text-slate-400 font-bold mb-1">{product.weight}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-xs font-bold mb-3">
                          <Heart className="w-3 h-3 fill-rose-400 stroke-rose-400" />
                          <span className="text-slate-600">{product.rating}</span>
                          <span className="text-slate-400">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-auto mb-3">
                          <span className="text-lg font-black text-slate-900">₹{product.price}</span>
                          <span className="text-xs text-slate-400 font-semibold line-through">₹{product.originalPrice}</span>
                          <span className="text-xs font-black text-emerald-600">{product.discount}</span>
                        </div>

                        {/* Add to Cart */}
                        {inCart ? (
                          <div className="w-full text-white text-xs font-black py-2.5 rounded-xl flex items-center justify-between px-4" style={{background: '#105335'}}>
                            <button onClick={() => addToCart(product)} className="text-lg leading-none hover:scale-125 transition-transform">−</button>
                            <span>{inCart.quantity} in cart</span>
                            <button onClick={() => addToCart(product)} className="text-lg leading-none hover:scale-125 transition-transform">+</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full text-sm font-black py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                            style={{background: 'linear-gradient(135deg, #105335, #0a3d26)', color: 'white'}}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* A. Live Order Tracking Tab (Blinkit/Zepto-style) */}
          {activeSidebarTab === 'tracking' && activeOrder && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in text-left">
              
              {/* Map & Timeline */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Visual SVG Map */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                        <Compass className="w-4 h-4 text-emerald-600 animate-spin-slow" />
                        <span>Live Delivery Location Map</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Tracking route from Store to Noida Sec-62</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-xl border border-emerald-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>GPS Connected</span>
                    </span>
                  </div>

                  {/* SVG Map Layout */}
                  <div className="w-full bg-[#1A2622] rounded-2xl relative overflow-hidden border border-slate-900 shadow-inner flex items-center justify-center p-1">
                    <svg className="w-full h-[280px]" viewBox="0 0 400 300">
                      {/* Grid Lines for city block effect */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#253530" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* City Streets/Borders */}
                      <rect x="180" y="20" width="80" height="60" rx="4" fill="#151F1C" />
                      <rect x="20" y="80" width="100" height="80" rx="4" fill="#151F1C" />
                      <rect x="220" y="140" width="100" height="120" rx="4" fill="#151F1C" />

                      {/* Landmarks */}
                      <text x="35" y="130" fill="#2d423b" fontSize="8" fontWeight="bold">Sec-61 Park</text>
                      <text x="245" y="195" fill="#2d423b" fontSize="8" fontWeight="bold">Sec-62 Metro</text>

                      {/* Delivery Path Dotted Line */}
                      <path 
                        d="M 60 240 L 160 240 L 160 100 L 340 100" 
                        fill="none" 
                        stroke="#2f483c" 
                        strokeWidth="5" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M 60 240 L 160 240 L 160 100 L 340 100" 
                        fill="none" 
                        stroke="#105335" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="6,6"
                      />

                      {/* Warehouse Marker (Start Point) */}
                      <circle cx="60" cy="240" r="14" fill="#105335" stroke="#1d8f5c" strokeWidth="2" />
                      <text x="60" y="244" fill="#white" fontSize="9" fontWeight="bold" textAnchor="middle">🏪</text>
                      <text x="60" y="268" fill="#a3b899" fontSize="8" fontWeight="black" textAnchor="middle">Nutritiva Store</text>

                      {/* Home Marker (End Point) */}
                      <circle cx="340" cy="100" r="14" fill="#b91c1c" stroke="#f87171" strokeWidth="2" />
                      <text x="340" y="104" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">📍</text>
                      <text x="340" y="128" fill="#fca5a5" fontSize="8" fontWeight="black" textAnchor="middle">Ipsita's Home</text>

                      {/* Rider Icon (Moving along coordinates) */}
                      <g transform={`translate(${riderPos.x}, ${riderPos.y}) rotate(${riderPos.angle})`}>
                        {/* Ripple Effect ring */}
                        <circle cx="0" cy="0" r="16" fill="#105335" className="opacity-20 animate-ping" />
                        <circle cx="0" cy="0" r="10" fill="#105335" stroke="white" strokeWidth="1.5" />
                        <text x="0" y="4" fill="white" fontSize="9" textAnchor="middle" className="rotate-0 font-bold">🛵</text>
                      </g>
                    </svg>

                    {/* Progress Percentage Overlay */}
                    <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white rounded-xl py-1.5 px-3 border border-slate-800 text-[10px] font-black">
                      Delivery Progress: {activeOrder.riderProgress}%
                    </div>
                  </div>
                </div>

                {/* Delivery Timeline Progress Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
                  <h3 className="font-bold text-slate-800 text-sm">Delivery Status Timeline</h3>
                  
                  <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-2">
                    
                    {/* Step 1: Placed */}
                    <div className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${
                        ['placed', 'packing', 'on_the_way', 'arrived', 'delivered'].includes(activeOrder.status)
                          ? 'bg-brand-green border-brand-green text-white'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}>
                        ✓
                      </div>
                      <div className="text-left md:text-center">
                        <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight">Order Placed</h4>
                        <span className="text-[9px] text-slate-450 block font-semibold">11:15 PM</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-0.5 bg-slate-200 flex-1 -mt-4"></div>

                    {/* Step 2: Packing */}
                    <div className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${
                        ['packing', 'on_the_way', 'arrived', 'delivered'].includes(activeOrder.status)
                          ? 'bg-brand-green border-brand-green text-white'
                          : activeOrder.status === 'placed'
                          ? 'bg-white border-brand-green text-brand-green animate-pulse'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}>
                        {['packing', 'on_the_way', 'arrived', 'delivered'].includes(activeOrder.status) ? '✓' : '2'}
                      </div>
                      <div className="text-left md:text-center">
                        <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight">Hygienic Packing</h4>
                        <span className="text-[9px] text-slate-450 block font-semibold">11:17 PM</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-0.5 bg-slate-200 flex-1 -mt-4"></div>

                    {/* Step 3: Out for Delivery */}
                    <div className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${
                        ['on_the_way', 'arrived', 'delivered'].includes(activeOrder.status)
                          ? 'bg-brand-green border-brand-green text-white'
                          : activeOrder.status === 'packing'
                          ? 'bg-white border-brand-green text-brand-green animate-pulse'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}>
                        {['on_the_way', 'arrived', 'delivered'].includes(activeOrder.status) ? '✓' : '3'}
                      </div>
                      <div className="text-left md:text-center">
                        <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight">Out for Delivery</h4>
                        <span className="text-[9px] text-slate-450 block font-semibold">In Progress</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-0.5 bg-slate-200 flex-1 -mt-4"></div>

                    {/* Step 4: Arrived */}
                    <div className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${
                        ['arrived', 'delivered'].includes(activeOrder.status)
                          ? 'bg-brand-green border-brand-green text-white'
                          : activeOrder.status === 'on_the_way'
                          ? 'bg-white border-brand-green text-brand-green animate-pulse'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}>
                        {['arrived', 'delivered'].includes(activeOrder.status) ? '✓' : '4'}
                      </div>
                      <div className="text-left md:text-center">
                        <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight">Doorstep Delivery</h4>
                        <span className="text-[9px] text-slate-450 block font-semibold">
                          {activeOrder.status === 'delivered'
                            ? 'Delivered'
                            : activeOrder.status === 'arrived'
                            ? 'Arrived'
                            : activeOrder.status === 'on_the_way'
                            ? 'In Progress'
                            : 'Pending'}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* ETA Panel & Ordered Items Card */}
              <div className="space-y-6">
                
                {/* Delivery ETA card */}
                <div className="bg-[#105335] text-white rounded-3xl p-6 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl"></div>
                  
                  <span className="text-[10px] bg-white/10 text-emerald-200 font-extrabold px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-wider block w-fit">Estimated Delivery</span>
                  
                  <h2 className="text-4xl font-black mt-4 tracking-tight flex items-baseline gap-1.5">
                    <span>{activeOrder.eta}</span>
                    <span className="text-xs text-emerald-250 font-bold block animate-pulse">● Live Countdown</span>
                  </h2>
                  
                  <p className="text-[11px] text-emerald-100 font-semibold mt-2.5 leading-relaxed">
                    {activeOrder.riderStatus}
                  </p>

                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-lg font-bold shrink-0">
                      🚴
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] text-emerald-300 font-bold uppercase block tracking-wider">Assigned Delivery Partner</span>
                      <h4 className="font-extrabold text-xs truncate">{activeOrder.riderName}</h4>
                      <span className="text-[9px] text-amber-300 font-bold block mt-0.5">★ {activeOrder.riderRating} Rating</span>
                    </div>
                    {activeOrder.status === 'on_the_way' && (
                      <a href={`tel:${activeOrder.riderPhone}`} className="w-8 h-8 rounded-full bg-white text-[#105335] flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm transition-transform">
                        <Phone className="w-3.5 h-3.5 fill-[#105335]" />
                      </a>
                    )}
                  </div>

                  {activeOrder.status === 'delivered' && (
                    <button
                      onClick={() => {
                        setActiveOrder(null);
                        setActiveSidebarTab('orders');
                      }}
                      className="mt-4 w-full bg-white text-[#105335] hover:bg-emerald-50 text-xs font-black py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
                    >
                      Got it, Close Tracking ✓
                    </button>
                  )}
                </div>

                {/* Items in Delivery Summary */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col">
                  <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 mb-4">Ordered Items Details</h3>
                  
                  <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                    {activeOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0">
                            <img src={imageMap[item.image]} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-xs text-slate-850 truncate">{item.name}</h4>
                            <span className="text-[9px] text-slate-400 font-bold block">{item.weight} x {item.quantity}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-brand-green">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-4 mt-4 space-y-1.5 text-xs text-slate-650">
                    <div className="flex justify-between font-semibold">
                      <span>Order Subtotal</span>
                      <span>₹{activeOrder.amount}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-brand-green">
                      <span>Club Delivery Charges</span>
                      <span className="line-through text-slate-400 mr-1.5">₹30</span>
                      <span>FREE</span>
                    </div>
                    <hr className="border-slate-100 my-1" />
                    <div className="flex justify-between font-black text-slate-850">
                      <span>Total Amount Paid</span>
                      <span className="text-brand-green text-sm">₹{activeOrder.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. My Orders Tab */}
          {activeSidebarTab === 'orders' && (
            <div className="grid grid-cols-1 gap-6 animate-fade-in text-left">

              {/* ── Active Order Banner ── */}
              {activeOrder ? (
                <div className="relative overflow-hidden rounded-3xl border border-emerald-200 shadow-lg bg-gradient-to-br from-[#0d3d26] via-[#105335] to-[#1a6b44]">

                  {/* Decorative background circles */}
                  <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

                  <div className="relative z-10 p-6">

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        {/* Pulsing dot */}
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                        </span>
                        <div>
                          <h3 className="text-white font-black text-base leading-tight">Active Order</h3>
                          <p className="text-emerald-300 text-[10px] font-semibold mt-0.5">#{activeOrder.orderNumber || 'NT00001'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* ETA badge */}
                        <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-black px-3 py-1.5 rounded-xl">
                          <Clock className="w-3.5 h-3.5 text-emerald-300" />
                          <span>ETA: {activeOrder.eta}</span>
                        </div>

                        {/* Track Live button */}
                        <button
                          onClick={() => setActiveSidebarTab('tracking')}
                          className="flex items-center gap-1.5 bg-white text-emerald-700 text-[11px] font-black px-3 py-1.5 rounded-xl hover:bg-emerald-50 active:scale-95 transition-all shadow-md"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          Track Live
                        </button>
                      </div>
                    </div>

                    {/* Status label */}
                    <p className="text-emerald-100 text-xs font-semibold mb-4 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-300 shrink-0" />
                      {activeOrder.riderStatus}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-5">
                      <div className="flex justify-between text-[10px] font-bold text-emerald-300 mb-1.5">
                        <span>Order Placed</span>
                        <span>{activeOrder.riderProgress}% complete</span>
                        <span>Delivered</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-300 to-emerald-400 rounded-full transition-all duration-700"
                          style={{ width: `${activeOrder.riderProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Status Steps */}
                    <div className="flex justify-between items-center mb-5">
                      {[
                        { key: 'placed',     label: 'Confirmed', icon: '✅' },
                        { key: 'packing',    label: 'Packing',   icon: '📦' },
                        { key: 'on_the_way', label: 'On Way',    icon: '🛵' },
                        { key: 'arrived',    label: 'Arrived',   icon: '📍' },
                        { key: 'delivered',  label: 'Delivered', icon: '🎉' },
                      ].map((step, i, arr) => {
                        const statusOrder = ['placed', 'packing', 'on_the_way', 'arrived', 'delivered'];
                        const currentIdx  = statusOrder.indexOf(activeOrder.status);
                        const stepIdx     = statusOrder.indexOf(step.key);
                        const isDone      = stepIdx <= currentIdx;
                        const isActive    = step.key === activeOrder.status;
                        return (
                          <div key={step.key} className="flex flex-col items-center gap-1 flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                              isActive  ? 'bg-white shadow-lg scale-110 ring-2 ring-emerald-300' :
                              isDone    ? 'bg-emerald-400/30 border border-emerald-400/50' :
                                          'bg-white/10 border border-white/10'
                            }`}>
                              {step.icon}
                            </div>
                            <span className={`text-[8px] font-black text-center ${isDone ? 'text-emerald-200' : 'text-white/30'}`}>
                              {step.label}
                            </span>
                            {i < arr.length - 1 && (
                              <div className="hidden" /> /* spacer handled by flex-1 */
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Rider Info row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Rider card */}
                      <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-lg shrink-0">
                          🛵
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Delivery Partner</p>
                          <p className="text-white font-black text-xs truncate">{activeOrder.riderName}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] text-amber-300 font-bold">{activeOrder.riderRating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact button */}
                      <a
                        href={`tel:${activeOrder.riderPhone}`}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-black hover:bg-white/20 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-300" />
                        Call Rider
                      </a>

                      {/* Amount chip */}
                      <div className="flex-1 sm:flex-none flex flex-col items-center justify-center bg-white/10 border border-white/10 rounded-2xl px-4 py-3">
                        <p className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider">Order Total</p>
                        <p className="text-white font-black text-sm">₹{activeOrder.amount}</p>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                /* No active order – soft placeholder */
                <div className="flex flex-col items-center justify-center gap-3 bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">📦</div>
                  <div className="text-center">
                    <p className="text-sm font-black text-slate-700">No Active Order</p>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Place an order and it will appear here with live tracking.</p>
                  </div>
                  <button
                    onClick={() => setCurrentPage('store')}
                    className="mt-1 px-4 py-2 bg-[#105335] text-white text-xs font-black rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md hover:bg-[#0a3d26] cursor-pointer"
                  >
                    Shop Now →
                  </button>
                </div>
              )}

              {/* Order History Listing Table */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Your Order History</h3>
                    <p className="text-[10px] text-slate-455 font-semibold mt-0.5">Quickly view or track your past orders</p>
                  </div>

                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-56 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                    <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search order items..." 
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="bg-transparent border-none text-xs text-slate-700 focus:outline-none w-full font-semibold"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold">
                        <th className="py-3 px-2">Order ID</th>
                        <th className="py-3 px-2">Items Detail</th>
                        <th className="py-3 px-2">Date</th>
                        <th className="py-3 px-2">Paid</th>
                        <th className="py-3 px-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {(() => {
                        const filtered = orders.filter(ord => {
                          if (!tableSearch.trim()) return true;
                          const q = tableSearch.toLowerCase().trim();
                          const matchOrderId = ord.order_number && ord.order_number.toLowerCase().includes(q);
                          const items = orderItems.filter(oi => oi.order_id === ord.id);
                          const matchProduct = items.some(oi => {
                            const p = products.find(prod => prod.id === oi.product_id);
                            return p && p.name.toLowerCase().includes(q);
                          });

                          // Match Date (ISO, US, and UK/India locale formats)
                          let matchDate = false;
                          if (ord.delivery_date) {
                            const dateStr = ord.delivery_date.toLowerCase();
                            if (dateStr.includes(q)) {
                              matchDate = true;
                            } else {
                              try {
                                const d = new Date(ord.delivery_date);
                                if (!isNaN(d.getTime())) {
                                  const localeStr = d.toLocaleDateString('en-US').toLowerCase();
                                  const localeStr2 = d.toLocaleDateString('en-GB').toLowerCase();
                                  if (localeStr.includes(q) || localeStr2.includes(q)) {
                                    matchDate = true;
                                  }
                                }
                              } catch (e) {}
                            }
                          }

                          return matchOrderId || matchProduct || matchDate;
                        });

                        if (filtered.length === 0) {
                          return (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-slate-450 font-semibold">
                                No records found
                              </td>
                            </tr>
                          );
                        }

                        return filtered.map((ord, idx) => {
                          const items = orderItems.filter(oi => oi.order_id === ord.id);
                          const itemsText = items.map(oi => {
                            const p = products.find(prod => prod.id === oi.product_id);
                            return p ? `${p.name} (x${oi.quantity})` : 'Product';
                          }).join(', ');
                          return (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="py-4 px-2 font-black text-slate-800">
                                <button 
                                  onClick={() => setSelectedOrderDetails(ord)}
                                  className="text-[#105335] hover:underline font-black cursor-pointer text-left focus:outline-none"
                                  title="Click to view order details"
                                >
                                  {ord.order_number || 'N/A (Pending)'}
                                </button>
                              </td>
                              <td className="py-4 px-2 font-bold text-slate-700 max-w-[400px] truncate" title={itemsText}>{itemsText}</td>
                              <td className="py-4 px-2 text-slate-450 font-semibold">{ord.delivery_date}</td>
                              <td className="py-4 px-2 font-black text-brand-green">₹{ord.total_amount}</td>
                              <td className="py-4 px-2 text-center">
                                {getStatusBadge(ord.order_status)}
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* C. Spendings & Charts Tab */}
          {activeSidebarTab === 'spending' && (
            <div className="space-y-6 animate-fade-in text-left">
              
              {/* Analytics Summary Header cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Total Spent</span>
                  <span className="text-2xl font-black text-slate-800 leading-none">₹{dynamicTotalSpent.toLocaleString()}</span>
                  <span className="text-[9px] text-emerald-600 font-bold block mt-1">● Within budget limits</span>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Total Orders</span>
                  <span className="text-2xl font-black text-slate-800 leading-none">{dynamicOrdersCount}</span>
                  <span className="text-[9px] text-emerald-600 font-bold block mt-1">● Avg 5 orders per month</span>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Total Savings</span>
                  <span className="text-2xl font-black text-slate-800 leading-none">₹{monthlySavings.toLocaleString()}</span>
                  <span className="text-[9px] text-emerald-600 font-bold block mt-1">● Saved 20% on items</span>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Nutritiva Coins</span>
                  <span className="text-2xl font-black text-slate-800 leading-none">{rewardPoints.toLocaleString()}</span>
                  <span className="text-[9px] text-amber-600 font-bold block mt-1">● Equal to ₹{Math.round(rewardPoints / 10)} cash</span>
                </div>
              </div>

              {/* Spent graphs */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LineChart />
                </div>
                <div className="lg:col-span-1">
                  <DoughnutChart />
                </div>
              </div>

              {/* Spendings vs Savings & Category Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SpendSavingsChart />
                </div>
                <div className="lg:col-span-1">
                  <CategoryBreakdown />
                </div>
              </div>

            </div>
          )}

          {/* D. Saved Addresses Tab */}
          {activeSidebarTab === 'addresses' && (
            <div className="space-y-6 animate-fade-in text-left">
              
              {!showAddAddress ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Your Delivery Addresses</h3>
                      <p className="text-[10px] text-slate-450 font-semibold mt-0.5">Manage details for quick checkout delivery</p>
                    </div>
                    <button 
                      onClick={() => setShowAddAddress(true)}
                      className="bg-[#105335] hover:bg-emerald-800 text-white font-black text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" /> Add Address
                    </button>
                  </div>

                  {/* Addresses List Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between min-h-[220px] relative group transition-all hover:shadow-md">
                        {addr.is_default && (
                          <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-100 font-black text-[8px] tracking-wide uppercase px-2 py-0.5 rounded-md">Default</span>
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                              {addr.address_type === 'Home' ? '🏠' : addr.address_type === 'Office' ? '🏢' : '📍'}
                            </span>
                            <div className="text-left">
                              <h4 className="font-black text-slate-800 text-xs">{addr.full_name}</h4>
                              <span className="text-[8px] font-black uppercase bg-slate-100 text-slate-550 px-1.5 py-0.5 rounded-md">{addr.address_type} • {addr.type}</span>
                            </div>
                          </div>
                          
                          <p className="text-[10px] text-slate-500 font-semibold leading-relaxed text-left">
                            {addr.address_line1}, {addr.address_line2}
                            {addr.landmark && `, Land: ${addr.landmark}`}
                            <br />
                            {addr.city}, {addr.state} - {addr.postal_code}
                            <br />
                            {addr.country}
                          </p>
                          
                          {addr.delivery_instructions && (
                            <p className="text-[9px] text-emerald-700 font-bold bg-[#E8F8F0] px-2 py-1 rounded-xl mt-2 line-clamp-1">
                              💬 {addr.delivery_instructions}
                            </p>
                          )}
                        </div>
                        
                        <div className="border-t border-slate-50 pt-2.5 flex justify-between items-center text-[10px] text-slate-400 font-bold mt-3">
                          <span>Ph: {addr.phone}</span>
                          <div className="flex gap-2">
                            {!addr.is_default && (
                              <button
                                onClick={() => {
                                  setAddresses(addresses.map(a => ({ ...a, is_default: a.id === addr.id })));
                                  showToastNotification("📌 Default address updated!", "📌");
                                }}
                                className="text-[#105335] hover:underline bg-transparent border-none p-1 font-semibold"
                              >
                                Set Default
                              </button>
                            )}
                            <button 
                              onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}
                              className="text-slate-350 hover:text-red-650 hover:underline bg-transparent border-none p-1 font-semibold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-lg">Add New Delivery Address</h3>
                      <p className="text-xs text-slate-450 font-semibold mt-0.5">Please provide accurate shipping and billing details below.</p>
                    </div>
                    <button 
                      onClick={() => setShowAddAddress(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 border border-slate-200"
                    >
                      ← Back to Saved Addresses
                    </button>
                  </div>

                  <form onSubmit={handleAddAddressSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 text-left">
                    
                    {/* Section 1: Contact Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <User className="w-4 h-4 text-[#105335]" />
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Recipient Contact Details</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Recipient Full Name</span>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. Ipsita Panda"
                            value={newAddressFullName}
                            onChange={(e) => setNewAddressFullName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Contact Phone Number</span>
                          <input 
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            value={newAddressPhone}
                            onChange={(e) => setNewAddressPhone(e.target.value.replace(/\D/g, ''))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Address Details */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <MapPin className="w-4 h-4 text-[#105335]" />
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Location Address</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Address Line 1</span>
                          <input 
                            type="text"
                            required
                            placeholder="Flat no., Building name, Apartment, Block"
                            value={newAddressLine1}
                            onChange={(e) => setNewAddressLine1(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Address Line 2</span>
                          <input 
                            type="text"
                            required
                            placeholder="Street name, Sector, Area, Locality"
                            value={newAddressLine2}
                            onChange={(e) => setNewAddressLine2(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Landmark</span>
                          <input 
                            type="text"
                            placeholder="Famous landmark nearby (Optional)"
                            value={newAddressLandmark}
                            onChange={(e) => setNewAddressLandmark(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Postal Code</span>
                          <input 
                            type="text"
                            required
                            placeholder="6-digit pincode"
                            value={newAddressPostalCode}
                            onChange={(e) => setNewAddressPostalCode(e.target.value.replace(/\D/g, ''))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">City</span>
                          <input 
                            type="text"
                            required
                            placeholder="City"
                            value={newAddressCity}
                            onChange={(e) => setNewAddressCity(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">State</span>
                          <input 
                            type="text"
                            required
                            placeholder="State"
                            value={newAddressState}
                            onChange={(e) => setNewAddressState(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Country</span>
                          <input 
                            type="text"
                            required
                            placeholder="Country"
                            value={newAddressCountry}
                            onChange={(e) => setNewAddressCountry(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Preferences & Coordinates */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <Compass className="w-4 h-4 text-[#105335]" />
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Preferences & Coordinates</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Address Tag (Type)</span>
                          <div className="flex gap-2">
                            {['Home', 'Office', 'Other'].map(tag => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => setNewAddressTag(tag)}
                                className={`flex-grow py-2.5 rounded-2xl text-xs font-black transition-all border ${
                                  newAddressTag === tag 
                                    ? 'bg-[#105335] text-white border-transparent shadow-xs' 
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {tag === 'Home' ? '🏠 Home' : tag === 'Office' ? '🏢 Office' : '📍 Other'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Address Purpose</span>
                          <div className="flex gap-2">
                            {['Both', 'Shipping', 'Billing'].map(purpose => (
                              <button
                                key={purpose}
                                type="button"
                                onClick={() => setNewAddressCategory(purpose)}
                                className={`flex-grow py-2.5 rounded-2xl text-xs font-black transition-all border ${
                                  newAddressCategory === purpose 
                                    ? 'bg-[#105335] text-white border-transparent shadow-xs' 
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {purpose}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>


                      <div className="space-y-1.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Delivery Instructions</span>
                        <textarea 
                          placeholder="e.g. Leave at front desk, call upon arrival, etc."
                          value={newAddressInstructions}
                          onChange={(e) => setNewAddressInstructions(e.target.value)}
                          rows="3"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#105335] focus:ring-2 focus:ring-[#105335]/25 transition-all"
                        ></textarea>
                      </div>

                      <div className="flex items-center gap-3 py-2 select-none">
                        <input 
                          type="checkbox" 
                          id="make-default-checkbox"
                          checked={newAddressIsDefault}
                          onChange={(e) => setNewAddressIsDefault(e.target.checked)}
                          className="w-5 h-5 text-[#105335] border-slate-300 rounded focus:ring-[#105335] focus:ring-opacity-25 cursor-pointer accent-[#105335]"
                        />
                        <label htmlFor="make-default-checkbox" className="text-xs font-black text-slate-700 cursor-pointer">
                          Set as default delivery address
                        </label>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                      <button 
                        type="submit"
                        className="flex-grow py-3 px-6 bg-[#105335] hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4 stroke-[3]" /> Save Delivery Address
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="py-3 px-6 bg-slate-50 hover:bg-slate-150 border border-slate-250 text-slate-650 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                      >
                        Cancel
                      </button>
                    </div>

                  </form>
                </div>
              )}

            </div>
          )}

          {/* E. Payments & UPI Tab */}
          {activeSidebarTab === 'payments' && (
            <div className="space-y-6 animate-fade-in text-left">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Visual Glassmorphic Credit Cards */}
                <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">Saved Cards</h3>
                    <button 
                      onClick={() => setShowAddCard(true)} 
                      className="text-xs font-black text-emerald-600 hover:text-emerald-800 flex items-center gap-1 transition-colors border-none bg-transparent"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" /> Add New Card
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedCards.map((card) => {
                      const isEmerald = card.theme === 'emerald' || card.isPrimary;
                      return (
                        <div 
                          key={card.id}
                          onClick={() => handleCardClick(card.id)}
                          className={`h-40 rounded-2xl p-5 relative shadow-md overflow-hidden flex flex-col justify-between group cursor-pointer active:scale-98 transition-all border-2 ${
                            card.isPrimary 
                              ? 'border-amber-400 scale-[1.02] shadow-lg' 
                              : 'border-transparent hover:border-slate-300'
                          } ${
                            isEmerald 
                              ? 'bg-gradient-to-tr from-emerald-950 via-[#105335] to-emerald-800 text-white' 
                              : 'bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-white'
                          }`}
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl"></div>
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] px-2 py-0.5 rounded-lg border font-bold uppercase tracking-wider ${
                              card.isPrimary 
                                ? 'bg-white/15 border-white/10 text-white' 
                                : 'bg-white/5 border-white/5 text-slate-400'
                            }`}>
                              {card.tag}
                            </span>
                            {card.type === 'Visa' ? (
                              <span className="text-sm font-extrabold italic">VISA</span>
                            ) : (
                              <div className="flex gap-0.5 items-center">
                                <span className="w-3.5 h-3.5 rounded-full bg-red-500 block opacity-90"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 block -ml-2 opacity-90"></span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-5.5 rounded flex items-center justify-center shrink-0 ${
                              isEmerald ? 'bg-amber-400/85 border border-amber-300' : 'bg-slate-700 border border-slate-600'
                            }`}>
                              <span className={`w-2.5 h-full border-r ${isEmerald ? 'border-amber-500/20' : 'border-slate-500/20'}`}></span>
                            </div>
                            <span className="font-semibold tracking-widest text-sm">{card.number}</span>
                          </div>

                          <div className="flex justify-between items-baseline text-xs">
                            <div>
                              <span className={`text-[7px] uppercase block font-bold ${isEmerald ? 'text-emerald-250' : 'text-slate-500'}`}>Card Holder</span>
                              <span className={`font-semibold text-[9px] uppercase ${isEmerald ? 'text-white' : 'text-slate-350'}`}>{card.holder}</span>
                            </div>
                            <div>
                              <span className={`text-[7px] uppercase block font-bold ${isEmerald ? 'text-emerald-250' : 'text-slate-500'}`}>Expires</span>
                              <span className={`font-semibold text-[9px] ${isEmerald ? 'text-white' : 'text-slate-300'}`}>{card.expiry}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* UPI Integration Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-4">UPI Handles</h3>
                    <div className="space-y-3">
                      {upiHandles.map((upi) => (
                        <div key={upi.id} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              upi.isPrimary ? 'bg-emerald-50 text-brand-green' : 'bg-slate-100 text-slate-455'
                            }`}>
                              <QrCode className="w-4.5 h-4.5" />
                            </div>
                            <div className="text-left">
                              <span className="text-xs font-bold text-slate-700 block">{upi.handle}</span>
                              <span className={`text-[9px] font-bold ${upi.isPrimary ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {upi.isPrimary ? '● Active Primary' : 'Verified Backup'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {!upi.isPrimary && (
                              <button 
                                onClick={() => {
                                  setUpiHandles(upiHandles.map(h => ({
                                    ...h,
                                    isPrimary: h.id === upi.id,
                                    status: h.id === upi.id ? 'Active Primary' : 'Verified Backup'
                                  })));
                                  // Clear active cards as primary
                                  setSavedCards(savedCards.map(c => ({ ...c, isPrimary: false, tag: c.tag === 'Primary' ? 'Personal' : c.tag })));
                                }}
                                className="text-[9px] text-[#105335] hover:underline font-bold bg-transparent border-none p-1 cursor-pointer"
                              >
                                Use Primary
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteUpi(upi.id)}
                              className="text-slate-400 hover:text-red-500 p-1 bg-transparent border-none cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {showAddUpi ? (
                    <form onSubmit={handleUpiSubmit} className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">New UPI ID</span>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. username@paytm" 
                        value={newUpiId}
                        onChange={(e) => setNewUpiId(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-750 focus:outline-none focus:border-brand-green"
                      />
                      <div className="flex gap-2">
                        <button 
                          type="submit" 
                          className="flex-1 py-1.5 bg-[#105335] hover:bg-emerald-800 text-white font-black text-[10px] rounded-lg shadow-sm"
                        >
                          Link UPI
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setShowAddUpi(false)}
                          className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-[10px] rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button 
                      onClick={() => setShowAddUpi(true)}
                      className="w-full mt-4 py-2 border border-dashed border-slate-200 hover:border-emerald-600 text-slate-500 hover:text-emerald-600 font-bold text-xs rounded-xl transition-all"
                    >
                      + Link New UPI ID
                    </button>
                  )}
                </div>

              </div>

              {/* Add Card Modal Overlay */}
              {showAddCard && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4">
                  <form onSubmit={handleAddCardSubmit} className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative p-6 border border-slate-100 space-y-4 text-left">
                    <button 
                      type="button"
                      onClick={() => setShowAddCard(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 font-black text-lg p-1.5"
                    >
                      ✕
                    </button>

                    <h3 className="font-extrabold text-slate-800 text-sm">Link New Payment Card</h3>
                    
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Card Provider</span>
                      <div className="flex gap-2">
                        {['Visa', 'Mastercard'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setNewCardType(type)}
                            className={`flex-grow py-2 rounded-xl text-xs font-bold transition-all border ${
                              newCardType === type 
                                ? 'bg-[#105335] text-white border-transparent' 
                                : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Cardholder Name</span>
                      <input 
                        type="text"
                        placeholder="e.g. IPSITA PANDA"
                        value={newCardHolder}
                        onChange={(e) => setNewCardHolder(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-750 focus:outline-none focus:bg-white focus:border-brand-green"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Card Number</span>
                      <input 
                        type="text"
                        placeholder="16-digit card number"
                        value={newCardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const matches = val.match(/\d{4,16}/g);
                          const match = (matches && matches[0]) || '';
                          const parts = [];
                          for (let i=0, len=match.length; i<len; i+=4) {
                            parts.push(match.substring(i, i+4));
                          }
                          if (parts.length > 0) {
                            setNewCardNumber(parts.join(' '));
                          } else {
                            setNewCardNumber(val.substring(0, 16));
                          }
                        }}
                        required
                        maxLength={19}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-750 focus:outline-none focus:bg-white focus:border-brand-green"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Expiry Date</span>
                        <input 
                          type="text"
                          placeholder="MM/YY"
                          value={newCardExpiry}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) {
                              setNewCardExpiry(`${val.slice(0, 2)} / ${val.slice(2, 4)}`);
                            } else {
                              setNewCardExpiry(val);
                            }
                          }}
                          required
                          maxLength={7}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-750 focus:outline-none focus:bg-white focus:border-brand-green"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">CVV Code</span>
                        <input 
                          type="password"
                          placeholder="•••"
                          value={newCardCvv}
                          onChange={(e) => setNewCardCvv(e.target.value.replace(/\D/g, ''))}
                          required
                          maxLength={3}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-750 focus:outline-none focus:bg-white focus:border-brand-green text-center"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Card Category</span>
                      <div className="flex gap-2">
                        {['Personal', 'Business'].map(tag => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setNewCardTag(tag)}
                            className={`flex-grow py-2 rounded-xl text-xs font-bold transition-all border ${
                              newCardTag === tag 
                                ? 'bg-[#105335] text-white border-transparent' 
                                : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-[#105335] hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
                    >
                      Link & Save Card
                    </button>
                  </form>
                </div>
              )}

              {/* Transactions list */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
                <h3 className="font-bold text-slate-800 text-sm mb-4">Transaction logs</h3>
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold">
                        <th className="py-2.5 px-3">Transaction ID</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3">Paid Via</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { id: '#TXN-90184', date: 'Today', type: 'Store Order ' + (activeOrder ? activeOrder.id : '#NT98765'), method: 'Visa **4242', amount: activeOrder ? activeOrder.amount : 599, status: 'Success', flow: 'out' },
                        { id: '#TXN-90124', date: '18 May, 2026', type: 'Store Order #NT12458', method: 'Visa **4242', amount: 899, status: 'Success', flow: 'out' },
                        { id: '#TXN-89945', date: '02 May, 2026', type: 'Wellness Box Subscription', method: 'Mastercard **8899', amount: 1299, status: 'Success', flow: 'out' },
                        { id: '#TXN-89812', date: '28 Apr, 2026', type: 'Store Purchase', method: 'UPI - ipsita@oksbi', amount: 639, status: 'Success', flow: 'out' }
                      ].map((txn, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-semibold text-slate-700">{txn.id}</td>
                          <td className="py-3 px-3 text-slate-450 font-medium">{txn.date}</td>
                          <td className="py-3 px-3 text-slate-800 font-bold text-left">{txn.type}</td>
                          <td className="py-3 px-3 text-slate-450 font-semibold">{txn.method}</td>
                          <td className="py-3 px-3 font-black flex items-center gap-1 mt-1">
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="text-slate-800">₹{txn.amount}</span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100">
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* F. Help & Support Tab */}
          {activeSidebarTab === 'support' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in text-left">
              
              {/* Live Chat Simulator */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xs flex flex-col h-[480px]">
                
                {/* Chat Header */}
                <div className="bg-[#105335] text-white rounded-t-3xl p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-amber-300">
                      N
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs">Nutritiva Support Agent</h4>
                      <span className="text-[9px] text-emerald-200 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span>Online • Replies instantly</span>
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919832627196?text=${encodeURIComponent(`Hi! I would like to continue my support session on WhatsApp. Here is the conversation log:\n\n${(supportHistory || []).map(h => `[${h.time || ''} - ${h.sender === 'user' ? 'User' : 'Agent'}]: ${h.text || ''}`).join('\n')}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-[10px] px-3 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1 shrink-0 hover:scale-105 active:scale-95"
                    title="Export conversation to WhatsApp support"
                  >
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm5.735-3.305c1.62.96 3.238 1.455 4.881 1.456 5.485 0 9.95-4.463 9.953-9.94.002-2.653-1.03-5.148-2.905-7.025C15.845 3.311 13.354 2.28 10.701 2.28c-5.49 0-9.956 4.466-9.96 9.943-.001 1.765.487 3.418 1.417 4.907L1.137 20.89l3.968-.971-1.313 1.306zM18.006 14.86c-.328-.164-1.944-.96-2.247-1.07-.303-.11-.524-.165-.744.165-.22.329-.853 1.07-1.045 1.29-.193.22-.386.247-.714.083-.328-.164-1.385-.51-2.637-1.627-.975-.87-1.632-1.947-1.823-2.275-.192-.329-.02-.507.144-.67.147-.147.329-.384.493-.576.164-.192.219-.329.329-.548.11-.22.055-.411-.027-.575-.082-.164-.744-1.793-1.02-2.457-.27-.648-.544-.56-.744-.57l-.63-.01c-.22 0-.576.082-.88.411-.303.329-1.157 1.13-1.157 2.756 0 1.626 1.184 3.197 1.348 3.417.164.22 2.328 3.555 5.64 4.986.788.34 1.402.544 1.882.697.79.25 1.512.215 2.08.13.635-.094 1.944-.795 2.218-1.564.275-.769.275-1.427.193-1.565-.083-.138-.303-.22-.63-.385z" />
                    </svg>
                    <span>Continue on WhatsApp 💬</span>
                  </a>
                </div>

                {/* Messages Box */}
                <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                  {supportHistory.map((chat, idx) => (
                    <div key={idx} className={`flex flex-col max-w-[80%] ${chat.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                      <div className={`p-3 rounded-2xl text-xs font-bold leading-relaxed ${
                        chat.sender === 'user' 
                          ? 'bg-[#105335] text-white rounded-tr-none' 
                          : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-3xs'
                      }`}>
                        {chat.text}
                      </div>
                      <span className="text-[8px] text-slate-400 font-bold mt-1 px-1">{chat.time}</span>
                    </div>
                  ))}
                </div>

                {/* Chat Input form */}
                <form onSubmit={handleSupportSend} className="p-3 border-t border-slate-150 flex gap-2 bg-white">
                  <input 
                    type="text" 
                    placeholder="Type order queries, refund help..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-xs font-semibold focus:outline-none focus:bg-white focus:border-brand-green"
                  />
                  <button 
                    type="submit"
                    className="bg-[#105335] hover:bg-emerald-800 text-white font-black text-xs px-5 py-2 rounded-2xl transition-all shadow-xs active:scale-95 flex items-center gap-1 shrink-0"
                  >
                    Send
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!chatInput.trim()) return;
                      const msgText = chatInput.trim();
                      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      setSupportHistory(prev => [...prev, { sender: 'user', text: msgText, time: timeNow }]);
                      setChatInput('');
                      window.open(`https://wa.me/919832627196?text=${encodeURIComponent(msgText)}`, '_blank');
                    }}
                    className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs px-4 py-2 rounded-2xl transition-all shadow-xs active:scale-95 flex items-center gap-1.5 shrink-0"
                    title="Send message to WhatsApp support"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm5.735-3.305c1.62.96 3.238 1.455 4.881 1.456 5.485 0 9.95-4.463 9.953-9.94.002-2.653-1.03-5.148-2.905-7.025C15.845 3.311 13.354 2.28 10.701 2.28c-5.49 0-9.956 4.466-9.96 9.943-.001 1.765.487 3.418 1.417 4.907L1.137 20.89l3.968-.971-1.313 1.306zM18.006 14.86c-.328-.164-1.944-.96-2.247-1.07-.303-.11-.524-.165-.744.165-.22.329-.853 1.07-1.045 1.29-.193.22-.386.247-.714.083-.328-.164-1.385-.51-2.637-1.627-.975-.87-1.632-1.947-1.823-2.275-.192-.329-.02-.507.144-.67.147-.147.329-.384.493-.576.164-.192.219-.329.329-.548.11-.22.055-.411-.027-.575-.082-.164-.744-1.793-1.02-2.457-.27-.648-.544-.56-.744-.57l-.63-.01c-.22 0-.576.082-.88.411-.303.329-1.157 1.13-1.157 2.756 0 1.626 1.184 3.197 1.348 3.417.164.22 2.328 3.555 5.64 4.986.788.34 1.402.544 1.882.697.79.25 1.512.215 2.08.13.635-.094 1.944-.795 2.218-1.564.275-.769.275-1.427.193-1.565-.083-.138-.303-.22-.63-.385z" />
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                </form>

                {/* WhatsApp bottom helper banner */}
                <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between rounded-b-3xl text-[10px] text-slate-500 font-semibold">
                  <span>Need an immediate human agent?</span>
                  <a 
                    href={`https://wa.me/919832627196?text=${encodeURIComponent(`Hi! I'm contacting Nutritiva support. My name is ${user?.name || ''} (${user?.email || ''}). Here is our current chat history:\n\n${(supportHistory || []).map(h => `[${h.time || ''} - ${h.sender === 'user' ? 'User' : 'Agent'}]: ${h.text || ''}`).join('\n')}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:text-[#20ba59] font-bold flex items-center gap-1 transition-all"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm5.735-3.305c1.62.96 3.238 1.455 4.881 1.456 5.485 0 9.95-4.463 9.953-9.94.002-2.653-1.03-5.148-2.905-7.025C15.845 3.311 13.354 2.28 10.701 2.28c-5.49 0-9.956 4.466-9.96 9.943-.001 1.765.487 3.418 1.417 4.907L1.137 20.89l3.968-.971-1.313 1.306zM18.006 14.86c-.328-.164-1.944-.96-2.247-1.07-.303-.11-.524-.165-.744.165-.22.329-.853 1.07-1.045 1.29-.193.22-.386.247-.714.083-.328-.164-1.385-.51-2.637-1.627-.975-.87-1.632-1.947-1.823-2.275-.192-.329-.02-.507.144-.67.147-.147.329-.384.493-.576.164-.192.219-.329.329-.548.11-.22.055-.411-.027-.575-.082-.164-.744-1.793-1.02-2.457-.27-.648-.544-.56-.744-.57l-.63-.01c-.22 0-.576.082-.88.411-.303.329-1.157 1.13-1.157 2.756 0 1.626 1.184 3.197 1.348 3.417.164.22 2.328 3.555 5.64 4.986.788.34 1.402.544 1.882.697.79.25 1.512.215 2.08.13.635-.094 1.944-.795 2.218-1.564.275-.769.275-1.427.193-1.565-.083-.138-.303-.22-.63-.385z" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </a>
                </div>

              </div>

              {/* Support FAQs and WhatsApp Contact Card */}
              <div className="space-y-6">
                
                {/* WhatsApp Support Card */}
                <div className="bg-[#E8F8F0] rounded-3xl p-6 border border-emerald-100 shadow-xs flex flex-col justify-between space-y-4 border-l-4 border-[#25D366]">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse-glow">
                      <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm5.735-3.305c1.62.96 3.238 1.455 4.881 1.456 5.485 0 9.95-4.463 9.953-9.94.002-2.653-1.03-5.148-2.905-7.025C15.845 3.311 13.354 2.28 10.701 2.28c-5.49 0-9.956 4.466-9.96 9.943-.001 1.765.487 3.418 1.417 4.907L1.137 20.89l3.968-.971-1.313 1.306zM18.006 14.86c-.328-.164-1.944-.96-2.247-1.07-.303-.11-.524-.165-.744.165-.22.329-.853 1.07-1.045 1.29-.193.22-.386.247-.714.083-.328-.164-1.385-.51-2.637-1.627-.975-.87-1.632-1.947-1.823-2.275-.192-.329-.02-.507.144-.67.147-.147.329-.384.493-.576.164-.192.219-.329.329-.548.11-.22.055-.411-.027-.575-.082-.164-.744-1.793-1.02-2.457-.27-.648-.544-.56-.744-.57l-.63-.01c-.22 0-.576.082-.88.411-.303.329-1.157 1.13-1.157 2.756 0 1.626 1.184 3.197 1.348 3.417.164.22 2.328 3.555 5.64 4.986.788.34 1.402.544 1.882.697.79.25 1.512.215 2.08.13.635-.094 1.944-.795 2.218-1.564.275-.769.275-1.427.193-1.565-.083-.138-.303-.22-.63-.385z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-xs">WhatsApp Support</h3>
                      <p className="text-[9px] text-emerald-800 font-bold mt-0.5">Chat directly with a human agent</p>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1.5 leading-relaxed">
                        Have order queries, delivery requests, or need refunds? Chat directly with us on WhatsApp for lightning-fast support.
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919832627196?text=${encodeURIComponent(`Hi! I'm contacting Nutritiva support. My name is ${user?.name || ''} (${user?.email || ''}). Here is our current chat history:\n\n${(supportHistory || []).map(h => `[${h.time || ''} - ${h.sender === 'user' ? 'User' : 'Agent'}]: ${h.text || ''}`).join('\n')}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-2xl text-[10px] font-black text-white transition-all bg-[#25D366] hover:bg-[#20ba59] active:scale-95 shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm5.735-3.305c1.62.96 3.238 1.455 4.881 1.456 5.485 0 9.95-4.463 9.953-9.94.002-2.653-1.03-5.148-2.905-7.025C15.845 3.311 13.354 2.28 10.701 2.28c-5.49 0-9.956 4.466-9.96 9.943-.001 1.765.487 3.418 1.417 4.907L1.137 20.89l3.968-.971-1.313 1.306zM18.006 14.86c-.328-.164-1.944-.96-2.247-1.07-.303-.11-.524-.165-.744.165-.22.329-.853 1.07-1.045 1.29-.193.22-.386.247-.714.083-.328-.164-1.385-.51-2.637-1.627-.975-.87-1.632-1.947-1.823-2.275-.192-.329-.02-.507.144-.67.147-.147.329-.384.493-.576.164-.192.219-.329.329-.548.11-.22.055-.411-.027-.575-.082-.164-.744-1.793-1.02-2.457-.27-.648-.544-.56-.744-.57l-.63-.01c-.22 0-.576.082-.88.411-.303.329-1.157 1.13-1.157 2.756 0 1.626 1.184 3.197 1.348 3.417.164.22 2.328 3.555 5.64 4.986.788.34 1.402.544 1.882.697.79.25 1.512.215 2.08.13.635-.094 1.944-.795 2.218-1.564.275-.769.275-1.427.193-1.565-.083-.138-.303-.22-.63-.385z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Support FAQs */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 mb-4">Frequently Asked Questions</h3>
                  
                  <div className="space-y-3">
                    {[
                      { q: "How long does standard delivery take?", a: "With Nutritiva VIP Club, orders in Noida are delivered within 8-15 minutes using our instant courier partners." },
                      { q: "Can I cancel my active delivery?", a: "Cancellation is allowed until the order is 'Packed'. Once the rider is 'On the way', cancellation is restricted." },
                      { q: "How do I claim reward points?", a: "Your reward points are automatically calculated at checkout. Every 10 coins equals ₹1 cash discount on items." },
                      { q: "Where can I find my invoice?", a: "Invoice downloads are located in 'Payments & UPI' under the transaction log list entries." }
                    ].map((faq, index) => (
                      <div key={index} className="space-y-1">
                        <h4 className="font-extrabold text-xs text-slate-800 leading-tight">Q. {faq.q}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">A. {faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* G. My Subscriptions Tab */}
          {activeSidebarTab === 'subscriptions' && (
            <div className="animate-fade-in space-y-6 text-left">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-800">My Subscriptions</h3>
                  <p className="text-xs font-semibold text-slate-400">Manage your active plans</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptions.map(sub => (
                  <div key={sub.id} className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-wider">{sub.status}</span>
                        <h4 className="text-lg font-black text-slate-800 mt-2">{sub.plan_name}</h4>
                      </div>
                      <Repeat className="w-6 h-6 text-emerald-200" />
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-xs font-semibold text-slate-500">
                        <span>Started On</span>
                        <span className="text-slate-800 font-bold">{new Date(sub.start_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-slate-500">
                        <span>Valid Until</span>
                        <span className="text-slate-800 font-bold">{new Date(sub.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-emerald-600 text-white text-xs font-black rounded-xl hover:bg-emerald-700 transition-colors">Manage Subscription</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* H. Reviews & Ratings Tab */}
          {activeSidebarTab === 'reviews' && (
            <div className="animate-fade-in space-y-6 text-left">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-800">Reviews & Ratings</h3>
                  <p className="text-xs font-semibold text-slate-400">Your feedback matters</p>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map(rev => {
                  const product = products.find(p => p.id === rev.product_id);
                  if (!product) return null;
                  return (
                    <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-5">
                      <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
                        <span className="text-2xl">{product.icon || '📦'}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-black text-slate-800">{product.name}</h4>
                          <span className="text-[10px] font-semibold text-slate-400">{new Date(rev.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-1 my-1.5">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
                          ))}
                        </div>
                        <p className="text-xs font-semibold text-slate-600 italic mt-1.5">"{rev.review}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>

      <CustomDialog 
        isOpen={dialog.isOpen} 
        onClose={() => setDialog(prev => ({ ...prev, isOpen: false }))} 
        title={dialog.title} 
        message={dialog.message} 
        icon={dialog.icon} 
      />

      {/* Generic toast notification */}
      {genericToast.show && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#105335] text-white py-3.5 px-6 rounded-2xl shadow-2xl border border-emerald-800 animate-slide-up flex items-center gap-3 text-xs font-black">
          <span className="text-lg">{genericToast.icon}</span>
          <span>{genericToast.msg}</span>
        </div>
      )}

      {/* Upgrade VIP success notification */}
      {showUpgradeToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#105335] text-white py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-800 animate-bounce">
          <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
          <div className="text-xs font-bold">
            <span className="text-amber-300 block">Congratulations!</span>
            {user.name} is now a VIP Gold Member!
          </div>
        </div>
      )}

      {/* Floating WhatsApp Chat Icon bottom right */}
      <a 
        href={`https://wa.me/919832627196?text=${encodeURIComponent(`Hi! I'm contacting Nutritiva support. My name is ${user?.name || ''} (${user?.email || ''}). Here is our current chat history:\n\n${(supportHistory || []).map(h => `[${h.time || ''} - ${h.sender === 'user' ? 'User' : 'Agent'}]: ${h.text || ''}`).join('\n')}`)}`}
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

      {/* Order Details Modal Overlay */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in" onClick={() => setSelectedOrderDetails(null)}>
          <div 
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl relative border border-slate-100 animate-slide-up text-left"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-650 p-1.5 hover:bg-slate-50 rounded-full transition-all cursor-pointer text-lg font-black"
            >
              ✕
            </button>

            {/* Header */}
            <div className="border-b border-slate-100 pb-4 mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Order Summary</span>
              <h3 className="text-base font-black text-slate-800 mt-0.5">
                Order #{selectedOrderDetails.order_number || 'N/A (Pending)'}
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Placed on: {selectedOrderDetails.created_at ? new Date(selectedOrderDetails.created_at).toLocaleString() : 'N/A'}</p>
            </div>

            {/* Content Details */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1" style={{scrollbarWidth: 'thin'}}>
              {/* Delivery / Payment Status grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Delivery Status</span>
                  <div className="mt-1 block">
                    {getStatusBadge(selectedOrderDetails.order_status)}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Payment status</span>
                  <span className="text-xs font-black text-brand-green mt-0.5 block">{selectedOrderDetails.payment_status}</span>
                </div>
                {selectedOrderDetails.tracking_id && (
                  <div className="col-span-2 border-t border-slate-200/60 pt-2 mt-1">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Shipment tracking (AWB)</span>
                    <span className="text-xs font-black text-slate-700 mt-0.5 block">{selectedOrderDetails.tracking_id} ({selectedOrderDetails.delivery_partner || 'Delhivery'})</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-black text-slate-800 mb-2.5 uppercase tracking-wide">Products Purchased</h4>
                <div className="space-y-2.5">
                  {orderItems.filter(oi => oi.order_id === selectedOrderDetails.id).map((item, itemIdx) => {
                    const p = products.find(prod => prod.id === item.product_id);
                    return (
                      <div key={itemIdx} className="flex items-center gap-3 p-2 border border-slate-100 rounded-2xl hover:bg-slate-50/50 transition-colors">
                        {/* Image */}
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 shrink-0 flex items-center justify-center p-1">
                          {p && <img src={`/src/assets/${p.image}.png`} alt={p.name} className="w-full h-full object-contain animate-fade-in" onError={(e) => { e.target.src = '/src/assets/logo.png'; }} />}
                        </div>
                        {/* Detail */}
                        <div className="flex-1 min-w-0">
                          {/* Product link: click to search and close modal */}
                          <button
                            onClick={() => {
                              setSelectedOrderDetails(null);
                              if (p) {
                                sessionStorage.setItem('storefront_search_query', p.name);
                                sessionStorage.setItem('storefront_active_category', 'All Categories');
                              }
                              setCurrentPage('store');
                            }}
                            className="text-xs font-black text-slate-800 hover:text-brand-green hover:underline truncate block text-left cursor-pointer"
                            title="Click to view product details"
                          >
                            {p ? p.name : 'Unknown Product'}
                          </button>
                          <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{p ? p.weight : 'N/A'} • Qty: {item.quantity}</span>
                        </div>
                        {/* Price */}
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-slate-800 block">₹{item.price * item.quantity}</span>
                          <span className="text-[8px] text-slate-400 font-bold block mt-0.5">₹{item.price} each</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Summary */}
            <div className="border-t border-slate-100 pt-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold">Grand Total Paid</span>
                <span className="text-base font-black text-brand-green mt-0.5 block">₹{selectedOrderDetails.total_amount}</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Cancel Button */}
                {!['DELIVERED', 'CANCELLED', 'RETURNED'].includes(selectedOrderDetails.order_status?.toUpperCase()) && (
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this order?')) {
                        cancelOrder(selectedOrderDetails.id)
                          .then(() => {
                            alert('Order cancelled successfully!');
                            setSelectedOrderDetails(null);
                          })
                          .catch((err) => {
                            alert(err.message || 'Failed to cancel order.');
                          });
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black border border-rose-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Cancel Order
                  </button>
                )}
                <button 
                  onClick={() => setSelectedOrderDetails(null)}
                  className="px-5 py-2.5 rounded-xl text-white text-xs font-black hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-sm hover:shadow-md"
                  style={{background: 'linear-gradient(135deg, #105335, #0a3d26)'}}
                >
                  Close Details
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
