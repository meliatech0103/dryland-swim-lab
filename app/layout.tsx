import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dryland Swim Lab - Professional Dryland Training for Amateur Swimmers",
  description: "Transform your swimming with scientific dryland training. Expert coaching in breaststroke and freestyle at Thousand Island Lake Training Base. Join 1500+ swimmers improving their performance.",
  keywords: ["dryland swimming training", "swim coaching", "breaststroke training", "freestyle training", "swim workout", "amateur swimming", "swim technique", "陆上游泳训练", "游泳教练", "蛙泳训练", "自由泳训练"],
  authors: [{ name: "Dryland Swim Lab" }],
  creator: "Dryland Swim Lab",
  publisher: "Dryland Swim Lab",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drylandswimlab.com",
    title: "Dryland Swim Lab - Professional Dryland Training for Amateur Swimmers",
    description: "Transform your swimming with scientific dryland training. Expert coaching at Thousand Island Lake Training Base.",
    siteName: "Dryland Swim Lab",
    images: [
      {
        url: "https://drylandswimlab.com/images/hero/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Dryland Swim Lab Training Session"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dryland Swim Lab - Professional Dryland Training",
    description: "Transform your swimming with scientific dryland training",
    images: ["https://drylandswimlab.com/images/hero/hero-1.jpg"]
  },
  verification: {
    google: "your-google-verification-code"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}