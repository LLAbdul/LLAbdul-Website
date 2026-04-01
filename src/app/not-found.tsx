import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
