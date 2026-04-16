import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { extractCalendarId } from "@/lib/google-calendar";

export async function POST(req: NextRequest) {
  const { input, clientId } = await req.json();

  if (!input || !clientId) {
    return NextResponse.json(
      { error: "Missing input or clientId" },
      { status: 400 }
    );
  }

  let calendarId: string;
  try {
    calendarId = extractCalendarId(input);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid calendar input.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { error } = await supabase
    .from("clients")
    .update({ calendar_id: calendarId })
    .eq("id", clientId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, calendarId });
}
