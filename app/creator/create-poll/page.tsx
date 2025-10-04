"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CreatePollPage() {
  const [options, setOptions] = useState(["", ""])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Redirect or show success
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
                    <Input id="title" placeholder="Enter poll title" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this poll is about"
                      rows={4}
                      required
                      className="resize-none"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="project">Project</Label>
                      <Select>
                        <SelectTrigger id="project">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Community Governance</SelectItem>
                          <SelectItem value="2">Product Feedback</SelectItem>
                          <SelectItem value="3">Q4 2024 Planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="governance">Governance</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="community">Community</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input id="endDate" type="date" required />
                  </div>
                </CardContent>
              </Card>

              {/* Poll Options */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Poll Options</CardTitle>
                  <CardDescription>Add the options participants can vote on (minimum 2)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`option-${index}`}>Option {index + 1} *</Label>
                        <Input
                          id={`option-${index}`}
                          placeholder={`Enter option ${index + 1}`}
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          required
                        />
                      </div>
                      {options.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="mt-8"
                          onClick={() => removeOption(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button type="button" variant="outline" className="w-full gap-2 bg-transparent" onClick={addOption}>
                    <Plus className="h-4 w-4" />
                    Add Option
                  </Button>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Poll Settings</CardTitle>
                  <CardDescription>Configure additional settings for your poll</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Anonymous Voting</Label>
                      <p className="text-sm text-muted-foreground">Allow participants to vote anonymously</p>
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Results</Label>
                      <p className="text-sm text-muted-foreground">Display results in real-time</p>
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Vote Changes</Label>
                      <p className="text-sm text-muted-foreground">Let participants change their vote</p>
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      Disabled
                    </Button>
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
                        {isSubmitting ? "Deploying to Blockchain..." : "Create Poll"}
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
