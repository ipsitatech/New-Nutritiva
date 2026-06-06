import React, { useState } from 'react';
import { useApp, initialProducts } from '../context/AppContext';
import {
  ArrowLeft, ShoppingCart, Star, Heart, Search,
  SlidersHorizontal, ArrowRight, Tag, CheckCircle
} from 'lucide-react';
import almondsImg   from '../assets/almonds.png';
import cashewsImg   from '../assets/cashews.png';
import walnutsImg   from '../assets/walnuts.png';
import raisinsImg   from '../assets/raisins.png';
import seedsImg     from '../assets/seeds.png';
import spicesImg    from '../assets/spices.png';
import heroNutsBowl from '../assets/hero_nuts_bowl.png';
import catDryFruitsImg    from '../assets/category_dry_fruits.png';
import catDriedBerriesImg from '../assets/category_dried_berries.png';
import catSeedsImg        from '../assets/category_seeds_superfoods.png';
import catExoticNutsImg   from '../assets/category_exotic_nuts.png';

const imgMap = {
  almonds: almondsImg, cashews: cashewsImg, walnuts: walnutsImg,
  raisins: raisinsImg, seeds: seedsImg, spices: spicesImg,
  hero_nuts_bowl: heroNutsBowl, pistachios: almondsImg,
  pumpkin: seedsImg, flax: seedsImg,
};

/* Per-category visual config */
const CATEGORY_CONFIG = {
  'Premium Dry Fruits Mix': {
    category:  'Nuts & Dry Fruits',
    heroImg:   catDryFruitsImg,
    gradient:  'from-[#78350f] via-[#92400e] to-[#b45309]',
    badge:     'BEST SELLER',
    badgeCls:  'bg-amber-300 text-amber-900',
    tagline:   'Healthy, delicious & energy packed premium dry fruits',
    accentBg:  '#FFF8F0',
    accentBorder: '#FED7AA',
    btnGrad:   'linear-gradient(135deg,#b45309,#92400e)',
    chipBg:    'bg-amber-100 text-amber-800',
    starColor: 'fill-amber-500 text-amber-500',
  },
  'Premium Dried Berries': {
    category:  'Healthy Snacks',
    heroImg:   catDriedBerriesImg,
    gradient:  'from-[#881337] via-[#9f1239] to-[#be123c]',
    badge:     'ANTIOXIDANT RICH',
    badgeCls:  'bg-rose-200 text-rose-900',
    tagline:   'Rich in antioxidants & vitamins for a healthier you',
    accentBg:  '#FFF1F2',
    accentBorder: '#FECDD3',
    btnGrad:   'linear-gradient(135deg,#be123c,#9f1239)',
    chipBg:    'bg-rose-100 text-rose-800',
    starColor: 'fill-rose-500 text-rose-500',
  },
  'Organic Seeds & Superfoods': {
    category:  'Seeds & Superfoods',
    heroImg:   catSeedsImg,
    gradient:  'from-[#064e3b] via-[#065f46] to-[#047857]',
    badge:     'ORGANIC CERTIFIED',
    badgeCls:  'bg-emerald-200 text-emerald-900',
    tagline:   'Nutrient dense superfoods for your daily wellness',
    accentBg:  '#F0FDF4',
    accentBorder: '#BBF7D0',
    btnGrad:   'linear-gradient(135deg,#047857,#065f46)',
    chipBg:    'bg-emerald-100 text-emerald-800',
    starColor: 'fill-emerald-600 text-emerald-600',
  },
  'Exotic Premium Nuts': {
    category:  'Nuts & Dry Fruits',
    heroImg:   catExoticNutsImg,
    gradient:  'from-[#1c1917] via-[#292524] to-[#44403c]',
    badge:     'HANDPICKED',
    badgeCls:  'bg-stone-200 text-stone-900',
    tagline:   'Finest quality exotic nuts sourced from across the world',
    accentBg:  '#FAFAF9',
    accentBorder: '#E7E5E4',
    btnGrad:   'linear-gradient(135deg,#44403c,#292524)',
    chipBg:    'bg-stone-100 text-stone-800',
    starColor: 'fill-amber-500 text-amber-500',
  },
};

