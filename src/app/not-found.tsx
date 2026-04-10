import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 bg-[#030509]">
      <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
        Error
      </p>
      <h1 className="text-6xl font-serif text-white">404</h1>
      <p className="text-[#7B7F9E] text-sm max-w-xs">
        This page doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors mt-2"
      >
        Back to Home
      </Link>
    </div>
  );
}
