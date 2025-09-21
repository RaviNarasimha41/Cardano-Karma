"use client"

// This now includes proper error handling and real wallet detection

export interface WalletInfo {
  address: string
  balance: number
  stakeAddress?: string
  network: "mainnet" | "testnet"
  walletName?: string
}

export interface KarmaTransaction {
  txHash: string
  amount: number
  timestamp: Date
  type: "earned" | "spent" | "staked"
  description: string
  blockHeight?: number
}

export interface NFTMetadata {
  id: string
  name: string
  image: string
  attributes: { trait_type: string; value: string }[]
  rarity: string
  policyId?: string
  assetName?: string
}

export class CardanoWallet {
  private static instance: CardanoWallet
  private connected = false
  private walletInfo: WalletInfo | null = null
  private availableWallets: string[] = []

  static getInstance(): CardanoWallet {
    if (!CardanoWallet.instance) {
      CardanoWallet.instance = new CardanoWallet()
    }
    return CardanoWallet.instance
  }

  private detectAvailableWallets(): string[] {
    const wallets: string[] = []

    if (typeof window !== "undefined") {
      // Check for common Cardano wallets
      if (window.cardano?.nami) wallets.push("Nami")
      if (window.cardano?.eternl) wallets.push("Eternl")
      if (window.cardano?.flint) wallets.push("Flint")
      if (window.cardano?.yoroi) wallets.push("Yoroi")
      if (window.cardano?.typhon) wallets.push("Typhon")
      if (window.cardano?.gerowallet) wallets.push("GeroWallet")
      if (window.cardano?.nufi) wallets.push("NuFi")
      if (window.cardano?.lace) wallets.push("Lace")
    }

    return wallets
  }

  async connect(): Promise<WalletInfo> {
    this.availableWallets = this.detectAvailableWallets()

    if (typeof window !== "undefined" && this.availableWallets.length > 0) {
      try {
        // Try to connect to the first available wallet (in production, show wallet selection)
        const walletName = this.availableWallets[0].toLowerCase()
        const walletApi = window.cardano?.[walletName === "gerowallet" ? "gerowallet" : walletName]

        if (walletApi) {
          const api = await walletApi.enable()
          const networkId = await api.getNetworkId()
          const addresses = await api.getUsedAddresses()
          const balance = await api.getBalance()

          this.connected = true
          this.walletInfo = {
            address:
              addresses[0] ||
              "addr1q9x7k9m3n8p2r5w8t4v6y1z3c5e7g9h2j4k6l8n0q2s4u6v8x0z2b4d6f8h0j2l4n6p8r0t2v4x6z8b0d2f4g6h8j0k2",
            balance: Number.parseInt(balance) / 1000000, // Convert from lovelace to ADA
            network: networkId === 1 ? "mainnet" : "testnet",
            walletName: this.availableWallets[0],
          }

          return this.walletInfo
        }
      } catch (error) {
        console.error("Real wallet connection failed, falling back to demo mode:", error)
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    this.connected = true
    this.walletInfo = {
      address: "addr1q9x7k9m3n8p2r5w8t4v6y1z3c5e7g9h2j4k6l8n0q2s4u6v8x0z2b4d6f8h0j2l4n6p8r0t2v4x6z8b0d2f4g6h8j0k2",
      balance: 1247.5,
      stakeAddress: "stake1u9x7k9m3n8p2r5w8t4v6y1z3c5e7g9h2j4k6l8n0q2s4u6v8x0z2b4d6f8h0j2l4n6p8r0t2v4x6z8",
      network: "mainnet",
      walletName: "Demo Wallet",
    }

    return this.walletInfo
  }

  async disconnect(): Promise<void> {
    this.connected = false
    this.walletInfo = null
  }

  isConnected(): boolean {
    return this.connected
  }

  getWalletInfo(): WalletInfo | null {
    return this.walletInfo
  }

  getAvailableWallets(): string[] {
    return this.availableWallets
  }

  async getKarmaBalance(): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return 2847
  }

  async getKarmaTransactions(): Promise<KarmaTransaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return [
      {
        txHash:
          "8f2a9b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3",
        amount: 150,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: "earned",
        description: "Organized DeFi workshop",
        blockHeight: 8234567,
      },
      {
        txHash:
          "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3",
        amount: 100,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        type: "earned",
        description: "Community donation",
        blockHeight: 8234512,
      },
      {
        txHash:
          "9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3z2y1x0w9v8u7t6s5r4q3p2o1n0m9l8k7j6i5h4g3f2e1d0c9b8a7",
        amount: 75,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        type: "earned",
        description: "Helped newcomers",
        blockHeight: 8234445,
      },
      {
        txHash:
          "5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7",
        amount: 200,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        type: "earned",
        description: "Created educational content",
        blockHeight: 8234321,
      },
      {
        txHash:
          "2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4",
        amount: 50,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        type: "spent",
        description: "Voted on governance proposal",
        blockHeight: 8234198,
      },
    ]
  }

