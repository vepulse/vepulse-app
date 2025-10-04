"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import dynamic from "next/dynamic"
import type { ReactNode } from "react"

// Dynamically import VeChainProvider with no SSR
const VeChainProvider = dynamic(
  () => import("@/lib/vechain-provider").then((mod) => mod.VeChainProvider),
  {
    ssr: false,
    loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <VeChainProvider>
        {children}
        <Toaster />
      </VeChainProvider>
    </ThemeProvider>
  )
}
