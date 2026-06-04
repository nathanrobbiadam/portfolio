"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GitHubIcon } from "@/components/GitHubIcon";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ============================================================
// TODO: CUSTOMIZE THESE PROPS - HERO SECTION DATA
// ============================================================
// Ganti nilai default di bawah ini dengan data kamu sendiri
// Atau saat memanggil component,-pass props sesuai kebutuhan
// ============================================================

interface HeroBlockProps {
  name?: string;                  // TODO: Ganti dengan nama lengkap kamu
  tagline?: string;               // TODO: Ganti dengan tagline/job title kamu
  description?: string;           // TODO: Ganti dengan deskripsi tentang kamu
  githubUrl?: string;              // TODO: Ganti dengan URL GitHub kamu (misalnya: "https://github.com/username")
  profileImageUrl?: string;       // TODO: Ganti dengan path gambar profile kamu (misalnya: "/nathan-photo.jpg")
}

export function HeroBlock({
  // ============================================================
  // TODO: UPDATE DEFAULT VALUES HERE
  // ============================================================
  name = "NATHAN ROBBI ADAM",      // Ganti dengan nama lengkap kamu
  tagline = "QA AUTOMATED ENGINEER", // Ganti dengan job title kamu
  description = "Crafting beautiful, performant web applications with modern technologies. Passionate about clean code and exceptional user experiences.", // Ganti dengan deskripsi tentang kamu
  githubUrl = "#",                 // Ganti dengan URL GitHub kamu (https://github.com/username)
  profileImageUrl = "/profile1.png", // ============================================================
  // TODO: PASTE YOUR PROFILE IMAGE
  // ============================================================
  // letakkan gambar profile kamu di folder: public/
  // lalu ganti path di atas, contoh: "/nathan-photo.jpg"
  // pastikan gambar sudah ada di folder public sebelum digunakan
  // ============================================================
}: HeroBlockProps) {

  // ============================================================
  // 3D TILT EFFECT - OPTIONAL, BISA DIHAPUS JIKA TIDAK DIBUTUHKAN
  // ============================================================
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = (y - height / 2) / (height / 2) * -10;
    const rotateY = (x - width / 2) / (width / 2) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-20">
      <div className="relative z-10 mx-auto flex max-w-6xl items-center gap-16">

        {/* ============================================================ */}
        {/* PROFILE CARD - SEBELAH KIRI */}
        {/* ============================================================ */}
        {/* TODO:Ukuran card bisa diubah dengan mengubah:
            - width: "w-72" (288px) -> ubah sesuai kebutuhan
            - aspect ratio: "aspect-[3/4]" -> ubah sesuai kebutuhan
        */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
            className={cn(
              "relative aspect-[3/4] w-72 rounded-3xl bg-gradient-to-br from-foreground/10 to-foreground/5 shadow-2xl",
              "transform-style-3d"
            )}
          >
            {/* ============================================================ */}
            {/* PROFILE IMAGE */}
            {/* ============================================================ */}
            {/* TODO: Ganti src dengan path gambar profile kamu di folder public/ */}
            {/* Contoh: src={profileImageUrl} */}
            {/* Pastikan gambar sudah ada di folder public/ */}
            {/* ============================================================ */}
            <Image
              src={profileImageUrl}
              alt={name}
              fill
              className="rounded-3xl object-cover"
              style={{ transform: "translateZ(-20px) scale(1.1)" }}
              sizes="(max-width: 768px) 288px, 18rem"
            />

          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* TEXT CONTENT - SEBELAH KANAN */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col"
        >
          {/* ============================================================ */}
          {/* MAIN HEADING - NAME */}
          {/* ============================================================ */}
          {/* TODO: Styling teks bisa diubah:
              - mb-6: margin bottom
              - text-5xl sm:text-6xl md:text-7xl lg:text-8xl: responsive font sizes
              - font-light: bisa diganti font-bold, font-semibold, dll
              - tracking-tight: bisa diubah sesuai selera
          */}
          {/* ============================================================ */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {name}
          </motion.h1>

          {/* ============================================================ */}
          {/* TAGLINE / JOB TITLE */}
          {/* ============================================================ */}
          {/* TODO: Styling tagline bisa diubah sesuai kebutuhan */}
          {/* ============================================================ */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8 text-lg font-light tracking-wide text-foreground/60 sm:text-xl md:text-2xl"
          >
            {tagline}
          </motion.p>

          {/* Divider line - garis pemisah, bisa dihapus jika tidak diperlukan */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-8 h-px w-24 bg-foreground/20"
          />

          {/* ============================================================ */}
          {/* DESCRIPTION */}
          {/* ============================================================ */}
          {/* TODO: Deskripsi sudah diambil dari props description */}
          {/* TODO: max-w-2xl: lebar maksimum deskripsi, bisa diubah */}
          {/* ============================================================ */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-12 max-w-2xl text-base leading-relaxed text-foreground/50 sm:text-lg"
          >
            {description}
          </motion.p>

          {/* ============================================================ */}
          {/* CTA BUTTONS - TOMBOL AKSI */}
          {/* ============================================================ */}
          {/* TODO: Ganti "#projects" dengan ID section yang sesuai di website kamu */}
          {/* TODO: Ganti icon ArrowDown dengan icon lain jika diperlukan */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row"
          >

            {/* ============================================================ */}
            {/* BUTTON 1: VIEW PROJECTS */}
            {/* ============================================================ */}
            {/* TODO: Ganti href="#projects" dengan ID section projects kamu */}
            {/* TODO: Teks "View Projects" bisa diganti sesuai kebutuhan */}
            {/* TODO: Icon ArrowDown bisa diganti dengan icon lain dari lucide-react */}
            {/* ============================================================ */}
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-3 rounded-full border border-foreground/20 bg-transparent px-8 font-medium text-foreground transition-all hover:border-foreground/40 hover:bg-foreground/3"
            >
              View Projects
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            {/* ============================================================ */}
            {/* BUTTON 2: GITHUB */}
            {/* ============================================================ */}
            {/* TODO: GitHubIcon - pastikan komponen ini ada di @/components/GitHubIcon */}
            {/* TODO: Ganti icon jika kamu prefer platform lain (LinkedIn, Twitter, dll) */}
            {/* TODO: githubUrl sudah来自 props, pastikan nilai defaultnya benar */}
            {/* ============================================================ */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-8 font-medium text-background transition-all hover:bg-foreground/90"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* SCROLL INDICATOR - ELEMEN PERSCROLL */}
      {/* ============================================================ */}
      {/* TODO: Teks "Scroll" bisa diganti sesuai bahasa yang digunakan */}
      {/* TODO: Bisa dihapus jika tidak diperlukan */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/30">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-10 w-[1px] bg-linear-to-b from-foreground/40 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}