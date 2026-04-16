"use client";

import { useMemo, useState } from "react";

type CalendarApiEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  link: string;
  start?: {
    date?: string;
    dateTime?: string;
  };
};

type CalendarApiResponse = {
  calendarId: string;
  events: CalendarApiEvent[];
};

function formatEventDate(event: CalendarApiEvent) {
  const value = event.start?.dateTime || event.start?.date;
  if (!value) return "";
  return new Date(value).toLocaleString();
}

export function GoogleCalendarTestClient({ clientId }: { clientId: string }) {
  const [input, setInput] = useState("");
  const [data, setData] = useState<CalendarApiResponse | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const previewCount = useMemo(() => data?.events.length ?? 0, [data]);

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/google-calendar/public-events?input=${encodeURIComponent(input)}&maxResults=6`
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch events");
      setData(json);

      const saveRes = await fetch("/api/save-calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, clientId }),
      });

      const saveJson = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveJson.error || "Failed to save calendar");

      setSaved(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d6] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          Google Calendar
        </p>
        <h1 className="font-display text-4xl font-bold mb-2">Connect a Calendar</h1>
        <p className="text-[#e8e0d6]/50 mb-10">
          Paste a public Google Calendar link or calendar ID to connect it and preview upcoming events.
        </p>

        <form onSubmit={handleConnect} className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Google Calendar link or ID"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#2a2725] text-[#e8e0d6] placeholder:text-[#e8e0d6]/20 focus:outline-none focus:border-[#c9a85c] transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#c9a85c] text-[#0a0a0a] font-semibold hover:bg-[#dfc88a] transition-colors disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Connect Calendar"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        )}

        {saved && (
          <p className="mt-4 text-sm text-green-400">Calendar saved successfully.</p>
        )}

        {data && (
          <div className="mt-10">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a85c] to-transparent mb-8" />
            <p className="text-[#e8e0d6]/50 text-sm mb-6">
              {previewCount} upcoming {previewCount === 1 ? "event" : "events"} found
            </p>
            <div className="space-y-4">
              {data.events.map((e) => (
                <div
                  key={e.id}
                  className="p-5 rounded-lg border border-[#2a2725] bg-[#0e0d0b]"
                >
                  <p className="text-xs text-[#c9a85c] mb-1">{formatEventDate(e)}</p>
                  <p className="font-display text-lg font-semibold">{e.title}</p>
                  {e.location && (
                    <p className="text-sm text-[#e8e0d6]/40 mt-1">{e.location}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
