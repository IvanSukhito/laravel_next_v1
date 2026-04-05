import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { AppProvider } from "@/context/AppProvider";
import Loader from "@/components/Loader";
import { cookies } from "next/headers";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Wrapper from "./wrapper";
import { ProfileProvider } from "@/context/ProfileContext";
import ProfileResponse from "@/types/responses/profile/ProfileResponse";
import { getProfile } from "@/lib/api/repository/ProfileRepository";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Ivan",
  description: "Portfolio Ivan - Online Booking Web App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value ?? "-";

  let profile: ProfileResponse | undefined;

  try {
       profile = await getProfile(token);
   } catch (e) {
       profile = undefined;
   }

  return (
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased`}>
          {/* <AppProvider> */}
          <ProfileProvider initialProfile={profile}>
          <Navbar/>
          <Wrapper> 
          <main className="bg-gray-50 min-h-screen">
            {children}
          </main>
          </Wrapper>
          <Footer/>   
          </ProfileProvider>
          {/* </AppProvider> */}
          
         
      </body>
    </html>
  );
}
