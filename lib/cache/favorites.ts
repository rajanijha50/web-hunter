// ─── LocalStorage helpers (for anonymous users) ──────────────────────────────

const LS_KEY = "wh_local_favorites";

export function getLocalFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setLocalFavorites(ids: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(ids));
}

export function toggleLocalFavorite(website_id: string): boolean {
  const current = getLocalFavorites();
  const exists = current.includes(website_id);
  if (exists) {
    setLocalFavorites(current.filter((id) => id !== website_id));
    return false; // now un-favorited
  } else {
    setLocalFavorites([...current, website_id]);
    return true; // now favorited
  }
}

export function isLocalFavorite(website_id: string): boolean {
  return getLocalFavorites().includes(website_id);
}

// ─── API helpers (for authenticated users) ───────────────────────────────────

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
