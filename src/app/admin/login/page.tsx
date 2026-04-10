"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Authentication failed");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-sm bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="font-serif text-white">Admin Access</CardTitle>
          <CardDescription className="text-[#7B7F9E]">Enter your API key to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API Key"
              required
              className="w-full px-3 py-2 rounded-md text-sm text-white placeholder:text-[#7B7F9E] bg-white/5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#C9082A] focus:border-[#C9082A] transition-colors"
            />
            {error && (
              <p className="text-sm text-[#E74C3C]">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading || !apiKey}
              className="w-full bg-[#C9082A] hover:bg-[#C9082A]/90 text-white border-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
