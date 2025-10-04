"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu, Wallet } from "lucide-react"
import { useState } from "react"
import { useWallet, useWalletModal } from "@vechain/dapp-kit-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { account } = useWallet()
  const { open: openWalletModal } = useWalletModal()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">V</span>
            </div>
            <span className="text-xl font-bold">VePulse</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#roles"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button className="hidden md:inline-flex gap-2" onClick={() => openWalletModal()}>
            <Wallet className="h-4 w-4" />
            {account ? formatAddress(account) : "Connect Wallet"}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#roles"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Button className="w-full gap-2" onClick={() => openWalletModal()}>
              <Wallet className="h-4 w-4" />
              {account ? formatAddress(account) : "Connect Wallet"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
