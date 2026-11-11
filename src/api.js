const API_ROOT = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba";
const COMMON_API_ROOT = "https://site.api.espn.com/apis/common/v3";
const PLAYER_API_ROOT = "https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes";

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`The basketball data service returned an error (${response.status}).`);
  }
  return response.json();
}

export async function getScoreboard(date) {
  const query = date ? `?dates=${encodeURIComponent(date)}` : "";
  const data = await request(`${API_ROOT}/scoreboard${query}`);
  return data.events ?? [];
}

export async function searchPlayers(query) {
  const params = new URLSearchParams({ query, limit: "8", type: "player" });
  const data = await request(`${COMMON_API_ROOT}/search?${params}`);
  return (data.items ?? [])
    .filter((item) => item.type === "player" && item.id)
    .map((item) => ({
      id: item.id,
      name: item.displayName,
      headshot: item.headshot?.href ?? "",
      jersey: item.jersey,
      position: item.position?.abbreviation ?? item.position?.displayName ?? "",
      team: item.teamRelationships?.[0]?.core?.displayName ?? "",
      active: item.isActive,
    }));
}

export async function getPlayer(id) {
  return request(`${PLAYER_API_ROOT}/${encodeURIComponent(id)}`);
}
