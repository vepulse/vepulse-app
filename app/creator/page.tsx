"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Clock, FileText, FolderOpen, Loader2, Plus, Vote } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useVepulseContract } from "@/lib/contracts/useVepulseContract"

interface Project {
  id: number
  name: string
  description: string
  polls: number
  surveys: number
  totalVotes: number
  status: string
  createdDate: string
}

interface PollSurvey {
  id: number
  title: string
  project: string
  totalVotes: number
  status: string
  endDate: string
  itemType: number
  projectId: number
}

export default function CreatorPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [projects, setProjects] = useState<Project[]>([])
  const [polls, setPolls] = useState<PollSurvey[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { account, getUserProjects, getUserPollsSurveys, getProject, getPollSurvey, openWalletModal } = useVepulseContract()

  useEffect(() => {
    if (account) {
      loadUserData()
    } else {
      setIsLoading(false)
    }
  }, [account])

  const loadUserData = async () => {
    if (!account) return

    setIsLoading(true)
    try {
      // Fetch user's project IDs
      const projectIds = await getUserProjects(account)

      // Fetch user's poll/survey IDs
      const pollSurveyIds = await getUserPollsSurveys(account)

      // Fetch full data for each poll/survey
      const pollsData = await Promise.all(
        pollSurveyIds.map(async (id) => {
          try {
            const data = await getPollSurvey(Number(id))
            const endDate = new Date(Number(data.endTime) * 1000)
            const now = new Date()
            const isActive = now < endDate && data.status === 0

            return {
              id: Number(data.id),
              title: data.title,
              project: data.projectId ? `Project #${data.projectId}` : "Standalone",
              totalVotes: Number(data.totalResponses),
              status: isActive ? "active" : "ended",
              endDate: endDate.toISOString().split("T")[0],
              itemType: Number(data.itemType),
              projectId: Number(data.projectId),
            }
          } catch (error) {
            console.error(`Error fetching poll/survey ${id}:`, error)
            return null
          }
        })
      )

      const validPolls = pollsData.filter((p): p is PollSurvey => p !== null)
      setPolls(validPolls)

      // Fetch full data for each project
      const projectsData = await Promise.all(
        projectIds.map(async (id) => {
          try {
            const result = await getProject(Number(id))

            // Filter polls/surveys that belong to this project
            const projectPolls = validPolls.filter(p => p.projectId === Number(id))
            const polls = projectPolls.filter(p => p.itemType === 0).length
            const surveys = projectPolls.filter(p => p.itemType === 1).length
            const totalVotes = projectPolls.reduce((acc, p) => acc + p.totalVotes, 0)
            const hasActivePolls = projectPolls.some(p => p.status === "active")

            return {
              id: Number(result[0]),
              name: result[1],
              description: result[2],
              polls,
              surveys,
              totalVotes,
              status: hasActivePolls ? "active" : "completed",
              createdDate: new Date().toISOString().split("T")[0], // Projects don't have createdAt in contract
            }
          } catch (error) {
            console.error(`Error fetching project ${id}:`, error)
            return null
          }
        })
      )

      setProjects(projectsData.filter((p): p is Project => p !== null))
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const activePolls = polls.filter((p) => p.status === "active").length
  const totalVotes = polls.reduce((acc, poll) => acc + poll.totalVotes, 0)

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
                  <CardTitle className="text-3xl">
                    {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : projects.length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Polls</CardDescription>
                  <CardTitle className="text-3xl">
                    {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : activePolls}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Votes</CardDescription>
                  <CardTitle className="text-3xl">
                    {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : totalVotes.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Polls/Surveys</CardDescription>
                  <CardTitle className="text-3xl">
                    {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : polls.length}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12">
          {!account ? (
            <Card className="border-2">
              <CardContent className="py-12">
                <div className="text-center">
                  <Vote className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect your VeChain wallet to view and manage your projects, polls, and surveys
                  </p>
                  <Button onClick={() => openWalletModal()}>Connect Wallet</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
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
                    {isLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : polls.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No polls created yet</p>
                        <Button className="mt-4" asChild>
                          <Link href="/creator/create-poll">Create Your First Poll</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {polls.slice(0, 3).map((poll) => (
                          <div key={poll.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold">{poll.title}</h4>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Vote className="h-3 w-3" />
                                  {poll.totalVotes.toLocaleString()} responses
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
                    )}
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

                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin" />
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                    <p className="text-muted-foreground mb-4">Create your first project to organize your polls and surveys</p>
                    <Button asChild>
                      <Link href="/creator/create-project">Create Project</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {projects.map((project) => (
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
                )}
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

                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin" />
                  </div>
                ) : polls.length === 0 ? (
                  <div className="text-center py-12">
                    <Vote className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Polls or Surveys Yet</h3>
                    <p className="text-muted-foreground mb-4">Create your first poll or survey to start gathering feedback</p>
                    <div className="flex gap-2 justify-center">
                      <Button asChild>
                        <Link href="/creator/create-poll">Create Poll</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/creator/create-survey">Create Survey</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {polls.map((poll) => (
                      <Card key={poll.id} className="border-2">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">{poll.project}</Badge>
                                <Badge variant={poll.status === "active" ? "default" : "outline"}>{poll.status}</Badge>
                                <Badge variant="outline">{poll.itemType === 0 ? "Poll" : "Survey"}</Badge>
                              </div>
                              <h3 className="font-semibold text-lg">{poll.title}</h3>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Vote className="h-3 w-3" />
                                  {poll.totalVotes.toLocaleString()} responses
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
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Tabs>
          )}
        </section>
      </main>
    </div>
  )
}
