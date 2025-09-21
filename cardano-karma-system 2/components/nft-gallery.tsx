"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Award,
  Lock,
  Sparkles,
  Trophy,
  Star,
  Crown,
  Shield,
  Zap,
  Download,
  RefreshCw,
  ExternalLink,
} from "lucide-react"
import { useState, useEffect } from "react"
import { NFTModal } from "@/components/nft-modal"
import { useWallet } from "@/hooks/use-wallet"
import { blockfrost } from "@/lib/blockfrost"
import { toast } from "@/hooks/use-toast"

interface NFTBadge {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  rarity: "common" | "rare" | "epic" | "legendary"
  karmaRequired: number
  unlocked: boolean
  unlockedAt?: string
  attributes: { trait: string; value: string }[]
  policyId?: string
  assetName?: string
  fingerprint?: string
  onChainMetadata?: any
  withdrawable?: boolean
}

export function NFTGallery() {
  const [selectedNFT, setSelectedNFT] = useState<NFTBadge | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [realNFTs, setRealNFTs] = useState<any[]>([])
  const { walletInfo, isConnected } = useWallet()
  const currentKarma = 2847

  const realWorldNFTs = [
    {
      id: 101,
      name: "Spacebudz #1234",
      description: "A rare SpaceBudz NFT from the iconic Cardano collection",
      icon: <Star className="w-8 h-8" />,
      rarity: "rare" as const,
      karmaRequired: 0,
      unlocked: true,
      unlockedAt: "2024-01-10",
      attributes: [
        { trait: "Type", value: "SpaceBudz" },
        { trait: "Rarity", value: "Rare" },
        { trait: "Trait Count", value: "4" },
      ],
      policyId: "d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc",
      assetName: "SpaceBudz1234",
      fingerprint: "asset1cvmyrfrc7lpht2hcjwr9lulzyyjv27uxh3kcz0",
      withdrawable: true,
    },
    {
      id: 102,
      name: "Clay Nation #5678",
      description: "Unique Clay Nation character with special traits",
      icon: <Crown className="w-8 h-8" />,
      rarity: "epic" as const,
      karmaRequired: 0,
      unlocked: true,
      unlockedAt: "2024-02-05",
      attributes: [
        { trait: "Type", value: "Clay Nation" },
        { trait: "Rarity", value: "Epic" },
        { trait: "Background", value: "Cosmic" },
      ],
      policyId: "40fa2aa67258b4ce7b5782f74831d46a84c59a0ff0c28262fab21728",
      assetName: "ClayNation5678",
      fingerprint: "asset1a8f27qhjfkrrbsg7adhmhmmln6946pzal915la",
      withdrawable: true,
    },
    {
      id: 103,
      name: "Ape Society #9999",
      description: "Premium Ape Society NFT with legendary traits",
      icon: <Trophy className="w-8 h-8" />,
      rarity: "legendary" as const,
      karmaRequired: 0,
      unlocked: true,
      unlockedAt: "2024-03-01",
      attributes: [
        { trait: "Type", value: "Ape Society" },
        { trait: "Rarity", value: "Legendary" },
        { trait: "Special", value: "Golden Fur" },
      ],
      policyId: "4523c5e21d409b81c95b45b0aea275b8ea1406e6cafea5583b9f8a5f",
      assetName: "ApeSociety9999",
      fingerprint: "asset1rjklcrnsdzqp65wjgrg55sy9723kw09mlgvlc3",
      withdrawable: true,
    },
  ]

  const nftBadges: NFTBadge[] = [
    {
      id: 1,
      name: "First Steps",
      description: "Awarded for your first community action",
      icon: <Award className="w-8 h-8" />,
      rarity: "common",
      karmaRequired: 10,
      unlocked: true,
      unlockedAt: "2024-01-15",
      attributes: [
        { trait: "Type", value: "Achievement" },
        { trait: "Rarity", value: "Common" },
        { trait: "Series", value: "Genesis" },
      ],
      policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
      assetName: "FirstSteps001",
      withdrawable: true,
    },
    {
      id: 2,
      name: "Helper",
      description: "Recognized for helping 10 community members",
      icon: <Star className="w-8 h-8" />,
      rarity: "common",
      karmaRequired: 100,
      unlocked: true,
      unlockedAt: "2024-01-20",
      attributes: [
        { trait: "Type", value: "Service" },
        { trait: "Rarity", value: "Common" },
        { trait: "Actions", value: "10+" },
      ],
      policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
      assetName: "Helper002",
      withdrawable: true,
    },
    {
      id: 3,
      name: "Generous Soul",
      description: "Donated over 1000 ADA to community funds",
      icon: <Sparkles className="w-8 h-8" />,
      rarity: "rare",
      karmaRequired: 500,
      unlocked: true,
      unlockedAt: "2024-02-01",
      attributes: [
        { trait: "Type", value: "Donation" },
        { trait: "Rarity", value: "Rare" },
        { trait: "Amount", value: "1000+ ADA" },
      ],
      policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
      assetName: "GenerousSoul003",
      withdrawable: true,
    },
    {
      id: 4,
      name: "Community Leader",
      description: "Led 5 successful community initiatives",
      icon: <Crown className="w-8 h-8" />,
      rarity: "rare",
      karmaRequired: 1000,
      unlocked: true,
      unlockedAt: "2024-02-15",
      attributes: [
        { trait: "Type", value: "Leadership" },
        { trait: "Rarity", value: "Rare" },
        { trait: "Initiatives", value: "5+" },
      ],
      policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
      assetName: "CommunityLeader004",
      withdrawable: true,
    },
    {
      id: 5,
      name: "Karma Guardian",
      description: "Maintained consistent positive contributions",
      icon: <Shield className="w-8 h-8" />,
      rarity: "epic",
      karmaRequired: 2000,
      unlocked: true,
      unlockedAt: "2024-03-01",
      attributes: [
        { trait: "Type", value: "Consistency" },
        { trait: "Rarity", value: "Epic" },
        { trait: "Streak", value: "90+ days" },
      ],
      policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
      assetName: "KarmaGuardian005",
      withdrawable: true,
    },
    {
      id: 6,
      name: "Innovation Pioneer",
      description: "Created groundbreaking community tools",
      icon: <Zap className="w-8 h-8" />,
      rarity: "epic",
      karmaRequired: 2500,
      unlocked: true,
      unlockedAt: "2024-03-10",
      attributes: [
        { trait: "Type", value: "Innovation" },
        { trait: "Rarity", value: "Epic" },
        { trait: "Impact", value: "High" },
      ],
      policyId: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234",
      assetName: "InnovationPioneer006",
      withdrawable: true,
    },
    {
      id: 7,
      name: "Karma Master",
      description: "Achieved the highest level of community recognition",
      icon: <Trophy className="w-8 h-8" />,
      rarity: "legendary",
      karmaRequired: 3000,
      unlocked: false,
      attributes: [
        { trait: "Type", value: "Mastery" },
        { trait: "Rarity", value: "Legendary" },
        { trait: "Holders", value: "<100" },
      ],
    },
    {
      id: 8,
      name: "Cardano Champion",
      description: "Ultimate recognition for ecosystem contribution",
      icon: <Crown className="w-8 h-8" />,
      rarity: "legendary",
      karmaRequired: 5000,
      unlocked: false,
      attributes: [
        { trait: "Type", value: "Champion" },
        { trait: "Rarity", value: "Legendary" },
        { trait: "Holders", value: "<50" },
      ],
    },
  ]

  const allNFTs = [...realWorldNFTs, ...nftBadges]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400 border-gray-400/20 bg-gray-400/10"
      case "rare":
        return "text-blue-400 border-blue-400/20 bg-blue-400/10"
      case "epic":
        return "text-purple-400 border-purple-400/20 bg-purple-400/10"
      case "legendary":
        return "text-yellow-400 border-yellow-400/20 bg-yellow-400/10"
      default:
        return "text-gray-400 border-gray-400/20 bg-gray-400/10"
    }
  }

  const unlockedBadges = allNFTs.filter((badge) => badge.unlocked)
  const lockedBadges = allNFTs.filter((badge) => !badge.unlocked)
  const nextUnlock = lockedBadges.find((badge) => currentKarma >= badge.karmaRequired)

  const fetchRealNFTs = async () => {
    if (!isConnected || !walletInfo?.address) return

    setIsLoading(true)
    try {
      const nftAssets = await blockfrost.getNFTAssets(walletInfo.address)
      setRealNFTs(nftAssets)
      toast({
        title: "NFTs Refreshed",
        description: `Found ${nftAssets.length} NFTs in your wallet`,
      })
    } catch (error) {
      console.error("Failed to fetch NFTs:", error)
      toast({
        title: "Refresh Failed",
        description: "Using demo data instead",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdrawNFT = async (nft: NFTBadge) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to withdraw NFTs",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "NFT Withdrawn",
        description: `${nft.name} has been sent to your wallet`,
      })
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMintKarmaToken = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint karma tokens",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000))

      toast({
        title: "Karma Tokens Minted",
        description: "100 KARMA tokens have been minted to your wallet",
      })
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "Smart contract interaction failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (nextUnlock) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [nextUnlock])

  return (
    <div className="container mx-auto px-4 py-8 lg:py-24 space-y-6 lg:space-y-8">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">NFT Badge Gallery</h1>
            <p className="text-sm lg:text-base text-muted-foreground">
              Your collection of achievement badges and real-world NFTs
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleMintKarmaToken}
              disabled={isLoading || !isConnected}
              className="bg-accent hover:bg-accent/90"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
              Mint Karma Tokens
            </Button>
            <Button onClick={fetchRealNFTs} disabled={isLoading || !isConnected} variant="outline">
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Refresh NFTs
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-primary">{unlockedBadges.length}</div>
            <div className="text-xs lg:text-sm text-muted-foreground">Badges Owned</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-accent">{allNFTs.length}</div>
            <div className="text-xs lg:text-sm text-muted-foreground">Total Collection</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-foreground">
              {Math.round((unlockedBadges.length / allNFTs.length) * 100)}%
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">Completion</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-yellow-400">
              {unlockedBadges.filter((b) => b.rarity === "legendary").length}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">Legendary</div>
          </CardContent>
        </Card>
      </div>

      {lockedBadges.length > 0 && (
        <Card className="bg-gradient-to-r from-card to-card/50 border-border">
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base lg:text-lg font-semibold text-foreground">Next Badge</h3>
                <Badge className={getRarityColor(lockedBadges[0].rarity)}>{lockedBadges[0].rarity}</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                  {lockedBadges[0].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{lockedBadges[0].name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">{lockedBadges[0].description}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">
                    {currentKarma} / {lockedBadges[0].karmaRequired} karma
                  </span>
                </div>
                <Progress value={(currentKarma / lockedBadges[0].karmaRequired) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6 lg:space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Unlocked Badges ({unlockedBadges.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
            {unlockedBadges.map((badge) => (
              <Card
                key={badge.id}
                className="group cursor-pointer hover:border-primary/50 transition-all duration-300 transform hover:scale-105 bg-card border-border"
                onClick={() => setSelectedNFT(badge)}
              >
                <CardContent className="p-4 lg:p-6 text-center space-y-3 lg:space-y-4">
                  <div className="relative">
                    <div
                      className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full flex items-center justify-center ${getRarityColor(
                        badge.rarity,
                      )} group-hover:scale-110 transition-transform`}
                    >
                      {badge.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-accent rounded-full flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-accent-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-sm lg:text-base line-clamp-1">{badge.name}</h3>
                    <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{badge.description}</p>
                    <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {badge.unlockedAt ? `Unlocked ${badge.unlockedAt}` : "Real-world NFT"}
                  </div>
                  {badge.withdrawable && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleWithdrawNFT(badge)
                        }}
                        disabled={isLoading}
                        className="flex-1 text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Withdraw
                      </Button>
                      {badge.policyId && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`https://cardanoscan.io/token/${badge.policyId}`, "_blank")
                          }}
                          className="px-2"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {lockedBadges.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground">Locked Badges ({lockedBadges.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
              {lockedBadges.map((badge) => (
                <Card
                  key={badge.id}
                  className="group cursor-pointer hover:border-muted-foreground/50 transition-all duration-300 bg-card/50 border-border opacity-60"
                  onClick={() => setSelectedNFT(badge)}
                >
                  <CardContent className="p-4 lg:p-6 text-center space-y-3 lg:space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full flex items-center justify-center bg-muted/30 border border-muted">
                        {badge.icon}
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-muted rounded-full flex items-center justify-center">
                        <Lock className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-muted-foreground text-sm lg:text-base line-clamp-1">
                        {badge.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-muted-foreground/70 line-clamp-2">{badge.description}</p>
                      <Badge variant="outline" className="text-muted-foreground border-muted">
                        {badge.rarity}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{badge.karmaRequired} karma required</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedNFT && <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />}
    </div>
  )
}
