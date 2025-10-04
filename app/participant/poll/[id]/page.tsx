"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, Clock, TrendingUp, Users, Vote } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

// Mock poll data
const mockPollData = {
  id: 1,
  title: "Community Treasury Allocation 2025",
  description:
    "Vote on how the community treasury should be allocated for the upcoming year. This decision will impact the development roadmap, marketing initiatives, operational expenses, and reserve funds for the VePulse platform.",
  category: "Governance",
  creator: "0x742d...4f2a",
  createdDate: "2024-12-01",
  endDate: "2025-01-15",
  totalVotes: 1247,
  status: "active",
  options: [
    {
      id: 1,
      text: "Development (40%)",
      description: "Allocate 40% to platform development and new features",
      votes: 498,
    },
    {
      id: 2,
      text: "Marketing (30%)",
      description: "Allocate 30% to marketing and community growth",
      votes: 374,
    },
    {
      id: 3,
      text: "Operations (20%)",
      description: "Allocate 20% to operational expenses and infrastructure",
      votes: 249,
    },
    {
      id: 4,
      text: "Reserve (10%)",
      description: "Keep 10% in reserve for emergencies",
      votes: 126,
    },
  ],
}

export default function PollDetailPage() {
  const params = useParams()
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const poll = mockPollData

  const handleVote = async () => {
    if (!selectedOption) return

    setIsSubmitting(true)
    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setHasVoted(true)
    setIsSubmitting(false)
  }

  const getPercentage = (votes: number) => {
    return ((votes / poll.totalVotes) * 100).toFixed(1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-muted/30 py-6">
          <div className="container">
            <Button variant="ghost" size="sm" className="gap-2 mb-4" asChild>
              <Link href="/participant">
                <ArrowLeft className="h-4 w-4" />
                Back to Polls
              </Link>
            </Button>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Poll Header */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge variant="secondary">{poll.category}</Badge>
                    <Badge variant={poll.status === "active" ? "default" : "outline"}>
                      {poll.status === "active" ? "Active" : "Ended"}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl">{poll.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{poll.description}</CardDescription>
                </CardHeader>
              </Card>

              {/* Voting Section */}
              {!hasVoted ? (
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Cast Your Vote</CardTitle>
                    <CardDescription>Select one option below and submit your vote to the blockchain</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                      <div className="space-y-3">
                        {poll.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-start space-x-3 rounded-lg border-2 border-border p-4 hover:border-primary/50 transition-colors"
                          >
                            <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={`option-${option.id}`} className="text-base font-semibold cursor-pointer">
                                {option.text}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleVote}
                      disabled={!selectedOption || isSubmitting}
                    >
                      {isSubmitting ? "Submitting to Blockchain..." : "Submit Vote"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Your vote will be recorded on the VeChain blockchain and cannot be changed once submitted
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-primary">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center gap-4 text-center py-8">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Vote Submitted!</h3>
                        <p className="text-muted-foreground">Your vote has been recorded on the VeChain blockchain</p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href="/participant">View More Polls</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Current Results</CardTitle>
                  <CardDescription>Live results updated in real-time from the blockchain</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {poll.options.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.text}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{option.votes.toLocaleString()} votes</span>
                          <span className="text-sm font-semibold">{getPercentage(option.votes)}%</span>
                        </div>
                      </div>
                      <Progress value={Number.parseFloat(getPercentage(option.votes))} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Poll Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Poll Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Vote className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Total Votes</p>
                      <p className="text-2xl font-bold">{poll.totalVotes.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">End Date</p>
                      <p className="text-sm text-muted-foreground">{new Date(poll.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Creator</p>
                      <p className="text-sm text-muted-foreground font-mono">{poll.creator}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-sm text-muted-foreground">{new Date(poll.createdDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blockchain Info */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">Blockchain Verified</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Recorded on VeChain</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Tamper-proof results</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Publicly verifiable</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                    View on Explorer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
