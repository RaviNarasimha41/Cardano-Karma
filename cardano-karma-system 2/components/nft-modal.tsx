"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Copy, Share2, Lock } from "lucide-react"
import { useState } from "react"

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
}

interface NFTModalProps {
  nft: NFTBadge
  onClose: () => void
}

export function NFTModal({ nft, onClose }: NFTModalProps) {
  const [copied, setCopied] = useState(false)

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

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`cardano-karma-nft-${nft.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">{nft.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NFT Display */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-card to-card/50 border-border">
              <CardContent className="p-8 text-center">
                <div className="relative">
                  <div
                    className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${getRarityColor(
                      nft.rarity,
                    )} ${nft.unlocked ? "animate-pulse" : "opacity-50"}`}
                  >
                    {nft.icon}
                  </div>
                  {!nft.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-background/80 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyAddress} className="bg-transparent border-border">
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy ID"}
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-border">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              {nft.unlocked && (
                <Button variant="outline" size="sm" className="bg-transparent border-border">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Chain
                </Button>
              )}
            </div>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge className={getRarityColor(nft.rarity)}>{nft.rarity}</Badge>
                {nft.unlocked && <Badge variant="outline">Owned</Badge>}
              </div>
              <p className="text-muted-foreground leading-relaxed">{nft.description}</p>
            </div>

            {/* Attributes */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Attributes</h4>
              <div className="grid grid-cols-1 gap-2">
                {nft.attributes.map((attr, index) => (
                  <div key={index} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">{attr.trait}</span>
                    <span className="font-medium text-foreground">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Requirements</h4>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Karma Required</span>
                  <span className="font-medium text-primary">{nft.karmaRequired.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Unlock Status */}
            {nft.unlocked ? (
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="text-sm text-accent font-medium">Unlocked on {nft.unlockedAt}</div>
                <div className="text-xs text-muted-foreground mt-1">This NFT is permanently stored on Cardano</div>
              </div>
            ) : (
              <div className="p-4 bg-muted/20 border border-muted rounded-lg">
                <div className="text-sm text-muted-foreground font-medium">Not yet unlocked</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Earn {nft.karmaRequired.toLocaleString()} karma to unlock this badge
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
