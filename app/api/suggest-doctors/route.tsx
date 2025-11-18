import { openai } from "@/config/OpenAiModel";
import DoctorAgents from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { notes } = await req.json();

    try {

        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-preview-09-2025",
            messages: [
                {
                    role: "system",
                    content: `
You are an AI doctor-recommendation engine.

Here is the ONLY list of allowed doctors:
${JSON.stringify(DoctorAgents)}

---- RULES ----
1. You MUST select doctors ONLY from the list above.
2. Match user symptoms to the most relevant doctor(s).
3. General symptoms such as:
   - "I feel cold"
   - headache
   - fever
   - body pain
   - weakness
   - dizziness
   ALWAYS map to doctor with id: 1 (General Physician).
4. If symptoms relate to mental or emotional stress → doctor id: 7.
5. If symptoms relate to pregnancy → doctor id: 3.
6. If symptoms relate to breastfeeding → doctor id: 5.
7. If symptoms relate to children → doctor id: 2.
8. NEVER create or imagine a new doctor.
9. ALWAYS return output in this EXACT JSON format:

{
  "suggestedDoctors": [
    {
      "id": number,
      "specialist": string,
      "description": string,
      "image": string,
      "subscriptionRequired": boolean
      "voiceId": string,
      "firstMessage": string,
    }
  ]
}
`
                },
                {
                    role: "user",
                    content: `User Symptoms: ${notes}`
                }
            ]
        });

        const rawMessage = completion.choices[0].message?.content || "";

        // Clean JSON if wrapped in ```json ... ```
        const cleaned = rawMessage
            .trim()
            .replace(/^```json/, "")
            .replace(/```$/, "")
            .trim();

        const parsed = JSON.parse(cleaned);

        return NextResponse.json(parsed);

    } catch (error) {
        console.error("Doctor Suggestion Error:", error);
        return NextResponse.json(
            { error: "Failed to process doctor suggestion", details: String(error) },
            { status: 500 }
        );
    }
}
