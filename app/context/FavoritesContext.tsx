'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (city: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Initial laden
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  // localStorage synchronisieren
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (city: string) => {
    setFavorites(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
