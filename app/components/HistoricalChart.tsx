import { HistoricalData } from '../types/weather';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HistoricalChart({ data }: { data: HistoricalData[] }) {
  const chartData = data.map(day => ({
    date: new Date(day.list[0].dt * 1000).toLocaleDateString('de-DE', { weekday: 'short' }),
    temp: Math.round(day.list[0].main.temp),
  }));

  return (
    <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">Historische Daten (5 Tage)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#facc15" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
