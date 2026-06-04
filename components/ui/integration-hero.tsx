"use client";

import { motion } from "framer-motion";

// Tech stack icons - Using simple-icons CDN for accurate logos
const ICONS_ROW1 = [
  { name: "React", src: "https://cdn.simpleicons.org/react" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript" },
  { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript" },
  { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "Supabase", src: "https://cdn.simpleicons.org/supabase" },
];

const ICONS_ROW2 = [
  { name: "PHP", src: "https://cdn.simpleicons.org/php" },
  { name: "Laravel", src: "https://cdn.simpleicons.org/laravel" },
  { name: "MySQL", src: "https://cdn.simpleicons.org/mysql" },
  { name: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql" },
  { name: "Postman", src: "https://cdn.simpleicons.org/postman" },
  { name: "Git", src: "https://cdn.simpleicons.org/git" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github" },
];

// Utility to repeat icons enough times for seamless scroll
const repeatedIcons = (icons: typeof ICONS_ROW1, repeat = 4) =>
  Array.from({ length: repeat }).flatMap(() => icons);

interface IntegrationHeroProps {
  className?: string;
}

export default function IntegrationHero({ className }: IntegrationHeroProps) {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background to-background" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header - elegant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Technologies
          </h2>
          <div className="mx-auto mb-6 h-px w-16 bg-foreground/20" />
          <p className="mx-auto max-w-xl text-base text-foreground/50">
            Tools and technologies I use to build modern web applications
          </p>
        </motion.div>

        {/* Carousel - elegant */}
        <div className="relative overflow-hidden pb-8">
          {/* Fade overlays */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-linear-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-linear-to-l from-background to-transparent pointer-events-none" />

          {/* Row 1 - scrolls left */}
          <div className="flex gap-8 whitespace-nowrap animate-scroll-left">
            {repeatedIcons(ICONS_ROW1, 4).map((icon, i) => (
              <motion.div
                key={`row1-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="group flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-500 hover:bg-foreground/3"
              >
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="h-12 w-12 object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>

          {/* Row 2 - scrolls right */}
          <div className="flex gap-8 whitespace-nowrap mt-8 animate-scroll-right">
            {repeatedIcons(ICONS_ROW2, 4).map((icon, i) => (
              <motion.div
                key={`row2-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="group flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-500 hover:bg-foreground/3"
              >
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="h-12 w-12 object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}