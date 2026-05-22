import React from "react";
import { PackageOpen, Users, Gift, Phone } from "lucide-react";
import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import myImage from "../../assets/product_imgs/mixed_dryfruit.png";

import corporateData from "../../data/corporate.json";

const ICON_MAP = {
  PackageOpen,
  Users,
  Gift,
  Phone,
};

const CorporateBulkOrders = () => {
  const {
    tag,
    title,
    description,
    features,
    pricing,
    whatsappNumber,
    whatsappText,
    badgeTitle,
    badgeSub,
  } = corporateData;

  return (
    <section className="cbo-section">
      <div className="cbo-container">
        {/* LEFT SIDE */}
        <div className="cbo-left">
          <span className="cbo-tag">{tag}</span>

          <h2 className="cbo-title">
            Corporate <span style={{ color: "#2D7A4F" }}>Bulk Orders</span>
          </h2>

          <p className="cbo-desc">{description}</p>

          {/* FEATURES */}
          <div className="cbo-features">
            {features.map((feature, idx) => {
              const Icon = ICON_MAP[feature.icon];
              return (
                <div key={idx} className="cbo-feature">
                  {Icon && (
                    <Icon className="cbo-icon" style={{ color: "#2D7A4F" }} />
                  )}
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRICING */}
          <div className="cbo-pricing">
            {pricing.map((p, idx) => (
              <div
                key={idx}
                className={`cbo-row ${p.highlight ? "cbo-highlight" : ""}`}
              >
                <div>
                  <h5>{p.title}</h5>
                  <p>{p.range}</p>
                </div>
                <span style={{ color: "#2D7A4F" }}>{p.discount}</span>
              </div>
            ))}
          </div>

          <button
            className="cbo-btn"
            onClick={() =>
              window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`,
                "_blank",
              )
            }
          >
            <WhatsAppIcon size={20} color="white" />
            Get a Custom Quote
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="cbo-right">
          <img src={myImage} alt="Dry Fruits" />

          <div className="cbo-badge">
            <strong>{badgeTitle}</strong>
            <p>{badgeSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateBulkOrders;
