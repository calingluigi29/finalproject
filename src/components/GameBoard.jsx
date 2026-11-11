import { useEffect, useState } from "react";
import { getScoreboard } from "../api.js";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function TeamScore({ team, score }) {
  return (
    <div className="team-score">
      <div className="team-identity">
        {team.logo && <img src={team.logo} alt="" />}
        <span>{team.shortDisplayName ?? team.displayName}</span>
      </div>
      <strong>{score ?? "—"}</strong>
    </div>
  );
}

export default function GameBoard() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryToken, setRetryToken] = useState(0);
  const dateKey = formatDate(selectedDate);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    setError("");
    getScoreboard(dateKey)
      .then((games) => {
        if (!active) return;
        setEvents(games);
        setStatus("success");
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError.message || "Could not load today's games.");
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [dateKey, retryToken]);

  function moveDate(days) {
    setSelectedDate((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() + days);
      return next;
    });
  }

  const dateLabel = selectedDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

  return (
    <section className="scores-section">
      <div className="section-heading scores-heading">
        <div>
          <p className="eyebrow"><span className="live-dot" /> AROUND THE LEAGUE</p>
          <h2>Game night, live.</h2>
        </div>
        <div className="date-switcher" aria-label="Choose game date">
          <button type="button" aria-label="Previous day" onClick={() => moveDate(-1)}>←</button>
          <span>{dateLabel}</span>
          <button type="button" aria-label="Next day" onClick={() => moveDate(1)}>→</button>
        </div>
      </div>

      {status === "loading" && <div className="game-grid">{[0, 1, 2].map((item) => <div className="game-skeleton" key={item} />)}</div>}
      {status === "error" && (
        <div className="message-panel error-panel" role="alert">
          <p>{error}</p>
          <button type="button" className="text-button" onClick={() => setRetryToken((current) => current + 1)}>Retry ↗</button>
        </div>
      )}
      {status === "success" && events.length === 0 && (
        <div className="message-panel empty-games">
          <span className="empty-ball" aria-hidden="true">◉</span>
          <div><strong>No games on the schedule.</strong><p>Take a breather. Check another day for the next tip-off.</p></div>
        </div>
      )}
      {status === "success" && events.length > 0 && (
        <div className="game-grid">
          {events.map((event) => {
            const competition = event.competitions?.[0];
            const competitors = competition?.competitors ?? [];
            const live = event.status?.type?.state === "in";
            return (
              <article className="game-card" key={event.id}>
                <div className="game-card-top">
                  <span>{competition?.broadcasts?.[0]?.names?.[0] ?? "NBA"}</span>
                  <span className={live ? "game-live" : "game-status"}>
                    {live && <i className="live-dot" />} {event.status?.type?.shortDetail ?? event.status?.type?.description ?? "Scheduled"}
                  </span>
                </div>
                {competitors.map((competitor) => <TeamScore key={competitor.id} team={competitor.team} score={competitor.score} />)}
                <div className="game-card-bottom">
                  <span>{event.name}</span>
                  <span>{event.status?.type?.state === "pre" ? "UPCOMING" : live ? "IN PROGRESS" : "FINAL"}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
