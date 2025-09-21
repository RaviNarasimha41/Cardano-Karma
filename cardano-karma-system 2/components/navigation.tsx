"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Menu, LogOut, X } from "lucide-react"
import Link from "next/link"
import { useWalletContext } from "@/components/wallet-provider"
import { blockchainUtils } from "@/lib/wallet"
import { useState } from "react"

export function Navigation() {
  const { isConnected, walletInfo, isConnecting, connect, disconnect } = useWalletContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleWalletAction = async () => {
    if (isConnected) {
      await disconnect()
    } else {
      await connect()
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-foreground">Cardano Karma</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/#features"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base"
            >
              Features
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base"
            >
              Dashboard
            </Link>
            <Link
              href="/nfts"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base"
            >
              NFT Gallery
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected && walletInfo ? (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-card rounded-lg border border-border">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">
                    {blockchainUtils.formatAddress(walletInfo.address)}
                  </span>
                  {walletInfo.walletName && (
                    <span className="text-xs text-muted-foreground/70">({walletInfo.walletName})</span>
                  )}
                </div>
                <Button
                  onClick={handleWalletAction}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-border"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleWalletAction}
                disabled={isConnecting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow hidden sm:flex"
                size="sm"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href="/#features"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Features
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                href="/nfts"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMobileMenu}
              >
                NFT Gallery
              </Link>

              <div className="pt-4 border-t border-border">
                {isConnected && walletInfo ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-card rounded-lg border border-border">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">
                        {blockchainUtils.formatAddress(walletInfo.address)}
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        handleWalletAction()
                        closeMobileMenu()
                      }}
                      variant="outline"
                      className="w-full bg-transparent border-border"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      handleWalletAction()
                      closeMobileMenu()
                    }}
                    disabled={isConnecting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground animate-glow"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
