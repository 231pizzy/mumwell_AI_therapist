import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL =
 process.env.NEXT_PUBLIC_BACKEND_API_URL  ||
    "https://cms.mumwell.org";

export async function POST(req: NextRequest, { params }) {
  console.log("sending from route");

  const { sessionId } = params;

  // Extract token from client request headers
  const authHeader = req.headers.get("Authorization");
  console.log("Next.js received authHeader:", authHeader);

  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization header is required" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log(`Forwarding message to backend session ${sessionId}:`, message);

    const response = await fetch(
      `${BACKEND_API_URL}/chat/sessions/${sessionId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to send message:", data);
      return NextResponse.json(
        { error: data.error || "Failed to send message" },
        { status: response.status }
      );
    }

    console.log("Message sent successfully:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
