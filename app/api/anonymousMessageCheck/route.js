import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  const { message } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({
      error: "API key missing"
    }, { status: 500 });
  }

  const systemPrompt = `You are a content moderator.
Return ONLY JSON in this format:
{
"proceed":"yes" | "no",
"msgType":"normal" | "abusive" | "defaming" | "spam" | "nsfw" | "other",
"category":"feedback" | "happy" | "question" | "regarding" | "story" | "support" | "complaint" | "joke" | "spam" | "other" | "suggestion" | "appreciation" | "criticism" | "update" | "announcement" | "greetings",
"note":"short reason"
}
If unsure → proceed="no"
No extra text. Only JSON.`;

  async function callGroq(model) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0,
        response_format: { type: "json_object" }
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Groq API error: ${res.status} ${res.statusText} - ${errorText}`);
    }

    return res.json();
  }

  let data;
  try {
    data = await callGroq("llama-3.3-70b-versatile");
  } catch (err) {
    console.warn("Primary model failed, trying fallback:", err);
    try {
      // Fallback model
      data = await callGroq("llama3-70b-8192");
    } catch (fallbackErr) {
      console.error("All models failed:", fallbackErr);
      throw fallbackErr; // Handled in outer catch
    }
  }

  try {
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("No output from Groq");

    const jsonString = content.match(/\{[\s\S]*\}/)?.[0] || content;
    const result = JSON.parse(jsonString);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Moderation parse error:", err);
    return NextResponse.json({
      proceed: "no",
      msgType: "other",
      category: "other",
      note: "AI failed - blocked"
    });
  }
}

