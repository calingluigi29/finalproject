import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlayer } from "../api.js";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function PlayerPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryToken, setRetryToken] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let active = true;
    setStatus("loading");
    setError("");
    getPlayer(id)
      .then((result) => {
        if (!active) return;
        setData(result);
        setStatus("success");
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError.message || "Could not load this player.");
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [id, retryToken]);

  if (status === "loading") {
    return <main className="page-shell"><div className="profile-loading"><span className="spinner" /> Loading player profile…</div></main>;
  }
  if (status === "error") {
    return (
      <main className="page-shell">
        <div className="message-panel error-panel" role="alert">
          <p>{error}</p>
          <button type="button" className="text-button" onClick={() => setRetryToken((current) => current + 1)}>Try again ↗</button>
          <span> · </span>
          <Link className="text-button" to="/">Back to discover ↗</Link>
        </div>
      </main>
    );
  }

  const athlete = data.athlete ?? {};
  const player = {
    id: athlete.id,
    name: athlete.displayName,
    headshot: athlete.headshot?.href ?? "",
    jersey: athlete.displayJersey || (athlete.jersey ? `#${athlete.jersey}` : ""),
    team: athlete.team?.displayName,
    position: athlete.position?.displayName,
  };
  const stats = athlete.statsSummary?.statistics ?? [];
  const videos = data.videos ?? [];
  const saved = isFavorite(player.id);

  return (
    <main className="page-shell player-page">
      <Link className="back-link" to="/">← Back to discover</Link>
      <section className="player-profile">
        <div className="profile-main">
          <div className="profile-photo">
            {player.headshot ? <img src={player.headshot} alt={player.name} /> : <span>{player.name?.charAt(0)}</span>}
          </div>
          <div className="profile-copy">
            <p className="eyebrow"><span className="live-dot" /> PLAYER PROFILE</p>
            <h1>{player.name}</h1>
            <p className="profile-meta">
              {[player.team, player.position, player.jersey].filter(Boolean).join("  /  ")}
            </p>
            <p className="profile-status">{athlete.active ? "ACTIVE" : athlete.status?.type?.name ?? "NBA PLAYER"} <span>·</span> {athlete.displayExperience ?? "NBA"}</p>
          </div>
        </div>
        <button
          type="button"
          className={`favorite-action ${saved ? "is-saved" : ""}`}
          aria-pressed={saved}
          onClick={() => toggleFavorite(player)}
        >
          <span>{saved ? "★" : "☆"}</span> {saved ? "Saved to my players" : "Save player"}
        </button>
      </section>

      <section className="player-stats">
        <div className="section-heading compact-heading">
          <div><p className="eyebrow">THE NUMBERS</p><h2>Season snapshot.</h2></div>
          <span className="season-label">{athlete.statsSummary?.displayName ?? data.season?.displayName ?? "Season stats"}</span>
        </div>
        {stats.length > 0 ? (
          <div className="stat-grid">
            {stats.map((stat) => (
              <article className="stat-card" key={stat.name}>
                <span>{stat.shortDisplayName ?? stat.abbreviation}</span>
                <strong>{stat.displayValue}</strong>
                <small>{stat.displayName}</small>
              </article>
            ))}
          </div>
        ) : (
          <div className="message-panel">Season statistics aren’t available right now.</div>
        )}
        {athlete.statsSummary?.displayName && <p className="stats-disclaimer">Season averages · ESPN</p>}
      </section>

      <section className="highlights-section">
        <div className="section-heading compact-heading">
          <div><p className="eyebrow">THE MOMENTS</p><h2>Highlights &amp; clips.</h2></div>
          <span className="season-label">{videos.length} recent clips</span>
        </div>
        {videos.length > 0 ? (
          <div className="highlight-grid">
            {videos.map((video) => {
              const image = video.thumbnail || video.posterImages?.[0]?.href || video.images?.[0]?.url;
              const href = video.links?.web?.href;
              return (
                <a className="highlight-card" href={href} target="_blank" rel="noreferrer" key={video.id}>
                  <div className="highlight-image">
                    {image && <img src={image} alt="" loading="lazy" />}
                    <span className="play-button" aria-label="Play clip">▶</span>
                    <span className="clip-duration">{Math.floor((video.duration ?? 0) / 60)}:{String((video.duration ?? 0) % 60).padStart(2, "0")}</span>
                  </div>
                  <div className="highlight-copy"><span>ESPN VIDEO</span><h3>{video.headline ?? video.title}</h3></div>
                  <span className="highlight-arrow" aria-hidden="true">↗</span>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="message-panel">No player clips are available right now.</div>
        )}
        <p className="clips-disclaimer">Clips open on ESPN. Video availability may vary by region.</p>
      </section>
    </main>
  );
}
