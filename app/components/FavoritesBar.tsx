'use client';
import { useFavorites } from '../context/FavoritesContext';

interface FavoritesBarProps {
  onSelect: (city: string) => void;
}

export default function FavoritesBar({ onSelect }: FavoritesBarProps) {
  const { favorites } = useFavorites();

  if (favorites.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap justify-center my-2">
      {favorites.map(city => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="px-3 py-1 bg-sky-500 dark:bg-sky-600 text-white rounded hover:brightness-110 transition"
        >
          {city}
        </button>
      ))}
    </div>
  );
}
