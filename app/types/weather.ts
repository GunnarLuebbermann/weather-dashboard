export interface WeatherData {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  dt: number;
}

export interface ForecastData {
  list: {
    dt: number;
    main: { temp: number };
    weather: { description: string; icon: string }[];
  }[];
}

export interface HistoricalData {
  list: {
    dt: number;
    main: { temp: number };
  }[];
}
