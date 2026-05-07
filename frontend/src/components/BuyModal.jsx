import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BuyModal = ({ product, onClose, onConfirm }) => {
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');

    if (!product) return null;

    const selectQty = (q) => setQuantity(q);
    const changeQty = (delta) => setQuantity(prev => Math.max(1, prev + delta));

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-5 bg-[#0c1c14]/65 backdrop-blur-md" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-[520px] rounded-[24px] p-8 relative shadow-2xl overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute top-5 right-5 w-8 h-8 bg-[#f0f2f5] border-none rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-[#e2e8f0]" onClick={onClose}>✕</button>
                
                <div className="flex gap-5 mb-7">
                    <div className="w-[110px] h-[110px] rounded-xl overflow-hidden bg-[#f8f9fa] shrink-0 border border-border">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-[11px] font-black text-nutri-green uppercase mb-1 tracking-wider">{product.category}</div>
                        <h3 className="text-xl font-black text-dark mb-1.5">{product.name}</h3>
                        <div className="text-sm font-bold text-text-muted mb-2.5">{product.weight}</div>
                        <div className="text-xs font-bold text-nutri-green flex items-center gap-1.5 bg-nutri-green-pale px-2.5 py-1 rounded-full w-fit">
                            <span className="text-sm leading-none">⏱</span> Express Delivery Available
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-[11px] font-black text-dark mb-3 uppercase tracking-wider">Select Quantity</label>
                    <div className="flex flex-wrap gap-2.5">
                        {[1, 2, 3, 5, 10].map(q => (
                            <button 
                                key={q}
                                className={`px-4 py-2 rounded-full border-1.5 text-xs font-bold transition-all ${quantity === q ? 'bg-nutri-green-pale border-nutri-green text-nutri-green shadow-sm' : 'bg-white border-border text-text hover:border-nutri-green/50'}`}
                                onClick={() => selectQty(q)}
                            >
                                {q} Pack{q > 1 ? 's' : ''}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-[11px] font-black text-dark mb-3 uppercase tracking-wider">Or choose custom qty</label>
                    <div className="flex items-center gap-4 bg-[#f8f9fa] w-fit p-1.5 rounded-full border-1.5 border-border">
                        <button className="w-8 h-8 rounded-full border-none bg-white text-nutri-green flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-95" onClick={() => changeQty(-1)}>−</button>
                        <span className="text-base font-black min-w-[24px] text-center">{quantity}</span>
                        <button className="w-8 h-8 rounded-full border-none bg-white text-nutri-green flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-95" onClick={() => changeQty(1)}>+</button>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-[11px] font-black text-dark mb-3 uppercase tracking-wider">Special Instructions <span className="font-normal text-text-light lowercase">(optional)</span></label>
                    <textarea 
                        className="w-full h-20 border-1.5 border-border rounded-xl p-3 text-sm bg-[#fafbfc] outline-none focus:border-nutri-green transition-all resize-none placeholder:text-text-light" 
                        placeholder="E.g. extra packaging, gift wrap, specific grade..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex gap-4">
                    <button className="flex-1 h-[52px] bg-gradient-to-br from-nutri-green to-[#1aab32] text-white rounded-xl text-base font-black shadow-[0_6px_20px_rgba(12,131,31,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(12,131,31,0.45)] active:translate-y-0" onClick={() => onConfirm({ ...product, quantity, note })}>
                        Confirm Order
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default BuyModal;
