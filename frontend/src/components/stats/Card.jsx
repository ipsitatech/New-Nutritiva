export default function Card({ bg, children, className = "", square = false }) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col min-h-0 overflow-hidden w-full ${square ? "aspect-square" : "h-full"} ${bg} ${className}`}
    >
      {children}
    </div>
  );
}
