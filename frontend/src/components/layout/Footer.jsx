import { Link } from "react-router-dom";
import logo from "../../assets/images/Nutritiva-logo.png";
import footerData from "../../data/footer.json";

function Footer() {
  const { brand, productLinks, companyLinks, contact, copyright } = footerData;

  return (
    <footer className="bg-[#0f172a] text-gray-300 px-24 py-16">
      <div className="grid grid-cols-4 gap-10">

        {/* LEFT */}
        <div>
          <img src={logo} alt="Nutritva Logo" className="h-28 w-auto object-contain mb-4 invert" />
          <p className="text-sm">
            {brand.tagline}
          </p>

          <div className="flex gap-4 mt-4">
            {brand.socials.map((social, idx) => (
              <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">{social.name}</a>
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
            <a href={contact.phoneUrl} className="hover:text-white">📞 {contact.phone}</a>
            <a href={contact.emailUrl} className="hover:text-white">✉ {contact.email}</a>
            <a href={contact.addressUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              📍 {contact.address}
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION with copyright left and developed by right, Added By Akshay Gohrava */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="flex items-center justify-between text-sm">
          {/* Copyright - Left Side */}
          <div className="text-gray-400">
            {copyright}
          </div>
          
          {/* Developed By - Right Side */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Developed By</span>
            <a 
              href="https://showstoper.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center transition-opacity hover:opacity-80"
            >
              <img 
                src="https://showstoper.in/assets/St-03%20wht-BxDq9RZc.png" 
                alt="Showstoper Technologies & Media" 
                className="h-8 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;