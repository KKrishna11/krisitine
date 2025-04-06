import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeWrapper from "./theme-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kristine's Forever Home - Adopt a Loving Cat",
  description: "Meet Kristine, a loving and playful  cat looking for her forever home!",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Kristine's Forever Home - Adopt a Loving Cat",
    description: "Meet Kristine, a loving and playful cat looking for her forever home!",
    url: "https://kristinemeow.vercel.app",
    siteName: "Kristine Meow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kristine the cat",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristine's Forever Home - Adopt a Loving Cat",
    description: "Meet Kristine, a loving and playful cat looking for her forever home!",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true} >
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  )
}



import './globals.css'