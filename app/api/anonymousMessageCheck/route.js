// /app/api/moderateMessage/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
    const { message } = await req.json();

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
            process.env.GEMINI_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `You are a content moderator and classifier.
Analyze the following message and return JSON ONLY in this structure:
{
  "proceed": "yes" | "no",
  "msgType": "normal" | "abusive" | "defaming" | "spam" | "nsfw" | "other",
  "category": "feedback" | "happy" | "question" | "regarding" | "story" | "support" | "complaint" | "joke" | "spam" | "other",
  "note": "short reason"
}

Rules:
- Use exactly ONE category from the list, no new categories.
- If message is harmful → proceed = "no" and msgType should reflect it.
- If message is fine → proceed = "yes" and assign one suitable category.
- Keep note short and clear.
- Never add explanations outside of JSON.

Message: """${message}"""`,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: 0,
                    },
                }),
            }
        );

        const data = await response.json();

        // Gemini response format
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return NextResponse.json(JSON.parse(content));
    } catch (error) {
        console.error("Moderation API Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze message" },
            { status: 500 }
        );
    }
}
