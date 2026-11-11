import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players/:id" element={<PlayerPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<main className="page-shell not-found"><h1>That page isn’t on the schedule.</h1><Link to="/">Back to courtside ↗</Link></main>} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
