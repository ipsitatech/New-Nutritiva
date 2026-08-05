import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X, ArrowRight } from "lucide-react";

export default function StatusModal({
  isOpen,
  onClose,
  type,
  location,
  onSignIn,
}) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isServiceable = type === "serviceable";

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#000]/40 backdrop-blur-[6px] transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-[32px] p-8 md:p-12 max-w-[460px] w-full shadow-[0_30px_100px_rgba(0,0,0,0.25)] text-center animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#AAA] hover:text-[#141414] hover:bg-[#F5F5F5] rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div
          className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 ${isServiceable ? "bg-[#EFF7F2]" : "bg-[#FFF2F2]"}`}
        >
          {isServiceable ? (
            <CheckCircle2 size={48} className="text-[#2D7A4F]" />
          ) : (
            <AlertCircle size={48} className="text-[#D72C2C]" />
          )}
        </div>

        <h3 className="text-3xl font-black text-[#141414] mb-4 tracking-tight leading-none">
          {isServiceable ? "Serviceable!" : "Not Serviceable"}
        </h3>

        <p className="text-[#666] text-[17px] leading-relaxed mb-10 px-2">
          {isServiceable ? (
            <>
              Great news! We deliver to{" "}
              <span className="font-bold text-[#141414]">{location}</span>. You
              can now explore our premium products.
            </>
          ) : (
            "We're sorry, but we don't deliver to this location yet. We're expanding rapidly, so check back soon!"
          )}
        </p>

        {isServiceable ? (
          <button
            onClick={onSignIn}
            className="w-full bg-[#2D7A4F] hover:bg-[#236340] text-white py-5 rounded-2xl font-bold text-lg shadow-[0_12px_24px_rgba(45,122,79,0.25)] transition-all flex items-center justify-center gap-2"
          >
            Proceed to Sign Up
            <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-[#141414] hover:bg-black text-white py-5 rounded-2xl font-bold text-lg transition-all"
          >
            Got it, thanks
          </button>
        )}
      </div>
    </div>
  );
}
