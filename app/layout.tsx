import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavigationHeader } from "@/components/NavigationHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outfit Archive — Personal OOTD Lookbook",
  description:
    "Curated personal fashion showcase, interactive outfit breakdown, and verified marketplace referral links.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col bg-white text-zinc-950 font-sans selection:bg-zinc-950 selection:text-white">
        <NavigationHeader />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
