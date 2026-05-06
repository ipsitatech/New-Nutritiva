import React from 'react';
import './css/testimonials.css';
import './css/style.css';

const Testimonials = () => {
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="label-tag">⭐ Testimonials</span>
          <h2 className="section-title">What Our <em>Customers</em> Say</h2>
          <p className="section-sub">Trusted by thousands of happy families and businesses across India.</p>
        </div>

        {/* Stats Bar */}
        <div className="reviews-summary">
          <div className="reviews-avg">
            <div className="reviews-avg-num">4.9</div>
            <div className="reviews-avg-stars">★★★★★</div>
            <div className="reviews-avg-label">Avg. Rating</div>
          </div>
          <div className="reviews-stat">
            <div className="reviews-stat-num">2,400+</div>
            <div className="reviews-stat-label">Happy Customers</div>
          </div>
          <div className="reviews-stat">
            <div className="reviews-stat-num">98%</div>
            <div className="reviews-stat-label">Repeat Orders</div>
          </div>
          <div className="reviews-stat">
            <div className="reviews-stat-num">500+</div>
            <div className="reviews-stat-label">5-Star Reviews</div>
          </div>
          <div className="reviews-stat">
            <div className="reviews-stat-num">6+</div>
            <div className="reviews-stat-label">Years Trusted</div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="reviews-grid">
          <div className="review-card">
            <span className="review-quote-icon">&ldquo;</span>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Ordered for my sister's wedding. The packaging was absolutely stunning and everyone loved the quality! Will definitely order again — the almonds were incredibly fresh."</p>
            <div className="reviewer">
              <div className="reviewer-avatar">PS</div>
              <div>
                <span className="reviewer-name">Priya S.</span>
                <span className="reviewer-loc">📍 Mumbai</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <span className="review-quote-icon">&ldquo;</span>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Perfect Diwali gift for our clients. Custom branding made it extra special. Fresh products, beautiful presentation, and timely delivery — highly recommend for corporate gifting!"</p>
            <div className="reviewer">
              <div className="reviewer-avatar">RK</div>
              <div>
                <span className="reviewer-name">Rajesh K.</span>
                <span className="reviewer-loc">📍 Delhi</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <span className="review-quote-icon">&ldquo;</span>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"The subscription box gets better every single month! Love how they curate new products. Nutritiva is the only brand I trust completely for my family's daily nutrition needs."</p>
            <div className="reviewer">
              <div className="reviewer-avatar">AM</div>
              <div>
                <span className="reviewer-name">Anjali M.</span>
                <span className="reviewer-loc">📍 Bangalore</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <span className="review-quote-icon">&ldquo;</span>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"We've been ordering corporate Diwali gifts from Nutritiva for 3 years. Excellent quality every time, on-time delivery, and the team is incredibly responsive. Highly recommended!"</p>
            <div className="reviewer">
              <div className="reviewer-avatar">TS</div>
              <div>
                <span className="reviewer-name">Tech Solutions Pvt Ltd</span>
                <span className="reviewer-loc">📍 Hyderabad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
