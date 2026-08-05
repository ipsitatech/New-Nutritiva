import TopBar from "./TopBar";
import Footer from "./Footer";
import WhatsAppButton from "../ui/WhatsAppButton";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Layout = ({ children, topBarVariant = "default" }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Handle hash scrolling on page load/change
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar variant={topBarVariant} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
