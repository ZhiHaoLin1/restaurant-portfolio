"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    name: "Gyo Gyo",
    url: "https://gyo-gyo.vercel.app/",
    tag: "Gyoza · Japanese",
    description: "An artisan gyoza specialist with a light and dark mode toggle, blending warm lantern aesthetics with the charm of handcrafted Japanese street food.",
    image: "https://api.microlink.io/?url=https://gyo-gyo.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&waitForTimeout=3000",
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
    name: "Matcha Cafe",
    url: "https://matcha-cafe-kappa.vercel.app/",
    tag: "Japanese Cafe",
    description: "A serene, editorial experience for a Japanese tea house built around slow sourcing and single-origin ceremonial matcha.",
    image: "https://api.microlink.io/?url=https://matcha-cafe-kappa.vercel.app/&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&waitForTimeout=3000",
  },
  {
    name: "Pizza Truck",
    url: "https://pizza-truck-lime.vercel.app/",
    tag: "Pizza · Food Truck",
    description: "A high-energy site for a mobile pizza operation, fast, fun, and built to drive orders.",
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

const tiers = [
  {
    name: "Standard",
    price: "$1,500",
    tag: "Core presence",
    description: "Everything a restaurant needs to look credible and get found online.",
    features: [
      "Mobile-optimized design",
      "Homepage, About, Gallery",
      "Contact form (events, catering, jobs)",
      "Hours, location, Google Maps",
      "Menu display",
      "Links to reservation and ordering",
      "Events and calendar",
      "Gift cards link",
      "SEO setup",
    ],
  },
  {
    name: "Professional",
    price: "$2,500",
    tag: "Convert more guests",
    description: "Customers order and book without ever leaving your site.",
    features: [
      "Everything in Standard",
      "Embedded online ordering",
      "Embedded reservation system",
      "Google reviews widget",
      "1 additional custom page",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "$3,500",
    tag: "Always-on content",
    description: "Your Instagram posts automatically become pages on your website.",
    features: [
      "Everything in Professional",
      "Instagram feed auto-published as articles",
      "1 additional custom page",
    ],
    featured: true,
  },
];

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    restaurant: "",
    instagram: "",
    type: "",
    tier: "",
    hasWebsite: "",
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.restaurant) return;
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#e8e0d6]/70">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-[#c9a85c] transition-colors">{l.label}</a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex text-sm font-semibold px-5 py-2 rounded-full bg-[#c9a85c] text-[#0a0a0a] hover:bg-[#dfc88a] transition-colors"
          >
            Get a Quote
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#e8e0d6]/70 hover:text-[#c9a85c] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-[#2a2725] bg-[#0a0a0a] overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-[#e8e0d6]/70 hover:text-[#c9a85c] transition-colors py-1"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 text-center text-sm font-semibold px-5 py-2.5 rounded-full bg-[#c9a85c] text-[#0a0a0a] hover:bg-[#dfc88a] transition-colors"
                >
                  Get a Quote
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            Whether you run a sushi counter or a pizza truck, I make you look incredible online.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#work" className="px-8 py-3.5 rounded-full bg-[#c9a85c] text-[#0a0a0a] font-semibold text-base hover:bg-[#dfc88a] transition-colors">
              See My Work
            </a>
            <a href="#contact" className="px-8 py-3.5 rounded-full border border-[#3d3835] text-[#e8e0d6] font-semibold text-base hover:border-[#c9a85c] hover:text-[#c9a85c] transition-colors">
              Start a Project
            </a>
          </motion.div>
        </div>
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

      {/* HIGHLIGHT BAR */}
      <div className="gold-line" />
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <p className="font-display text-3xl font-bold text-[#c9a85c]">SEO</p>
            <p className="text-sm text-[#e8e0d6]/50 mt-1">Prioritized</p>
          </motion.div>
          <div className="h-8 w-px bg-[#2a2725] hidden sm:block" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
            <p className="font-display text-3xl font-bold text-[#c9a85c]">100%</p>
            <p className="text-sm text-[#e8e0d6]/50 mt-1">Mobile-First</p>
          </motion.div>
          <div className="h-8 w-px bg-[#2a2725] hidden sm:block" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
            <p className="font-display text-3xl font-bold text-[#c9a85c]">&lt;2s</p>
            <p className="text-sm text-[#e8e0d6]/50 mt-1">Load Times</p>
          </motion.div>
        </div>
      </section>
      <div className="gold-line" />

      {/* WORK */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Recent Work</h2>
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
                className="group portfolio-card"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={p.image} alt={p.name} className="card-image w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                    <span className="text-xs font-medium text-[#c9a85c] bg-[#c9a85c]/10 px-2.5 py-1 rounded-full">{p.tag}</span>
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

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-[#0e0d0b]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Why Work With Me</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">I Grew Up in a Restaurant</h2>
            <p className="text-[#e8e0d6]/50 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              I grew up in my family&apos;s Chinese takeout restaurant. Back then, everything ran on
              pen and paper and a website was an afterthought. Today the internet drives foot traffic,
              and a well-built website elevates your brand. Every restaurant now has social media, a website,
              and third-party app affiliations. My goal is to concentrate that audience on your own website
              instead of letting it scatter across platforms like Yelp, Facebook, Instagram, or food delivery apps.
              Your website should be the first place people land when they search for your restaurant.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
                title: "Blazing Fast",
                desc: "Every site is built for speed with optimized images, clean code, and no bloat. Fast load times mean fewer lost guests and better search rankings.",
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>,
                title: "Mobile-First",
                desc: "80% of diners search on their phones. Your site will look stunning on every screen size.",
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
                title: "SEO Built In",
                desc: "Structured data, optimized meta tags, and clean code so Google knows exactly what you serve and where.",
              },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="p-6 rounded-lg border border-[#2a2725] bg-[#0a0a0a] hover:border-[#c9a85c]/40 transition-colors">
                <div className="text-[#c9a85c] mb-4">{item.icon}</div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#e8e0d6]/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-[#e8e0d6]/50 mt-4 text-lg max-w-xl mx-auto">
              One-time build fee. No surprises. Optional hosting and maintenance available.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0 md:gap-px bg-transparent md:bg-[#2a2725] rounded-xl overflow-hidden mb-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className={`flex flex-col p-8 md:p-10 ${tier.featured ? "bg-[#141414]" : "bg-[#0e0d0b]"} ${i !== 0 ? "mt-4 md:mt-0" : ""} rounded-xl md:rounded-none`}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className={`text-xs font-semibold tracking-[0.15em] uppercase ${tier.featured ? "text-[#c9a85c]" : "text-[#e8e0d6]/40"}`}>
                      {tier.name}
                    </p>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${tier.featured ? "bg-[#c9a85c]/15 text-[#c9a85c]" : "bg-[#2a2725] text-[#e8e0d6]/40"}`}>
                      {tier.tag}
                    </span>
                  </div>
                  <p className="font-display text-4xl md:text-5xl font-bold mb-2">{tier.price}<span className="text-base font-normal text-[#e8e0d6]/30 ml-1">+</span></p>
                  <p className="text-sm text-[#e8e0d6]/40">One-time</p>
                </div>

                <p className="text-sm text-[#e8e0d6]/60 leading-relaxed mb-6 pb-6 border-b border-[#2a2725]">
                  {tier.description}
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#e8e0d6]/60">
                      <svg className="text-[#c9a85c] mt-0.5 shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-full text-sm font-semibold transition-colors ${
                    tier.featured
                      ? "bg-[#c9a85c] text-[#0a0a0a] hover:bg-[#dfc88a]"
                      : "border border-[#3d3835] text-[#e8e0d6] hover:border-[#c9a85c] hover:text-[#c9a85c]"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp} className="text-center text-[#e8e0d6]/30 text-sm mb-20">
            After launch, host it yourself or add an annual plan for <span className="text-[#e8e0d6]/60">$200/year</span> covering your domain and hosting.
          </motion.p>

          {/* Retainer */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeUp} className="text-center mb-10">
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-2">Optional Add-on</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold">Monthly Maintenance</h3>
            <p className="text-[#e8e0d6]/50 mt-2 text-sm max-w-md mx-auto">
              Menu updates, photo swaps, hour changes, and peace of mind. Restaurant owners have enough to manage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: "Basic", price: "$100", period: "/month", desc: "Standard sites",
                items: ["Hosting covered", "Security updates", "Up to 2 content changes/month", "Email support"],
              },
              {
                name: "Growth", price: "$150", period: "/month", desc: "Premium sites",
                items: ["Everything in Basic", "Up to 5 content changes/month", "Instagram feed monitoring", "Priority response"],
              },
            ].map((r, i) => (
              <motion.div key={r.name} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="rounded-xl border border-[#2a2725] bg-[#0e0d0b] p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-display text-lg font-semibold">{r.name}</p>
                  <p className="text-xs text-[#e8e0d6]/30">{r.desc}</p>
                </div>
                <div className="flex items-end gap-1 mb-6">
                  <span className="font-display text-3xl font-bold text-[#c9a85c]">{r.price}</span>
                  <span className="text-[#e8e0d6]/40 text-sm mb-1">{r.period}</span>
                </div>
                <ul className="space-y-2.5">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#e8e0d6]/50">
                      <svg className="text-[#c9a85c] mt-0.5 shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-[#0e0d0b]">
        <div className="max-w-2xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Get Started</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Let&apos;s Talk About Your Restaurant</h2>
            <p className="text-[#e8e0d6]/50 mt-4 text-lg">
              Tell me a little about your place and what you&apos;re looking for. I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <p className="font-display text-2xl font-semibold text-[#c9a85c]">Thank you!</p>
              <p className="text-[#e8e0d6]/50 mt-2">I&apos;ll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="space-y-5">

              {/* Row 1 — Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] placeholder:text-[#e8e0d6]/20 focus:outline-none focus:border-[#c9a85c] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] placeholder:text-[#e8e0d6]/20 focus:outline-none focus:border-[#c9a85c] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2 — Restaurant + Instagram */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Restaurant Name</label>
                  <input
                    type="text"
                    value={formData.restaurant}
                    onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] placeholder:text-[#e8e0d6]/20 focus:outline-none focus:border-[#c9a85c] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Instagram Handle <span className="text-[#e8e0d6]/30">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="@yourrestaurant"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] placeholder:text-[#e8e0d6]/20 focus:outline-none focus:border-[#c9a85c] transition-colors"
                  />
                </div>
              </div>

              {/* Row 3 — Type + Tier */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Restaurant Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] focus:outline-none focus:border-[#c9a85c] transition-colors"
                  >
                    <option value="" disabled>Select one</option>
                    <option>Fine Dining</option>
                    <option>Casual Dining</option>
                    <option>Fast Casual</option>
                    <option>Food Truck</option>
                    <option>Cafe or Bakery</option>
                    <option>Bar or Lounge</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Interested In</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] focus:outline-none focus:border-[#c9a85c] transition-colors"
                  >
                    <option value="" disabled>Select a tier</option>
                    <option>Standard ($1,500+)</option>
                    <option>Professional ($2,500+)</option>
                    <option>Premium ($3,500+)</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>

              {/* Row 4 — Existing website + Timeline */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Do you have an existing website?</label>
                  <select
                    value={formData.hasWebsite}
                    onChange={(e) => setFormData({ ...formData, hasWebsite: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] focus:outline-none focus:border-[#c9a85c] transition-colors"
                  >
                    <option value="" disabled>Select one</option>
                    <option>Yes, needs a redesign</option>
                    <option>No, starting from scratch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] focus:outline-none focus:border-[#c9a85c] transition-colors"
                  >
                    <option value="" disabled>Select one</option>
                    <option>ASAP</option>
                    <option>Within 1 month</option>
                    <option>1 to 3 months</option>
                    <option>Just exploring</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#e8e0d6]/60 mb-1.5">Anything else you want me to know <span className="text-[#e8e0d6]/30">(optional)</span></label>
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
                {sending ? "Sending..." : "Send Inquiry"}
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
