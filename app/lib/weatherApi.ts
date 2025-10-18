import axios from 'axios';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string) => {
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, units: 'metric', lang: 'de', appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY },
  });
  return res.data;
};

export const getForecastByCity = async (city: string) => {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, units: 'metric', lang: 'de', appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY },
  });
  return res.data;
};

export const getHistoricalData = async (lat: number, lon: number) => {
  const now = Math.floor(Date.now() / 1000);
  const oneDay = 86400;
  const promises = [];

  for (let i = 1; i <= 5; i++) {
    promises.push(
      axios.get(`${BASE_URL}/onecall/timemachine`, {
        params: {
          lat,
          lon,
          dt: now - i * oneDay,
          units: 'metric',
          appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        },
      }).then(r => r.data)
    );
  }

  const results = await Promise.all(promises);
  return results;
};
