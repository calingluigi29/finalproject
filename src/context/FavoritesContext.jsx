import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "courtside-favorite-players";

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Could not read saved players from localStorage.", error);
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Could not save players to localStorage.", error);
    }
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (id) => favorites.some((player) => player.id === String(id)),
      toggleFavorite: (player) => {
        const normalized = { ...player, id: String(player.id) };
        setFavorites((current) =>
          current.some((item) => item.id === normalized.id)
            ? current.filter((item) => item.id !== normalized.id)
            : [...current, normalized],
        );
      },
    }),
    [favorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider.");
  return context;
}
