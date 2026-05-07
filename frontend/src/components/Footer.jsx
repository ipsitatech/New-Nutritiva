import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#fff5f7] border-t border-accent-light/15 font-sans text-[#1c1c28]">
            <div className="max-w-[1160px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="text-2xl font-extrabold tracking-tighter leading-none">🌿 Nutri<span className="text-nutri-green">tva</span></div>
                        <p className="text-sm text-text-muted leading-relaxed">
                            India's most trusted premium dry fruits and superfoods brand. Sourced with care, delivered with love.
                        </p>
                        <div className="flex items-center gap-2.5 mt-2">
                            <a href="#/" className="flex items-center justify-center w-9 h-9 bg-dark text-white rounded-full transition-all hover:bg-nutri-green hover:-translate-y-0.5" aria-label="Instagram">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="#/" className="flex items-center justify-center w-9 h-9 bg-dark text-white rounded-full transition-all hover:bg-nutri-green hover:-translate-y-0.5" aria-label="Facebook">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a href="https://wa.me/919876543210" className="flex items-center justify-center w-9 h-9 bg-dark text-white rounded-full transition-all hover:bg-nutri-green hover:-translate-y-0.5" aria-label="WhatsApp" target="_blank" rel="noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <h5 className="text-sm font-extrabold uppercase tracking-wider text-dark">Products</h5>
                        <ul className="flex flex-col gap-2.5">
                            <li><a href="#/" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">Dry Fruits</a></li>
                            <li><a href="#/" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">Exotic Nuts</a></li>
                            <li><a href="#/" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">Berries</a></li>
                            <li><a href="#/" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">Seeds &amp; Superfoods</a></li>
                            <li><a href="#/" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">Gourmet Mixes</a></li>
                        </ul>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <h5 className="text-sm font-extrabold uppercase tracking-wider text-dark">Company</h5>
                        <ul className="flex flex-col gap-2.5">
                            <li><a href="#about" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">About Us</a></li>
                            <li><a href="#subscriptions" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">Subscriptions</a></li>
                            <li><a href="#corporate" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">Corporate</a></li>
                            <li><a href="#hampers" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">Gift Hampers</a></li>
                            <li><a href="#faqs" className="text-[13.5px] text-text-muted transition-colors hover:text-nutri-green">FAQs</a></li>
                        </ul>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <h5 className="text-sm font-extrabold uppercase tracking-wider text-dark">Contact Us</h5>
                        <ul className="flex flex-col gap-2.5">
                            <li className="text-[13.5px] text-text-muted">📞 +91 98765 43210</li>
                            <li className="text-[13.5px] text-text-muted">✉️ hello@nutritva.in</li>
                            <li className="text-[13.5px] text-text-muted">📍 Mumbai, India</li>
                        </ul>
                        <div className="flex gap-2.5 mt-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-nutri-green-pale text-nutri-green px-2.5 py-1 rounded-full border border-nutri-green/10">FSSAI Certified</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-nutri-green-pale text-nutri-green px-2.5 py-1 rounded-full border border-nutri-green/10">ISO 22000</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 pt-6 border-t border-accent-light/15 text-center">
                    <p className="text-xs text-text-light font-medium">
                        © 2025 Nutritva. All rights reserved. | <a href="#/" className="text-nutri-green hover:underline">Privacy Policy</a> | <a href="#/" className="text-nutri-green hover:underline">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
