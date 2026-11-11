import { useEffect, useState } from "react";
import { searchPlayers } from "../api.js";
import PlayerCard from "./PlayerCard.jsx";

export default function PlayerSearch({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!submittedQuery) {
      setPlayers([]);
      setStatus("idle");
      return undefined;
    }

    let active = true;
    setStatus("loading");
    setError("");
    searchPlayers(submittedQuery)
      .then((results) => {
        if (!active) return;
        setPlayers(results);
        setStatus(results.length ? "success" : "empty");
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError.message || "Could not load players. Please try again.");
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [submittedQuery, retryToken]);

  function handleSubmit(event) {
    event.preventDefault();
    const nextQuery = query.trim();
    if (nextQuery) setSubmittedQuery(nextQuery);
  }

  return (
    <section className="search-section" id="player-search">
      <div className="section-heading">
        <div>
          <p className="eyebrow">KNOW THE GAME</p>
          <h2>Find your player.</h2>
        </div>
        <p className="section-note">Stats, player status, and the moments worth watching.</p>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <label className="visually-hidden" htmlFor="player-query">Search NBA players</label>
        <input
          id="player-query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search any NBA player — try LeBron James"
          autoComplete="off"
        />
        <button type="submit" disabled={!query.trim() || status === "loading"}>
          {status === "loading" ? "Searching…" : "Search"} <span aria-hidden="true">↗</span>
        </button>
      </form>

      {status === "loading" && <div className="inline-state"><span className="spinner" /> Finding players…</div>}
      {status === "error" && (
        <div className="message-panel error-panel" role="alert">
          <p>{error}</p>
          <button type="button" className="text-button" onClick={() => setRetryToken((current) => current + 1)}>Try again ↗</button>
        </div>
      )}
      {status === "empty" && <div className="message-panel">No players found for “{submittedQuery}”. Check the spelling and try again.</div>}
      {status === "success" && (
        <div className="search-results">
          <p className="results-label">{players.length} RESULTS FOR “{submittedQuery.toUpperCase()}”</p>
          <div className="player-grid">
            {players.map((player) => <PlayerCard key={player.id} player={player} />)}
          </div>
        </div>
      )}
    </section>
  );
}
