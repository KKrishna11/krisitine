"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { useState, useEffect } from "react"

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {mounted ? children : <div className="min-h-screen bg-white"></div>}
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

