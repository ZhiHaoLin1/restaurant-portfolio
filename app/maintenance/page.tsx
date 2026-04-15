import Link from "next/link";

export const metadata = {
  title: "Maintenance Plans | Munch Media",
  description: "What is and isn't covered under Munch Media monthly maintenance retainer plans.",
  robots: "noindex",
};

const covered = [
  {
    category: "Hours & Contact Info",
    examples: ["Business hours", "Phone number", "Address", "Email address"],
  },
  {
    category: "Menu Updates",
    examples: ["Add or remove menu items", "Update prices", "Update descriptions", "Restructure menu sections (counts as 2-3 changes)"],
  },
  {
    category: "Gallery",
    examples: ["Add new photos", "Remove photos", "Reorder photos"],
  },
  {
    category: "Links",
    examples: ["Update reservation platform link", "Update online ordering link", "Update gift cards link", "Update social media links"],
  },
  {
    category: "Events",
    examples: ["Add a new event", "Edit an existing event", "Remove a past event"],
  },
  {
    category: "Staff & About",
    examples: ["Update staff names or bios", "Add a new team member", "Edit the restaurant story"],
  },
  {
    category: "Copy Edits",
    examples: ["Rewrite a paragraph or less", "Fix a typo", "Update a headline"],
  },
  {
    category: "Sections",
    examples: ["Add a small section to an existing page", "Large new sections count as 2-3 changes"],
  },
  {
    category: "Minor Design Tweaks",
    examples: ["Adjust a color", "Swap a font", "Tweak spacing or button styles"],
  },
];

const notCovered = [
  "New standalone pages",
  "Full site redesign or rebrand",
  "New technical features or integrations (new booking system, new widget, new functionality)",
];

const plans = [
  {
    name: "Basic",
    price: "$100/month",
    for: "Standard sites",
    changes: "Up to 2 content changes per month",
    extras: ["Hosting covered", "Security updates", "Email support"],
  },
  {
    name: "Growth",
    price: "$150/month",
    for: "Premium sites",
    changes: "Up to 5 content changes per month",
    extras: ["Hosting covered", "Security updates", "Instagram feed monitoring", "Priority response"],
  },
];

export default function MaintenancePage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-[#e8e0d6]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#2a2725]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">
            Zhi<span className="text-[#c9a85c]">.</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#e8e0d6]/60 hover:text-[#c9a85c] transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Retainer Plans</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Maintenance Coverage
            </h1>
            <p className="text-[#e8e0d6]/50 text-lg leading-relaxed">
              Any content updates and minor polish are covered. Building something new is not.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a85c] to-transparent mb-12" />

          {/* Plans */}
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-lg border border-[#2a2725] bg-[#0e0d0b] p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-display text-lg font-semibold">{plan.name}</p>
                  <p className="text-xs text-[#e8e0d6]/40">{plan.for}</p>
                </div>
                <p className="font-display text-2xl font-bold text-[#c9a85c] mb-4">{plan.price}</p>
                <p className="text-sm text-[#e8e0d6]/70 mb-3 font-medium">{plan.changes}</p>
                <ul className="space-y-2">
                  {plan.extras.map((e) => (
                    <li key={e} className="flex items-center gap-2 text-sm text-[#e8e0d6]/50">
                      <svg className="text-[#c9a85c] shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* What's covered */}
          <h2 className="font-display text-2xl font-bold mb-8">What Counts as a Content Change</h2>

          <div className="space-y-6 mb-16">
            {covered.map((section) => (
              <div key={section.category} className="rounded-lg border border-[#2a2725] bg-[#0e0d0b] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="text-[#c9a85c] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <h3 className="font-display text-base font-semibold">{section.category}</h3>
                </div>
                <ul className="space-y-2 pl-7">
                  {section.examples.map((ex) => (
                    <li key={ex} className="text-sm text-[#e8e0d6]/50">{ex}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="h-px bg-[#2a2725] mb-12" />

          {/* What's not covered */}
          <h2 className="font-display text-2xl font-bold mb-8">Not Covered Under Retainer</h2>

          <div className="rounded-lg border border-[#2a2725] bg-[#0e0d0b] p-6 mb-16">
            <ul className="space-y-4">
              {notCovered.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#e8e0d6]/60">
                  <svg className="text-[#e8e0d6]/30 mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#e8e0d6]/30 mt-6 pt-6 border-t border-[#2a2725]">
              Out-of-scope work is quoted separately before any work begins.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-[#e8e0d6]/50 mb-6 text-sm">Questions about what is covered? Just ask.</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#c9a85c] text-[#0a0a0a] font-semibold text-sm hover:bg-[#dfc88a] transition-colors"
            >
              Get in Touch
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
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
