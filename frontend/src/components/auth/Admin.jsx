import { motion } from 'framer-motion';
import { useState } from 'react';

const Admin = ({ onLogin, mode }) => {
    const [formData, setFormData] = useState({
        adminId: '',
        adminPin: '',
        otp: ''
    });
    const [step, setStep] = useState(1);
    const [simOtp, setSimOtp] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleNext = () => {
        if (!formData.adminId || !formData.adminPin) {
            setError('Please enter Admin ID and Security PIN.');
            return;
        }
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSimOtp(generatedOtp);
        setStep(2);
    };

    const handleVerify = () => {
        if (formData.otp !== simOtp) {
            setError('Invalid security code. Access denied.');
            return;
        }
        onLogin({ name: 'System Admin', role: 'admin' });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center py-5 bg-[#0f172a] rounded-xl mt-2.5"
        >
            <div className="w-full max-w-[400px] text-center text-white p-5">
                <div className="text-[54px] text-yellow mb-[15px]">
                    <span className="leading-none">🛡️</span>
                </div>
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">Admin Portal</h2>
                <p className="text-[#94a3b8] text-[13px] mb-[25px]">Nutritiva Management System Access</p>

                {step === 1 ? (
                    <div className="space-y-4">
                        <div className="flex flex-col items-start gap-2 group">
                            <label className="w-full text-left text-[#94a3b8] text-[10px] uppercase font-black tracking-widest">Admin ID / Email / Mobile</label>
                            <input 
                                name="adminId"
                                type="text" 
                                className="w-full p-[9px_12px] bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-[#475569]" 
                                placeholder="Email, phone or admin ID"
                                onChange={handleChange}
                                value={formData.adminId}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-2 group">
                            <label className="w-full text-left text-[#94a3b8] text-[10px] uppercase font-black tracking-widest">Access Pin</label>
                            <input 
                                name="adminPin"
                                type="password" 
                                className="w-full p-[9px_12px] bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-[#475569]" 
                                placeholder="••••"
                                onChange={handleChange}
                                value={formData.adminPin}
                            />
                        </div>
                        <button className="w-full p-3.5 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white rounded-lg font-bold flex items-center justify-center gap-2 mt-2.5 transition-all hover:translate-y-[-1px] hover:shadow-lg active:translate-y-0" onClick={handleNext}>
                            Authorize Access <span>→</span>
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-[#1e3a8a]/20 border border-[#1e3a8a]/30 p-3 rounded-lg text-[12px] text-[#cbd5e1] leading-relaxed mb-5 text-left">
                            Identity matched. Enter 2FA code sent to your device.
                            <br />
                            <strong className="text-[#f59e0b]">[SecurID: {simOtp}]</strong>
                        </div>
                        <div className="flex flex-col items-start gap-2 group">
                            <label className="w-full text-left text-[#94a3b8] text-[10px] uppercase font-black tracking-widest">Verification Code</label>
                            <input 
                                name="otp"
                                type="tel" 
                                className="w-full p-[9px_12px] bg-white/5 border border-white/10 rounded-lg text-white text-lg font-black tracking-[4px] text-center outline-none focus:border-blue-500 transition-all" 
                                placeholder="000000" 
                                maxLength="6"
                                onChange={handleChange}
                                value={formData.otp}
                            />
                        </div>
                        <button className="w-full p-3.5 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white rounded-lg font-bold flex items-center justify-center gap-2 mt-2.5 transition-all hover:translate-y-[-1px] hover:shadow-lg active:translate-y-0" onClick={handleVerify}>
                            Verify Identity <span>✓</span>
                        </button>
                        <button className="bg-transparent border-none text-[#64748b] text-[11px] mt-[15px] cursor-pointer underline hover:text-[#94a3b8]" onClick={handleNext}>Resend Code</button>
                    </div>
                )}

                {error && <div className="text-[#ef4444] text-[12px] mt-[15px]">{error}</div>}
            </div>
        </motion.div>
    );
};

export default Admin;
