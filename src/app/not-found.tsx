import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist.</p>
      <Button variant="outline" render={<Link href="/" />}>
        Back to Home
      </Button>
    </div>
  );
}
