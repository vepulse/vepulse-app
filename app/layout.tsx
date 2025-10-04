import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { VeChainProvider } from "@/lib/vechain-provider"
import { Toaster } from "@/components/ui/sonner"
import "@vechain/dapp-kit-react/styles.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "VePulse - Decentralized Polls & Surveys on VeChain",
  description: "Create transparent, tamper-proof polls and surveys on the VeChain blockchain",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <VeChainProvider>
            {children}
            <Toaster />
          </VeChainProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
