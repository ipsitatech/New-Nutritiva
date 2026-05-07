import { motion } from 'framer-motion';

const OtpPanel = ({ mode, formData, simulatedOtp, handleChange, onResend, loginMethod }) => {
    return (
        <motion.div 
            key="step2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="py-4"
        >
            <div className="bg-[#f5f5f5] border border-[#e0e0e0] border-l-4 border-[#c45500] p-[10px_14px] rounded-sm text-sm text-[#555] mb-6 leading-relaxed">
                Enter the 6-digit OTP sent to your { (mode === 'guest' || loginMethod === 'email') ? 'email' : 'number'}. <br/>
                <strong className="text-[#c45500]">[Demo OTP: {simulatedOtp}]</strong>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2.5 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">OTP Code</label>
                <div className="flex-1 max-w-[360px]">
                    <input 
                        name="otp"
                        type="tel" 
                        className="w-full p-[11px_16px] border-2 border-[#b0bec5] bg-white rounded-xl text-lg font-black tracking-[4px] text-center text-dark outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal placeholder:tracking-normal" 
                        placeholder="6-digit OTP" 
                        maxLength="6"
                        value={formData.otp}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="text-[13px] text-[#888] mt-4 px-2.5">
                Didn't receive? <button className="text-nutri-green font-bold hover:underline" onClick={onResend}>Resend OTP</button>
            </div>
        </motion.div>
    );
};

export default OtpPanel;
