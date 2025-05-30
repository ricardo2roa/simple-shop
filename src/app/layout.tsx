// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Mi Tienda Simple con TSX',
  description: 'Un e-commerce simple con Next.js App Router y TypeScript',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <header style={{ textAlign: 'center', padding: '1rem', borderBottom: '1px solid #eee' }}>
          <h1>Mi Tienda Simple 🛍️ (TSX)</h1>
        </header>
        <main>{children}</main>
        <footer style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid #eee', marginTop: '2rem' }}>
          <p>&copy; {new Date().getFullYear()} Mi Tienda Simple</p>
        </footer>
      </body>
    </html>
  );
}