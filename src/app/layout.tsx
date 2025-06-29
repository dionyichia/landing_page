import type { Metadata } from "next";
import { Arapey, Cormorant, Raleway, Questrial } from "next/font/google";
import { ThemeProvider } from 'next-themes'
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

const raleway = Raleway({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-raleway",
});

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-questrial",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${arapey.variable} ${cormorant.variable} ${raleway.variable} ${questrial.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>  
      </body>
    </html>
  );
}