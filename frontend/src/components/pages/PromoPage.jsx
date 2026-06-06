import React, { useState } from 'react';
import { useApp, initialProducts } from '../context/AppContext';
import {
  ArrowLeft, ShoppingCart, Star, Heart, Search, SlidersHorizontal,
  Tag, Zap, Gift, Percent, CheckCircle, X, Plus, Minus
} from 'lucide-react';
import almondsImg   from '../assets/almonds.png';
import cashewsImg   from '../assets/cashews.png';
import walnutsImg   from '../assets/walnuts.png';
import raisinsImg   from '../assets/raisins.png';
import seedsImg     from '../assets/seeds.png';
import spicesImg    from '../assets/spices.png';
import heroNutsBowl from '../assets/hero_nuts_bowl.png';

const imageMap = {
  almonds: almondsImg, cashews: cashewsImg, walnuts: walnutsImg,
  raisins: raisinsImg, seeds: seedsImg, spices: spicesImg,
  hero_nuts_bowl: heroNutsBowl, pistachios: almondsImg,
  pumpkin: seedsImg, flax: seedsImg,
};

const PROMO_CONFIG = {
  '40off': {
    title: 'Flat 40% OFF',
    subtitle: 'Exclusive offer on Premium Dry Fruits',
    badge: 'EXCLUSIVE OFFER',
    badgeColor: 'bg-amber-400 text-amber-900',
    code: 'NUTRITIVA40',
    discount: 40,
    gradient: 'from-[#0F222B] via-[#1a3a4a] to-[#0F222B]',
    accentColor: '#FFB300',
    textColor: 'text-white',
    tagBg: 'bg-amber-400/10 border-amber-400/30 text-amber-300',
    icon: <Percent className="w-5 h-5" />,
    filter: (p) => p.category === 'Nuts & Dry Fruits',
    categories: ['All', 'Nuts & Dry Fruits'],
    bannerImg: heroNutsBowl,
  },
  'new_arrivals': {
    title: 'New Arrivals',
    subtitle: 'Fresh & Healthy — Just Stocked',
    badge: 'FRESH STOCK',
    badgeColor: 'bg-slate-900 text-amber-400',
    code: null,
    discount: null,
    gradient: 'from-[#b45309] via-[#d97706] to-[#FFB300]',
    accentColor: '#1a1a1a',
    textColor: 'text-slate-900',
    tagBg: 'bg-slate-900/10 border-slate-900/20 text-slate-900',
    icon: <Zap className="w-5 h-5" />,
    filter: (p) => ['Seeds & Superfoods', 'Healthy Snacks', 'Wellness & Immunity'].includes(p.category),
    categories: ['All', 'Seeds & Superfoods', 'Healthy Snacks', 'Wellness & Immunity'],
    bannerImg: cashewsImg,
  },
  'combos': {
    title: 'Combo Offers',
    subtitle: 'Save More With Exclusive Combo Deals',
    badge: 'BIG SAVINGS',
    badgeColor: 'bg-purple-300 text-purple-900',
    code: null,
    discount: null,
    gradient: 'from-[#4C1D95] via-[#6D28D9] to-[#4C1D95]',
    accentColor: '#E9D5FF',
    textColor: 'text-white',
    tagBg: 'bg-purple-300/10 border-purple-300/30 text-purple-200',
    icon: <Gift className="w-5 h-5" />,
    filter: (p) => ['Gift Packs', 'Honey & Sweeteners', 'Organic Food'].includes(p.category),
    categories: ['All', 'Gift Packs', 'Honey & Sweeteners', 'Organic Food'],
    bannerImg: walnutsImg,
  },
};

