import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="text-6xl font-bold text-[var(--primary)]">404</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-[var(--muted-foreground)] max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
