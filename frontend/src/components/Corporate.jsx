import React from 'react';

const Corporate = () => {
    return (
        <section className="py-24 bg-white" id="corporate">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">
                    <div>
                        <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-accent bg-accent-light px-[13px] py-[5px] rounded-full mb-3">B2B Solutions</span>
                        <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-dark leading-[1.15] mb-4 tracking-tight">Corporate <em className="not-italic text-accent">Bulk Orders</em></h2>
                        <p className="text-sm text-text-muted leading-relaxed mb-8 max-w-[500px]">Premium dry fruits and healthy snacks for your corporate gifting, employee wellness programs, and festive celebrations across India.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-10">
                            <div className="flex items-start gap-3.5">
                                <span className="w-10 h-10 bg-accent-light text-accent text-xl rounded-xl flex items-center justify-center shrink-0">📦</span>
                                <div>
                                    <strong className="text-sm font-extrabold text-dark block">Bulk Discounts</strong>
                                    <p className="text-xs text-text-muted mt-0.5">Special pricing for orders above 50kg</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                                <span className="w-10 h-10 bg-accent-light text-accent text-xl rounded-xl flex items-center justify-center shrink-0">👥</span>
                                <div>
                                    <strong className="text-sm font-extrabold text-dark block">Employee Wellness</strong>
                                    <p className="text-xs text-text-muted mt-0.5">Monthly snack subscriptions for offices</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                                <span className="w-10 h-10 bg-accent-light text-accent text-xl rounded-xl flex items-center justify-center shrink-0">🎁</span>
                                <div>
                                    <strong className="text-sm font-extrabold text-dark block">Custom Packaging</strong>
                                    <p className="text-xs text-text-muted mt-0.5">Branded gift boxes with your logo</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                                <span className="w-10 h-10 bg-accent-light text-accent text-xl rounded-xl flex items-center justify-center shrink-0">📞</span>
                                <div>
                                    <strong className="text-sm font-extrabold text-dark block">Dedicated Support</strong>
                                    <p className="text-xs text-text-muted mt-0.5">Account manager for your account</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg p-6 rounded-2xl border border-border space-y-3 mb-8">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border">
                                <div className="flex flex-col">
                                    <strong className="text-xs font-bold text-dark">Starter Pack</strong>
                                    <span className="text-[11px] text-text-muted">10 – 50 kg</span>
                                </div>
                                <span className="text-[11px] font-black text-accent uppercase tracking-widest bg-accent-light px-3 py-1 rounded-full">10% OFF</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border">
                                <div className="flex flex-col">
                                    <strong className="text-xs font-bold text-dark">Business Pack</strong>
                                    <span className="text-[11px] text-text-muted">50 – 100 kg</span>
                                </div>
                                <span className="text-[11px] font-black text-accent uppercase tracking-widest bg-accent-light px-3 py-1 rounded-full">20% OFF</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-accent text-white rounded-lg shadow-lg">
                                <div className="flex flex-col">
                                    <strong className="text-xs font-bold">Enterprise Pack</strong>
                                    <span className="text-[11px] opacity-80">100 kg+</span>
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">30% OFF + Free Ship</span>
                            </div>
                        </div>

                        <a href="https://wa.me/919876543210?text=Interested in corporate bulk order"
                            className="inline-flex items-center gap-2 p-[11px_24px] bg-accent text-white rounded-lg text-sm font-bold shadow-lg transition-all hover:bg-accent/90 hover:-translate-y-0.5" target="_blank" rel="noreferrer">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Get a Custom Quote
                        </a>
                    </div>
                    <div className="relative group">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                           <img src="imgs/dryfruit bowl.png" alt="Corporate Hampers" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-border animate-bounce-subtle">
                           <strong className="text-sm font-black text-dark block">Trusted by 500+</strong>
                           <span className="text-[11px] text-text-muted">Companies across India</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Corporate;
