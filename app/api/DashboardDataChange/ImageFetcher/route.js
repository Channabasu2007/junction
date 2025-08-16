export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return new Response(JSON.stringify({ error: "Missing search query" }), { status: 400 });
    }

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=40`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch from Pexels API" }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ photos: data.photos }), { status: 200 });

  } catch (error) {
    console.error("Pexels API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
