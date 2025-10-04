"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useVepulseContract } from "@/lib/contracts/useVepulseContract"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const { createProject, isConnected, openWalletModal } = useVepulseContract()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast.error("Please connect your wallet first")
      openWalletModal()
      return
    }

    if (!name || !description) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      toast.loading("Creating project on VeChain...", { id: "create-project" })

      const result = await createProject(name, description)

      toast.success("Project created successfully!", { id: "create-project" })

      // Redirect to creator dashboard after a short delay
      setTimeout(() => {
        router.push("/creator")
      }, 1500)
    } catch (error: any) {
      console.error("Error creating project:", error)
      toast.error(error.message || "Failed to create project", { id: "create-project" })
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
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Create New Project</h1>
              <p className="text-lg text-muted-foreground">
                Organize your polls and surveys into a project for better management
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>Provide information about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter project name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the purpose of this project"
                      rows={4}
                      required
                      className="resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (optional)</Label>
                    <Input id="tags" placeholder="governance, community, feedback" />
                    <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Project..." : "Create Project"}
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <Link href="/creator">Cancel</Link>
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
