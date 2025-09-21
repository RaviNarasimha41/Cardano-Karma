"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useWallet } from "@/hooks/use-wallet"
import type { WalletInfo, KarmaTransaction, NFTMetadata } from "@/lib/wallet"

interface WalletContextType {
  isConnected: boolean
  walletInfo: WalletInfo | null
  isConnecting: boolean
  karmaBalance: number
  transactions: KarmaTransaction[]
  nftCollection: NFTMetadata[]
  isLoading: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  loadWalletData: () => Promise<void>
  submitAction: (actionType: string, description: string) => Promise<string>
  voteOnAction: (actionId: number, vote: "approve" | "reject") => Promise<string>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const wallet = useWallet()

  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
}

export function useWalletContext() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider")
  }
  return context
}
