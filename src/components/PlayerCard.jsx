import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function PlayerCard({ player }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(player.id);

  return (
    <article className="player-card">
      <Link className="player-card-main" to={`/players/${player.id}`}>
        <div className="player-avatar">
          {player.headshot ? <img src={player.headshot} alt="" /> : <span>{player.name?.charAt(0) ?? "?"}</span>}
        </div>
        <div className="player-card-copy">
          <strong>{player.name}</strong>
          <span>{[player.team, player.position, player.jersey ? `#${String(player.jersey).replace(/^#/, "")}` : ""].filter(Boolean).join(" · ") || "NBA player"}</span>
        </div>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </Link>
      <button
        className={`save-button ${saved ? "is-saved" : ""}`}
        type="button"
        aria-label={saved ? `Remove ${player.name} from saved players` : `Save ${player.name}`}
        aria-pressed={saved}
        onClick={() => toggleFavorite(player)}
      >
        {saved ? "★" : "☆"}
      </button>
    </article>
  );
}
