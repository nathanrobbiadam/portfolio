import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Developer",
  description: "Portfolio project sekolah saya selama SMK",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className="min-h-full flex flex-col bg-background text-foreground antialiased"
        style={{ fontFamily: "Geneva, Tahoma, 'Segoe UI', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}