import { Header } from "@/components/header"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, CheckCircle2, Lock, Shield, Users, Vote } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32 lg:py-40">
        <ScrollReveal className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Built on VeChain
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            The complete platform for <span className="text-primary">decentralized</span> polls and surveys
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl text-balance">
            Create transparent, tamper-proof polls and surveys on the VeChain blockchain. Empower your community with
            verifiable voting and data collection.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/#roles">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#features">Explore Features</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Stats Section */}
      <ScrollReveal delay={200}>
        <section className="border-y border-border bg-muted/50">
          <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">10K+</div>
              <div className="text-sm text-muted-foreground">Active Polls</div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">50K+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">100%</div>
              <div className="text-sm text-muted-foreground">Transparent</div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <section id="features" className="container py-24 md:py-32">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Choose VePulse?</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Built on VeChain blockchain for maximum security, transparency, and reliability
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal delay={100}>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Blockchain Security</CardTitle>
                <CardDescription>
                  All votes and responses are recorded on VeChain, ensuring immutability and transparency
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Vote className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Anonymous Voting</CardTitle>
                <CardDescription>
                  Protect participant privacy while maintaining vote integrity and verifiability
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>View live results and comprehensive analytics as votes come in</CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Tamper-Proof</CardTitle>
                <CardDescription>
                  Once submitted, votes cannot be altered or deleted, ensuring data integrity
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multi-Role Support</CardTitle>
                <CardDescription>Separate interfaces for participants, creators, and administrators</CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Easy to Use</CardTitle>
                <CardDescription>Intuitive interface makes creating and participating in polls simple</CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Role Selection Section */}
      <section id="roles" className="border-y border-border bg-muted/30 py-24 md:py-32">
        <div className="container">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Choose Your Role</h2>
              <p className="max-w-2xl text-lg text-muted-foreground">Select how you want to interact with VePulse</p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            <ScrollReveal delay={100}>
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Participant</CardTitle>
                  <CardDescription className="text-base">Vote on polls and participate in surveys</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Browse active polls and surveys</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Cast your vote securely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>View real-time results</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/participant">Enter as Participant</Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Vote className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Creator</CardTitle>
                  <CardDescription className="text-base">Create and manage polls and surveys</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Create custom polls and surveys</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Manage multiple projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Access detailed analytics</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/creator">Enter as Creator</Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Administrator</CardTitle>
                  <CardDescription className="text-base">Oversee and manage the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Monitor all platform activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Manage users and permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Review and moderate content</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/admin">Enter as Administrator</Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Built for transparency and trust
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                VePulse leverages the power of VeChain blockchain to provide a decentralized platform for polls and
                surveys. Every vote is recorded on-chain, ensuring complete transparency and immutability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're conducting community governance votes, market research surveys, or opinion polls, VePulse
                provides the tools you need with the security and transparency of blockchain technology.
              </p>
              <Button size="lg" className="gap-2">
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    Verifiable Results
                  </CardTitle>
                  <CardDescription>
                    All votes are recorded on VeChain blockchain and can be independently verified
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    Low Transaction Costs
                  </CardTitle>
                  <CardDescription>
                    VeChain's efficient consensus mechanism ensures minimal gas fees for all operations
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    Enterprise Ready
                  </CardTitle>
                  <CardDescription>
                    Scalable infrastructure designed to handle high-volume voting and survey campaigns
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="border-y border-border bg-muted/50 py-24">
          <div className="container flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl">
              Ready to get started?
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Join thousands of users already using VePulse for transparent, secure polling and surveys
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/#roles">
                  Choose Your Role <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">V</span>
                </div>
                <span className="text-xl font-bold">VePulse</span>
              </div>
              <p className="text-sm text-muted-foreground">Decentralized polls and surveys on VeChain blockchain</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#roles" className="hover:text-foreground transition-colors">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} VePulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
