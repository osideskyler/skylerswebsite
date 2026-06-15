"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

/** Mailto button paired with a copy-to-clipboard action and feedback. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — mailto still works.
    }
  };

  return (
    <div className="flex items-stretch gap-2">
      <Button asChild size="lg" variant="light" className="flex-1">
        <a href={`mailto:${email}`} className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          {email}
        </a>
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className="px-4"
        aria-label={copied ? "Email copied" : "Copy email address"}
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-[rgb(148,213,174)]" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
