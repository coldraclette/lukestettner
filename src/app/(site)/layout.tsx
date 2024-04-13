import { Analytics } from "@vercel/analytics/react";
import Univers from "next/font/local";
import Navigation from "./components/Navigation";

import "./globals.css";

import { getSettings } from "../../../sanity/sanity.query";

export const revalidate = 60;

const univers = Univers({
  variable: "--font-univers",
  display: "swap",
  src: [
    {
      path: "/font/univers.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { googleFontName, fontColor } = await getSettings();

  const defaultFont = () => {
    if (googleFontName) {
      return;
    } else {
      return univers.className;
    }
  };

  return (
    <html lang="en" className={defaultFont()}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {googleFontName && (
          <link
            href={`https://fonts.googleapis.com/css2?family=${googleFontName.replace(
              /\s/g,
              "+"
            )}&display=swap`}
            rel="stylesheet"
          />
        )}
        <style>
          {`
          body {
            font-family: ${googleFontName || "var(--font-univers)"};
            color: ${fontColor.hex};
          }
        `}
        </style>
      </head>

      <body>
        <Navigation />
        <main className="font-primary py-12 pt-24">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
