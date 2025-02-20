import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfitSans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
      <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${outfitSans} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