export default function PromoPage() {
  const { promoType, setCurrentPage, cart, addToCart, toggleWishlist, wishlist } = useApp();
  const config = PROMO_CONFIG[promoType] || PROMO_CONFIG['40off'];

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [addedId, setAddedId] = useState(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const baseProducts = initialProducts.filter(config.filter);

  const displayed = baseProducts
    .filter(p => {
      const matchCat = selectedCat === 'All' || p.category === selectedCat;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const copyCode = () => {
    if (config.code) {
      navigator.clipboard.writeText(config.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif]">

      {/* ── Top Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentPage('store')}
            className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 font-bold text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Store
          </button>

          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
            />
          </div>

          <button
            onClick={() => setCurrentPage('store')}
            className="relative flex items-center gap-2 bg-[#105335] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            Cart
          </button>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <div className={`bg-gradient-to-br ${config.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-20 w-64 h-64 rounded-full bg-white" />
          <div className="absolute -bottom-10 left-10 w-48 h-48 rounded-full bg-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <span className={`inline-block ${config.badgeColor} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3`}>
              {config.badge}
            </span>
            <h1 className={`text-4xl md:text-5xl font-black ${config.textColor} leading-tight`}>
              {config.title}
            </h1>
            <p className={`mt-2 text-sm font-semibold opacity-80 ${config.textColor}`}>
              {config.subtitle}
            </p>
            {config.code && (
              <button
                onClick={copyCode}
                className="mt-4 flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-white/25 transition-all"
              >
                {codeCopied ? <CheckCircle className="w-4 h-4 text-emerald-300" /> : <Tag className="w-4 h-4" />}
                {codeCopied ? 'Copied!' : `Use Code: ${config.code}`}
              </button>
            )}
          </div>
          <img
            src={config.bannerImg}
            alt={config.title}
            className="w-44 h-44 object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* ── Filters Bar ── */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          {/* Category Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            {config.categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  selectedCat === cat
                    ? 'bg-[#105335] text-white border-[#105335]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-400 transition-colors"
            >
              <option value="default">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-slate-600">
            <span className="text-slate-800 font-black">{displayed.length}</span> products found
            {search && <span> for "<span className="text-emerald-600">{search}</span>"</span>}
          </p>
          {config.discount && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black px-3 py-1.5 rounded-xl">
              <Percent className="w-3.5 h-3.5" />
              {config.discount}% OFF applied at checkout
            </div>
          )}
        </div>

        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-4xl">🥜</div>
            <p className="text-lg font-black text-slate-700">No products found</p>
            <p className="text-sm text-slate-400 font-semibold">Try adjusting your filters or search</p>
            <button onClick={() => { setSearch(''); setSelectedCat('All'); }} className="px-4 py-2 bg-[#105335] text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {displayed.map(p => {
              const isWishlisted = wishlist.some(w => w.product_id === p.id);
              const inCart = cart.find(i => i.product_id === p.id);
              const justAdded = addedId === p.id;
              const img = imageMap[p.image] || heroNutsBowl;

              return (
                <div
                  key={p.id}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-slate-50 to-white">
                    <img
                      src={img}
                      alt={p.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                      {config.discount ? `-${config.discount}%` : p.discount}
                    </div>

                    {/* Wishlist btn */}
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur border border-slate-100 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col gap-2 flex-1">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.category}</p>
                      <h3 className="text-sm font-black text-slate-800 leading-tight mt-0.5 line-clamp-2">{p.name}</h3>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{p.weight}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= Math.round(p.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">({p.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mt-auto">
                      <span className="text-base font-black text-slate-800">₹{p.price}</span>
                      <span className="text-xs font-semibold text-slate-400 line-through">₹{p.originalPrice}</span>
                    </div>

                    {/* Add to Cart */}
                    {inCart ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5">
                        <button onClick={() => addToCart({ ...p, quantity: -1 })} className="text-emerald-600 font-black text-sm">−</button>
                        <span className="text-emerald-700 font-black text-xs">{inCart.quantity} in cart</span>
                        <button onClick={() => addToCart(p)} className="text-emerald-600 font-black text-sm">+</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(p)}
                        className={`w-full py-2 rounded-xl text-xs font-black transition-all ${
                          justAdded
                            ? 'bg-emerald-500 text-white scale-95'
                            : 'bg-[#105335] text-white hover:bg-emerald-700 active:scale-95'
                        }`}
                      >
                        {justAdded ? '✓ Added!' : 'Add to Cart'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Footer strip ── */}
      <footer className="mt-16 py-6 border-t border-slate-100 bg-white text-center">
        <p className="text-xs text-slate-400 font-semibold">
          🌿 100% Natural · No Artificial Additives · Free delivery above ₹499
        </p>
      </footer>
    </div>
  );
}
