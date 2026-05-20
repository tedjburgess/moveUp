import API_BASE_URL from "../config/api.js";

export const fetchUserStatistics = async (token) => {
  if (!token) {
    throw new Error("You need to be logged in to view statistics.");
  }

  const response = await fetch(`${API_BASE_URL}/api/movement-logs/me/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch user statistics.");
  }

  return data;
};
