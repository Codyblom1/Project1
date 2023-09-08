
import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [currentListOfFavorites, setCurrentListOfFavorites] = useState(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        setCurrentListOfFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <FavoritesContext.Provider value={{ currentListOfFavorites, setCurrentListOfFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};