interface TestEntry {
    score: number;
    note?: string
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://cms.mumwell.org";

export async function takeTest(
    data:TestEntry
):
 Promise<{success: boolean; data: unknown}> {
     const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_BASE_URL}/api/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

    if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to track mood");
  }

  return response.json();
}