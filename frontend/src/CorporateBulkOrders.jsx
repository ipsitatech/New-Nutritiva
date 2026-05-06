import React from "react";
import "./CorporateBulkOrders.css";
import { FaBoxOpen, FaUsers, FaGift, FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import myImage from './cat_almonds.png'

const CorporateBulkOrders = () => {
  return (
    <section className="cbo-section">
      <div className="cbo-container">

        {/* LEFT SIDE */}
        <div className="cbo-left">
          <span className="cbo-tag">B2B SOLUTIONS</span>

          <h2 className="cbo-title">
            Corporate <span>Bulk Orders</span>
          </h2>

          <p className="cbo-desc">
            Premium dry fruits and healthy snacks for your corporate gifting,
            employee wellness programs, and festive celebrations across India.
          </p>

          {/* FEATURES */}
          <div className="cbo-features">
            <div className="cbo-feature">
              <FaBoxOpen className="icon orange" />
              <div>
                <h4>Bulk Discounts</h4>
                <p>Special pricing for orders above 50kg</p>
              </div>
            </div>

            <div className="cbo-feature">
              <FaUsers className="icon purple" />
              <div>
                <h4>Employee Wellness</h4>
                <p>Monthly snack subscriptions for offices</p>
              </div>
            </div>

            <div className="cbo-feature">
              <FaGift className="icon orange" />
              <div>
                <h4>Custom Packaging</h4>
                <p>Branded gift boxes with your logo</p>
              </div>
            </div>

            <div className="cbo-feature">
              <FaPhoneAlt className="icon purple" />
              <div>
                <h4>Dedicated Support</h4>
                <p>Account manager for your account</p>
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div className="cbo-pricing">
            <div className="cbo-row">
              <div>
                <h5>Starter Pack</h5>
                <p>10 – 50 kg</p>
              </div>
              <span>10% OFF</span>
            </div>

            <div className="cbo-row">
              <div>
                <h5>Business Pack</h5>
                <p>50 – 100 kg</p>
              </div>
              <span>20% OFF</span>
            </div>

            <div className="cbo-row highlight">
              <div>
                <h5>Enterprise Pack</h5>
                <p>100 kg+</p>
              </div>
              <span>30% OFF + Free Shipping</span>
            </div>
          </div>

          <button className="cbo-btn">
            <FaWhatsapp className="whatsapp-icon" />
            Get a Custom Quote
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="cbo-right">
          <img
            src={myImage}
            alt="Dry Fruits"
          />

          <div className="cbo-badge">
            <strong>Trusted by 500+</strong>
            <p>Companies across India</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CorporateBulkOrders;