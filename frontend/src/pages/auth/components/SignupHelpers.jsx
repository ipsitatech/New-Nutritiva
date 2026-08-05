import { useState } from "react";
import { ChevronDown, Upload, CheckCircle2 } from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";

export function PhoneInput({
  label,
  name,
  placeholder,
  required,
  value,
  countryCode,
  onCountryCodeChange,
  onChange,
  icon: Icon,
  maxLength,
}) {
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    onChange({ target: { name, value: val } });
  };

  return (
    <div className="flex flex-col flex-1">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="relative flex gap-2">
        <div className="relative min-w-21.25">
          <select
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-3 pr-8 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-[#2D7A4F] appearance-none cursor-pointer"
          >
            <option value="+91">+91 (IN)</option>
            <option value="+1">+1 (US)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+971">+971 (UAE)</option>
            <option value="+84">+84 (VN)</option>
            <option value="+55">+55 (BR)</option>
            <option value="+54">+54 (AR)</option>
            <option value="+57">+57 (CO)</option>
            <option value="+56">+56 (CL)</option>
            <option value="+51">+51 (PE)</option>
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <ChevronDown size={14} />
          </div>
        </div>
        <div className="relative flex-1">
          {Icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
              <Icon size={15} />
            </span>
          )}
          <input
            name={name}
            type="text"
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={handlePhoneChange}
            maxLength={maxLength}
            className={[
              "w-full bg-gray-50 border border-gray-200 rounded-xl",
              "text-[14px] font-medium text-gray-900 placeholder:text-gray-300",
              "focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5",
              "transition-all duration-200 py-3",
              Icon ? "pl-10 pr-4" : "px-4",
            ].join(" ")}
          />
        </div>
      </div>
      <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1.5 ml-1">
        <CheckCircle2 size={12} className="text-[#2D7A4F]/50" />
        Add numbers only without any spaces
      </p>
    </div>
  );
}

export function FormSelect({
  label,
  name,
  required,
  onChange,
  options,
  icon: Icon,
}) {
  return (
    <div className="flex flex-col flex-1">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            <Icon size={15} />
          </span>
        )}
        <select
          name={name}
          required={required}
          onChange={onChange}
          className={[
            "w-full bg-gray-50 border border-gray-200 rounded-xl",
            "py-3 text-[14px] font-medium text-gray-900",
            "focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5",
            "transition-all duration-200 appearance-none cursor-pointer pr-10",
            Icon ? "pl-10" : "px-4",
          ].join(" ")}
        >
          <option value="">Select option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
}

export function Checkbox({
  label,
  name,
  required,
  checked,
  onChange,
  onLabelClick,
  disabled,
}) {
  return (
    <div className="flex items-start gap-3 group">
      <input
        type="checkbox"
        name={name}
        required={required}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#2D7A4F] cursor-pointer shrink-0 disabled:opacity-50"
      />
      <span className="text-[13px] text-gray-500 leading-snug">
        {onLabelClick ? (
          <>
            I agree to Nutritva's{" "}
            <button
              type="button"
              onClick={onLabelClick}
              className="text-[#2D7A4F] font-bold hover:underline"
            >
              Terms & Conditions
            </button>
          </>
        ) : (
          label
        )}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </span>
    </div>
  );
}

export function FileUpload({ label, required, onChange }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const validateFile = (file) => {
    if (!file) return true;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const allowedExtensions = [".pdf", ".xls", ".xlsx", ".csv"];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      setError(
        "Invalid file type. Please upload PDF, Excel, or CSV files only.",
      );
      return false;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB limit. Please upload a smaller file.");
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setFileName(file.name);
      onChange(e);
    } else if (file) {
      e.target.value = "";
      setFileName("");
      onChange({ target: { name: e.target.name, value: null } });
    }
  };

  return (
    <div className="flex flex-col">
      <FieldLabel required={required}>{label}</FieldLabel>
      <label
        className={`
        relative flex items-center gap-3 px-4 py-3
        bg-gray-50 border border-dashed rounded-xl
        cursor-pointer hover:border-[#2D7A4F] hover:bg-[#2D7A4F]/2
        transition-all duration-200 group
        ${error ? "border-red-400 bg-red-50/30" : "border-gray-200"}
      `}
      >
        <Upload
          size={15}
          className={`${
            error ? "text-red-400" : "text-gray-300 group-hover:text-[#2D7A4F]"
          } transition-colors shrink-0`}
        />
        <span
          className={`text-[14px] font-medium truncate ${
            error ? "text-red-500" : "text-gray-300 group-hover:text-gray-500"
          } transition-colors`}
        >
          {fileName || "Click to upload file (PDF, Excel, CSV, max 2MB)"}
        </span>
        <input
          type="file"
          required={required}
          accept=".pdf,.xls,.xlsx,.csv,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

export function CaptchaField({ captchaCode, onRefresh, onChange }) {
  return (
    <div className="flex flex-col">
      <FieldLabel required>Verify Captcha</FieldLabel>
      <div className="flex items-center gap-3">
        <div className="shrink-0 px-5 py-3 bg-[#2D7A4F]/6 border border-dashed border-[#2D7A4F]/20 rounded-xl font-mono text-[15px] font-bold tracking-[0.22em] text-[#2D7A4F] select-none">
          {captchaCode}
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="shrink-0 p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 hover:text-[#2D7A4F] hover:border-[#2D7A4F]/30 transition-all duration-200"
        >
          Refresh
        </button>
        <input
          name="captchaInput"
          placeholder="Enter code"
          required
          onChange={onChange}
          className="
            flex-1 bg-gray-50 border border-gray-200 rounded-xl
            px-4 py-3 text-[14px] font-medium text-gray-900 placeholder:text-gray-300 uppercase
            focus:outline-none focus:border-[#2D7A4F] focus:bg-white focus:ring-2 focus:ring-[#2D7A4F]/5
            transition-all duration-200
          "
        />
      </div>
    </div>
  );
}
