'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastChart from './components/ForecastChart';
import HistoricalChart from './components/HistoricalChart';
import { getWeatherByCity, getForecastByCity, getHistoricalData } from './lib/weatherApi';
import { useTheme } from './context/ThemeContext';
import FavoritesBar from './components/FavoritesBar';

export default function Home() {
  const [city, setCity] = useState('Berlin');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const { darkMode, toggleDarkMode } = useTheme();

  // Geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    });
  }, []);

  const weatherQuery = useQuery({ queryKey: ['weather', city], queryFn: () => getWeatherByCity(city), enabled: !!city });
  const forecastQuery = useQuery({ queryKey: ['forecast', city], queryFn: () => getForecastByCity(city), enabled: !!city });
  const historicalQuery = useQuery({ queryKey: ['historical', coords], queryFn: () => coords && getHistoricalData(coords.lat, coords.lon), enabled: !!coords });

  return (
    <main className="flex flex-col items-center p-6 gap-6 w-full max-w-3xl">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">Weather Dashboard</h1>
        <button onClick={toggleDarkMode} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Toggle {darkMode ? 'Light' : 'Dark'}</button>
      </div>

      <SearchBar onSearch={setCity} />
      <FavoritesBar onSelect={setCity} />

      {weatherQuery.isLoading ? <p>Lädt...</p> : weatherQuery.error ? <p>Fehler beim Laden</p> : weatherQuery.data && <WeatherCard data={weatherQuery.data} />}

      {forecastQuery.data && <ForecastChart data={forecastQuery.data} />}
      {historicalQuery.data && <HistoricalChart data={historicalQuery.data} />}
    </main>
  );
}
