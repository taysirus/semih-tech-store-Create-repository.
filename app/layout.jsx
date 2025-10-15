app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <title>Semih Tech Bilgisayar</title>
        <meta name="description" content="Yeni ve ikinci el bilgisayar satış sitesi" />
      </head>
      <body style={{ margin: 0, background: '#111', color: 'white', fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
