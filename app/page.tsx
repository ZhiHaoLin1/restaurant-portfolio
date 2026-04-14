"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    name: "Ichimi",
    url: "https://ichimi.vercel.app/",
    tag: "Japanese",
    description: "A refined online presence for a Japanese restaurant, capturing the precision and elegance of the cuisine.",
    image: "https://api.microlink.io/?url=https://ichimi.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&waitForTimeout=3000",
  },
  {
    name: "Sushi Masa",
    url: "https://sushi-masa.vercel.app/",
    tag: "Sushi",
    description: "Clean, appetizing design for a sushi restaurant that puts the food front and center.",
    image: "https://api.microlink.io/?url=https://sushi-masa.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&waitForTimeout=3000",
  },
  {
    name: "Li Lin",
    url: "https://lilin.vercel.app/",
    tag: "Asian Fusion",
    description: "An inviting digital experience for a restaurant blending traditional flavors with modern presentation.",
    image: "https://api.microlink.io/?url=https://lilin.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&waitForTimeout=3000",
  },
  {
    name: "Fei Sushi",
    url: "https://fei-sushi.vercel.app/",
    tag: "Sushi Bar",
    description: "Bold, immersive design that transports visitors into the atmosphere of a premium sushi bar.",
    image: "https://api.microlink.io/?url=https://fei-sushi.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&waitForTimeout=3000",
  },
  {
    name: "So Sushi",
    url: "https://so-sushi.vercel.app/",
    tag: "Japanese",
    description: "Modern and playful branding brought to life through an engaging web experience.",
    image: "https://api.microlink.io/?url=https://so-sushi.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&waitForTimeout=3000",
  },
  {
    name: "Pizza Truck",
    url: "https://pizza-truck-lime.vercel.app/",
    tag: "Pizza · Food Truck",
    description: "A high-energy site for a mobile pizza operation — fast, fun, and built to drive orders.",
    image: "https://api.microlink.io/?url=https://pizza-truck-lime.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&waitForTimeout=3000",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stats = [
  { number: "6+", label: "Restaurants Launched" },
  { number: "100%", label: "Mobile-First" },
  { number: "<2s", label: "Load Times" },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", restaurant: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // silent fail
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="relative">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#2a2725]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-display text-xl font-semibold tracking-tight">
            Zhi<span className="text-[#c9a85c]">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#e8e0d6]/70">
            <a href="#work" className="hover:text-[#c9a85c] transition-colors">Work</a>
            <a href="#about" className="hover:text-[#c9a85c] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#c9a85c] transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2 rounded-full bg-[#c9a85c] text-[#0a0a0a] hover:bg-[#dfc88a] transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="hero-glow" />
        <div className="relative max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
          >
            Restaurant Web Design
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8"
          >
            Your food is{" "}
            <span className="italic text-[#c9a85c]">exceptional</span>.
            <br />
            Your website should be too.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl text-[#e8e0d6]/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I build fast, beautiful websites that help restaurants fill more seats.
            From sushi counters to pizza trucks — if you serve food, I make you look incredible online.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#work"
              className="px-8 py-3.5 rounded-full bg-[#c9a85c] text-[#0a0a0a] font-semibold text-base hover:bg-[#dfc88a] transition-colors"
            >
              See My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full border border-[#3d3835] text-[#e8e0d6] font-semibold text-base hover:border-[#c9a85c] hover:text-[#c9a85c] transition-colors"
            >
              Start a Project
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-[#3d3835] flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-[#c9a85c]"
            />
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <div className="gold-line" />
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <p className="font-display text-3xl md:text-5xl font-bold text-[#c9a85c]">{s.number}</p>
              <p className="text-xs md:text-sm text-[#e8e0d6]/50 mt-2 tracking-wide uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <div className="gold-line" />

      {/* PORTFOLIO */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Restaurants I&apos;ve Brought Online
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="portfolio-card group block"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#1a1816]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={`${p.name} website screenshot`}
                    className="card-image w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                    <span className="text-xs font-medium text-[#c9a85c] bg-[#c9a85c]/10 px-2.5 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-sm text-[#e8e0d6]/50 leading-relaxed">{p.description}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#c9a85c] opacity-0 group-hover:opacity-100 transition-opacity">
                    View Live Site
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / WHY ME */}
      <section id="about" className="py-24 px-6 bg-[#0e0d0b]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Why Work With Me</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              I Grew Up in a Restaurant
            </h2>
            <p className="text-[#e8e0d6]/50 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              I grew up in my family&apos;s Chinese takeout restaurant — back then, everything ran on
              pen and paper and a website was an afterthought. But today the internet drives foot traffic,
              and a well-built website elevates your brand. Every restaurant now has social media, a website,
              and third-party app affiliations. My goal is to concentrate that audience on your own website
              instead of letting it scatter across platforms like Yelp, Facebook, Instagram, or food delivery
              apps. Your website should be the first place people land when they search for your restaurant.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                title: "Blazing Fast",
                desc: "Every site scores 90+ on Google PageSpeed. Fast load times mean fewer lost guests and better search rankings.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M12 18h.01" />
                  </svg>
                ),
                title: "Mobile-First",
                desc: "80% of diners search on their phones. Your site will look stunning on every screen size.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                ),
                title: "SEO Built In",
                desc: "Structured data, optimized meta tags, and clean code so Google knows exactly what you serve and where.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="p-6 rounded-lg border border-[#2a2725] bg-[#0a0a0a] hover:border-[#c9a85c]/40 transition-colors"
              >
                <div className="text-[#c9a85c] mb-4">{item.icon}</div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#e8e0d6]/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Get Started</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Let&apos;s Build Your Site
            </h2>
            <p className="text-[#e8e0d6]/50 mt-4 text-lg">
              Tell me about your restaurant and I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <p className="font-display text-2xl font-semibold text-[#c9a85c]">Thank you!</p>
              <p className="text-[#e8e0d6]/50 mt-2">I&apos;ll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="space-y-5"
            >
              {[
                { label: "Your Name", key: "name", type: "text" },
                { label: "Email", key: "email", type: "email" },
                { label: "Restaurant Name", key: "restaurant", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-[#e8e0d6]/70 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] placeholder:text-[#e8e0d6]/20 focus:outline-none focus:border-[#c9a85c] transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#e8e0d6]/70 mb-1.5">
                  Tell me about your project
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] placeholder:text-[#e8e0d6]/20 focus:outline-none focus:border-[#c9a85c] transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="w-full py-3.5 rounded-full bg-[#c9a85c] text-[#0a0a0a] font-semibold text-base hover:bg-[#dfc88a] transition-colors disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2a2725] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#e8e0d6]/40">
          <p className="font-display">
            Zhi Lin <span className="text-[#c9a85c]">·</span> Restaurant Web Design
          </p>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
