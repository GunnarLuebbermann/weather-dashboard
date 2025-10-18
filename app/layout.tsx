'use client';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="de">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
