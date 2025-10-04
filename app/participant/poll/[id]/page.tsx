"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, Clock, Loader2, TrendingUp, Users, Vote, Coins } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useVepulseContract } from "@/lib/contracts/useVepulseContract"
import { toast } from "sonner"
import { ethers } from "ethers"

interface PollData {
  id: number
  title: string
  description: string
  creator: string
  createdAt: Date
  endDate: Date
  totalResponses: number
  status: number
  fundingPool: bigint
  potentialReward: bigint
  itemType: number
}

export default function PollDetailPage() {
  const params = useParams()
  const pollId = Number(params.id)

  const [poll, setPoll] = useState<PollData | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const {
    account,
    getPollSurvey,
    submitResponse,
    hasResponded,
    getPotentialReward,
    openWalletModal,
    isConnected
  } = useVepulseContract()

  useEffect(() => {
    loadPollData()
  }, [pollId, account])

  const loadPollData = async () => {
    setIsLoading(true)
    try {
      // Fetch poll data
      const pollData = await getPollSurvey(pollId)

      // Fetch potential reward
      const reward = await getPotentialReward(pollId)

      setPoll({
        id: Number(pollData.id),
        title: pollData.title,
        description: pollData.description,
        creator: pollData.creator,
        createdAt: new Date(Number(pollData.createdAt) * 1000),
        endDate: new Date(Number(pollData.endTime) * 1000),
        totalResponses: Number(pollData.totalResponses),
        status: Number(pollData.status),
        fundingPool: pollData.fundingPool,
        potentialReward: reward,
        itemType: Number(pollData.itemType),
      })

      // Check if user has already responded
      if (account) {
        const responded = await hasResponded(pollId, account)
        setHasVoted(responded)
      }
    } catch (error) {
      console.error("Error loading poll data:", error)
      toast.error("Failed to load poll data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first")
      openWalletModal()
      return
    }

    setIsSubmitting(true)
    try {
      toast.loading("Submitting your response...", { id: "submit-response" })

      await submitResponse(pollId)

      toast.success("Response submitted successfully!", { id: "submit-response" })
      setHasVoted(true)

      // Reload poll data to update response count
      await loadPollData()
    } catch (error: any) {
      console.error("Error submitting response:", error)
      toast.error(error.message || "Failed to submit response", { id: "submit-response" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </main>
      </div>
    )
  }

  if (!poll) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Poll not found</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const isActive = poll.status === 0 && new Date() < poll.endDate
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
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
                    <Badge variant="secondary">
                      {poll.itemType === 0 ? "Poll" : "Survey"}
                    </Badge>
                    <Badge variant={isActive ? "default" : "outline"}>
                      {isActive ? "Active" : "Ended"}
                    </Badge>
                    {poll.fundingPool > 0 && (
                      <Badge variant="default" className="gap-1">
                        <Coins className="h-3 w-3" />
                        Funded
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-3xl">{poll.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{poll.description}</CardDescription>
                </CardHeader>
              </Card>

              {/* Voting Section */}
              {!hasVoted && isActive ? (
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Submit Your Response</CardTitle>
                    <CardDescription>Participate in this {poll.itemType === 0 ? "poll" : "survey"} and submit your response to the blockchain</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {poll.potentialReward > 0 && (
                      <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Coins className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Potential Reward</p>
                            <p className="text-lg font-bold">
                              {ethers.formatEther(poll.potentialReward)} VET
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleVote}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting to Blockchain..." : "Submit Response"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Your response will be recorded on the VeChain blockchain and cannot be changed once submitted
                    </p>
                  </CardContent>
                </Card>
              ) : hasVoted ? (
                <Card className="border-2 border-primary">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center gap-4 text-center py-8">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Response Submitted!</h3>
                        <p className="text-muted-foreground">Your response has been recorded on the VeChain blockchain</p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href="/participant">View More {poll.itemType === 0 ? "Polls" : "Surveys"}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {/* Results Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Participation Statistics</CardTitle>
                  <CardDescription>Live data from the VeChain blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-6 rounded-lg border-2 bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Responses</p>
                        <p className="text-3xl font-bold">{poll.totalResponses.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  {poll.fundingPool > 0 && (
                    <div className="mt-4 flex items-center justify-between p-6 rounded-lg border-2 bg-primary/5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                          <Coins className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Funding Pool</p>
                          <p className="text-3xl font-bold">{ethers.formatEther(poll.fundingPool)} VET</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Poll Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{poll.itemType === 0 ? "Poll" : "Survey"} Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Vote className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Total Responses</p>
                      <p className="text-2xl font-bold">{poll.totalResponses.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">End Date</p>
                      <p className="text-sm text-muted-foreground">{poll.endDate.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Creator</p>
                      <p className="text-sm text-muted-foreground font-mono break-all">{formatAddress(poll.creator)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-sm text-muted-foreground">{poll.createdAt.toLocaleDateString()}</p>
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
