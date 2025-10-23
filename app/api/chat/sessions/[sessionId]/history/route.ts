import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL  ||
    "https://cms.mumwell.org";

// ✅ Correct: explicitly type the context param
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    // ✅ In Next.js 15+, params is a Promise — you must await it
    const { sessionId } = await context.params;
    console.log(`Getting chat history for session ${sessionId}`);

    const authHeader = req.headers.get("Authorization");
    console.log("Next.js received authHeader:", authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${BACKEND_API_URL}/chat/sessions/${sessionId}/history`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to get chat history:", error);
      return NextResponse.json(
        { error: error.error || "Failed to get chat history" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Chat history retrieved successfully:", data);

    const formattedMessages = data.map(
      (msg: { role: string; content: string; timestamp: string }) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      })
    );

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error getting chat history:", error);
    return NextResponse.json(
      { error: "Failed to get chat history" },
      { status: 500 }
    );
  }
}
