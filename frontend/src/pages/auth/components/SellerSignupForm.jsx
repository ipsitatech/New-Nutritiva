import {
  Building,
  Mail,
  Phone,
  Lock,
  MapPin,
  Landmark,
  FileCheck,
  FileText,
  X,
} from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";
import FormInput from "./FormInput.jsx";
import PasswordRules from "./PasswordRules.jsx";
import { PhoneInput, FormSelect, FileUpload } from "./SignupHelpers.jsx";

export default function SellerSignupForm({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  tanCardFile,
  onTanCardChange,
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          label="First Name"
          name="firstName"
          placeholder="John"
          required
          onChange={onChange}
          maxLength={60}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          placeholder="Doe"
          required
          onChange={onChange}
          maxLength={60}
        />
      </div>
      <FormInput
        label="Business / Brand Name"
        name="businessName"
        placeholder="Green Valley Farms"
        required
        onChange={onChange}
        icon={Building}
        maxLength={60}
      />
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          label="Business Email"
          name="email"
          type="email"
          placeholder="contact@business.com"
          required
          onChange={onChange}
          icon={Mail}
        />
        <PhoneInput
          label="Business Phone"
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
      </div>
      <div className="grid grid-cols-2 gap-5">
        <FormSelect
          label="Business Type"
          name="businessType"
          required
          onChange={onChange}
          icon={Building}
          options={[
            { label: "Manufacturer", value: "man" },
            { label: "Wholesaler", value: "whole" },
          ]}
        />
        <FormSelect
          label="Primary Category"
          name="primaryCategory"
          required
          onChange={onChange}
          icon={FileCheck}
          options={[{ label: "Dry Fruits", value: "df" }]}
        />
      </div>
      <FormInput
        label="GST Number"
        name="gstNumber"
        placeholder="22AAAAA0000A1Z5"
        required
        onChange={onChange}
        icon={FileText}
        maxLength={15}
      />
      <FormInput
        label="Business Address"
        name="address"
        placeholder="Full Registered Address"
        required
        onChange={onChange}
        icon={MapPin}
      />
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          label="Bank Account Number"
          name="bankAccount"
          placeholder="000000000000"
          required
          onChange={onChange}
          icon={Landmark}
          maxLength={18}
        />
        <FormInput
          label="IFSC Code"
          name="ifscCode"
          placeholder="SBIN0001234"
          required
          onChange={onChange}
          maxLength={11}
        />
      </div>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col w-full">
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
        <div className="flex flex-col w-full">
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
      <FileUpload
        label="Upload TAN Card Scanned Copy"
        required
        onChange={onTanCardChange}
      />
      {tanCardFile && (
        <p className="text-[13px] text-gray-500">
          Selected file: {tanCardFile.name}
        </p>
      )}
    </>
  );
}
