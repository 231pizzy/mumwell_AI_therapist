import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI medical-report generator. Your job is to analyze the full conversation between a user (mother/patient) and an AI medical doctor, Based on Conversation, generate a structured report with the following fields.

----- RULES -----
1. sessionId: a unique session identifier 
2. agent: medical specialist name (e.g 'General Physician AI')
3. user: name of the patient or "Anonymous" if not provided
5. timestamp: current date and time inISO format
5. chiefComplaint:  one-sentence summary of the main health concern
6. summary: summary: a 2-3 sentence summary of the main health concern
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe.
10.medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g, rest, see a doctor)

Return the result in JSON format:

{
  "sessionId": 'string',
  "agent": 'string',
  "user": 'string',
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptiom1", "symptom2"],
   "duration": "string",
   "severity": "string",
   "medicationsMentioned": ["med1", "med2"],
   "recommendations": ["rec1", "rec2"],
}
only include valid filds. Respond with nothing else

----- TONE -----
Professional, reassuring, medical, concise, NEVER alarming.
`

export async function POST(req: NextRequest) {
    const { sessionId, sessionDetail, messages } = await req.json();

    try {
        const userInput = "AI Doctor Agent Info:" + JSON.stringify(sessionDetail) + ", Conversation:" + JSON.stringify(messages);

        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-preview-09-2025",
            messages: [
                { role: "system", content: REPORT_GEN_PROMPT },
                { role: "user", content: userInput }
            ]
        });

        const rawResp = completion.choices[0].message?.content || "";

        // Clean JSON if wrapped in ```json ... ```
        const cleaned = rawResp
            .trim()
            .replace(/^```json/, "")
            .replace(/```$/, "")
            .trim();

        const parsed = JSON.parse(cleaned);

        // save to database
        const result = await db.update(SessionChatTable).set({
            report:parsed,
            conversation:messages
        }).where(eq(SessionChatTable.sessionId,sessionId))
        console.log('result', result)

        return NextResponse.json(parsed)

    } catch (error) {
        console.error("report generation Error:", error);
        return NextResponse.json(
            { error: "Failed to process report generation", details: String(error) },
            { status: 500 }
        );
    }
}