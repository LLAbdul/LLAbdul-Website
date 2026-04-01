"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
        Error
      </p>
      <h1 className="text-2xl font-bold text-[#E8E8ED]">Something went wrong</h1>
      <p className="text-sm text-[#7B7F9E] max-w-xs">
        {error?.message || "An unexpected error occurred."}
      </p>
      <Button variant="outline" onClick={reset} className="mt-2">
        Try Again
      </Button>
    </div>
  );
}
