"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Network, Activity, ArrowUpRight, Globe, Layers, Database } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function SwarmPage() {
  const swarmNodes = [
    { name: "Logic_Node_Alpha", status: "SYNCED", load: 42, latency: "4ms", type: "Reasoning" },
    { name: "Forge_Node_Gamma", status: "ACTIVE", load: 88, latency: "12ms", type: "Action" },
    { name: "Sensing_Node_Delta", status: "STREAMING", load: 15, latency: "2ms", type: "Perception" },
    { name: "Consensus_Node_Omega", status: "VOTING", load: 64, latency: "24ms", type: "Governance" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto scanline">
      <div className="flex flex-col space-y-2 border-b border-border/20 pb-8">
        <div className="flex items-center gap-2 text-primary">
          <Network className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Sub-System: Swarm Orchestration</span>
        </div>
        <h1 className="text-4xl font-bold font-headline tracking-tighter uppercase">動態蜂群協作 (Swarm Orchestration)</h1>
        <p className="text-muted-foreground font-light max-w-2xl">
          實時徵召全球專精模型與人類專家，針對流動性任務進行有機聚合與資源調度。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Total Swarm Nodes", value: "104,203", icon: Users },
          { label: "Active Connections", value: "8,492", icon: Network },
          { label: "Sync Latency", value: "14ms", icon: Activity },
          { label: "Data Throughput", value: "1.4 PB/s", icon: Database },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary opacity-50" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/40 bg-card/20">
          <CardHeader>
            <CardTitle className="text-xl font-headline uppercase tracking-wider">Active Swarm Clusters</CardTitle>
            <CardDescription>Live heartbeat from decentralized expert nodes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {swarmNodes.map((node, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40 group hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-mono">{node.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase">{node.type} Module</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-right">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Latency</p>
                      <p className="text-xs font-mono">{node.latency}</p>
                    </div>
                    <div className="space-y-1 w-24">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold text-center">Load</p>
                      <Progress value={node.load} className="h-1 bg-white/5" indicatorClassName="bg-primary" />
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary font-mono text-[9px] uppercase tracking-tighter">
                      {node.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/20">
          <CardHeader>
            <CardTitle className="text-xl font-headline uppercase tracking-wider">Swarm Topology</CardTitle>
            <CardDescription>Global distribution of active nodes.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[400px]">
             <div className="relative w-full aspect-square border-2 border-dashed border-primary/20 rounded-full flex items-center justify-center">
                <Globe className="h-32 w-32 text-primary opacity-20 animate-spin-slow" />
                <div className="absolute top-1/4 left-1/4 h-2 w-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />
                <div className="absolute bottom-1/3 right-1/4 h-2 w-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--accent))]" />
                <div className="absolute top-1/2 right-1/2 h-2 w-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />
                <p className="absolute bottom-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Mapping Global Pulse...</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
