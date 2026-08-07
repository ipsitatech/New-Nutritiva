import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productService";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23eff7f2'/%3E%3Cpath d='M140 260h120v10H140zM160 240l40-60 40 60z' fill='%232d7a4f' opacity='0.25'/%3E%3Ccircle cx='170' cy='150' r='22' fill='%232d7a4f' opacity='0.25'/%3E%3C/svg%3E";

function getStockStatus(stock) {
  const qty = Number(stock);
  if (qty <= 0) return { label: "Out of Stock", classes: "bg-red-100 text-red-700" };
  if (qty <= 10) return { label: "Low Stock", classes: "bg-amber-100 text-amber-700" };
  return { label: "In Stock", classes: "bg-green-100 text-green-700" };
}

/* ---------------------------------- Hero --------------------------------- */

function ProductsHero({ total, onSearch, searchTerm }) {
  return (
    <section className="bg-gradient-to-br from-[#2d7a4f] to-[#1f5c3a] px-4 pb-10 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/70">
          {total > 0 ? `${total} items available` : "Fresh picks, every day"}
        </p>
        <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
          Our Products
        </h1>

        <div className="relative max-w-xl">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#787878]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by product name or category..."
            className="w-full rounded-xl border-0 bg-white py-3 pl-11 pr-4 text-sm text-[#141414] shadow-lg outline-none ring-2 ring-transparent transition-shadow duration-200 placeholder:text-[#787878] focus:ring-white/60"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Category chips -------------------------- */

function CategoryChips({ categories, active, onSelect }) {
  if (categories.length <= 1) return null;

  return (
    <div className="scrollbar-none -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-[#2d7a4f] text-white shadow-sm"
                : "bg-white text-[#141414] ring-1 ring-inset ring-black/10 hover:bg-[#2d7a4f]/10"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

/* --------------------------------- Card ---------------------------------- */

function ProductCard({ product }) {
  const stockStatus = getStockStatus(product.stock);
  const outOfStock = Number(product.stock) <= 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-[#eff7f2]">
        <img
         src={
          product.image
              ? `http://localhost:5001/uploads/${product.image}`
            : PLACEHOLDER_IMAGE
             }
          alt={product.product_name}
           onError={(e) => {
              e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER_IMAGE;
       }}
       className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2d7a4f] shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
        )}

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${stockStatus.classes}`}
        >
          {stockStatus.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-[#141414]">
          {product.product_name}
        </h3>

        <p className="line-clamp-2 min-h-[2.5rem] text-sm text-[#787878]">
          {product.description || "No description available."}
        </p>

        <div className="mt-1 flex items-baseline justify-between">
          <span className="text-xl font-bold text-[#2d7a4f]">
            ₹{Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-[#787878]">
            Stock: <span className="font-medium text-[#141414]">{product.stock}</span>
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            className="w-full rounded-lg border border-[#2d7a4f]/30 px-3 py-2 text-sm font-medium text-[#2d7a4f] transition-colors duration-200 hover:bg-[#2d7a4f]/10"
          >
            View Details
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={outOfStock}
              className="flex-1 rounded-lg bg-white px-3 py-2 text-sm font-medium text-[#2d7a4f] ring-1 ring-inset ring-[#2d7a4f] transition-colors duration-200 hover:bg-[#2d7a4f] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#2d7a4f]"
            >
              Add to Cart
            </button>
            <button
              type="button"
              disabled={outOfStock}
              className="flex-1 rounded-lg bg-[#2d7a4f] px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#256341] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#2d7a4f]"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm">
      <div className="aspect-square animate-pulse bg-[#eff7f2]" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[#eff7f2]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#eff7f2]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#eff7f2]" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-[#eff7f2]" />
      </div>
    </div>
  );
}

/* ------------------------------- Status blocks ---------------------------- */

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3.75m0 3.75h.007v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="mb-1 text-lg font-semibold text-[#141414]">Couldn't load products</h3>
      <p className="mb-6 max-w-sm text-sm text-[#787878]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-[#2d7a4f] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#256341]"
      >
        Retry
      </button>
    </div>
  );
}

function EmptyState({ hasProducts, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#eff7f2]">
        <svg className="h-8 w-8 text-[#2d7a4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>
      <h3 className="mb-1 text-lg font-semibold text-[#141414]">No products found</h3>
      <p className="mb-6 max-w-sm text-sm text-[#787878]">
        {hasProducts
          ? "Try a different search term or category."
          : "There are no products available right now. Check back soon."}
      </p>
      {hasProducts && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg border border-[#2d7a4f]/30 px-5 py-2.5 text-sm font-medium text-[#2d7a4f] transition-colors duration-200 hover:bg-[#2d7a4f]/10"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

/* -------------------------------- Main page -------------------------------- */

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError(null);

    try {
      const result = await getProducts();
      setProducts(result?.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Something went wrong while fetching products.");
    } finally {
      setLoading(false);
    }
  }

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        !term ||
        product.product_name?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, activeCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
  };

  return (
    // pt-16 (or your navbar's height) keeps content clear of a fixed header
    <div className="min-h-screen bg-[#eff7f2] pt-20">
      <ProductsHero
        total={products.length}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CategoryChips
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        {!loading && !error && (
          <p className="mb-6 text-sm text-[#787878]">
            Showing {filteredProducts.length} of {products.length} product
            {products.length === 1 ? "" : "s"}
          </p>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={loadProducts} />}

        {!loading && !error && filteredProducts.length === 0 && (
          <EmptyState hasProducts={products.length > 0} onClear={clearFilters} />
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;