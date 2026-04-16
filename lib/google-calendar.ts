export type GoogleCalendarEvent = {
  id: string;
  status?: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
};

export type PublicCalendarEventsResponse = {
  calendarId: string;
  timeZone: string;
  items: GoogleCalendarEvent[];
};

const GOOGLE_CALENDAR_BASE_URL = "https://www.googleapis.com/calendar/v3/calendars";
const GOOGLE_CALENDAR_DOMAIN = "calendar.google.com";

export function normalizeCalendarId(calendarId: string) {
  return encodeURIComponent(calendarId.trim());
}

export function extractCalendarId(input: string) {
  const value = input.trim();

  if (!value) {
    throw new Error("Paste a public Google Calendar link or calendar ID.");
  }

  if (value.includes("@")) {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      try {
        const url = new URL(value);

        const src = url.searchParams.get("src");
        if (src) {
          return decodeURIComponent(src).trim();
        }

        const cid = url.searchParams.get("cid");
        if (cid) {
          return decodeURIComponent(cid).trim();
        }

        if (url.hostname.includes(GOOGLE_CALENDAR_DOMAIN)) {
          const decodedUrl = decodeURIComponent(value);
          const emailMatch = decodedUrl.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+/);
          if (emailMatch) {
            return emailMatch[0].trim();
          }
        }
      } catch {
        // Fall through to raw value handling below.
      }
    }

    return value;
  }

  if (value.startsWith("<iframe")) {
    const srcMatch = value.match(/src=["']([^"']+)["']/i);
    if (srcMatch?.[1]) {
      return extractCalendarId(srcMatch[1]);
    }
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const url = new URL(value);

      const src = url.searchParams.get("src");
      if (src) {
        return decodeURIComponent(src).trim();
      }

      const cid = url.searchParams.get("cid");
      if (cid) {
        return decodeURIComponent(cid).trim();
      }

      const decodedUrl = decodeURIComponent(value);
      const emailMatch = decodedUrl.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+/);
      if (emailMatch) {
        return emailMatch[0].trim();
      }
    } catch {
      throw new Error("That does not look like a valid Google Calendar link or calendar ID.");
    }
  }

  throw new Error("That does not look like a valid Google Calendar link or calendar ID.");
}

export async function getPublicCalendarEvents({
  calendarId,
  maxResults = 10,
  timeMin,
  singleEvents = true,
  orderBy = "startTime",
}: {
  calendarId: string;
  maxResults?: number;
  timeMin?: string;
  singleEvents?: boolean;
  orderBy?: "startTime" | "updated";
}): Promise<PublicCalendarEventsResponse> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GOOGLE_CALENDAR_API_KEY environment variable.");
  }

  if (!calendarId?.trim()) {
    throw new Error("A calendarId is required.");
  }

  const params = new URLSearchParams({
    key: apiKey,
    singleEvents: String(singleEvents),
    orderBy,
    maxResults: String(maxResults),
    timeMin: timeMin || new Date().toISOString(),
  });

  const url = `${GOOGLE_CALENDAR_BASE_URL}/${normalizeCalendarId(calendarId)}/events?${params.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  const data = await response.json();

  if (!response.ok) {
    const rawMessage = data?.error?.message || "Failed to fetch public Google Calendar events.";
    const message = rawMessage.includes("Not Found")
      ? "We could not read that calendar. Make sure it is public and that you pasted the right link or calendar ID."
      : rawMessage.includes("forbidden") || rawMessage.includes("access")
        ? "That calendar is not publicly readable yet. In Google Calendar, turn on public sharing and allow event details to be visible."
        : rawMessage;

    throw new Error(message);
  }

  return {
    calendarId,
    timeZone: data.timeZone || "UTC",
    items: Array.isArray(data.items) ? data.items : [],
  };
}

export function formatCalendarEventDate(event: GoogleCalendarEvent, locale = "en-US") {
  const startValue = event.start?.dateTime || event.start?.date;
  if (!startValue) return "Date unavailable";

  const isAllDay = Boolean(event.start?.date && !event.start?.dateTime);

  if (isAllDay) {
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(startValue));
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(startValue));
}