export default function CategoryPage() {
  const { categoryPageKey, setCurrentPage, cart, addToCart, toggleWishlist, wishlist } = useApp();
  const cfg = CATEGORY_CONFIG[categoryPageKey] || CATEGORY_CONFIG['Premium Dry Fruits Mix'];

  const [search, setSearch]   = useState('');
  const [sortBy, setSortBy]   = useState('default');
  const [addedId, setAddedId] = useState(null);

  /* Filter products for this category */
  const base = initialProducts.filter(p => p.category === cfg.category);

  const displayed = base
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price_asc')  return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      return 0;
    });

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif]">

      {/* ── Sticky Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentPage('store')}
            className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 font-bold text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Store
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search in ${cfg.category}…`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
            />
          </div>

          {/* Cart */}
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
      <div className={`bg-gradient-to-br ${cfg.gradient} relative overflow-hidden`}>
        {/* decorative circles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-24 w-72 h-72 rounded-full bg-white" />
          <div className="absolute -bottom-16 left-8 w-52 h-52 rounded-full bg-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          {/* Left text */}
          <div className="flex-1">
            <span className={`inline-block ${cfg.badgeCls} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3`}>
              {cfg.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {categoryPageKey}
            </h1>
            <p className="mt-3 text-sm font-semibold text-white/75 max-w-md">{cfg.tagline}</p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-6">
              <div className="text-center">
                <p className="text-2xl font-black text-white">{displayed.length}+</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Products</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Natural</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">Free</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Delivery ₹499+</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <img
            src={cfg.heroImg}
            alt={categoryPageKey}
            className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
          />
        </div>
      </div>

      {/* ── Filter / Sort bar ── */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500">{displayed.length} products</span>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs font-bold text-rose-500 hover:underline ml-2"
              >
                Clear search ×
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Sort:</span>
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
      <main className="max-w-7xl mx-auto px-4 py-10">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-4xl">🥜</div>
            <p className="text-lg font-black text-slate-700">No products found</p>
            <button onClick={() => setSearch('')} className="px-5 py-2 bg-[#105335] text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors">
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayed.map(p => {
              const isWishlisted = wishlist.some(w => w.product_id === p.id);
              const inCart       = cart.find(i => i.product_id === p.id);
              const justAdded    = addedId === p.id;
              const img          = imgMap[p.image] || heroNutsBowl;
              const savePct      = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

              return (
                <div
                  key={p.id}
                  className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  style={{ background: cfg.accentBg, borderColor: cfg.accentBorder }}
                >
                  {/* Image area */}
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <img
                      src={img}
                      alt={p.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-108 transition-transform duration-500"
                      style={{ '--tw-scale-x': '1.08', '--tw-scale-y': '1.08' }}
                    />

                    {/* Discount badge */}
                    <div
                      className="absolute top-2.5 left-2.5 text-white text-[9px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: cfg.btnGrad }}
                    >
                      -{savePct}%
                    </div>

                    {/* Wishlist btn */}
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-slate-100 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3.5 flex flex-col gap-2 flex-1">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{p.category}</p>
                      <h3 className="text-sm font-black text-slate-800 leading-snug mt-0.5 line-clamp-2">{p.name}</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">{p.weight}</p>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3 h-3 ${s <= Math.round(p.rating) ? cfg.starColor : 'fill-slate-100 text-slate-200'}`} />
                      ))}
                      <span className="text-[10px] text-slate-400 font-semibold ml-0.5">({p.reviews})</span>
                    </div>

                    {/* Price row */}
                    <div className="flex items-baseline gap-1.5 mt-auto">
                      <span className="text-base font-black text-slate-800">₹{p.price}</span>
                      <span className="text-xs font-semibold text-slate-400 line-through">₹{p.originalPrice}</span>
                    </div>

                    {/* Add to cart */}
                    {inCart ? (
                      <div className="flex items-center justify-between bg-white border rounded-xl px-3 py-1.5" style={{ borderColor: cfg.accentBorder }}>
                        <button onClick={() => addToCart({ ...p, quantity: -1 })} className="font-black text-sm" style={{ color: '#105335' }}>−</button>
                        <span className="text-xs font-black text-slate-700">{inCart.quantity} in cart</span>
                        <button onClick={() => addToCart(p)} className="font-black text-sm" style={{ color: '#105335' }}>+</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(p)}
                        className={`w-full py-2.5 rounded-xl text-xs font-black text-white transition-all ${justAdded ? 'scale-95 opacity-80' : 'hover:opacity-90 active:scale-95'}`}
                        style={{ background: justAdded ? '#059669' : cfg.btnGrad }}
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

        {/* Explore more categories row */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <h3 className="text-lg font-black text-slate-800 mb-5">Explore More Categories</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(CATEGORY_CONFIG)
              .filter(([k]) => k !== categoryPageKey)
              .map(([k, c]) => (
                <button
                  key={k}
                  onClick={() => {
                    /* navigate to another category page — context setter handled outside */
                    window.dispatchEvent(new CustomEvent('switch-category', { detail: k }));
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-bold hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {k} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ))}
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="mt-16 py-6 border-t border-slate-100 bg-white text-center">
        <p className="text-xs text-slate-400 font-semibold">
          🌿 100% Natural · No Artificial Additives · Free delivery above ₹499
        </p>
      </footer>
    </div>
  );
}
