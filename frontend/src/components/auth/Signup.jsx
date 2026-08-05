import { motion } from 'framer-motion';
import { useState } from 'react';
import { COUNTRY_CODES } from '../../constants';

const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const Signup = ({ role, onRoleChange, formData, handleChange, handleFileChange, gstCertName, captchaChecked, onCaptchaToggle }) => {
    const [captchaCode, setCaptchaCode] = useState(generateCaptcha());

    const handleRefreshCaptcha = () => {
        setCaptchaCode(generateCaptcha());
    };

    return (
        <motion.div 
            key="signup"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
        >
            <div className="flex items-center gap-4 mb-6 p-[14px_18px] bg-gradient-to-br from-[#f0fdf4] to-[#fffdf0] border border-nutri-green/15 rounded-2xl shadow-sm">
                <div className="text-xs font-extrabold text-nutri-green whitespace-nowrap min-w-[65px] tracking-tight">Sign up as</div>
                <div className="flex gap-2 flex-wrap">
                    {[
                        { id: 'admin', label: 'Admin', icon: '🛡️', color: 'text-[#6d28d9]', bg: 'bg-[#f5f3ff]', border: 'border-[#c4b5fd]', active: 'bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] shadow-[#7c3aed]/40' },
                        { id: 'buyer', label: 'Buyer', icon: '🛒', color: 'text-nutri-green', bg: 'bg-white', border: 'border-border', active: 'bg-gradient-to-br from-nutri-green to-[#22c55e] shadow-nutri-green/35' },
                        { id: 'seller', label: 'Seller', icon: '🏪', color: 'text-nutri-green', bg: 'bg-white', border: 'border-border', active: 'bg-gradient-to-br from-nutri-green to-[#22c55e] shadow-nutri-green/35' },
                        { id: 'guest', label: 'Guest', icon: '👻', color: 'text-[#d97706]', bg: 'bg-[#fffbeb]', border: 'border-[#fbbf24]', active: 'bg-gradient-to-br from-[#f59e0b] to-[#d97706] shadow-[#f59e0b]/40' }
                    ].map(r => (
                        <button 
                            key={r.id}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${role === r.id ? `${r.active} text-white border-transparent` : `${r.bg} ${r.color} ${r.border} hover:border-current`}`}
                            onClick={() => onRoleChange(r.id)}
                        >
                            {r.icon} {r.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-[10px] font-black tracking-[2px] text-white uppercase bg-gradient-to-r from-nutri-green to-[#1aab32] px-3.5 py-1.5 rounded-md my-[22px_16px] inline-block">BASIC INFORMATION</div>
            
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Full Name <span className="text-[#d32f2f] font-black">*</span></label>
                <div className="flex-1 max-w-[360px]">
                    <input name="fullName" type="text" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Full Name" onChange={handleChange} value={formData.fullName} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Username <span className="text-[#d32f2f] font-black">*</span></label>
                <div className="flex-1 max-w-[360px]">
                    <input name="username" type="text" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Unique username (e.g. john_doe)" maxLength="30" onChange={handleChange} value={formData.username} />
                    <div className="text-[11px] text-[#546e7a] mt-1.5 font-medium leading-relaxed">Letters, numbers, underscores ( _ ), dots ( . ), hyphens ( - ) only. Min 3 characters.</div>
                </div>
            </div>

            {(role === 'buyer' || role === 'seller') && (
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                    <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Business Name <span className="text-[#d32f2f] font-black">*</span></label>
                    <div className="flex-1 max-w-[360px]">
                        <input name="businessName" type="text" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Business Name" onChange={handleChange} value={formData.businessName} />
                    </div>
                </div>
            )}

            {role === 'seller' && (
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                    <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">GST Number</label>
                    <div className="flex-1 max-w-[360px]">
                        <input name="gstNumber" type="text" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="GST Number" onChange={handleChange} value={formData.gstNumber} />
                    </div>
                </div>
            )}

            {role === 'seller' && (
                <>
                    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                        <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Store / Shop Name <span className="text-[#d32f2f] font-black">*</span></label>
                        <div className="flex-1 max-w-[360px]">
                            <input name="storeName" type="text" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Your store name" onChange={handleChange} value={formData.storeName} />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                        <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">GST Certificate <span className="text-[#d32f2f] font-black">*</span></label>
                        <div className="flex-1 max-w-[360px]">
                            <label className="flex items-center justify-between w-full p-[9px_12px] border-2 border-dashed border-[#b0bec5] bg-[#fafafa] rounded-xl cursor-pointer transition-all hover:border-nutri-green hover:bg-nutri-green-pale">
                                <span className={`text-xs font-medium ${gstCertName ? 'text-nutri-green font-bold' : 'text-[#666]'}`}>
                                    {gstCertName || 'Upload GST Certificate (PDF/Image)'}
                                </span>
                                <span className="text-[10px] font-black text-white bg-nutri-green px-3 py-1.5 rounded-md tracking-wider">BROWSE</span>
                                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>
                </>
            )}

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
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

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Email Address <span className="text-[#d32f2f] font-black">*</span></label>
                <div className="flex-1 max-w-[360px]">
                    <input name="email" type="email" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Email Address" onChange={handleChange} value={formData.email} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Password <span className="text-[#d32f2f] font-black">*</span></label>
                <div className="flex-1 max-w-[360px]">
                    <input name="password" type="password" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Create Password" onChange={handleChange} value={formData.password} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Confirm Password <span className="text-[#d32f2f] font-black">*</span></label>
                <div className="flex-1 max-w-[360px]">
                    <input name="confirmPassword" type="password" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} />
                </div>
            </div>

            <div className="text-[10px] font-black tracking-[2px] text-white uppercase bg-gradient-to-r from-nutri-green to-[#1aab32] px-3.5 py-1.5 rounded-md my-[22px_16px] inline-block">PERSONAL &amp; LOCATION</div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Date of Birth</label>
                <div className="flex-1 max-w-[360px] flex gap-3">
                    <input name="dob" type="text" className="flex-1 p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="DOB (DD-MM-YYYY)" onChange={handleChange} value={formData.dob} />
                    <select name="gender" className="w-[120px] p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5" onChange={handleChange} value={formData.gender}>
                        <option value="" disabled>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Address / Location</label>
                <div className="flex-1 max-w-[360px]">
                    <input name="address" type="text" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Address / Location" onChange={handleChange} value={formData.address} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Pin Code <span className="text-[#d32f2f] font-black">*</span></label>
                <div className="flex-1 max-w-[360px]">
                    <input name="pinCode" type="text" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="6-digit Pin Code" maxLength="6" onChange={handleChange} value={formData.pinCode} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Referral Code</label>
                <div className="flex-1 max-w-[360px]">
                    <input name="referralCode" type="text" className="w-full p-[9px_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium text-[#1a1a2e] outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5] focus:ring-3 focus:ring-nutri-green/14 focus:-translate-y-0.5 placeholder:text-[#7a8599] placeholder:font-normal" placeholder="Referral Code (Optional)" onChange={handleChange} value={formData.referralCode} />
                </div>
            </div>

            <div className="text-[10px] font-black tracking-[2px] text-white uppercase bg-gradient-to-r from-nutri-green to-[#1aab32] px-3.5 py-1.5 rounded-md my-[22px_16px] inline-block">SECURITY</div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Verify Code</label>
                <div className="flex-1 max-w-[360px] flex gap-3">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center min-w-[100px] h-10 bg-[#f5f5f5] border border-[#a9a9a9] rounded-md font-black text-lg italic tracking-[6px] text-[#2c3e50] select-none bg-[radial-gradient(#e0e0e0_25%,_transparent_25%),_radial-gradient(#e0e0e0_25%,_transparent_25%)] bg-[length:10px_10px] bg-[position:0_0,5px_5px]">
                            {captchaCode}
                        </div>
                        <button type="button" onClick={handleRefreshCaptcha} className="w-10 h-10 bg-[#f8f9fa] border border-[#a9a9a9] rounded-md flex items-center justify-center text-xl text-[#555] transition-all hover:text-nutri-green hover:border-nutri-green" title="Refresh Captcha">
                             <span className="leading-none">↻</span>
                        </button>
                    </div>
                    <input name="captchaText" type="text" className="flex-1 h-10 p-[0_12px] border-2 border-[#b0bec5] bg-white rounded-xl text-sm font-medium outline-none transition-all focus:border-nutri-green focus:bg-[#f4fef5]" placeholder="Type code here" onChange={handleChange} value={formData.captchaText || ''} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 rounded-xl transition-colors hover:bg-nutri-green/5 group">
                <label className="md:w-[155px] md:text-right md:pt-2 text-xs font-black text-[#1a1a2e] group-hover:text-nutri-green transition-colors">Robot Check</label>
                <div className="flex-1 max-w-[360px]">
                    <div className={`flex items-center gap-3 p-[10px_14px] border border-[#ccc] rounded-md bg-[#f9f9f9] cursor-pointer transition-all hover:border-nutri-green select-none ${captchaChecked ? 'border-nutri-green bg-nutri-green-pale' : ''}`} onClick={onCaptchaToggle}>
                        <div className={`w-5.5 h-5.5 border-2 border-[#ccc] rounded flex items-center justify-center transition-all ${captchaChecked ? 'bg-nutri-green border-nutri-green text-white' : 'text-transparent'}`}>
                             {captchaChecked && <span className="font-bold">✓</span>}
                        </div>
                        <span className="text-sm">I am not a robot</span>
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="w-7 ml-auto opacity-60" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-3 px-0 md:px-2.5 py-1.5 group">
                <label className="md:w-[155px]"></label>
                <div className="flex-1 max-w-[360px]">
                    <label className="flex items-center gap-2 text-xs font-medium text-text-muted cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border text-nutri-green focus:ring-nutri-green" /> 
                        I agree to the <a href="#" className="text-nutri-green font-bold hover:underline">Terms &amp; Conditions</a>
                    </label>
                </div>
            </div>

            {role !== 'guest' && (
                <div className="mt-4">
                    <div className="flex items-center gap-3 my-4.5">
                        <span className="flex-1 h-px bg-[#e0e0e0]"></span>
                        <span className="text-[10px] font-black text-[#aaa] tracking-widest uppercase">OR</span>
                        <span className="flex-1 h-px bg-[#e0e0e0]"></span>
                    </div>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 w-full h-11 bg-white border border-[#c5d4f6] rounded-xl text-sm font-bold text-[#3c4043] transition-all shadow-sm hover:bg-[#f1f6ff] hover:border-[#4285F4] hover:shadow-md hover:-translate-y-0.5 tracking-tight"
                        onClick={() => alert('Google Sign-up coming soon!')}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        <span>Sign up with Google</span>
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default Signup;
