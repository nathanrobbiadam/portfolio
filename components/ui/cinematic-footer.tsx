"use client";

import { GitHubIcon } from "@/components/GitHubIcon";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CinematicFooterProps {
  className?: string;
}

export default function CinematicFooter({ className }: CinematicFooterProps) {
  return (
    <footer
      className={cn("relative overflow-hidden border-t border-foreground/10 bg-background", className)}
    >
      {/* Elegant subtle gradient */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/2 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20">
        {/* Main content - elegant grid */}
        <div className="mb-16 grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-2xl font-light tracking-tight text-foreground">
              Portfolio
            </h3>
            <p className="text-sm leading-relaxed text-foreground/50">
              A showcase of my work and journey as a developer.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground/40">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#tech" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Technologies
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground/40">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all hover:border-foreground/40 hover:text-foreground"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-foreground/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="text-sm text-foreground/40">
            © 2024 Portfolio
          </div>
          <div className="text-sm text-foreground/30">
            Built with Next.js
          </div>
        </div>
      </div>
    </footer>
  );
}