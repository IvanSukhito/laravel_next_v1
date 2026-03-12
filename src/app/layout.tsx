import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { AppProvider } from "@/context/AppProvider";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Ivan",
  description: "Portfolio Ivan - Online Booking Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased`}>
          <AppProvider>
           <Navbar/>
          <main className="bg-gray-50 min-h-screen">
            {children}
          </main>
          <Footer/>

          </AppProvider>
         
      </body>
    </html>
  );
}
