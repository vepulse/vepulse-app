"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useVepulseContract } from "@/lib/contracts/useVepulseContract"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreatePollPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [durationType, setDurationType] = useState("days")
  const [projectId, setProjectId] = useState("0")

  const { createPoll, isConnected, openWalletModal } = useVepulseContract()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast.error("Please connect your wallet first")
      openWalletModal()
      return
    }

    if (!title || !description || !duration) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Convert duration to seconds based on type
      let durationInSeconds = parseInt(duration)
      switch (durationType) {
        case "hours":
          durationInSeconds *= 3600
          break
        case "days":
          durationInSeconds *= 86400
          break
        case "weeks":
          durationInSeconds *= 604800
          break
      }

      toast.loading("Creating poll on VeChain...", { id: "create-poll" })

      const result = await createPoll(title, description, durationInSeconds, parseInt(projectId))

      toast.success("Poll created successfully!", { id: "create-poll" })

      // Redirect to creator dashboard after a short delay
      setTimeout(() => {
        router.push("/creator")
      }, 1500)
    } catch (error: any) {
      console.error("Error creating poll:", error)
      toast.error(error.message || "Failed to create poll", { id: "create-poll" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30 py-6">
          <div className="container">
            <Button variant="ghost" size="sm" className="gap-2 mb-4" asChild>
              <Link href="/creator">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </section>

        <section className="container py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Create New Poll</h1>
              <p className="text-lg text-muted-foreground">
                Create a new poll that will be recorded on the VeChain blockchain
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Provide the basic details for your poll</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Poll Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter poll title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this poll is about"
                      rows={4}
                      required
                      className="resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project">Project (Optional)</Label>
                    <Select value={projectId} onValueChange={setProjectId}>
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Standalone poll (no project)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Standalone (No Project)</SelectItem>
                        <SelectItem value="1">Project #1</SelectItem>
                        <SelectItem value="2">Project #2</SelectItem>
                        <SelectItem value="3">Project #3</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Leave as standalone or select a project to organize this poll
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="Enter duration"
                        required
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="durationType">Time Unit *</Label>
                      <Select value={durationType} onValueChange={setDurationType}>
                        <SelectTrigger id="durationType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Poll Information */}
              <Card className="border-2 bg-muted/30">
                <CardHeader>
                  <CardTitle>On-Chain Poll</CardTitle>
                  <CardDescription>How voting works</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Blockchain-based Voting</p>
                      <p className="text-xs text-muted-foreground">
                        Participants submit their responses on-chain by connecting their wallet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">One Vote Per Address</p>
                      <p className="text-xs text-muted-foreground">
                        Each wallet address can only submit one response to prevent duplicate voting
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Optional Rewards</p>
                      <p className="text-xs text-muted-foreground">
                        You can fund the poll with VET tokens to reward participants after it ends
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Blockchain Deployment</h3>
                      <p className="text-sm text-muted-foreground">
                        Your poll will be deployed to the VeChain blockchain. This ensures transparency, immutability,
                        and verifiability of all votes.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? "Creating Poll on VeChain..." : "Create Poll"}
                      </Button>
                      <Button type="button" variant="outline" size="lg" asChild>
                        <Link href="/creator">Cancel</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
