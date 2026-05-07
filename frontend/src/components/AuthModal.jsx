import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Guest from './auth/Guest';
import OtpPanel from './auth/OtpPanel';

const AuthModal = ({ initialMode = 'login', initialRole = 'buyer', onClose, onLogin, onGuest }) => {
    const [mode, setMode] = useState(initialMode); // login, signup, guest, admin
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(initialRole); // admin, buyer, seller, guest
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        username: '',
        businessName: '',
        gstNumber: '',
        storeName: '',
        pinCode: '',
        dob: '',
        gender: '',
        address: '',
        referralCode: ''
    });
    const [gstCertName, setGstCertName] = useState('');
    const [captchaChecked, setCaptchaChecked] = useState(false);
    const [simOtp, setSimOtp] = useState('');

    const [loginMethod, setLoginMethod] = useState('phone'); // phone, email

    const handleModeChange = (newMode) => {
        setMode(newMode);
        setStep(1);
        if (newMode === 'guest') setRole('guest');
        else setRole('buyer');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (mode === 'login') {
            if (e.target.name === 'phone' && e.target.value) setLoginMethod('phone');
            if (e.target.name === 'email' && e.target.value) setLoginMethod('email');
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files?.[0]) {
            setGstCertName(e.target.files[0].name);
        }
    };

    const handleNext = () => {
        if (step === 1) {
            // Simulate sending OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            setSimOtp(otp);
            setStep(2);
        } else {
            // Verify OTP logic
            if (mode === 'signup') {
                alert('Account created successfully!');
                onLogin({ name: formData.fullName || 'User', role });
            } else if (mode === 'login') {
                onLogin({ name: 'User', role });
            } else if (mode === 'guest') {
                onGuest();
            }
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-5 bg-[#f8f9fa] bg-[radial-gradient(at_0%_0%,_hsla(113,56%,92%,1)_0px,_transparent_50%),_radial-gradient(at_100%_0%,_hsla(43,90%,90%,1)_0px,_transparent_50%),_radial-gradient(at_100%_100%,_hsla(135,60%,88%,1)_0px,_transparent_50%),_radial-gradient(at_0%_100%,_hsla(213,60%,93%,1)_0px,_transparent_50%)] backdrop-blur-md">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-[920px] bg-white rounded-3xl shadow-[0_28px_80px_rgba(0,0,0,0.12),_0_0_0_1px_rgba(255,255,255,0.6)] overflow-hidden flex flex-col"
            >
                {/* Top Bar */}
                <div className="flex items-center justify-between p-[12px_20px] bg-[#232f3e]">
                    <div className="text-[26px] font-extrabold tracking-tight">
                        <span className="text-yellow">Nutri</span>
                        <span className="text-[#4caf50]">tva</span>
                    </div>
                    <button className="bg-transparent border border-white/20 text-white/70 p-[5px_12px] rounded text-xs font-semibold transition-all hover:text-white hover:border-white hover:bg-white/10" onClick={onClose}>✕ Close</button>
                </div>

                {/* Heading */}
                <div className="text-[22px] font-extrabold p-[20px_30px_12px] text-[#1a1a2e] border-b border-[#f0f0f0] bg-gradient-to-br from-[#fafffe] to-[#fff9f0] tracking-tight">
                    {mode === 'login' ? 'Login to Your Account' : 
                     mode === 'signup' ? 'Create Your Account' : 'Enter as Guest'}
                </div>

                {/* Tabs */}
                <div className="flex border-b-2 border-[#f0f0f0] px-6 bg-[#fafafa] gap-1">
                    <button className={`p-[12px_24px] bg-transparent border-b-3 mb-[-2px] text-sm font-bold transition-all rounded-t-lg tracking-wide ${mode === 'login' ? 'border-nutri-green text-nutri-green bg-nutri-green/5' : 'border-transparent text-text-muted hover:text-nutri-green hover:bg-nutri-green/5'}`} onClick={() => handleModeChange('login')}>Login</button>
                    <button className={`p-[12px_24px] bg-transparent border-b-3 mb-[-2px] text-sm font-bold transition-all rounded-t-lg tracking-wide ${mode === 'signup' ? 'border-nutri-green text-nutri-green bg-nutri-green/5' : 'border-transparent text-text-muted hover:text-nutri-green hover:bg-nutri-green/5'}`} onClick={() => handleModeChange('signup')}>Sign Up</button>
                    <button className={`p-[12px_24px] bg-transparent border-b-3 mb-[-2px] text-sm font-bold transition-all rounded-t-lg tracking-wide ${mode === 'guest' ? 'border-nutri-green text-nutri-green bg-nutri-green/5' : 'border-transparent text-text-muted hover:text-nutri-green hover:bg-nutri-green/5'}`} onClick={() => handleModeChange('guest')}>Guest</button>
                </div>

                <div className="flex min-h-[380px]">
                    {/* Sidebar */}
                    <div className="w-[200px] shrink-0 bg-gradient-to-b from-[#f8fdf8] to-[#fffdf5] border-r border-[#edf0ed] pt-6 hidden md:block">
                        <div className={`flex items-center gap-3 p-[14px_20px] text-xs border-l-4 transition-all ${step === 1 ? 'bg-nutri-green/5 text-nutri-green border-nutri-green font-extrabold' : 'text-[#999] border-transparent font-medium'}`}>
                            <span className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-white text-[11px] font-black shadow-md ${step === 1 ? 'bg-gradient-to-br from-nutri-green to-[#1aab32]' : 'bg-[#ddd]'}`}>1</span> 
                            {mode === 'signup' ? 'Fill Details' : 'Credentials'}
                        </div>
                        <div className={`flex items-center gap-3 p-[14px_20px] text-xs border-l-4 transition-all ${step === 2 ? 'bg-nutri-green/5 text-nutri-green border-nutri-green font-extrabold' : 'text-[#999] border-transparent font-medium'}`}>
                            <span className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-white text-[11px] font-black shadow-md ${step === 2 ? 'bg-gradient-to-br from-nutri-green to-[#1aab32]' : 'bg-[#ddd]'}`}>2</span> 
                            OTP Verification
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="flex-1 p-5 md:p-[20px_30px] h-[550px] overflow-y-auto bg-white">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    {mode === 'login' && (
                                        <Login 
                                            role={role} 
                                            onRoleChange={(newRole) => {
                                                if (newRole === 'guest') handleModeChange('guest');
                                                else setRole(newRole);
                                            }} 
                                            formData={formData} 
                                            handleChange={handleChange}
                                        />
                                    )}
                                    {mode === 'signup' && (
                                        <Signup 
                                            role={role} 
                                            onRoleChange={(newRole) => {
                                                if (newRole === 'guest') handleModeChange('guest');
                                                else setRole(newRole);
                                            }} 
                                            formData={formData} 
                                            handleChange={handleChange} 
                                            handleFileChange={handleFileChange}
                                            gstCertName={gstCertName}
                                            captchaChecked={captchaChecked}
                                            onCaptchaToggle={() => setCaptchaChecked(!captchaChecked)}
                                        />
                                    )}
                                    {mode === 'guest' && (
                                        <Guest 
                                            formData={formData} 
                                            handleChange={handleChange} 
                                            captchaChecked={captchaChecked}
                                            onCaptchaToggle={() => setCaptchaChecked(!captchaChecked)}
                                        />
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    <OtpPanel 
                                        mode={mode} 
                                        formData={formData} 
                                        simulatedOtp={simOtp} 
                                        onResend={() => handleNext()}
                                        loginMethod={loginMethod}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="p-[18px_36px] bg-gradient-to-br from-[#f0fdf4] to-[#fffde7] flex items-center gap-3 relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-nutri-green before:via-[#22c55e] before:via-yellow before:via-[#f59e0b] before:to-nutri-green before:bg-[length:300%_auto] before:animate-marquee">
                    {step === 2 && (
                        <button className="p-[11px_26px] rounded-full border border-[#e2e8f0] bg-white text-[#64748b] font-bold text-sm transition-all hover:border-nutri-green hover:text-nutri-green hover:bg-nutri-green-pale" onClick={() => setStep(1)}>
                            ← Back
                        </button>
                    )}
                    <button className="flex-1 md:flex-none p-[11px_32px] rounded-full bg-gradient-to-br from-nutri-green to-[#22c55e] text-white font-bold text-sm shadow-[0_6px_20px_rgba(12,131,31,0.3)] transition-all hover:translate-y-[-2px] hover:shadow-[0_10px_28px_rgba(12,131,31,0.4)] ml-auto" onClick={handleNext}>
                        {step === 1 ? '➤ Send OTP' : (mode === 'signup' ? '✔ Create Account' : '✔ Confirm')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;
