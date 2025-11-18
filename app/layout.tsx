import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MumWell | Postpartum Mental Health & Support Platform",
  description: "MumWell helps new mothers detect, manage, and overcome postpartum depression through AI-driven early detection, therapy support, and community resources.",
  icons: {
    icon: [
      { url: "/mumwell.png" },
      { url: "/mumwell.png", type: "image/png" },
    ],
    shortcut: ["/mumwell.png"],
    apple: ["/mumwell.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <Header/>
        {children}
         <Toaster />
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
