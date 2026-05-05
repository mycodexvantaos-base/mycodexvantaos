import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Brain, Shield, Network, Globe, Grid3x3, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-accent" />,
      title: 'LM Inference Monitor',
      description: 'Real-time monitoring of language model inference across all deployed models with latency, throughput, and error rate tracking.',
    },
    {
      icon: <Network className="h-8 w-8 text-accent" />,
      title: 'Connector Management',
      description: 'Provider-agnostic connector layer for PostgreSQL, Redis, GitHub, and more. Swap backends without touching the UI.',
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: 'Edge Deployment Console',
      description: 'Monitor and manage edge computing nodes with one-click deployment, rollback, and real-time resource tracking.',
    },
    {
      icon: <Grid3x3 className="h-8 w-8 text-accent" />,
      title: 'Scenario Matrix Builder',
      description: 'No-code generation of application scenario matrices for technology selection with AI-powered completeness analysis.',
    },
    {
      icon: <Compass className="h-8 w-8 text-accent" />,
      title: 'Decision Guide Generator',
      description: 'AI-powered selection decision guides with ranked recommendations, confidence scores, and trade-off analysis.',
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: 'Governance & Security',
      description: 'RBAC-enforced audit trails, vulnerability scanning, compliance reporting, and policy engine for full governance.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold font-headline">MyCodeXvantaOS</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">
                  Enter Console <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight font-headline lg:text-5xl">
              The Operations Command Center for AI Infrastructure
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              MyCodeXvantaOS provides a unified operations dashboard for monitoring LM inference, managing connectors, deploying edge models, and governing your entire AI ecosystem — all from a no-code interface.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Open Admin Console <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">View Architecture Docs</Link>
              </Button>
            </div>
          </div>
          {heroImage && (
            <div className="relative mx-auto mt-8 w-full max-w-6xl rounded-xl border shadow-xl shadow-primary/10">
              <div className="absolute inset-0 -z-10 bg-primary/5 blur-3xl"></div>
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={675}
                className="rounded-lg"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            </div>
          )}
        </section>

        <section id="features" className="container space-y-12 py-12 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter font-headline md:text-4xl">
              Six-Layer Architecture, One Unified Console
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              From Builder to Governance, every layer of the MyCodeXvantaOS architecture is monitored, managed, and controlled through the admin dashboard.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="max-w-sm overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader className="p-0">
                  <div className="flex h-40 items-center justify-center bg-secondary/30">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MyCodeXvantaOS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">autoecoops.io</p>
          </div>
        </div>
      </footer>
    </div>
  );
}