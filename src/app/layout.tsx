import type { Metadata } from "next";
import { Arapey, Cormorant } from "next/font/google";
import "./globals.css";

const arapey = Arapey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arapey",
});

const cormorant = Cormorant({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Dion",
  description: "Dion's Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${arapey.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}