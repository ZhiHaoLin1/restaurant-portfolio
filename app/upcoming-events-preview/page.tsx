import supabase from "@/lib/supabase";
import { UpcomingEventsCalendar } from "@/components/google-calendar/upcoming-events-calendar";
import Link from "next/link";

export const revalidate = 300;

export default async function Page() {
  const { data: client } = await supabase
    .from("clients")
    .select("calendar_id, name")
    .eq("id", process.env.CLIENT_ID)
    .single();

  const calendarId = client?.calendar_id || "";

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-[#e8e0d6]">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#2a2725]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">
            Zhi<span className="text-[#c9a85c]">.</span>
          </Link>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a85c]">
            Events Preview
          </span>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Calendar
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Upcoming Events
          </h1>
          <p className="text-[#e8e0d6]/50 text-lg mb-12">
            Live updates from Google Calendar.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a85c] to-transparent mb-12" />

          {calendarId ? (
            <UpcomingEventsCalendar calendarId={calendarId} />
          ) : (
            <div className="p-6 rounded-lg border border-[#2a2725] bg-[#0e0d0b] text-[#e8e0d6]/40 text-sm">
              No Google Calendar connected yet. Add a <code className="text-[#c9a85c]">calendar_id</code> to this client&apos;s row in Supabase.
            </div>
          )}
        </div>
      </div>

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
