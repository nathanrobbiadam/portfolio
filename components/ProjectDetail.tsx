"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Terminal, Code2 } from "lucide-react";
import { GitHubIcon } from "@/components/GitHubIcon";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  description: string;
  short_description: string;
  tech_stack: string[];
  image_url: string;
  project_url: string;
  github_url: string;
  created_at: string;
}

interface ProjectDetailProps {
  project: Project | null;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  if (!project) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mb-4 font-mono text-sm text-primary">
          {'<error>'}
        </div>
        <h1 className="mb-4 text-2xl font-bold">Project tidak ditemukan</h1>
        <p className="mb-6 font-mono text-sm text-muted-foreground">
          Error: Project dengan ID tersebut tidak ada di database.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 font-mono text-sm text-primary hover:bg-primary/20 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(project.created_at).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-1 flex-col">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />

      {/* Hero Section */}
      <section className="relative px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-sm text-primary hover:bg-primary/20 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>cd ..</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Terminal header */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 rounded-t-lg border border-b-0 border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs text-muted-foreground">
                {project.title.toLowerCase().replace(/\s+/g, '-')}.tsx
              </div>
            </div>

            {/* Project image */}
            <div className="relative mb-8 overflow-hidden rounded-lg border border-primary/30 bg-card/50">
              <img
                src={project.image_url || "/placeholder.svg"}
                alt={project.title}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

              {/* Project ID badge */}
              <div className="absolute left-4 top-4 rounded bg-primary/90 px-3 py-1 font-mono text-sm font-bold text-primary-foreground shadow-[0_0_15px_oklch(0.4_0.15_200/50%)]">
                #{project.id.slice(0, 8)}
              </div>
            </div>

            {/* Title with typing effect feel */}
            <h1 className="mb-4 font-mono text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-muted-foreground">{'<'}</span>
              <span className="text-primary">{project.title}</span>
              <span className="text-muted-foreground">{'>'}</span>
            </h1>

            {/* Meta info */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <Code2 className="h-4 w-4 text-accent" />
                <span>{project.tech_stack?.length || 0} technologies</span>
              </div>
            </div>

            {/* Tech stack tags */}
            <div className="mb-8 flex flex-wrap gap-2">
              {project.tech_stack?.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-sm text-primary shadow-[0_0_10px_oklch(0.3_0.1_200/20%)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mb-8 flex flex-wrap gap-4">
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground shadow-[0_0_20px_oklch(0.5_0.15_200/40%)] transition-all hover:shadow-[0_0_30px_oklch(0.5_0.15_200/60%)] hover:-translate-y-0.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View Live</span>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-6 font-semibold text-primary hover:bg-primary/20 transition-all"
                >
                  <GitHubIcon className="h-4 w-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="relative px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-primary/30 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                {/* Terminal-style header */}
                <div className="mb-4 flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-primary" />
                  <h2 className="font-mono text-lg font-semibold text-primary">
                    Project Description
                  </h2>
                </div>

                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
                    {project.description || "No description available."}
                  </p>
                </div>

                {/* Closing tag decoration */}
                <div className="mt-6 font-mono text-xs text-primary/50">
                  {'/* '}
                  <span className="animate-pulse">end of description</span>
                  {' */'}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-auto border-t border-primary/20 px-4 py-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-2 font-mono text-xs text-primary">
            {'</footer>'}
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">©</span> 2024{" "}
            <span className="text-accent">Portfolio</span>
            <span className="text-muted-foreground"> | Built with </span>
            <span className="text-primary">Next.js</span>
            <span className="text-muted-foreground"> + </span>
            <span className="text-accent">Supabase</span>
          </p>
        </div>
      </footer>
    </div>
  );
}