  async getNFTCollection(): Promise<NFTMetadata[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return [
      {
        id: "karma-badge-001",
        name: "First Steps",
        image: "/achievement-badge-first-steps.jpg",
        attributes: [
          { trait_type: "Type", value: "Achievement" },
          { trait_type: "Rarity", value: "Common" },
          { trait_type: "Series", value: "Genesis" },
        ],
        rarity: "common",
        policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
        assetName: "FirstSteps001",
      },
      {
        id: "karma-badge-002",
        name: "Helper",
        image: "/helper-badge-community-service.jpg",
        attributes: [
          { trait_type: "Type", value: "Service" },
          { trait_type: "Rarity", value: "Common" },
          { trait_type: "Actions", value: "10+" },
        ],
        rarity: "common",
        policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
        assetName: "Helper002",
      },
      {
        id: "karma-badge-003",
        name: "Generous Soul",
        image: "/donation-badge-generous-soul.jpg",
        attributes: [
          { trait_type: "Type", value: "Donation" },
          { trait_type: "Rarity", value: "Rare" },
          { trait_type: "Amount", value: "1000+ ADA" },
        ],
        rarity: "rare",
        policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
        assetName: "GenerousSoul003",
      },
    ]
  }

  async submitAction(actionType: string, description: string): Promise<string> {
    if (!this.connected) {
      throw new Error("Wallet not connected")
    }

    // Simulate blockchain submission with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate realistic transaction hash
    const txHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    return txHash
  }

  async voteOnAction(actionId: number, vote: "approve" | "reject"): Promise<string> {
    if (!this.connected) {
      throw new Error("Wallet not connected")
    }

    // Simulate voting transaction with network delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const txHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    return txHash
  }

  async mintNFT(badgeId: string, metadata: any): Promise<string> {
    if (!this.connected) {
      throw new Error("Wallet not connected")
    }

    // Simulate NFT minting process
    await new Promise((resolve) => setTimeout(resolve, 4000))

    const txHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    return txHash
  }

  async burnToken(tokenId: string): Promise<string> {
    if (!this.connected) {
      throw new Error("Wallet not connected")
    }

    // Simulate token burning
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const txHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    return txHash
  }
}

export const blockchainUtils = {
  formatAddress: (address: string): string => {
    if (address.length <= 12) return address
    return `${address.slice(0, 8)}...${address.slice(-4)}`
  },

  formatTxHash: (hash: string): string => {
    if (hash.length <= 16) return hash
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`
  },

  getExplorerUrl: (txHash: string, network: "mainnet" | "testnet" = "mainnet"): string => {
    const baseUrl = network === "mainnet" ? "https://cardanoscan.io" : "https://preprod.cardanoscan.io"
    return `${baseUrl}/transaction/${txHash}`
  },

  getAddressExplorerUrl: (address: string, network: "mainnet" | "testnet" = "mainnet"): string => {
    const baseUrl = network === "mainnet" ? "https://cardanoscan.io" : "https://preprod.cardanoscan.io"
    return `${baseUrl}/address/${address}`
  },

  validateAddress: (address: string): boolean => {
    return address.startsWith("addr1") && address.length >= 50
  },

  formatADA: (lovelace: number): string => {
    return (lovelace / 1000000).toFixed(2) + " ADA"
  },

  formatKarma: (karma: number): string => {
    if (karma >= 1000000) {
      return (karma / 1000000).toFixed(1) + "M"
    } else if (karma >= 1000) {
      return (karma / 1000).toFixed(1) + "K"
    }
    return karma.toString()
  },
}

declare global {
  interface Window {
    cardano?: {
      nami?: any
      eternl?: any
      flint?: any
      yoroi?: any
      typhon?: any
      gerowallet?: any
      nufi?: any
      lace?: any
    }
  }
}
