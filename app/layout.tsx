import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LenisScroll from "@/components/lenis-scroll"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "HBJ Syndicate - Premium Digital Solutions & Web Development",
  description:
    "HBJ Syndicate delivers exceptional digital experiences through custom web development, e-commerce solutions, and innovative web applications. Transform your business with our premium services.",
  keywords:
    "web development, digital solutions, e-commerce, web applications, UI/UX design, custom websites, HBJ Syndicate, premium web services",
  generator: "v0.dev",
  verification: {
    google: "google6d63f09852c64fa5.html",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="google-site-verification" content="google6d63f09852c64fa5.html" />
        <meta name="description" content="HBJ Syndicate delivers exceptional digital experiences through custom web development, e-commerce solutions, and innovative web applications. Transform your business with our premium services." />
        <meta name="keywords" content="web development, digital solutions, e-commerce, web applications, UI/UX design, custom websites, HBJ Syndicate, premium web services" />
      </head>
      <body className="font-sans antialiased">
        <LenisScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisScroll>
      </body>
    </html>
  )
}

