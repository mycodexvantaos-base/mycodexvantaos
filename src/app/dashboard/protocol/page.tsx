
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Zap, Activity, ShieldCheck, Cpu, Code, Network, ArrowRight, Calendar } from "lucide-react";

export default function ProtocolPage() {
  const roadmap = [
    {
      month: "Month 1",
      title: "Capability Discovery Protocol",
      status: "ACTIVE",
      icon: Network,
      color: "text-primary",
      description: "Establishing the 'Yellow Pages' of intelligence. Defining JSON Node Capability Cards for global node discovery.",
      deliverables: [
        "Node Registration Client (NodeClient)",
        "Vector-based Matching Logic",
        "Identity Proof (Public Key Signing)"
      ]
    },
    {
      month: "Month 2",
      title: "Zero-Shot Tool Creation",
      status: "FORGING",
      icon: Zap,
      color: "text-accent",
      description: "Empowering AI with 'hands'. Autonomous code generation and self-healing execution loops in Docker sandboxes.",
      deliverables: [
        "Dynamic API Reverse Engineering",
        "Self-Correction (Error-to-Fix) Loop",
        "Sandbox Security Protocol"
      ]
    },
    {
      month: "Month 3",
      title: "Global Anomaly Orchestration",
      status: "EVOLVING",
      icon: Activity,
      color: "text-primary",
      description: "The autonomous pulse. Detecting global anomalies and self-generating tasks without human prompts.",
      deliverables: [
        "Anomaly Detection Matrix",
        "Autonomous Task Generation",
        "Bounty-driven Consensus Bridge"
      ]
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto scanline">
      <div className="flex flex-col space-y-4 border-b border-border/20 pb-10">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Liquid Intelligence Protocol v4.0</span>
        </div>
        <h1 className="text-5xl font-bold font-headline tracking-tighter uppercase max-w-4xl leading-tight">
          3-Month MVP <span className="text-primary italic">Execution Roadmap</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl font-light">
          From Protocol Design to Autonomous Orchestration. A million-dollar blueprint for the organic network.
        </p>
      </div>

      <div className="grid gap-8">
        {roadmap.map((phase, i) => (
          <Card key={i} className="border-border/40 bg-card/20 hover:border-primary/30 transition-all overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <phase.icon className="h-40 w-40" />
            </div>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary tracking-widest border-primary/30">
                    {phase.month}
                  </Badge>
                  <Badge className="bg-primary/20 text-primary border-none text-[8px] tracking-widest uppercase">
                    {phase.status}
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-headline pt-2">{phase.title}</CardTitle>
                <CardDescription className="text-base max-w-2xl text-muted-foreground leading-relaxed">
                  {phase.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                {phase.deliverables.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/40 group hover:border-primary/40 transition-all">
                    <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Target className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-10 rounded-3xl border border-primary/10 bg-primary/5 flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
        <ShieldCheck className="h-12 w-12 text-primary animate-pulse" />
        <h3 className="text-xl font-headline uppercase tracking-widest">System Attestation</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The above roadmap is verified for <span className="text-foreground font-bold">SHA-512</span> decision integrity. All phases are designed for zero-failure autonomous operation.
        </p>
      </div>
    </div>
  );
}
