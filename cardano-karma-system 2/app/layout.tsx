import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { WalletProvider } from "@/components/wallet-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cardano Karma System - Earn Karma, Unlock NFTs",
  description: "Gamified on-chain community reputation system with karma tokens and NFT badges on Cardano",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <WalletProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </WalletProvider>
        <Analytics />
      </body>
    </html>
  )
}
