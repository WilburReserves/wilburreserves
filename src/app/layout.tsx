import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { ViewTransitions } from "next-view-transitions";



const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const gambarino = localFont({
  src: './gambarino.woff2',
  variable: "--font-gambarino",
  display: "swap",
})



export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  
  return {
    title: settings.data.site_title || "My Site",
    description: settings.data.meta_description || "Welcome to my site",
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image) ? [settings.data.fallback_og_image.url] : undefined,
    }
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const client = createClient()
    const settings = await client.getSingle('settings')

  return (
    <ViewTransitions>

    <html lang="en" className={`${raleway.variable} ${gambarino.variable} antialiased`}>
      <body className="bg-neutral-900 text-white">
        <NavBar settings={settings}/>
        <main  className="pt-14 md:pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
    </ViewTransitions>
  );
}
