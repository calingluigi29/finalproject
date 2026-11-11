import GameBoard from "../components/GameBoard.jsx";
import PlayerSearch from "../components/PlayerSearch.jsx";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR FRONT ROW SEAT</p>
          <h1>The game.<br /><span>Beyond the score.</span></h1>
          <p className="hero-description">Follow the league, get to know the players, and catch the moments everyone’s talking about.</p>
          <a className="hero-link" href="#player-search">Explore players <span>↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="court-circle" />
          <div className="court-line court-line-one" />
          <div className="court-line court-line-two" />
          <div className="hero-ball">◉</div>
          <span className="hero-side-note">82 GAMES<br />ONE LEAGUE</span>
          <span className="hero-number">01<span>/82</span></span>
        </div>
      </section>
      <GameBoard />
      <PlayerSearch />
      <footer className="site-footer">
        <span className="brand-footer">COURTSIDE<span className="brand-period">.</span></span>
        <span>Basketball is better when you know the story.</span>
        <span>Data by ESPN</span>
      </footer>
    </main>
  );
}
