"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Activity, Zap, Users, Cpu, ShieldCheck, Network, Waves, ArrowUpRight } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const swarmPerformance = [
  { time: "00:00", nodes: 42000, efficiency: 88 },
  { time: "04:00", nodes: 58000, efficiency: 92 },
  { time: "08:00", nodes: 94000, efficiency: 95 },
  { time: "12:00", nodes: 104000, efficiency: 98 },
  { time: "16:00", nodes: 88000, efficiency: 94 },
  { time: "20:00", nodes: 72000, efficiency: 91 },
];

const chartConfig = {
  nodes: {
    label: "Active Nodes",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function DashboardOverview() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto scanline">
      {/* Global Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Globe className="h-5 w-5 animate-spin-slow" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] font-mono">Mycelial Protocol [ACTIVE]</span>
          </div>
          <h1 className="text-5xl font-bold font-headline tracking-tighter max-w-4xl leading-[1.1]">
            Liquid Intelligence <span className="text-primary italic">Command Center</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl font-light">
            Real-time orchestration of global swarm intelligence, organic goal evolution, and human-AI collaborative consensus.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="text-right space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Swarm Population</p>
            <p className="text-3xl font-mono text-primary">104,203</p>
          </div>
          <div className="h-14 w-[1px] bg-border/40" />
          <div className="text-right space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Network Synchrony</p>
            <p className="text-3xl font-mono text-primary">99.98%</p>
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Pulse Sensitivity", value: "98.4%", trend: "OPTIMAL", icon: Waves, color: "text-primary" },
          { label: "Forge Velocity", value: "14ms", trend: "0-SHOT", icon: Zap, color: "text-primary" },
          { label: "Consensus Weight", value: "0.94α", trend: "HIGH_TRUST", icon: Users, color: "text-accent" },
          { label: "Active Ephemerals", value: "1,204", trend: "SANDBOXED", icon: Cpu, color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/40 hover:border-primary/40 transition-all cursor-default group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="h-12 w-12" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono tracking-tighter text-foreground">{stat.value}</div>
              <p className="text-[10px] font-bold text-primary mt-2 flex items-center gap-1 uppercase tracking-widest">
                <ArrowUpRight className="h-3 w-3" /> {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Swarm Dynamics Chart */}
        <Card className="lg:col-span-2 border-border/40 bg-card/20 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-headline uppercase tracking-wider">Swarm Population Dynamics</CardTitle>
              <CardDescription>Real-time fluctuation of autonomous expert nodes.</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary font-mono text-[9px]">LIVE_STREAM</Badge>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <AreaChart data={swarmPerformance}>
                <defs>
                  <linearGradient id="colorNodes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-nodes)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-nodes)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="nodes" 
                  stroke="var(--color-nodes)" 
                  fillOpacity={1} 
                  fill="url(#colorNodes)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Intelligence Composition */}
        <Card className="border-border/40 bg-card/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl font-headline uppercase tracking-wider">Intelligence Fabric</CardTitle>
            <CardDescription>Swarm composition by cognitive modality.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-4">
            {[
              { label: "Reasoning & Inference", value: 92, color: "bg-primary" },
              { label: "Action & Tool Forge", value: 78, color: "bg-primary" },
              { label: "Pulse Sensing", value: 95, color: "bg-primary" },
              { label: "Human Consensus", value: 64, color: "bg-accent" },
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-mono text-primary">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-1 bg-white/5" indicatorClassName={item.color} />
              </div>
            ))}
            
            <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">System Attestation</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                Current network state verified against <span className="text-foreground font-medium">SLSA Level 4</span>. No cognitive drift detected in ephemeral nodes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergent Goals & Evolutionary Path */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-border/40 bg-card/20">
          <CardHeader>
            <CardTitle className="text-xl font-headline uppercase tracking-wider">Emergent System Goals</CardTitle>
            <CardDescription>Self-generated tasks based on global pulse anomalies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Supply Chain Resilience Swarm", desc: "Detected bottleneck in semiconductor lithography logs; orchestrating mitigation agents.", status: "EVOLVING" },
              { title: "Zero-Shot API Harmonization", desc: "Forging integration tool for newly released Decentralized Energy Protocol.", status: "FORGING" },
              { title: "Bio-Medical Hypothesis Forge", desc: "Analyzing cross-modal data from 12 cancer research labs for emergent patterns.", status: "ACTIVE" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-border/40 bg-background/20 hover:bg-background/40 transition-all group">
                <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold tracking-tight">{item.title}</h4>
                    <Badge variant="outline" className="text-[8px] font-mono tracking-widest border-primary/30 text-primary uppercase">{item.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Global Risk Matrix */}
        <Card className="border-border/40 bg-card/20 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-headline uppercase tracking-wider">Evolutionary Risk Matrix</CardTitle>
            <CardDescription>Identifying friction points in intelligence flow.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 h-full min-h-[350px]">
              <div className="border-r border-b border-border/40 p-8 flex flex-col justify-center items-center text-center space-y-3 group hover:bg-primary/5 transition-colors">
                <Waves className="h-10 w-10 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                <h5 className="text-xs font-bold uppercase tracking-[0.2em]">Cognitive Drift</h5>
                <p className="text-[10px] text-muted-foreground px-4 leading-relaxed font-light">Monitoring swarm nodes for divergence from core ethical consensus.</p>
              </div>
              <div className="border-b border-border/40 p-8 flex flex-col justify-center items-center text-center space-y-3 group hover:bg-accent/5 transition-colors">
                <Users className="h-10 w-10 text-accent opacity-40 group-hover:opacity-100 transition-opacity" />
                <h5 className="text-xs font-bold uppercase tracking-[0.2em]">Human Latency</h5>
                <p className="text-[10px] text-muted-foreground px-4 leading-relaxed font-light">Bottlenecks identified in expert consensus nodes during rapid-scale tasks.</p>
              </div>
              <div className="border-r border-border/40 p-8 flex flex-col justify-center items-center text-center space-y-3 group hover:bg-primary/5 transition-colors">
                <Zap className="h-10 w-10 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                <h5 className="text-xs font-bold uppercase tracking-[0.2em]">Forge Overhead</h5>
                <p className="text-[10px] text-muted-foreground px-4 leading-relaxed font-light">Optimizing sandbox instantiation for zero-shot tool generation.</p>
              </div>
              <div className="p-8 flex flex-col justify-center items-center text-center space-y-3 group hover:bg-sidebar-accent transition-colors">
                <Network className="h-10 w-10 text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity" />
                <h5 className="text-xs font-bold uppercase tracking-[0.2em]">Protocol Sync</h5>
                <p className="text-[10px] text-muted-foreground px-4 leading-relaxed font-light">Cross-modal alignment verification between financial and tech streams.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
