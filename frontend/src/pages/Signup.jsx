import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, User, Phone, MapPin, Building, FileText, Globe } from "lucide-react";
import TopBar from "../components/TopBar";

export default function Signup() {
  const { role: urlRole } = useParams();
  const navigate = useNavigate();
  
  // Normalize role to lowercase for consistency
  const currentRole = urlRole?.toLowerCase() || "buyer";

  // State for form fields (unified for all roles)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    address: "",
    city: "",
    pincode: "",
    gstNumber: "",
    fullName: "", // For Guest
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { role: currentRole, ...formData });
    // Add your API logic here
  };

  // Content configuration for each role
  const roleContent = {
    buyer: {
      title: "Join Nutritva",
      subtitle: "Start shopping for premium, farm-fresh nutrition today.",
      buttonText: "Create My Account",
      icon: <User className="text-[#2D7A4F]" size={24} />,
    },
    seller: {
      title: "Become a Partner",
      subtitle: "Join our network of premium producers and grow your business.",
      buttonText: "Register as Seller",
      icon: <Building className="text-[#2D7A4F]" size={24} />,
    },
    guest: {
      title: "Continue as Guest",
      subtitle: "Quick checkout without creating a full account.",
      buttonText: "Proceed as Guest",
      icon: <Globe className="text-[#2D7A4F]" size={24} />,
    }
  };

  const content = roleContent[currentRole] || roleContent.buyer;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <TopBar />
      
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Info/Branding */}
          <div className="hidden lg:block space-y-8 pr-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFF7F2] text-[#2D7A4F] rounded-full text-sm font-bold tracking-wide uppercase">
              {content.icon}
              <span>{currentRole} Account</span>
            </div>
            
            <h1 className="text-6xl font-black text-[#141414] leading-[1.1] tracking-tight">
              {content.title} <br /> 
              <span className="text-[#2D7A4F]">Today.</span>
            </h1>
            
            <p className="text-xl text-[#666] leading-relaxed max-w-md">
              {content.subtitle}
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#EEE] flex items-center justify-center shrink-0">
                  <ArrowRight size={20} className="text-[#2D7A4F]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#141414]">Quick & Secure</h4>
                  <p className="text-[#888] text-sm">Sign up in less than 2 minutes with top-tier security.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#EEE] flex items-center justify-center shrink-0">
                  <ArrowRight size={20} className="text-[#2D7A4F]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#141414]">Exclusive Access</h4>
                  <p className="text-[#888] text-sm">Get early access to farm-to-table deals and seasonal picks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-[540px] bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-[#F0F0F0]">
              
              <div className="mb-10 lg:hidden">
                 <h2 className="text-3xl font-black text-[#141414]">{content.title}</h2>
                 <p className="text-[#666] mt-2">{content.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* ROLE: BUYER FIELDS */}
                {currentRole === "buyer" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput label="First Name" name="firstName" placeholder="John" onChange={handleInputChange} icon={<User size={18}/>} />
                      <FormInput label="Last Name" name="lastName" placeholder="Doe" onChange={handleInputChange} />
                    </div>
                    <FormInput label="Email Address" name="email" type="email" placeholder="john@example.com" onChange={handleInputChange} icon={<Mail size={18}/>} />
                    <FormInput label="Phone" name="phone" placeholder="+91 00000 00000" onChange={handleInputChange} icon={<Phone size={18}/>} />
                    <FormInput label="Pincode" name="pincode" placeholder="123456" onChange={handleInputChange} icon={<MapPin size={18}/>} />
                    <FormInput label="Password" name="password" type="password" placeholder="••••••••" onChange={handleInputChange} icon={<Lock size={18}/>} />
                    <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" onChange={handleInputChange} icon={<Lock size={18}/>} />
                  </>
                )}

                {/* ROLE: SELLER FIELDS */}
                {currentRole === "seller" && (
                  <>
                    <FormInput label="Full Name" name="fullName" placeholder="John Doe" onChange={handleInputChange} icon={<User size={18}/>} />
                    <FormInput label="Business / Store Name" name="businessName" placeholder="Green Valley Farms" onChange={handleInputChange} icon={<Building size={18}/>} />
                    <FormInput label="Business Email" name="email" type="email" placeholder="contact@greenvalley.com" onChange={handleInputChange} icon={<Mail size={18}/>} />
                    <FormInput label="Phone Number" name="phone" placeholder="+91 00000 00000" onChange={handleInputChange} icon={<Phone size={18}/>} />
                    <FormInput label="Warehouse / Shop Address" name="address" placeholder="123 Farm Lane, Rural Area" onChange={handleInputChange} icon={<MapPin size={18}/>} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput label="City" name="city" placeholder="Mumbai" onChange={handleInputChange} />
                      <FormInput label="Pincode" name="pincode" placeholder="400001" onChange={handleInputChange} />
                    </div>
                    <FormInput label="GST Number" name="gstNumber" placeholder="22AAAAA0000A1Z5" onChange={handleInputChange} icon={<FileText size={18}/>} />
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                       <FileUpload label="GST Certificate" />
                       <FileUpload label="PAN Card" />
                    </div>

                    <FormInput label="Create Password" name="password" type="password" placeholder="••••••••" onChange={handleInputChange} icon={<Lock size={18}/>} />
                  </>
                )}

                {/* ROLE: GUEST FIELDS */}
                {currentRole === "guest" && (
                  <>
                    <FormInput label="Full Name" name="fullName" placeholder="John Doe" onChange={handleInputChange} icon={<User size={18}/>} />
                    <FormInput label="Email Address" name="email" type="email" placeholder="john@guest.com" onChange={handleInputChange} icon={<Mail size={18}/>} />
                    <p className="text-sm text-[#888] italic px-1">Guest users can track orders via email link.</p>
                  </>
                )}

                <button 
                  type="submit"
                  className="w-full bg-[#2D7A4F] hover:bg-[#236340] text-white py-5 rounded-2xl font-bold text-lg mt-6 shadow-[0_10px_20px_rgba(45,122,79,0.2)] transition-all flex items-center justify-center gap-2 group"
                >
                  {content.buttonText}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#EEE]"></div></div>
                  <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-[#AAA] font-medium">or continue with</span></div>
                </div>

                <button type="button" className="w-full border-2 border-[#F0F0F0] hover:border-[#2D7A4F] hover:bg-[#EFF7F2] bg-white text-[#141414] py-4 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center gap-3">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="G" className="w-5 h-5" />
                  Google Account
                </button>

                <p className="text-center mt-8 text-[#666] font-medium">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-[#2D7A4F] font-bold hover:underline">Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components for cleaner code
function FormInput({ label, name, type = "text", placeholder, onChange, icon }) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="text-[13px] font-bold text-[#141414] uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#AAA]">{icon}</div>}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full bg-[#F9F9F9] border-2 border-transparent focus:border-[#2D7A4F] focus:bg-white rounded-2xl ${icon ? 'pl-12' : 'px-5'} py-4 text-[16px] font-medium outline-none transition-all placeholder:text-[#BBB] text-[#141414]`}
        />
      </div>
    </div>
  );
}

function FileUpload({ label }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-bold text-[#777] uppercase">{label}</label>
      <div className="relative group">
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="border-2 border-dashed border-[#DDD] group-hover:border-[#2D7A4F] group-hover:bg-[#EFF7F2] rounded-xl p-3 text-center transition-all">
          <span className="text-[12px] font-bold text-[#999] group-hover:text-[#2D7A4F]">Upload</span>
        </div>
      </div>
    </div>
  );
}