'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Stadt eingeben..."
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-gray-800 dark:text-gray-200"
      />
      <button className="px-4 py-2 bg-sky-600 dark:bg-sky-500 text-white rounded-lg hover:bg-sky-700 dark:hover:bg-sky-600 transition">
        Suchen
      </button>
    </form>
  );
}
