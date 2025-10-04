"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Loader2, Search, Users, Vote, Coins } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useVepulseContract } from "@/lib/contracts/useVepulseContract"

interface PollData {
  id: number
  itemType: number
  title: string
  description: string
  creator: string
  projectId: number
  createdAt: Date
  endTime: Date
  status: number
  fundingPool: bigint
  totalResponses: number
}

export default function ParticipantPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("active")
  const [polls, setPolls] = useState<PollData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userVotedPolls, setUserVotedPolls] = useState<Set<number>>(new Set())

  const { getAllPolls, account, hasResponded } = useVepulseContract()

  useEffect(() => {
    loadPolls()
  }, [])

  useEffect(() => {
    if (account && polls.length > 0) {
      loadUserVotes()
    }
  }, [account, polls])

  const loadPolls = async () => {
    setIsLoading(true)
    try {
      const allPolls = await getAllPolls(50)
      setPolls(allPolls)
    } catch (error) {
      console.error("Error loading polls:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserVotes = async () => {
    if (!account) return

    try {
      const votedSet = new Set<number>()
      await Promise.all(
        polls.map(async (poll) => {
          const voted = await hasResponded(poll.id, account)
          if (voted) {
            votedSet.add(poll.id)
          }
        })
      )
      setUserVotedPolls(votedSet)
    } catch (error) {
      console.error("Error loading user votes:", error)
    }
  }

  const filteredPolls = polls.filter((poll) => {
    const matchesSearch =
      poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.description.toLowerCase().includes(searchQuery.toLowerCase())

    const isActive = poll.status === 0 && new Date() < poll.endTime
    const pollStatus = isActive ? "active" : "ended"
    const matchesTab = selectedTab === "all" || pollStatus === selectedTab

    return matchesSearch && matchesTab
  })

  const activePolls = polls.filter(p => p.status === 0 && new Date() < p.endTime)
  const totalResponses = polls.reduce((acc, poll) => acc + poll.totalResponses, 0)
  const userVoteCount = userVotedPolls.size
  const participationRate = polls.length > 0 ? Math.round((userVoteCount / polls.length) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Users className="h-3 w-3" />
                  Participant
                </Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Active Polls & Surveys</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Browse and participate in active polls and surveys. Your vote is recorded securely on the VeChain
                blockchain.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-background py-8">
          <div className="container">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Active Polls</CardDescription>
                    <CardTitle className="text-3xl">{activePolls.length}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Responses</CardDescription>
                    <CardTitle className="text-3xl">{totalResponses.toLocaleString()}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Your Responses</CardDescription>
                    <CardTitle className="text-3xl">{userVoteCount}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Participation Rate</CardDescription>
                    <CardTitle className="text-3xl">{participationRate}%</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* Polls List Section */}
        <section className="container py-12">
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search polls and surveys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="ended">Ended</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Polls Grid */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredPolls.map((poll) => {
                  const isActive = poll.status === 0 && new Date() < poll.endTime
                  const hasVoted = userVotedPolls.has(poll.id)

                  return (
                    <Card key={poll.id} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
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
                              {hasVoted && (
                                <Badge variant="outline" className="gap-1">
                                  <Vote className="h-3 w-3" />
                                  Voted
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl">{poll.title}</CardTitle>
                            <CardDescription>{poll.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{poll.totalResponses.toLocaleString()} responses</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Ends {poll.endTime.toLocaleDateString()}</span>
                          </div>
                        </div>

                        <Button className="w-full" asChild disabled={!isActive}>
                          <Link href={`/participant/poll/${poll.id}`}>
                            {isActive ? (hasVoted ? "View Details" : "Respond Now") : "View Results"}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {!isLoading && filteredPolls.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No polls found</h3>
                <p className="text-muted-foreground max-w-md">
                  {polls.length === 0
                    ? "There are no polls or surveys available yet. Check back later!"
                    : "Try adjusting your search or filter to find what you're looking for"}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
