import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json(); // ✅ only once
    console.log("✅ Incoming request body:", body);
  } catch (e) {
    console.error("❌ Failed to parse request body:", e);
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }

  try {
    const notes = body.notes;
    console.log("🧠 Extracted notes:", notes);

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // or another
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant that suggests relevant doctors based on user symptoms. Respond in valid JSON format only.",
        },
        {
          role: "user",
          content: `Suggest doctors for this note: "${notes}". Return a JSON array like:
[
  { "specialty": "Neurologist", "reason": "For chronic or complex headaches" },
  { "specialty": "ENT", "reason": "If headaches are related to sinus issues" }
]`,
        },
      ],
      max_tokens: 256,
    });

    console.log(
      "📥 OpenAI raw response:",
      completion.choices[0].message.content
    );

    const suggestedDoctors = JSON.parse(
      completion.choices[0].message.content || "[]"
    );
    console.log("✅ Parsed doctor suggestions:", suggestedDoctors);

    return NextResponse.json({ doctors: suggestedDoctors });
  } catch (error) {
    console.error("❌ Error suggesting doctors:", error);
    return NextResponse.json(
      { error: "Error suggesting doctors" },
      { status: 400 }
    );
  }
}
