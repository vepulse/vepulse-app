"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Clock, FileText, FolderOpen, Plus, Vote } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data
const mockProjects = [
  {
    id: 1,
    name: "Community Governance",
    description: "Polls and surveys for community decision making",
    polls: 5,
    surveys: 2,
    totalVotes: 3456,
    status: "active",
    createdDate: "2024-11-15",
  },
  {
    id: 2,
    name: "Product Feedback",
    description: "Gathering user feedback on new features",
    polls: 3,
    surveys: 4,
    totalVotes: 1892,
    status: "active",
    createdDate: "2024-12-01",
  },
  {
    id: 3,
    name: "Q4 2024 Planning",
    description: "Strategic planning polls for Q4",
    polls: 2,
    surveys: 1,
    totalVotes: 567,
    status: "completed",
    createdDate: "2024-10-01",
  },
]

const mockPolls = [
  {
    id: 1,
    title: "Community Treasury Allocation 2025",
    project: "Community Governance",
    totalVotes: 1247,
    status: "active",
    endDate: "2025-01-15",
  },
  {
    id: 2,
    title: "New Feature Priority Poll",
    project: "Product Feedback",
    totalVotes: 892,
    status: "active",
    endDate: "2025-01-10",
  },
  {
    id: 3,
    title: "Protocol Upgrade Proposal",
    project: "Community Governance",
    totalVotes: 3456,
    status: "ended",
    endDate: "2024-12-28",
  },
]

export default function CreatorPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const activePolls = mockPolls.filter((p) => p.status === "active").length
  const totalVotes = mockPolls.reduce((acc, poll) => acc + poll.totalVotes, 0)

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
                  <Vote className="h-3 w-3" />
                  Creator
                </Badge>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Creator Dashboard</h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    Manage your projects, polls, and surveys in one place
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button className="gap-2" asChild>
                    <Link href="/creator/create-project">
                      <Plus className="h-4 w-4" />
                      New Project
                    </Link>
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent" asChild>
                    <Link href="/creator/create-poll">
                      <Plus className="h-4 w-4" />
                      New Poll
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-background py-8">
          <div className="container">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Projects</CardDescription>
                  <CardTitle className="text-3xl">{mockProjects.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Polls</CardDescription>
                  <CardTitle className="text-3xl">{activePolls}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Votes</CardDescription>
                  <CardTitle className="text-3xl">{totalVotes.toLocaleString()}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Avg. Participation</CardDescription>
                  <CardTitle className="text-3xl">68%</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="polls">Polls & Surveys</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            {selectedTab === "overview" && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Get started with creating new content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent" asChild>
                        <Link href="/creator/create-project">
                          <FolderOpen className="h-8 w-8" />
                          <div className="text-center">
                            <div className="font-semibold">Create Project</div>
                            <div className="text-xs text-muted-foreground">Organize your polls</div>
                          </div>
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent" asChild>
                        <Link href="/creator/create-poll">
                          <Vote className="h-8 w-8" />
                          <div className="text-center">
                            <div className="font-semibold">Create Poll</div>
                            <div className="text-xs text-muted-foreground">Quick voting</div>
                          </div>
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent" asChild>
                        <Link href="/creator/create-survey">
                          <FileText className="h-8 w-8" />
                          <div className="text-center">
                            <div className="font-semibold">Create Survey</div>
                            <div className="text-xs text-muted-foreground">Detailed feedback</div>
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Polls</CardTitle>
                    <CardDescription>Your most recent polls and their performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPolls.slice(0, 3).map((poll) => (
                        <div key={poll.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{poll.title}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Vote className="h-3 w-3" />
                                {poll.totalVotes.toLocaleString()} votes
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Ends {new Date(poll.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={poll.status === "active" ? "default" : "outline"}>{poll.status}</Badge>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/creator/poll/${poll.id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Projects Tab */}
            {selectedTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Your Projects</h2>
                    <p className="text-muted-foreground">Organize polls and surveys into projects</p>
                  </div>
                  <Button className="gap-2" asChild>
                    <Link href="/creator/create-project">
                      <Plus className="h-4 w-4" />
                      New Project
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {mockProjects.map((project) => (
                    <Card key={project.id} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={project.status === "active" ? "default" : "secondary"}>
                                {project.status}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl">{project.name}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold">{project.polls}</div>
                            <div className="text-xs text-muted-foreground">Polls</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{project.surveys}</div>
                            <div className="text-xs text-muted-foreground">Surveys</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{project.totalVotes}</div>
                            <div className="text-xs text-muted-foreground">Votes</div>
                          </div>
                        </div>
                        <Button className="w-full bg-transparent" variant="outline" asChild>
                          <Link href={`/creator/project/${project.id}`}>Manage Project</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Polls Tab */}
            {selectedTab === "polls" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Polls & Surveys</h2>
                    <p className="text-muted-foreground">All your polls and surveys across projects</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="gap-2" asChild>
                      <Link href="/creator/create-poll">
                        <Plus className="h-4 w-4" />
                        New Poll
                      </Link>
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent" asChild>
                      <Link href="/creator/create-survey">
                        <Plus className="h-4 w-4" />
                        New Survey
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockPolls.map((poll) => (
                    <Card key={poll.id} className="border-2">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{poll.project}</Badge>
                              <Badge variant={poll.status === "active" ? "default" : "outline"}>{poll.status}</Badge>
                            </div>
                            <h3 className="font-semibold text-lg">{poll.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Vote className="h-3 w-3" />
                                {poll.totalVotes.toLocaleString()} votes
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Ends {new Date(poll.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent" asChild>
                              <Link href={`/creator/poll/${poll.id}`}>
                                <BarChart3 className="h-3 w-3" />
                                Analytics
                              </Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/creator/poll/${poll.id}/edit`}>Edit</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Tabs>
        </section>
      </main>
    </div>
  )
}
