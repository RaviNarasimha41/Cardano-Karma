"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { ActionSubmissionPanel } from "@/components/action-submission-panel"
import { VotingPanel } from "@/components/voting-panel"
import { BlockchainStatus } from "@/components/blockchain-status"
import { useWalletContext } from "@/components/wallet-provider"

interface UserStats {
  totalKarma: number
  nftBadges: number
  actionsSubmitted: number
  votingPower: number
}

export function UserDashboard() {
  const { isConnected, karmaBalance, transactions, nftCollection, isLoading } = useWalletContext()
  const [userStats, setUserStats] = useState<UserStats>({
    totalKarma: 0,
    nftBadges: 0,
    actionsSubmitted: 0,
    votingPower: 0,
  })

  const [animatedKarma, setAnimatedKarma] = useState(0)

  // Animate karma counter
  useEffect(() => {
    if (karmaBalance > 0) {
      const timer = setInterval(() => {
        setAnimatedKarma((prev) => {
          if (prev < karmaBalance) {
            return Math.min(prev + Math.ceil(karmaBalance / 50), karmaBalance)
          }
          return prev
        })
      }, 50)

      return () => clearInterval(timer)
    }
  }, [karmaBalance])

  // Update user stats when wallet data changes
  useEffect(() => {
    if (isConnected) {
      setUserStats({
        totalKarma: karmaBalance,
        nftBadges: nftCollection.length,
        actionsSubmitted: transactions.length,
        votingPower: Math.min(85, Math.floor(karmaBalance / 100) * 5),
      })
    }
  }, [isConnected, karmaBalance, nftCollection.length, transactions.length])

  const nextMilestone = 3000
  const progress = (animatedKarma / nextMilestone) * 100

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Please connect your Cardano wallet to access the dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Track your karma, manage actions, and view your NFT collection</p>
      </div>

      {/* Wallet & Karma Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-primary" />
              <span>Karma Overview</span>
            </CardTitle>
            <CardDescription>Your on-chain reputation score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-foreground">
                  {isLoading ? (
                    <div className="w-32 h-10 bg-muted/30 rounded animate-pulse" />
                  ) : (
                    animatedKarma.toLocaleString()
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Total Karma Points</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-accent">{nextMilestone - animatedKarma}</div>
                <div className="text-sm text-muted-foreground">to next milestone</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to next NFT badge</span>
                <span className="text-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{userStats.nftBadges}</div>
                <div className="text-xs text-muted-foreground">NFT Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.actionsSubmitted}</div>
                <div className="text-xs text-muted-foreground">Actions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{userStats.votingPower}%</div>
                <div className="text-xs text-muted-foreground">Voting Power</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <BlockchainStatus />
      </div>

      {/* Action Submission and Voting */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionSubmissionPanel />
        <VotingPanel />
      </div>

      {/* Recent Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Actions</CardTitle>
          <CardDescription>Your latest community contributions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 bg-muted/30 rounded-lg animate-pulse">
                  <div className="h-4 bg-muted/50 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted/50 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{transaction.description}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {transaction.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-semibold text-primary">+{transaction.amount}</div>
                      <div className="text-xs text-muted-foreground">karma</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
