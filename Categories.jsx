import React from 'react';
import './css/categories.css'; // Optional: Import corresponding CSS if needed
import './css/style.css';

const Categories = () => {
  return (
    <section className="categories" id="products">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="label-tag">🛒 Browse</span>
          <h2 className="section-title">Shop by <em>Category</em></h2>
          <p className="section-sub">From premium nuts to superfoods — explore our handpicked collections.</p>
        </div>

        {/* Bento Mosaic Grid */}
        <div className="cat-bento">

          {/* Row 1: wide | tall | sm */}
          {/* Tile 1: Exotic Nuts — wide */}
          <div className="cat-tile cat-tile--wide">
            <img src="imgs/cat_almonds.png" alt="Exotic Nuts" />
            <div className="cat-tile-info">
              <span className="cat-tile-tag">Bestseller</span>
              <span className="cat-tile-name">Exotic Nuts</span>
              <span className="cat-tile-sub">Almonds · Cashews · Walnuts · Pecans</span>
              <div className="cat-tile-arrow">→</div>
            </div>
          </div>

          {/* Tile 2: Gift Hampers — tall (spans 2 rows) */}
          <div className="cat-tile cat-tile--tall">
            <img src="imgs/cat_hampers.png" alt="Gift Hampers" />
            <div className="cat-tile-info">
              <span className="cat-tile-tag">Premium</span>
              <span className="cat-tile-name">Gift Hampers</span>
              <span className="cat-tile-sub">Weddings · Diwali · Corporate</span>
              <div className="cat-tile-arrow">→</div>
            </div>
          </div>

          {/* Tile 3: Berries — sm */}
          <div className="cat-tile cat-tile--sm">
            <img src="imgs/cat_berries.png" alt="Berries" />
            <div className="cat-tile-info">
              <span className="cat-tile-tag">Superfood</span>
              <span className="cat-tile-name">Berries</span>
              <span className="cat-tile-sub">Goji · Blueberry · Cranberry</span>
              <div className="cat-tile-arrow">→</div>
            </div>
          </div>

          {/* Row 2: sm | med | med */}
          {/* Tile 4: Seeds — sm */}
          <div className="cat-tile cat-tile--sm">
            <img src="imgs/cat_seeds.png" alt="Seeds" />
            <div className="cat-tile-info">
              <span className="cat-tile-tag">Healthy</span>
              <span className="cat-tile-name">Seeds</span>
              <span className="cat-tile-sub">Chia · Pumpkin · Flax</span>
              <div className="cat-tile-arrow">→</div>
            </div>
          </div>

          {/* Tile 5: Dry Fruits — med */}
          <div className="cat-tile cat-tile--med">
            <img src="imgs/cat_dryfruits.png" alt="Dry Fruits" />
            <div className="cat-tile-info">
              <span className="cat-tile-tag">Classic</span>
              <span className="cat-tile-name">Dry Fruits</span>
              <span className="cat-tile-sub">Dates · Figs · Raisins</span>
              <div className="cat-tile-arrow">→</div>
            </div>
          </div>

          {/* Tile 6: Subscription — med */}
          <div className="cat-tile cat-tile--std">
            <img src="imgs/cat_subscription.png" alt="Subscription" />
            <div className="cat-tile-info">
              <span className="cat-tile-tag">Monthly</span>
              <span className="cat-tile-name">Subscription Boxes</span>
              <span className="cat-tile-sub">Curated packs every month</span>
              <div className="cat-tile-arrow">→</div>
            </div>
          </div>

          {/* Tile 7: View All CTA */}
          <div className="cat-tile cat-tile--viewall">
            <span className="va-icon">📦</span>
            <strong>View All</strong>
            <span>50+ premium products</span>
            <div className="va-btn">Explore →</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;
