import almonds from "../assets/product_imgs/almonds.png";
import walnuts from "../assets/product_imgs/walnuts.png";
import pistachios from "../assets/product_imgs/pistachios.png";
import goji from "../assets/product_imgs/goji_berries.png";

function HotDealsSection() {
  const products = [
    {
      image: almonds,
      name: "Premium California Almonds",
      weight: "500g",
      price: "₹899",
      oldPrice: "₹1,199",
      discount: "25% OFF",
    },
    {
      image: walnuts,
      name: "Kashmiri Walnut Kernels",
      weight: "500g",
      price: "₹1,299",
      oldPrice: "₹1,599",
      discount: "19% OFF",
    },
    {
      image: pistachios,
      name: "Premium Iranian Pistachios",
      weight: "500g",
      price: "₹1,499",
      oldPrice: "₹1,899",
      discount: "21% OFF",
    },
    {
      image: goji,
      name: "Organic Goji Berries",
      weight: "250g",
      price: "₹799",
      oldPrice: "₹999",
      discount: "20% OFF",
    },
  ];

  const handleWhatsApp = (productName) => {
    const phoneNumber = "9679005896";
    const message = `Hello, I want to enquire about ${productName}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="bg-[#f8f9f7] py-12">

      {/* HEADER */}
      <div className="text-center px-4">
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-medium">
          🔥 LIMITED TIME
        </span>

        <h2 className="text-4xl font-bold mt-4">
          Hot <span className="text-green-700">Deals</span>
        </h2>

        <p className="text-gray-500 text-base mt-3 max-w-xl mx-auto">
          Handpicked bestsellers at special prices — prices shown in this section only.
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4">

        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col h-full"
          >

            {/* IMAGE */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {product.discount}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-grow">

              {/* TITLE FIXED HEIGHT */}
              <h3 className="text-lg font-semibold text-gray-900 min-h-[48px]">
                {product.name}
              </h3>

              <p className="text-gray-500 mt-1 text-sm">
                {product.weight}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-2xl font-bold text-green-700">
                  {product.price}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {product.oldPrice}
                </span>
              </div>

              {/* BUTTON FIX */}
              <button
                onClick={() => handleWhatsApp(product.name)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-xl mt-auto text-sm"
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