import { User, Phone, Mail, Lock, MapPin, X } from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";
import FormInput from "./FormInput.jsx";
import PasswordRules from "./PasswordRules.jsx";
import { PhoneInput } from "./SignupHelpers.jsx";

export default function BuyerSignupForm({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
}) {
  return (
    <>
      <FormInput
        label="Full Name"
        name="fullName"
        placeholder="John Doe"
        required
        onChange={onChange}
        icon={User}
        maxLength={60}
      />
      <div className="grid grid-cols-2 gap-5">
        <PhoneInput
          label="Phone"
          name="phone"
          placeholder="00000 00000"
          required
          value={formData.phone}
          countryCode={formData.countryCode}
          onCountryCodeChange={(val) =>
            onChange({ target: { name: "countryCode", value: val } })
          }
          onChange={onChange}
          icon={Phone}
          maxLength={10}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          onChange={onChange}
          icon={Mail}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 items-start">
        <div className="flex flex-col">
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            onChange={onChange}
            icon={Lock}
          />
          <PasswordRules password={formData.password} />
        </div>
        <div className="flex flex-col">
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            onChange={onChange}
            icon={Lock}
          />
          {formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="mt-2 text-[12px] text-red-500 flex items-center gap-1">
                <X size={14} /> Passwords do not match
              </p>
            )}
        </div>
      </div>
      <FormInput
        label="Full Address"
        name="address"
        placeholder="Flat, Street, Area, City"
        required
        onChange={onChange}
        icon={MapPin}
      />
    </>
  );
}
