import supabase from "@/lib/supabase";

export async function GET(request) {
  // Secure the cron endpoint
  const authHeader = request.headers.get("authorization");
  const expected = "Bearer " + process.env.CRON_SECRET;
  if (authHeader !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all clients from Supabase
  const { data: clients, error: clientsError } = await supabase
    .from("clients")
    .select("*");

  if (clientsError) {
    console.error("Error fetching clients:", clientsError);
    return Response.json({ error: "Failed to fetch clients" }, { status: 500 });
  }

  for (const client of clients) {
    try {
      // Step 1: Refresh token if expiring within 10 days
      const expiresAt = new Date(client.expires_at);
      const daysUntilExpiry = (expiresAt - Date.now()) / (1000 * 60 * 60 * 24);

      if (daysUntilExpiry < 10) {
        const refreshRes = await fetch(
          `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${client.access_token}`
        );
        const { access_token: newToken, expires_in } = await refreshRes.json();

        await supabase
          .from("clients")
          .update({
            access_token: newToken,
            expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
          })
          .eq("id", client.id);

        client.access_token = newToken;
      }

      // Step 2: Fetch latest posts from Instagram
      const postsRes = await fetch(
        `https://graph.instagram.com/v21.0/me/media?fields=id,caption,media_url,thumbnail_url,permalink,timestamp&access_token=${client.access_token}`
      );
      const { data: posts } = await postsRes.json();

      if (!posts || posts.length === 0) continue;

      // Step 3: Save new posts to Supabase (skip duplicates)
      for (const post of posts) {
        await supabase
          .from("posts")
          .upsert(
            {
              client_id: client.id,
              instagram_post_id: post.id,
              caption: post.caption || "",
              media_url: post.media_url,
              thumbnail_url: post.thumbnail_url || null,
              permalink: post.permalink,
              timestamp: post.timestamp,
            },
            { onConflict: "instagram_post_id" }
          );
      }
    } catch (err) {
      console.error(`Error processing client ${client.id}:`, err);
    }
  }

  return Response.json({ success: true });
}
