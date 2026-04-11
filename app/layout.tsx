import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zhi Lin — Restaurant Web Design",
  description:
    "I build beautiful, conversion-focused websites for restaurants. From sushi bars to pizza trucks, I help dining establishments attract more guests online.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#0a0a0a] text-[#e8e0d6]">{children}</body>
    </html>
  );
}
