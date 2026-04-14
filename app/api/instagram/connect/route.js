export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const clientName = searchParams.get("client") || "";
  const clientSlug = clientName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  // Encode client info in state param — Meta passes this back in callback
  const state = encodeURIComponent(JSON.stringify({ name: clientName, slug: clientSlug }));

  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_APP_ID,
    redirect_uri: process.env.REDIRECT_URI,
    scope: "instagram_business_basic",
    response_type: "code",
    state,
  });

  const authUrl = `https://api.instagram.com/oauth/authorize?${params.toString()}`;

  return Response.redirect(authUrl);
}
