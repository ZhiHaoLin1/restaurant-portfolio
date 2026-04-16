import { NextRequest, NextResponse } from "next/server";
import { extractCalendarId, getPublicCalendarEvents } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawInput = searchParams.get("calendarId")?.trim() || searchParams.get("input")?.trim() || "";
  const maxResultsParam = searchParams.get("maxResults");
  const maxResults = Math.min(Math.max(Number(maxResultsParam || 6), 1), 25);

  if (!rawInput) {
    return NextResponse.json(
      { error: "Missing required query parameter: calendarId or input" },
      { status: 400 }
    );
  }

  try {
    const calendarId = extractCalendarId(rawInput);
    const data = await getPublicCalendarEvents({
      calendarId,
      maxResults,
    });

    const events = data.items
      .filter((event) => event.status !== "cancelled")
      .map((event) => ({
        id: event.id,
        title: event.summary || "Untitled event",
        description: event.description || "",
        location: event.location || "",
        link: event.htmlLink || "",
        start: event.start,
        end: event.end,
        status: event.status || "confirmed",
      }));

    return NextResponse.json(
      {
        calendarId: data.calendarId,
        timeZone: data.timeZone,
        events,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch calendar events.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
