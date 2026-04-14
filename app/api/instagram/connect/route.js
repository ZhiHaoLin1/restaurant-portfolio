export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_APP_ID,
    redirect_uri: process.env.REDIRECT_URI,
    scope: "instagram_business_basic",
    response_type: "code",
  });

  const authUrl = `https://api.instagram.com/oauth/authorize?${params.toString()}`;

  return Response.redirect(authUrl);
}
