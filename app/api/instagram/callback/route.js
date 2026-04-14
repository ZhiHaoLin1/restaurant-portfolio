import supabase from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json({ error: "No code provided" }, { status: 400 });
  }

  // Step 1: Exchange code for short-lived token
  const tokenRes = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.INSTAGRAM_APP_ID,
      client_secret: process.env.INSTAGRAM_APP_SECRET,
      grant_type: "authorization_code",
      redirect_uri: process.env.REDIRECT_URI,
      code,
    }),
  });

  const { access_token: shortLivedToken, user_id } = await tokenRes.json();

  // Step 2: Exchange for long-lived token (~60 days)
  const longLivedRes = await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${shortLivedToken}`
  );

  const longLivedData = await longLivedRes.json();
  console.log("Long lived token response:", longLivedData);
  const { access_token: longLivedToken, expires_in } = longLivedData;

  const expires_at = new Date(Date.now() + expires_in * 1000).toISOString();

  // Step 3: Save to Supabase
  const { error } = await supabase
    .from("clients")
    .upsert(
      {
        instagram_user_id: String(user_id),
        access_token: longLivedToken,
        expires_at,
      },
      { onConflict: "instagram_user_id" }
    );

  if (error) {
    console.error("Supabase error:", error);
    return Response.json({ error: "Failed to save token" }, { status: 500 });
  }

  return Response.json({ success: true, user_id });
}
