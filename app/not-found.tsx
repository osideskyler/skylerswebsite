import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/45">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-white">
        That case study does not exist.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-white/68">
        Head back to the homepage to explore the featured work, experience, and
        resume.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return home</Link>
      </Button>
    </main>
  );
}
