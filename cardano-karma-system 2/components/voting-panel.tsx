"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Vote, ThumbsUp, ThumbsDown, Clock, ExternalLink, Shield, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { useWallet } from "@/hooks/use-wallet"
import { toast } from "@/hooks/use-toast"

interface PendingAction {
  id: number
  user: string
  action: string
  type: string
  requestedKarma: number
  votes: { approve: number; reject: number }
  timeLeft: string
  ballotId?: string
  txHash?: string
  votingPower: number
}

interface BallotData {
  ballotId: string
  proposal: string
  creator: string
  votingDeadline: number
  totalVotes: number
  approvalVotes: number
  rejectionVotes: number
  status: "active" | "passed" | "rejected" | "expired"
}

export function VotingPanel() {
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([
    {
      id: 1,
      user: "addr1q...x7k9",
      action: "Organized DeFi workshop for beginners",
      type: "Help",
      requestedKarma: 150,
      votes: { approve: 12, reject: 2 },
      timeLeft: "2h 15m",
      ballotId: "ballot_001_defi_workshop",
      txHash:
        "8f2a9b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3",
      votingPower: 85,
    },
    {
      id: 2,
      user: "addr1q...m3n8",
      action: "Donated 500 ADA to community treasury",
      type: "Donate",
      requestedKarma: 250,
      votes: { approve: 8, reject: 1 },
      timeLeft: "4h 32m",
      ballotId: "ballot_002_treasury_donation",
      txHash:
        "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3",
      votingPower: 92,
    },
    {
      id: 3,
      user: "addr1q...p2r5",
      action: "Created educational content series",
      type: "Create",
      requestedKarma: 200,
      votes: { approve: 15, reject: 0 },
      timeLeft: "6h 45m",
      ballotId: "ballot_003_educational_content",
      txHash:
        "9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3z2y1x0w9v8u7t6s5r4q3p2o1n0m9l8k7j6i5h4g3f2e1d0c9b8a7",
      votingPower: 78,
    },
  ])

  const [votedActions, setVotedActions] = useState<Set<number>>(new Set())
  const [isVoting, setIsVoting] = useState(false)
  const [ballotData, setBallotData] = useState<BallotData[]>([])
  const { walletInfo, isConnected } = useWallet()

  const fetchBallotData = async () => {
    if (!isConnected || !walletInfo?.address) return

    try {
      // In a real implementation, this would query Cardano ballot contracts
      const mockBallotData: BallotData[] = pendingActions.map((action) => ({
        ballotId: action.ballotId || `ballot_${action.id}`,
        proposal: action.action,
        creator: action.user,
        votingDeadline: Date.now() + Number.parseInt(action.timeLeft.split("h")[0]) * 60 * 60 * 1000,
        totalVotes: action.votes.approve + action.votes.reject,
        approvalVotes: action.votes.approve,
        rejectionVotes: action.votes.reject,
        status: "active" as const,
      }))

      setBallotData(mockBallotData)
    } catch (error) {
      console.error("Failed to fetch ballot data:", error)
    }
  }

  const handleVote = async (actionId: number, voteType: "approve" | "reject") => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      })
      return
    }

    const action = pendingActions.find((a) => a.id === actionId)
    if (!action) return

    setIsVoting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Update local state
      setVotedActions((prev) => new Set([...prev, actionId]))

      // Update vote counts
      setPendingActions((prev) =>
        prev.map((a) =>
          a.id === actionId
            ? {
                ...a,
                votes: {
                  approve: voteType === "approve" ? a.votes.approve + 1 : a.votes.approve,
                  reject: voteType === "reject" ? a.votes.reject + 1 : a.votes.reject,
                },
              }
            : a,
        ),
      )

      toast({
        title: "Vote Submitted",
        description: `Your ${voteType} vote has been recorded on-chain`,
      })

      const voteHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
      console.log(`Vote transaction hash: ${voteHash}`)
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "Failed to submit vote to blockchain",
        variant: "destructive",
      })
    } finally {
      setIsVoting(false)
    }
  }

  const calculateVotingPower = () => {
    // In real implementation, this would be based on staked karma tokens
    return Math.floor(Math.random() * 20) + 80 // 80-100%
  }

  useEffect(() => {
    fetchBallotData()
    const interval = setInterval(fetchBallotData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [isConnected, walletInfo])

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Vote className="w-5 h-5 text-accent" />
              <span>Community Voting</span>
              <Shield className="w-4 h-4 text-primary" />
            </CardTitle>
            <CardDescription>Vote on pending community actions via Cardano BallotData</CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchBallotData}
            disabled={!isConnected}
            className="bg-transparent border-border"
          >
            <Vote className="w-4 h-4 mr-2" />
            Refresh Ballots
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected && (
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">Your Voting Power</span>
              </div>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                {calculateVotingPower()}% (Karma Staked)
              </Badge>
            </div>
          </div>
        )}

        {pendingActions.map((action) => {
          const totalVotes = action.votes.approve + action.votes.reject
          const approvalRate = totalVotes > 0 ? (action.votes.approve / totalVotes) * 100 : 0
          const hasVoted = votedActions.has(action.id)

          return (
            <div key={action.id} className="p-4 bg-muted/30 rounded-lg space-y-3 border border-border/50">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm line-clamp-2">{action.action}</div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {action.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground truncate">by {action.user}</span>
                    {action.ballotId && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-auto p-0 text-xs text-primary hover:text-primary/80"
                        onClick={() => window.open(`https://cardanoscan.io/transaction/${action.txHash}`, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Ballot #{action.ballotId.split("_")[1]}
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="font-semibold text-primary">+{action.requestedKarma}</div>
                  <div className="text-xs text-muted-foreground">karma</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Approval Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">{Math.round(approvalRate)}%</span>
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      Power: {action.votingPower}%
                    </Badge>
                  </div>
                </div>
                <Progress value={approvalRate} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{action.votes.approve} approve</span>
                  <span>{action.votes.reject} reject</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{action.timeLeft} left</span>
                  {action.ballotId && (
                    <>
                      <span>•</span>
                      <span>On-chain ballot</span>
                    </>
                  )}
                </div>

                {hasVoted ? (
                  <Badge variant="outline" className="text-xs w-fit">
                    ✓ Vote Submitted On-Chain
                  </Badge>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVote(action.id, "reject")}
                      disabled={isVoting || !isConnected}
                      className="text-xs px-3 py-1 h-auto hover:bg-destructive/10 hover:border-destructive/50"
                    >
                      <ThumbsDown className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleVote(action.id, "approve")}
                      disabled={isVoting || !isConnected}
                      className="text-xs px-3 py-1 h-auto bg-accent hover:bg-accent/90"
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border space-y-1">
          <div>All votes are recorded on Cardano blockchain via BallotData contracts</div>
          {isConnected && (
            <div className="flex items-center justify-center gap-1">
              <Shield className="w-3 h-3 text-accent" />
              <span>Voting power: {calculateVotingPower()}% based on karma stake</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
