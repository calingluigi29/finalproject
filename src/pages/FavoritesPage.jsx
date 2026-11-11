import { Link } from "react-router-dom";
import PlayerCard from "../components/PlayerCard.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="page-shell favorites-page">
      <div className="favorites-intro">
        <p className="eyebrow">YOUR COURTSIDE LIST</p>
        <h1>My players<span className="brand-period">.</span></h1>
        <p>Keep the players you follow close. Your list is saved on this device.</p>
      </div>
      {favorites.length ? (
        <div className="player-grid favorites-grid">
          {favorites.map((player) => <PlayerCard key={player.id} player={player} />)}
        </div>
      ) : (
        <div className="empty-favorites">
          <span className="empty-ball" aria-hidden="true">◉</span>
          <h2>Your roster starts here.</h2>
          <p>Save players to keep their stats and latest clips one tap away.</p>
          <Link className="primary-link" to="/">Find a player <span>↗</span></Link>
        </div>
      )}
    </main>
  );
}
