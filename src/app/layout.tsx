import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Crowther's Portfolio",
  description:
    "Problem-solver and Full Stack Developer near Salt Lake City, crafting intuitive and high-performance applications.",
  openGraph: {
    title: "Michael Crowther's Portfolio",
    description:
      "Problem-solver and Full Stack Developer near Salt Lake City, crafting intuitive and high-performance applications.",
    url: "https://michaelcrowther.dev",
    siteName: "Michael Crowther's Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased xl:overflow-hidden`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
