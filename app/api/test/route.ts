import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const API_URL =
   process.env.NEXT_PUBLIC_BACKEND_API_URL  ||
    "https://cms.mumwell.org";

  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { score, level, message} = body;

    if (typeof score !== "number" || score < 0 || score > 30) {
      return NextResponse.json(
        { error: "Invalid test score" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/api/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ score, level, message }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || "Failed to track mood" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error tracking mood:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const API_URL =
   process.env.NEXT_PUBLIC_BACKEND_API_URL  ||
    "https://cms.mumwell.org";

  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    // ✅ Adjust endpoint based on your backend route
    const response = await fetch(`${API_URL}/api/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch test result:", data);
      return NextResponse.json(
        { error: data.error || "Failed to fetch test result" },
        { status: response.status }
      );
    }

    console.log("Test result fetched:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching test result:", error);
    return NextResponse.json(
      { error: "Failed to fetch test result" },
      { status: 500 }
    );
  }
}