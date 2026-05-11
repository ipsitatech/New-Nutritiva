import React from "react";
import { X } from "lucide-react";

export default function TermsModal({ isOpen, onClose, onAccept }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h3 className="text-xl font-black text-gray-900">Terms & Conditions</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="p-8 max-h-[60vh] overflow-y-auto text-gray-600 space-y-4">
          <p className="font-bold text-gray-900">1. Acceptance of Terms</p>
          <p>By registering on Nutritva, you agree to provide accurate information and abide by our quality standards. We reserve the right to verify all business and personal details provided during registration.</p>
          <p className="font-bold text-gray-900">2. Privacy & Data Security</p>
          <p>Your data is encrypted and handled according to our Privacy Policy. We never share your sensitive financial information with third parties without your explicit consent.</p>
          <p className="font-bold text-gray-900">3. Quality Standards</p>
          <p>As a Nutritva partner or user, you commit to maintaining the highest standards of food safety and premium quality as defined in our seller handbook.</p>
          <p>... and more detailed legal terms regarding commissions, refunds, and usage policies.</p>
        </div>
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-700">Decline</button>
          <button 
            onClick={() => { onAccept(); onClose(); }} 
            className="px-8 py-3 bg-[#2D7A4F] text-white font-black rounded-xl hover:bg-[#256040] shadow-lg transition-all"
          >
            Accept Terms & Conditions
          </button>
        </div>
      </div>
    </div>
  );
}
