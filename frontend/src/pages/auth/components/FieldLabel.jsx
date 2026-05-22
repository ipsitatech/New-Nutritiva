export default function FieldLabel({ children, required }) {
  return (
    <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}
