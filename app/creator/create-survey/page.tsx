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

interface Question {
  id: string
  type: "text" | "multiple-choice" | "rating"
  question: string
  options?: string[]
}

export default function CreateSurveyPage() {
  const [questions, setQuestions] = useState<Question[]>([{ id: "1", type: "text", question: "" }])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now().toString(), type: "text", question: "" }])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
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
              <h1 className="text-4xl font-bold tracking-tight mb-2">Create New Survey</h1>
              <p className="text-lg text-muted-foreground">Create a detailed survey with multiple questions</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Survey Information</CardTitle>
                  <CardDescription>Provide the basic details for your survey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Survey Title *</Label>
                    <Input id="title" placeholder="Enter survey title" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this survey is about"
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
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input id="endDate" type="date" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Questions */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Survey Questions</CardTitle>
                  <CardDescription>Add questions for your survey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-4 p-4 border-2 rounded-lg">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Question {index + 1}</Label>
                        {questions.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeQuestion(question.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`question-${question.id}`}>Question Text *</Label>
                        <Input
                          id={`question-${question.id}`}
                          placeholder="Enter your question"
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`type-${question.id}`}>Question Type *</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value) => updateQuestion(question.id, "type", value)}
                        >
                          <SelectTrigger id={`type-${question.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Response</SelectItem>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="rating">Rating Scale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" className="w-full gap-2 bg-transparent" onClick={addQuestion}>
                    <Plus className="h-4 w-4" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>

              {/* Submit */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Blockchain Deployment</h3>
                      <p className="text-sm text-muted-foreground">
                        Your survey will be deployed to the VeChain blockchain for secure and transparent data
                        collection.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? "Deploying to Blockchain..." : "Create Survey"}
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
