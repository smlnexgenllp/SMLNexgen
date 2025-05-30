'use client';

// import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import Footercomponent from "./components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {/* <SessionProvider> */}
        <Navbar />
        {children}
        <Footercomponent />
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
