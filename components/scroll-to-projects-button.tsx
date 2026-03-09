 "use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ScrollToProjectsButton() {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("projects");
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#projects");
    }
  };

  return (
    <Button asChild size="lg" variant="light">
      <Link href="#projects" onClick={handleClick} className="flex items-center gap-2">
        Explore projects
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
}

