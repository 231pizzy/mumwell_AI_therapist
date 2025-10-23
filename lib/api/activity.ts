interface ActivityEntry {
  type: string;
  name: string;
  description?: string;
  duration?: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://cms.mumwell.org";

export async function logActivity(
  data: ActivityEntry
): Promise<{ success: boolean; data: unknown }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(`${API_BASE_URL}/api/activity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to log activity");
  }

  return response.json();
}