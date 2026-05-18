import { ArrowLeft } from "lucide-react";

export default function BackButton({ onClick, label = "Back to Main" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-button inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/70"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {label}
    </button>
  );
}
