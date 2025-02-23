import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  name: "google-site-verification" ,
  content: "N8drBAWPKvOWEnZVG183gkRmH7ODxfUHlgmvRI8hd8M",
  title: "Fuel the chais",
  description: "A platform for creaters and their fans to help creaters by donating.",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]`}
      >
        <Navbar/>
        <div className="text-white min-h-[82.5vh]">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
    </SessionWrapper>
  );
}
