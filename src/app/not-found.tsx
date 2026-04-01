import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center animate-in-up">
      <div className="text-7xl font-display font-bold gradient-text">404</div>
      <div className="space-y-2">
        <h1 className="text-xl font-display font-bold">Page Not Found</h1>
        <p className="text-foreground-muted text-sm max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-purple text-white font-medium text-sm hover:opacity-90 transition-opacity glow-purple"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
