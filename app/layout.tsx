import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeWrapper from "./theme-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kristine's Forever Home - Adopt a Loving Cat",
  description: "Meet Kristine, a loving and playful one-year-old cat looking for her forever home!",
    generator: 'v0.dev'
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