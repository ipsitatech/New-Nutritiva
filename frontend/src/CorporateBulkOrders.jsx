import React from "react";
import { FaBoxOpen, FaUsers, FaGift, FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import myImage from './cat_almonds.png'

const CorporateBulkOrders = () => {
  return (
    <section className="bg-[#f9fafb] py-[70px] px-[90px] font-['Inter',sans-serif]">
      <div className="flex items-center justify-between gap-[60px]">
        
        {/* LEFT SIDE */}
        <div className="flex-1">
          <span className="bg-[#fde9dc] text-[#e67e22] px-[14px] py-[6px] text-xs rounded-full font-semibold inline-block mb-[18px]">
            B2B SOLUTIONS
          </span>

          <h2 className="text-[38px] font-bold mb-[10px]">
            Corporate <span className="text-[#e67e22]">Bulk Orders</span>
          </h2>

          <p className="text-[#6b7280] mb-[25px] leading-relaxed">
            Premium dry fruits and healthy snacks for your corporate gifting,
            employee wellness programs, and festive celebrations across India.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-[22px] mb-[30px]">
            <div className="flex gap-3">
              <FaBoxOpen className="text-[20px] mt-1 text-[#e67e22]" />
              <div>
                <h4 className="text-sm">Bulk Discounts</h4>
                <p className="text-xs text-[#6b7280]">Special pricing for orders above 50kg</p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaUsers className="text-[20px] mt-1 text-[#6c5ce7]" />
              <div>
                <h4 className="text-sm">Employee Wellness</h4>
                <p className="text-xs text-[#6b7280]">Monthly snack subscriptions for offices</p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaGift className="text-[20px] mt-1 text-[#e67e22]" />
              <div>
                <h4 className="text-sm">Custom Packaging</h4>
                <p className="text-xs text-[#6b7280]">Branded gift boxes with your logo</p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaPhoneAlt className="text-[20px] mt-1 text-[#6c5ce7]" />
              <div>
                <h4 className="text-sm">Dedicated Support</h4>
                <p className="text-xs text-[#6b7280]">Account manager for your account</p>
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div className="border border-[#e5e7eb] rounded-lg overflow-hidden mb-[22px]">
            <div className="flex justify-between p-4 border-b border-[#eee]">
              <div>
                <h5 className="text-sm">Starter Pack</h5>
                <p className="text-xs text-[#6b7280]">10 – 50 kg</p>
              </div>
              <span className="text-[#e67e22] font-semibold">10% OFF</span>
            </div>

            <div className="flex justify-between p-4 border-b border-[#eee]">
              <div>
                <h5 className="text-sm">Business Pack</h5>
                <p className="text-xs text-[#6b7280]">50 – 100 kg</p>
              </div>
              <span className="text-[#e67e22] font-semibold">20% OFF</span>
            </div>

            <div className="flex justify-between p-4 bg-[#fde9dc]">
              <div>
                <h5 className="text-sm">Enterprise Pack</h5>
                <p className="text-xs text-[#6b7280]">100 kg+</p>
              </div>
              <span className="text-[#e67e22] font-semibold">30% OFF + Free Shipping</span>
            </div>
          </div>

          <button className="w-full bg-[#1f7a5a] hover:bg-[#176347] text-white py-[14px] px-4 rounded-lg font-semibold cursor-pointer transition duration-300 flex items-center justify-center gap-[10px]">
            <FaWhatsapp className="text-[18px]" />
            Get a Custom Quote
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 relative">
          <img
            src={myImage}
            alt="Dry Fruits"
            className="w-full rounded-2xl object-cover"
          />

          <div className="absolute bottom-5 left-5 bg-white py-[10px] px-[14px] rounded-lg shadow-lg">
            <strong className="text-sm">Trusted by 500+</strong>
            <p className="text-xs text-[#6b7280]">Companies across India</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CorporateBulkOrders;