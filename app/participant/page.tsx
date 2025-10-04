"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Search, Users, Vote } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for polls
const mockPolls = [
  {
    id: 1,
    title: "Community Treasury Allocation 2025",
    description: "Vote on how the community treasury should be allocated for the upcoming year",
    category: "Governance",
    endDate: "2025-01-15",
    totalVotes: 1247,
    status: "active",
    options: [
      { id: 1, text: "Development (40%)", votes: 498 },
      { id: 2, text: "Marketing (30%)", votes: 374 },
      { id: 3, text: "Operations (20%)", votes: 249 },
      { id: 4, text: "Reserve (10%)", votes: 126 },
    ],
  },
  {
    id: 2,
    title: "New Feature Priority Poll",
    description: "Help us decide which feature to build next for the VePulse platform",
    category: "Product",
    endDate: "2025-01-10",
    totalVotes: 892,
    status: "active",
    options: [
      { id: 1, text: "Mobile App", votes: 356 },
      { id: 2, text: "Advanced Analytics", votes: 267 },
      { id: 3, text: "API Access", votes: 178 },
      { id: 4, text: "White Label Solution", votes: 91 },
    ],
  },
  {
    id: 3,
    title: "VeChain Ecosystem Survey",
    description: "Share your thoughts on the current state of the VeChain ecosystem",
    category: "Survey",
    endDate: "2025-01-20",
    totalVotes: 2341,
    status: "active",
    options: [
      { id: 1, text: "Very Satisfied", votes: 1170 },
      { id: 2, text: "Satisfied", votes: 702 },
      { id: 3, text: "Neutral", votes: 234 },
      { id: 4, text: "Needs Improvement", votes: 235 },
    ],
  },
  {
    id: 4,
    title: "Protocol Upgrade Proposal",
    description: "Vote on the proposed protocol upgrade for improved transaction speeds",
    category: "Governance",
    endDate: "2024-12-28",
    totalVotes: 3456,
    status: "ended",
    options: [
      { id: 1, text: "Approve", votes: 2765 },
      { id: 2, text: "Reject", votes: 691 },
    ],
  },
]

export default function ParticipantPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("active")

  const filteredPolls = mockPolls.filter((poll) => {
    const matchesSearch =
      poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = selectedTab === "all" || poll.status === selectedTab
    return matchesSearch && matchesTab
  })

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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Polls</CardDescription>
                  <CardTitle className="text-3xl">{mockPolls.filter((p) => p.status === "active").length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Votes Cast</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockPolls.reduce((acc, poll) => acc + poll.totalVotes, 0).toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Your Votes</CardDescription>
                  <CardTitle className="text-3xl">0</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Participation Rate</CardDescription>
                  <CardTitle className="text-3xl">0%</CardTitle>
                </CardHeader>
              </Card>
            </div>
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
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPolls.map((poll) => (
                <Card key={poll.id} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{poll.category}</Badge>
                          <Badge variant={poll.status === "active" ? "default" : "outline"}>
                            {poll.status === "active" ? "Active" : "Ended"}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{poll.title}</CardTitle>
                        <CardDescription>{poll.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Vote className="h-4 w-4" />
                        <span>{poll.totalVotes.toLocaleString()} votes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Ends {new Date(poll.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Button className="w-full" asChild disabled={poll.status === "ended"}>
                      <Link href={`/participant/poll/${poll.id}`}>
                        {poll.status === "active" ? "Vote Now" : "View Results"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPolls.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No polls found</h3>
                <p className="text-muted-foreground max-w-md">
                  Try adjusting your search or filter to find what you're looking for
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
