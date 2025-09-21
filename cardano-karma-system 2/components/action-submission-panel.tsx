"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles } from "lucide-react"
import { useState } from "react"

export function ActionSubmissionPanel() {
  const [actionDescription, setActionDescription] = useState("")
  const [actionType, setActionType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!actionDescription || !actionType) return

    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success animation
    const button = document.querySelector(".submit-button")
    button?.classList.add("animate-pulse")

    // Reset form
    setActionDescription("")
    setActionType("")
    setIsSubmitting(false)

    // Remove animation
    setTimeout(() => {
      button?.classList.remove("animate-pulse")
    }, 1000)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Send className="w-5 h-5 text-primary" />
          <span>Submit Action</span>
        </CardTitle>
        <CardDescription>Report your community contributions to earn karma</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="action-type">Action Type</Label>
          <Select value={actionType} onValueChange={setActionType}>
            <SelectTrigger>
              <SelectValue placeholder="Select action type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="help">Help - Assist community members</SelectItem>
              <SelectItem value="donate">Donate - Contribute to community funds</SelectItem>
              <SelectItem value="participate">Participate - Join community events</SelectItem>
              <SelectItem value="create">Create - Develop community resources</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="action-description">Description</Label>
          <Textarea
            id="action-description"
            placeholder="Describe your community action in detail..."
            value={actionDescription}
            onChange={(e) => setActionDescription(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!actionDescription || !actionType || isSubmitting}
          className="w-full submit-button bg-primary hover:bg-primary/90 text-primary-foreground group"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Submitting to Blockchain...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              Submit Action
              <Sparkles className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center">Actions are verified on-chain via Cardano eUTXO</div>
      </CardContent>
    </Card>
  )
}
