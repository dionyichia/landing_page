import type { Metadata } from "next";
import { Arapey, Cormorant, Raleway, Questrial, Bodoni_Moda, Work_Sans, Nunito_Sans } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const arapey = Arapey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arapey",
});

const arapey_italic = Arapey({
  weight: "400",
  style: 'italic',
  subsets: ["latin"],
  variable: "--font-arapey_italic",
});

const cormorant = Cormorant({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const raleway = Raleway({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-raleway",
});

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-questrial",
});

const bodoni = Bodoni_Moda({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bodoni",
});


const nunito = Nunito_Sans({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-nunito",
});

const work = Work_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-work",
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
      <body className={`${arapey.variable} ${arapey_italic.variable} ${cormorant.variable} 
                        ${raleway.variable} ${questrial.variable} ${bodoni.variable} 
                        ${nunito.variable} ${work.variable}antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>  
        <SpeedInsights/>
      </body>
    </html>
  );
}