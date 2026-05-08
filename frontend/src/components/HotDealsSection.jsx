import almonds from "../assets/product_imgs/almonds.png";
import walnuts from "../assets/product_imgs/walnuts.png";
import pistachios from "../assets/product_imgs/pistachios.png";
import goji from "../assets/product_imgs/goji_berries.png";

import hotDealsData from "../data/hotDeals.json";

const IMAGE_MAP = {
  almonds,
  walnuts,
  pistachios,
  goji,
};

function HotDealsSection() {

  const products = hotDealsData.map((p) => ({
    ...p,
    image: IMAGE_MAP[p.imageKey],
  }));


  // 📱 WhatsApp redirect function
  const handleWhatsApp = (productName) => {
    const phoneNumber = "916371844736";

    const message = `Hello, I want to enquire about ${productName}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="bg-[#f8f9f7] py-24">

      {/* TOP TITLE */}
      <div className="text-center">

        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
          🔥 LIMITED TIME
        </span>

        <h2 className="text-6xl font-bold mt-6">
          Hot <span className="text-green-700">Deals</span>
        </h2>

        <p className="text-gray-500 text-xl mt-5">
          Handpicked bestsellers at special prices — prices shown in this section only.
        </p>

      </div>

      {/* PRODUCT CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 px-6">

        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100"
          >

            {/* IMAGE */}
            <div className="relative">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              {/* DISCOUNT BADGE */}
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                {product.discount}
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h3 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h3>

              <p className="text-gray-500 mt-2 text-lg">
                {product.weight}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-3 mt-5">

                <span className="text-4xl font-bold text-green-700">
                  {product.price}
                </span>

                <span className="text-gray-400 line-through text-xl">
                  {product.oldPrice}
                </span>

              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleWhatsApp(product.name)}
                className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-4 rounded-2xl mt-6 text-lg"
              >
                💬 Enquire Now
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default HotDealsSection;