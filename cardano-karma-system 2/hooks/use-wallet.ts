"use client"

import { useState, useEffect, useCallback } from "react"
import { CardanoWallet, type WalletInfo, type KarmaTransaction, type NFTMetadata } from "@/lib/wallet"

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [karmaBalance, setKarmaBalance] = useState<number>(0)
  const [transactions, setTransactions] = useState<KarmaTransaction[]>([])
  const [nftCollection, setNftCollection] = useState<NFTMetadata[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const wallet = CardanoWallet.getInstance()

  const connect = useCallback(async () => {
    setIsConnecting(true)
    try {
      console.log("[v0] Attempting wallet connection...")
      const info = await wallet.connect()
      console.log("[v0] Wallet connected successfully:", info)
      setWalletInfo(info)
      setIsConnected(true)

      // Load additional data after connection
      await loadWalletData()
    } catch (error) {
      console.error("[v0] Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(async () => {
    console.log("[v0] Disconnecting wallet...")
    await wallet.disconnect()
    setIsConnected(false)
    setWalletInfo(null)
    setKarmaBalance(0)
    setTransactions([])
    setNftCollection([])
  }, [])

  const loadWalletData = useCallback(async () => {
    if (!isConnected) return

    setIsLoading(true)
    try {
      console.log("[v0] Loading wallet data...")
      const [karma, txs, nfts] = await Promise.all([
        wallet.getKarmaBalance(),
        wallet.getKarmaTransactions(),
        wallet.getNFTCollection(),
      ])

      console.log("[v0] Loaded wallet data:", { karma, txs: txs.length, nfts: nfts.length })
      setKarmaBalance(karma)
      setTransactions(txs)
      setNftCollection(nfts)
    } catch (error) {
      console.error("[v0] Failed to load wallet data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [isConnected])

  const submitAction = useCallback(
    async (actionType: string, description: string) => {
      if (!isConnected) throw new Error("Wallet not connected")

      try {
        console.log("[v0] Submitting action:", { actionType, description })
        const txHash = await wallet.submitAction(actionType, description)
        console.log("[v0] Action submitted successfully:", txHash)
        // Refresh data after successful submission
        await loadWalletData()
        return txHash
      } catch (error) {
        console.error("[v0] Failed to submit action:", error)
        throw error
      }
    },
    [isConnected, loadWalletData],
  )

  const voteOnAction = useCallback(
    async (actionId: number, vote: "approve" | "reject") => {
      if (!isConnected) throw new Error("Wallet not connected")

      try {
        console.log("[v0] Voting on action:", { actionId, vote })
        const txHash = await wallet.voteOnAction(actionId, vote)
        console.log("[v0] Vote submitted successfully:", txHash)
        return txHash
      } catch (error) {
        console.error("[v0] Failed to vote on action:", error)
        throw error
      }
    },
    [isConnected],
  )

  const mintNFT = useCallback(
    async (badgeId: string, metadata: any) => {
      if (!isConnected) throw new Error("Wallet not connected")

      try {
        console.log("[v0] Minting NFT:", { badgeId, metadata })
        const txHash = await wallet.mintNFT(badgeId, metadata)
        console.log("[v0] NFT minted successfully:", txHash)
        await loadWalletData()
        return txHash
      } catch (error) {
        console.error("[v0] Failed to mint NFT:", error)
        throw error
      }
    },
    [isConnected, loadWalletData],
  )

  const burnToken = useCallback(
    async (tokenId: string) => {
      if (!isConnected) throw new Error("Wallet not connected")

      try {
        console.log("[v0] Burning token:", tokenId)
        const txHash = await wallet.burnToken(tokenId)
        console.log("[v0] Token burned successfully:", txHash)
        await loadWalletData()
        return txHash
      } catch (error) {
        console.error("[v0] Failed to burn token:", error)
        throw error
      }
    },
    [isConnected, loadWalletData],
  )

  // Check connection status on mount
  useEffect(() => {
    const connected = wallet.isConnected()
    const info = wallet.getWalletInfo()

    console.log("[v0] Initial wallet state:", { connected, info })
    setIsConnected(connected)
    setWalletInfo(info)

    if (connected) {
      loadWalletData()
    }
  }, [loadWalletData])

  return {
    isConnected,
    walletInfo,
    isConnecting,
    karmaBalance,
    transactions,
    nftCollection,
    isLoading,
    connect,
    disconnect,
    loadWalletData,
    submitAction,
    voteOnAction,
    mintNFT,
    burnToken,
  }
}
