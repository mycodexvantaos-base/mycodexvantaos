import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Zap, GitBranch, Search, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight font-headline">SENTINEL</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard/architecture">
            Architect
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-sidebar-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Zero-Failure <span className="text-primary">Architecture</span> Refinement
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Meticulous system analysis and automated GitLab CI/CD generation for mission-critical applications.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 h-11">
                    Enter Sentinel <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/5 px-8 h-11">
                  Read Policies
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-card">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start space-y-3 p-6 rounded-lg border border-border bg-sidebar-background/50">
                <Zap className="h-10 w-10 text-accent" />
                <h3 className="text-xl font-bold font-headline">Perfect Pass CI/CD</h3>
                <p className="text-muted-foreground">Automated pipeline generation tailored for zero-failure deployment strategies on GitLab.</p>
              </div>
              <div className="flex flex-col items-start space-y-3 p-6 rounded-lg border border-border bg-sidebar-background/50">
                <Search className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold font-headline">Meticulous Risk Analysis</h3>
                <p className="text-muted-foreground">AI identifies single points of failure, compliance drifts, and security vulnerabilities instantly.</p>
              </div>
              <div className="flex flex-col items-start space-y-3 p-6 rounded-lg border border-border bg-sidebar-background/50">
                <GitBranch className="h-10 w-10 text-accent" />
                <h3 className="text-xl font-bold font-headline">GitLab-Synced Design</h3>
                <p className="text-muted-foreground">Store your architectural definitions as code (PlantUML, Mermaid) synced directly with your projects.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 w-full border-t border-border/40 bg-sidebar-background text-center text-xs text-muted-foreground">
        © 2024 Sentinel Architecture. Ensuring perfect pass rates.
      </footer>
    </div>
  );
}