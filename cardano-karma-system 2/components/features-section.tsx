"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Award, Vote, Shield, Zap, Users } from "lucide-react"
import { useState } from "react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  details: string
  index: number
}

function FeatureCard({ icon, title, description, details, index }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className="group hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <CardHeader className="space-y-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div>
          <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0 animate-fade-in-up">
          <p className="text-sm text-muted-foreground leading-relaxed">{details}</p>
        </CardContent>
      )}
    </Card>
  )
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Coins className="w-6 h-6 text-primary" />,
      title: "Earn Karma Tokens",
      description: "Get rewarded for positive community actions",
      details:
        "Every helpful action, donation, or community participation earns you karma tokens. These tokens are minted on-chain and represent your reputation score in the ecosystem.",
    },
    {
      icon: <Award className="w-6 h-6 text-accent" />,
      title: "Unlock NFT Badges",
      description: "Collect unique badges for achievements",
      details:
        "Reach karma milestones to automatically unlock exclusive NFT badges. Each badge represents a different achievement level and grants special privileges in the community.",
    },
    {
      icon: <Vote className="w-6 h-6 text-primary" />,
      title: "Stake-Based Voting",
      description: "Participate in community governance",
      details:
        "Use your karma tokens to vote on community proposals and action approvals. Higher karma holders have more voting power, creating a merit-based governance system.",
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "On-Chain Verification",
      description: "All actions verified via Cardano eUTXO",
      details:
        "Every karma transaction is recorded on the Cardano blockchain using eUTXO model, ensuring transparency, immutability, and decentralized verification of all community actions.",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Real-Time Updates",
      description: "Instant karma and NFT tracking",
      details:
        "Monitor your karma balance, NFT collection, and community standing in real-time through our responsive dashboard powered by Blockfrost API integration.",
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "Community Impact",
      description: "Build reputation through meaningful actions",
      details:
        "Focus on actions that truly benefit the community. Our system rewards quality contributions over quantity, fostering genuine engagement and positive impact.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">Gamified Reputation System</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Build your on-chain reputation through meaningful community actions. Earn karma, unlock NFTs, and shape the
            future of decentralized communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              details={feature.details}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Start Building Karma
          </Button>
        </div>
      </div>
    </section>
  )
}
