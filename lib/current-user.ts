// works for Route Handlers and API routes
// compatible with your localStorage token system

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://cms.mumwell.org";

export async function currentUser(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return null;
    }

    const token = authHeader.replace("Bearer ", "");

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.user; // same data you use in SessionContext
  } catch (err) {
    console.error("currentUser() error:", err);
    return null;
  }
}



// Your routes must forward the token from client → server.

// Example client request:

// await fetch("/api/create-session", {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });