import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/hero_use_case.riv"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/bg-video.mp4" as="video" type="video/mp4" />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
