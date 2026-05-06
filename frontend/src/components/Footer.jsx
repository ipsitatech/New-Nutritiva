import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 px-24 py-16">
      <div className="grid grid-cols-4 gap-10">

        {/* LEFT */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">🌿 Nutritva</h2>
          <p className="text-sm">
            India's most trusted premium dry fruits and superfoods brand.
            Sourced with care, delivered with love.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">WhatsApp</a>
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Products</h3>
          <div className="flex flex-col gap-2">
            <Link to="/products" className="hover:text-white">Dry Fruits</Link>
            <Link to="/products" className="hover:text-white">Exotic Nuts</Link>
            <Link to="/products" className="hover:text-white">Berries</Link>
            <Link to="/products" className="hover:text-white">Seeds & Superfoods</Link>
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-white">About Us</Link>
            <Link to="/" className="hover:text-white">Subscriptions</Link>
            <Link to="/" className="hover:text-white">Corporate</Link>
            <Link to="/" className="hover:text-white">FAQs</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <div className="flex flex-col gap-2 text-sm">
            <a href="tel:+919876543210">📞 +91 98765 43210</a>
            <a href="mailto:hello@nutritva.in">✉ hello@nutritva.in</a>
            <a href="https://maps.google.com" target="_blank">
              📍 Mumbai, India
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © 2025 Nutritva. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;