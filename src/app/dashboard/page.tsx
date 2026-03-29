"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, CheckCircle, FileCode, Activity, Cpu, Database, Network } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";

const performanceData = [
  { time: "09:00", reliability: 98.2, risk: 2 },
  { time: "10:00", reliability: 98.5, risk: 1.5 },
  { time: "11:00", reliability: 97.9, risk: 3.2 },
  { time: "12:00", reliability: 99.1, risk: 1.2 },
  { time: "13:00", reliability: 99.4, risk: 0.8 },
  { time: "14:00", reliability: 98.8, risk: 2.1 },
];

export default function DashboardOverview() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto scanline">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Cpu className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">System Status: Operational</span>
          </div>
          <h1 className="text-4xl font-bold font-headline tracking-tighter">Architecture Command Center</h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Real-time monitoring of machine-friendly architecture protocols, SLSA Level 3 compliance, and NIST IR 8536 traceability chains.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Audit Cycle</p>
            <p className="text-xl font-mono">Q2-2024.05</p>
          </div>
          <div className="h-12 w-[1px] bg-border" />
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Reliability Index</p>
            <p className="text-xl font-mono text-primary">99.98%</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Arch Score", value: "95/100", trend: "+60%", icon: Shield, color: "text-primary" },
          { label: "SLSA Level", value: "Level 3", trend: "Certified", icon: CheckCircle, color: "text-primary" },
          { label: "Active Risks", value: "2", trend: "Low Severity", icon: AlertTriangle, color: "text-accent" },
          { label: "Protocol Sync", value: "5/5", trend: "HTTP/MQTT/gRPC", icon: Network, color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card border-border/40 hover:border-primary/50 transition-colors cursor-default group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono tracking-tighter">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                <Activity className="h-3 w-3" /> {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/40 bg-card/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-headline">Architecture Reliability Trend</CardTitle>
                <CardDescription>Meticulous analysis of system stability over time.</CardDescription>
              </div>
              <Tabs defaultValue="24h" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2 bg-background/50 border border-border/40">
                  <TabsTrigger value="24h" className="text-[10px] uppercase font-bold">24 Hours</TabsTrigger>
                  <TabsTrigger value="7d" className="text-[10px] uppercase font-bold">7 Days</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorReliability" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                  domain={[95, 100]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="reliability" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorReliability)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Governance Compliance</CardTitle>
            <CardDescription>Status across key regulatory frameworks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            {[
              { label: "NIST IR 8536 (Traceability)", value: 95, color: "bg-primary" },
              { label: "SLSA Framework (Supply Chain)", value: 100, color: "bg-primary" },
              { label: "ISO 23081 (Metadata Governance)", value: 88, color: "bg-accent" },
              { label: "GDPR Compliance (Privacy)", value: 92, color: "bg-primary" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                  <span>{item.label}</span>
                  <span className="font-mono">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-1 bg-white/5" indicatorClassName={item.color} />
              </div>
            ))}
            <div className="mt-8 p-4 rounded bg-background/50 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-bold uppercase text-primary">Audit Log: Active</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Metadata schema validation engine detected 2 deviations in non-critical nodes. Remediation suggested via RACI Matrix update.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/40 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Core Architectural Refinements</CardTitle>
            <CardDescription>Meticulous improvements for mission-critical reliability.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Schema-Driven Metadata Governance", desc: "Adopted ISO 23081 for metadata registries, reducing lookup errors by 45%.", status: "Validated" },
                { title: "SLSA Level 3 Implementation", desc: "Automated provenance generation for all build artifacts with cosign/Rekor.", status: "Active" },
                { title: "Protocol Harmonization Layer", desc: "Middleware abstraction for MQTT/OPC UA/gRPC ensuring semantic consistency.", status: "Verified" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded border border-border/40 bg-background/20 group hover:bg-background/40 transition-colors">
                  <div className="h-10 w-10 shrink-0 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold">{item.title}</h4>
                      <Badge variant="outline" className="text-[9px] uppercase border-primary/30 text-primary">{item.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/30 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Audit Risk Matrix</CardTitle>
            <CardDescription>Identifying potential package/service mismatches.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 h-full min-h-[300px]">
              <div className="border-r border-b border-border/40 p-4 flex flex-col justify-center items-center text-center space-y-2">
                <AlertTriangle className="h-8 w-8 text-accent opacity-50" />
                <h5 className="text-[10px] font-bold uppercase tracking-widest">Metadata Inconsistency</h5>
                <p className="text-[9px] text-muted-foreground px-4">Risk of service/performance confusion in legacy nodes.</p>
              </div>
              <div className="border-b border-border/40 p-4 flex flex-col justify-center items-center text-center space-y-2 bg-accent/5">
                <Shield className="h-8 w-8 text-primary opacity-50" />
                <h5 className="text-[10px] font-bold uppercase tracking-widest">Schema Drift</h5>
                <p className="text-[9px] text-muted-foreground px-4">Detected version control mismatch in deployment YAML.</p>
              </div>
              <div className="border-r border-border/40 p-4 flex flex-col justify-center items-center text-center space-y-2">
                <Activity className="h-8 w-8 text-primary opacity-50" />
                <h5 className="text-[10px] font-bold uppercase tracking-widest">Protocol Latency</h5>
                <p className="text-[9px] text-muted-foreground px-4">OPC UA to MQTT translation overhead check required.</p>
              </div>
              <div className="p-4 flex flex-col justify-center items-center text-center space-y-2">
                <FileCode className="h-8 w-8 text-muted-foreground opacity-50" />
                <h5 className="text-[10px] font-bold uppercase tracking-widest">Governance Gap</h5>
                <p className="text-[9px] text-muted-foreground px-4">RACI Matrix requires update for Stakeholder B.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}