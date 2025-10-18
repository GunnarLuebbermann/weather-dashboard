'use client';
import { useFavorites } from '../context/FavoritesContext';
import { WeatherData } from '../types/weather';
import { motion } from 'framer-motion';

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(data.name);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full text-center transition-all"
    >
      <button
        onClick={() => toggleFavorite(data.name)}
        className="absolute top-3 right-3 text-yellow-400 text-2xl"
        aria-label="Favorit hinzufügen"
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
        className="mx-auto"
      />
      <p className="text-5xl font-bold">{Math.round(data.main.temp)}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
      <div className="flex justify-around w-full mt-4 text-sm">
        <p>💨 {data.wind.speed} m/s</p>
        <p>💧 {data.main.humidity}%</p>
      </div>
    </motion.div>
  );
}
