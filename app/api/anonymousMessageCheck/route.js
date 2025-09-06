import { NextResponse } from "next/server";

export async function POST(req) {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "AI API key not configured" }, { status: 500 });
    }
    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
            process.env.GEMINI_API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `You are a content moderator and classifier.
Return JSON ONLY in this structure:
{
  "proceed": "yes" | "no",
  "msgType": "normal" | "abusive" | "defaming" | "spam" | "nsfw" | "other",
  "category": 
  "feedback" 
| "happy" 
| "question" 
| "regarding" 
| "story" 
| "support" 
| "complaint" 
| "joke" 
| "spam" 
| "other"
| "suggestion"
| "appreciation"
| "criticism"
| "update"
| "announcement"
| "greetings"

  "note": "short reason"
}

Rules:
- Use exactly ONE category from the list, no new categories.
- If message is harmful → proceed = "no".
- If fine → proceed = "yes".
- Output ONLY valid JSON, nothing else.`
                                }
                            ]
                        },
                        {
                            role: "user",
                            parts: [{ text: message }]
                        }
                    ],
                    generationConfig: { temperature: 0 }
                })
            }
        );

        const data = await response.json();
        console.log(data)
        console.log("Gemini raw:", JSON.stringify(data, null, 2));

        const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!content) {
            return NextResponse.json({ error: "No content from Gemini" }, { status: 500 });
        }

        // Clean possible ```json fences
        const clean = content.replace(/```json|```/g, "");

        return NextResponse.json(JSON.parse(clean));
    } catch (error) {
        console.error("Moderation API Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze message" },
            { status: 500 }
        );
    }
}
