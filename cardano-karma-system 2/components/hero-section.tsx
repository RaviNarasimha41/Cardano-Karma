"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Coins, Award, Users, Wallet } from "lucide-react"
import { useState, useEffect } from "react"
import { useWalletContext } from "@/components/wallet-provider"

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Earn Karma. Unlock NFTs. Impact Your Community."
  const { isConnected, isConnecting, connect } = useWalletContext()

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleStartBuilding = () => {
    if (isConnected) {
      window.location.href = "/dashboard"
    } else {
      connect()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-tight">
                {typedText}
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty animate-fade-in-up max-w-2xl mx-auto lg:mx-0">
                All actions verified on-chain via Cardano eUTXO. Build reputation, earn rewards, and unlock exclusive
                NFT badges in our gamified community ecosystem.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow group"
                onClick={handleStartBuilding}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Connecting...
                  </>
                ) : isConnected ? (
                  <>
                    <Coins className="w-5 h-5 mr-2" />
                    Start Building Karma
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect Wallet
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToFeatures}
                className="border-border hover:bg-card group bg-transparent"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-6 lg:pt-8">
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span className="text-xs sm:text-sm text-muted-foreground">Karma Tokens</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span className="text-xs sm:text-sm text-muted-foreground">NFT Badges</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span className="text-xs sm:text-sm text-muted-foreground">Community Voting</span>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              {/* Spinning karma token */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-spin-slow opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-accent to-primary rounded-full animate-spin-slow flex items-center justify-center">
                <Coins className="w-24 h-24 sm:w-32 sm:h-32 text-primary-foreground" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-card border border-border rounded-lg flex items-center justify-center animate-float">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
              </div>
              <div
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-card border border-border rounded-lg flex items-center justify-center animate-float"
                style={{ animationDelay: "1s" }}
              >
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
