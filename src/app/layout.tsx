import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TerminalProvider } from "@/context/TerminalContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Virtual Core Terminal",
  description: "An immersive blockchain terminal experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TerminalProvider>
          {children}
        </TerminalProvider>
      </body>
    </html>
  );
}
