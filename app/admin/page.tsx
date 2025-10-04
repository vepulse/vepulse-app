"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  TrendingUp,
  Users,
  Vote,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data
const mockStats = {
  totalUsers: 12847,
  activePolls: 23,
  totalVotes: 45632,
  platformHealth: 98.5,
  newUsersToday: 234,
  votesToday: 1456,
  activeCreators: 156,
  pendingReports: 3,
}

const mockRecentActivity = [
  {
    id: 1,
    type: "poll_created",
    user: "0x742d...4f2a",
    action: "Created poll",
    target: "Community Treasury Allocation 2025",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    type: "vote_cast",
    user: "0x8a3f...9b2c",
    action: "Voted on",
    target: "New Feature Priority Poll",
    timestamp: "5 minutes ago",
  },
  {
    id: 3,
    type: "report",
    user: "0x1c4e...7d8a",
    action: "Reported",
    target: "Spam poll detected",
    timestamp: "12 minutes ago",
  },
  {
    id: 4,
    type: "user_joined",
    user: "0x9f2b...3e1d",
    action: "Joined platform",
    target: "",
    timestamp: "18 minutes ago",
  },
]

const mockTopPolls = [
  { id: 1, title: "Community Treasury Allocation 2025", votes: 3456, growth: "+12%" },
  { id: 2, title: "VeChain Ecosystem Survey", votes: 2341, growth: "+8%" },
  { id: 3, title: "New Feature Priority Poll", votes: 1892, growth: "+15%" },
  { id: 4, title: "Protocol Upgrade Proposal", votes: 1247, growth: "+5%" },
]

