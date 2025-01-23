import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GAYDAR",
  description: "Check gayness level",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://cdn.jsdelivr.net/npm/kursor@0.0.14/dist/kursor.js" 
          strategy="beforeInteractive"
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/kursor@0.0.14/dist/kursor.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
