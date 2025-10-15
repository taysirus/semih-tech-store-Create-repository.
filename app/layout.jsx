// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Semih Tech Bilgisayar',
  description: 'Yeni ve ikinci el bilgisayar satış sitesi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, background: '#111', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