const mockReports = [
  {
    id: 1,
    type: "spam",
    reporter: "0x1c4e...7d8a",
    target: "Fake giveaway poll",
    status: "pending",
    timestamp: "12 minutes ago",
  },
  {
    id: 2,
    type: "inappropriate",
    reporter: "0x5b7f...2a9c",
    target: "Offensive content in survey",
    status: "pending",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    type: "fraud",
    reporter: "0x8d3a...6e1b",
    target: "Vote manipulation detected",
    status: "pending",
    timestamp: "3 hours ago",
  },
]

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

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
                  <Shield className="h-3 w-3" />
                  Administrator
                </Badge>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Admin Dashboard</h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    Monitor platform activity, manage users, and oversee all polls
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <FileText className="h-4 w-4" />
                    Export Report
                  </Button>
                  <Button className="gap-2">
                    <Activity className="h-4 w-4" />
                    System Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="border-b border-border bg-background py-8">
          <div className="container">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Total Users
                  </CardDescription>
                  <CardTitle className="text-3xl">{mockStats.totalUsers.toLocaleString()}</CardTitle>
                  <p className="text-xs text-muted-foreground">+{mockStats.newUsersToday} today</p>
                </CardHeader>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-1">
                    <Vote className="h-3 w-3" />
                    Total Votes
                  </CardDescription>
                  <CardTitle className="text-3xl">{mockStats.totalVotes.toLocaleString()}</CardTitle>
                  <p className="text-xs text-muted-foreground">+{mockStats.votesToday} today</p>
                </CardHeader>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Active Polls
                  </CardDescription>
                  <CardTitle className="text-3xl">{mockStats.activePolls}</CardTitle>
                  <p className="text-xs text-muted-foreground">{mockStats.activeCreators} creators</p>
                </CardHeader>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Platform Health
                  </CardDescription>
                  <CardTitle className="text-3xl">{mockStats.platformHealth}%</CardTitle>
                  <p className="text-xs text-green-600">All systems operational</p>
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
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="polls">Polls</TabsTrigger>
              <TabsTrigger value="reports">
                Reports
                {mockStats.pendingReports > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {mockStats.pendingReports}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            {selectedTab === "overview" && (
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 border-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest platform events and user actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              activity.type === "report"
                                ? "bg-destructive/10"
                                : activity.type === "poll_created"
                                  ? "bg-primary/10"
                                  : "bg-muted"
                            }`}
                          >
                            {activity.type === "report" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                            {activity.type === "poll_created" && <Vote className="h-5 w-5 text-primary" />}
                            {activity.type === "vote_cast" && (
                              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                            )}
                            {activity.type === "user_joined" && <Users className="h-5 w-5 text-muted-foreground" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-mono text-xs">{activity.user}</span> {activity.action}{" "}
                              {activity.target && <span className="font-medium">{activity.target}</span>}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Polls */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Top Polls</CardTitle>
                    <CardDescription>Most active polls by vote count</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTopPolls.map((poll, index) => (
                        <div key={poll.id} className="space-y-2">
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-tight">{poll.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-muted-foreground">{poll.votes.toLocaleString()} votes</p>
                                <Badge variant="secondary" className="text-xs">
                                  {poll.growth}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Reports */}
                {mockStats.pendingReports > 0 && (
                  <Card className="lg:col-span-3 border-2 border-destructive/20 bg-destructive/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            Pending Reports
                          </CardTitle>
                          <CardDescription>Reports requiring immediate attention</CardDescription>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/admin?tab=reports">View All</Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        {mockReports.map((report) => (
                          <Card key={report.id} className="border-2">
                            <CardContent className="pt-6">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Badge variant="destructive">{report.type}</Badge>
                                  <span className="text-xs text-muted-foreground">{report.timestamp}</span>
                                </div>
                                <p className="text-sm font-medium">{report.target}</p>
                                <p className="text-xs text-muted-foreground font-mono">By {report.reporter}</p>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                    Review
                                  </Button>
                                  <Button size="sm" variant="destructive" className="flex-1">
                                    Take Action
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Users Tab */}
            {selectedTab === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <p className="text-muted-foreground">View and manage all platform users</p>
                  </div>
                  <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    Export Users
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground mt-2">+{mockStats.newUsersToday} new today</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Active Creators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{mockStats.activeCreators}</div>
                      <p className="text-sm text-muted-foreground mt-2">Creating polls & surveys</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Participants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">
                        {(mockStats.totalUsers - mockStats.activeCreators).toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Voting on polls</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>Latest user registrations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-mono text-sm">
                              {`0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`}
                            </div>
                            <div>
                              <p className="font-medium font-mono text-sm">
                                0x{Math.random().toString(16).slice(2, 6)}...{Math.random().toString(16).slice(2, 6)}
                              </p>
                              <p className="text-xs text-muted-foreground">Joined {i} hours ago</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="bg-transparent">
                              View Profile
                            </Button>
                            <Button size="sm" variant="ghost">
                              Actions
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Polls Tab */}
            {selectedTab === "polls" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Poll Management</h2>
                    <p className="text-muted-foreground">Monitor and manage all polls on the platform</p>
                  </div>
                  <Button className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Active Polls</CardDescription>
                      <CardTitle className="text-3xl">{mockStats.activePolls}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total Votes</CardDescription>
                      <CardTitle className="text-3xl">{mockStats.totalVotes.toLocaleString()}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Avg. Participation</CardDescription>
                      <CardTitle className="text-3xl">68%</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Votes Today</CardDescription>
                      <CardTitle className="text-3xl">{mockStats.votesToday.toLocaleString()}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>All Polls</CardTitle>
                    <CardDescription>Complete list of platform polls</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTopPolls.map((poll) => (
                        <div key={poll.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{poll.title}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{poll.votes.toLocaleString()} votes</span>
                              <Badge variant="secondary">{poll.growth} growth</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="bg-transparent">
                              View Details
                            </Button>
                            <Button size="sm" variant="ghost">
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Reports Tab */}
            {selectedTab === "reports" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Content Reports</h2>
                    <p className="text-muted-foreground">Review and take action on user reports</p>
                  </div>
                  <Badge variant="destructive" className="text-base px-4 py-2">
                    {mockStats.pendingReports} Pending
                  </Badge>
                </div>

                <div className="grid gap-6">
                  {mockReports.map((report) => (
                    <Card key={report.id} className="border-2 border-destructive/20">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="destructive">{report.type}</Badge>
                              <Badge variant="outline">{report.status}</Badge>
                              <span className="text-sm text-muted-foreground">{report.timestamp}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{report.target}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Reported by <span className="font-mono">{report.reporter}</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="bg-transparent">
                              View Content
                            </Button>
                            <Button variant="outline" className="bg-transparent">
                              Dismiss
                            </Button>
                            <Button variant="destructive">Take Action</Button>
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
