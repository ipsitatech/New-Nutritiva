import { User, Phone, Mail, MapPin } from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";
import FormInput from "./FormInput.jsx";
import { PhoneInput } from "./SignupHelpers.jsx";

export default function GuestSignupForm({
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
