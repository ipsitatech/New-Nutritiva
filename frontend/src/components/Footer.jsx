import { Link } from "react-router-dom";
import footerData from "../data/footer.json";

function Footer() {
  const { brand, productLinks, companyLinks, contact, copyright } = footerData;

  return (
    <footer className="bg-[#0f172a] text-gray-300 px-24 py-16">
      <div className="grid grid-cols-4 gap-10">

        {/* LEFT */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">🌿 {brand.name}</h2>
          <p className="text-sm">
            {brand.tagline}
          </p>

          <div className="flex gap-4 mt-4">
            {brand.socials.map((social, idx) => (
              <a key={idx} href={social.url} target="_blank" className="hover:text-white">{social.name}</a>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Products</h3>
          <div className="flex flex-col gap-2">
            {productLinks.map((link, idx) => (
              <Link key={idx} to={link.url} className="hover:text-white">{link.name}</Link>
            ))}
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <div className="flex flex-col gap-2">
            {companyLinks.map((link, idx) => (
              <Link key={idx} to={link.url} className="hover:text-white">{link.name}</Link>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <div className="flex flex-col gap-2 text-sm">
            <a href={contact.phoneUrl}>📞 {contact.phone}</a>
            <a href={contact.emailUrl}>✉ {contact.email}</a>
            <a href={contact.addressUrl} target="_blank">
              📍 {contact.address}
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        {copyright}
      </div>
    </footer>
  );
}

export default Footer;