import { motion } from 'framer-motion';
import { COUNTRY_CODES } from '../../constants';

const GuestForm = ({ formData, handleChange, captchaChecked, onCaptchaToggle }) => {
    return (
        <motion.div 
            key="guest"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
        >
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3.5 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Email Address <span className="text-[#d32f2f] font-black">*</span></label>
                <div className="flex-1 max-w-[360px]">
                    <input name="email" type="email" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Enter your email address" onChange={handleChange} value={formData.email} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3.5 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Mobile Number <span className="text-[#d32f2f] font-black">*</span></label>
                <div className="flex-1 max-w-[360px]">
                    <div className="flex items-center border-2 border-[#b0bec5] bg-white rounded-xl overflow-hidden focus-within:border-nutri-green focus-within:ring-3 focus-within:ring-nutri-green/15 transition-all">
                        <select className="bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9] border-none border-r-2 border-[#b0bec5] font-bold h-11 px-2.5 text-[13px] text-[#1b5e20] outline-none">
                            <option value="+91">India (+91)</option>
                            {COUNTRY_CODES.filter(c => c.iso !== 'IN').map(c => (
                                <option key={c.iso} value={c.code}>{c.name} ({c.code})</option>
                            ))}
                        </select>
                        <input name="phone" type="tel" className="flex-1 h-11 px-3.5 text-sm font-medium text-[#1a1a2e] bg-transparent outline-none placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Mobile number" maxLength="15" onChange={handleChange} value={formData.phone} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3.5 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px]"></label>
                <div className="flex-1 max-w-[360px]">
                    <div className={`flex items-center gap-3 p-[10px_14px] border border-[#ccc] rounded-md bg-[#f9f9f9] cursor-pointer transition-all hover:border-nutri-green select-none ${captchaChecked ? 'border-nutri-green bg-nutri-green-pale' : ''}`} onClick={onCaptchaToggle}>
                        <div className={`w-5.5 h-5.5 border-2 border-[#ccc] rounded flex items-center justify-center transition-all ${captchaChecked ? 'bg-nutri-green border-nutri-green text-white' : 'text-transparent'}`}>
                             {captchaChecked && <span className="font-bold text-sm">✓</span>}
                        </div>
                        <span className="text-sm font-medium">I am not a robot</span>
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="w-7 ml-auto opacity-60" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GuestForm;
