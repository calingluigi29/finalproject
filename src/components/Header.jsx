import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Courtside home">
        <span className="brand-mark">C</span>
        <span>COURTSIDE<span className="brand-period">.</span></span>
      </NavLink>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Discover</NavLink>
        <NavLink to="/favorites">My players <span className="nav-count">{favorites.length}</span></NavLink>
      </nav>
      <span className="header-tag"><span className="live-dot" /> NBA, IN FOCUS</span>
    </header>
  );
}
