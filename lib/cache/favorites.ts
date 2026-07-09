export async function fetchFavorites(user_id: string) {
  const res = await fetch(`/api/favorites?user_id=${user_id}`);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  const data = await res.json();
  return data.data.map((item: any) => item.website_id).filter(Boolean);
}

export async function toggleFavorite({
  user_id,
  website_id,
}: {
  user_id: string;
  website_id: string;
}) { 
  const res = await fetch("/api/favorites", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, website_id }),
  });
  if (!res.ok) throw new Error("Failed to toggle favorite");
  return res.json(); // { message, liked }
}
