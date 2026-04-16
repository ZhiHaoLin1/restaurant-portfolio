"use client";

import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  start?: { dateTime?: string; date?: string };
};

export function UpcomingEventsCalendar({ calendarId }: { calendarId: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [view, setView] = useState<"list" | "calendar">("list");

  useEffect(() => {
    fetch(`/api/google-calendar/public-events?calendarId=${encodeURIComponent(calendarId)}`)
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []));
  }, [calendarId]);

  function groupByDate() {
    const map: Record<string, Event[]> = {};
    events.forEach((e) => {
      const date =
        e.start?.dateTime?.split("T")[0] ||
        e.start?.date ||
        "unknown";

      if (!map[date]) map[date] = [];
      map[date].push(e);
    });
    return map;
  }

  const grouped = groupByDate();

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView("list")}>List</button>
        <button onClick={() => setView("calendar")} style={{ marginLeft: 10 }}>
         Calendar
        </button>
      </div>

      {view === "list" && (
        <div>
          {events.map((e) => (
            <div key={e.id}>
              <strong>{e.title}</strong>
            </div>
          ))}
        </div>
      )}

      {view === "calendar" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {Object.entries(grouped).map(([date, evs]) => (
            <div key={date} style={{ border: "1px solid #444", padding: 10 }}>
              <strong>{date}</strong>
              {evs.map((e) => (
                <div key={e.id} style={{ fontSize: 12 }}>
                  {e.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}