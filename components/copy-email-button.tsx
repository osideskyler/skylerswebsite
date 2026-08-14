"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Mailto address with a quiet copy-to-clipboard control. */
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
    <div className="flex items-center gap-3">
      <a
        href={`mailto:${email}`}
        className="font-display text-2xl font-medium tracking-tight text-white transition-colors hover:text-white/80 sm:text-3xl"
      >
        {email}
      </a>
      <button
        type="button"
        className="rounded-full p-2 text-white/35 transition-colors hover:text-white"
        aria-label={copied ? "Email copied" : "Copy email address"}
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-[rgb(148,213,174)]" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
