"use client";

import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  link?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
};

export function UpcomingEventsCalendar({ calendarId }: { calendarId: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/google-calendar/public-events?calendarId=${encodeURIComponent(calendarId)}&maxResults=12`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setEvents(data.events || []);
        }
      })
      .catch(() => setError("Failed to load events."))
      .finally(() => setLoading(false));
  }, [calendarId]);

  function formatDate(event: Event) {
    const start = event.start?.dateTime || event.start?.date;
    if (!start) return "Date unavailable";

    const isAllDay = Boolean(event.start?.date && !event.start?.dateTime);
    const date = new Date(start);

    if (isAllDay) {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function formatTime(event: Event) {
    const start = event.start?.dateTime;
    const end = event.end?.dateTime;
    if (!start) return null;

    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    const startTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    if (endDate && startDate.toDateString() === endDate.toDateString()) {
      const endTime = endDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
      return `${startTime} to ${endTime}`;
    }

    return startTime;
  }

  function getMonth(event: Event) {
    const start = event.start?.dateTime || event.start?.date;
    if (!start) return "";
    return new Date(start).toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  }

  function getDay(event: Event) {
    const start = event.start?.dateTime || event.start?.date;
    if (!start) return "";
    return new Date(start).getDate();
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-[#2a2725] bg-[#0e0d0b] p-6 animate-pulse">
            <div className="h-4 bg-[#2a2725] rounded w-1/3 mb-3" />
            <div className="h-5 bg-[#2a2725] rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-lg border border-[#2a2725] bg-[#0e0d0b] text-sm text-[#e8e0d6]/40">
        {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-6 rounded-lg border border-[#2a2725] bg-[#0e0d0b] text-sm text-[#e8e0d6]/40">
        No upcoming events scheduled.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const timeRange = formatTime(event);
        return (
          <div
            key={event.id}
            className="group flex gap-5 rounded-lg border border-[#2a2725] bg-[#0e0d0b] p-6 hover:border-[#c9a85c]/40 transition-colors"
          >
            {/* Date badge */}
            <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-[#c9a85c]/10 border border-[#c9a85c]/20">
              <span className="text-[#c9a85c] text-xs font-semibold tracking-wider">
                {getMonth(event)}
              </span>
              <span className="font-display text-xl font-bold text-[#e8e0d6] leading-none">
                {getDay(event)}
              </span>
            </div>

            {/* Event details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-semibold text-[#e8e0d6] mb-1 truncate">
                {event.title}
              </h3>
              <p className="text-sm text-[#e8e0d6]/50 mb-1">
                {timeRange ? timeRange : formatDate(event)}
              </p>
              {event.location && (
                <p className="text-sm text-[#e8e0d6]/40 truncate">
                  {event.location}
                </p>
              )}
              {event.description && (
                <p className="text-sm text-[#e8e0d6]/40 mt-2 line-clamp-2">
                  {event.description}
                </p>
              )}
            </div>

            {/* Link */}
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity text-[#c9a85c]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
