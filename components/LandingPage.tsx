"use client";

import { motion } from "framer-motion";
import { HeroBlock } from "@/components/ui/hero-section";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import IntegrationHero from "@/components/ui/integration-hero";
import CinematicFooter from "@/components/ui/cinematic-footer";
import { StarsBackground } from "@/components/StarsBackground";

// Default project data (shown when no projects from database)
const defaultProjects: CardStackItem[] = [
  {
    id: "1",
    title: "Elite Farm",
    description: "E-commerce platform untuk produk alat pertanian canggih. Fitur lengkap dengan keranjang belanja, checkout, dan dashboard admin.",
    imageSrc: "/placeholder.svg",
    href: "/project/1",
    tag: "E-commerce",
  },
  {
    id: "2",
    title: "All Pair Journal",
    description: "Aplikasi jurnal untuk mencatat profit & loss dari trading. Track portfolio, analisis performa, dan laporan keuangan.",
    imageSrc: "/placeholder.svg",
    href: "/project/2",
    tag: "Finance App",
  },
  {
    id: "3",
    title: "Task Manager Pro",
    description: "Aplikasi manajemen tugas dengan fitur drag-drop, kolaborasi tim real-time, dan integrasi kalender.",
    imageSrc: "/placeholder.svg",
    href: "/project/3",
    tag: "Productivity",
  },
  {
    id: "4",
    title: "Health Tracker",
    description: "Aplikasi pelacak kesehatan dengan fitur log aktivitas, nutrisi, dan statistik perkembangan bulanan.",
    imageSrc: "/placeholder.svg",
    href: "/project/4",
    tag: "Healthcare",
  },
  {
    id: "5",
    title: "Social Media Dashboard",
    description: "Dashboard untuk mengelola multiple akun sosial media dengan analitik, scheduling posts, dan laporan engagement.",
    imageSrc: "/placeholder.svg",
    href: "/project/5",
    tag: "Marketing",
  },
];

interface Project {
  id: string;
  title: string;
  short_description: string;
  description: string;
  tech_stack: string[];
  image_url: string;
  project_url: string;
  github_url: string;
  category: string;
  featured: boolean;
}

interface LandingPageProps {
  projects?: Project[];
}

export default function LandingPage({ projects }: LandingPageProps) {
  // Convert database projects to CardStackItem format
  const cardStackItems: CardStackItem[] = projects && projects.length > 0
    ? projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description || p.short_description,
        imageSrc: p.image_url || "/placeholder.svg",
        href: `/project/${p.id}`,
        tag: p.category || "Project",
      }))
    : defaultProjects;

  return (
    <StarsBackground className="flex flex-1 flex-col">
      {/* Hero Section */}
      <HeroBlock
        name="NATHAN ROBBI ADAM"
        tagline="FULL STACK ENGINEER"
        description="Crafting beautiful, performant web applications with modern technologies. Passionate about clean code and exceptional user experiences."
        githubUrl="https://github.com"
      />

      {/* Projects Section - Card Stack */}
      <section id="projects" className="relative flex-1 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Selected Work
            </h2>
            <div className="mx-auto mb-6 h-px w-16 bg-foreground/20" />
            <p className="mx-auto max-w-xl text-base text-foreground/50">
              A collection of projects I've worked on
            </p>
          </motion.div>

          {/* Card Stack */}
          <div className="mb-8">
            <CardStack
              items={cardStackItems}
              initialIndex={0}
              autoAdvance={true}
              intervalMs={5000}
              pauseOnHover={true}
              showDots={true}
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="relative">
        <IntegrationHero />
      </section>

      {/* Footer */}
      <CinematicFooter />
    </StarsBackground>
  );
}