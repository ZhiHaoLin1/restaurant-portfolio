import type { Metadata } from "next";
import { GoogleCalendarTestClient } from "@/components/google-calendar/google-calendar-test-client";

export const metadata: Metadata = {
  title: "Google Calendar Test | Zhi Lin",
  description: "Hidden test page for connecting Google Calendar.",
  robots: { index: false, follow: false },
};

export default function GoogleCalendarTestPage() {
  const clientId = process.env.CLIENT_ID || "";
  return <GoogleCalendarTestClient clientId={clientId} />;
}
