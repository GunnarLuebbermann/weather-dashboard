import { ForecastData } from '../types/weather';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ForecastChart({ data }: { data: ForecastData }) {
  const chartData = data.list.filter((_, i) => i % 8 === 0).map(item => ({
    date: new Date(item.dt * 1000).toLocaleDateString('de-DE', { weekday: 'short' }),
    temp: Math.round(item.main.temp),
  }));

  return (
    <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">7-Tage-Vorhersage</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#0ea5e9" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
