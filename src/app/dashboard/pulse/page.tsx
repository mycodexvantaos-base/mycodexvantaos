"use client";

import { useState } from "react";
import { senseGlobalPulse, PulseSensingOutput } from "@/ai/flows/global-pulse-sensing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Globe, Loader2, AlertCircle, Zap, Waves } from "lucide-react";

export default function PulseSensingPage() {
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState<PulseSensingOutput | null>(null);

  const startSensing = async () => {
    setLoading(true);
    try {
      const result = await senseGlobalPulse({
        dataStreams: ["Global Supply Chain Indices", "GitHub Open Source Velocity", "Satellite Thermal Imaging", "Geopolitical News Clusters"],
        region: "Global"
      });
      setPulse(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto scanline">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/20 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Globe className="h-5 w-5 animate-spin-slow" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Environmental Perception: Active</span>
          </div>
          <h1 className="text-5xl font-bold font-headline tracking-tighter">全球脈動感測儀</h1>
          <p className="text-muted-foreground max-w-2xl text-sm font-light leading-relaxed">
            透過神經元節點持續監聽全球數據流，自動從異常中識別趨勢並生成系統演化目標。
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12 h-12" 
          onClick={startSensing}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Waves className="mr-2 h-4 w-4" />
          )}
          <span>開啟全球感知 (INVOKE PERCEPTION)</span>
        </Button>
      </div>

      {!pulse ? (
        <div className="h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-primary/10 rounded-3xl space-y-6 bg-primary/5">
           <Activity className="h-16 w-16 text-primary/20 animate-pulse" />
           <p className="text-muted-foreground font-medium tracking-widest uppercase text-xs">等待感測器數據流注入...</p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Globe className="h-32 w-32" />
               </div>
               <CardHeader>
                 <CardTitle className="text-2xl font-headline">網絡穩定性評估</CardTitle>
                 <CardDescription className="font-mono text-[10px] uppercase tracking-widest">Global Stability Metric</CardDescription>
               </CardHeader>
               <CardContent>
                 <p className="text-xl font-light leading-relaxed text-foreground">{pulse.globalSentiment}</p>
               </CardContent>
            </Card>

            <div className="grid gap-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> 異常偵測日誌 (Detected Anomalies)
              </h3>
              {pulse.detectedAnomalies.map((anomaly, i) => (
                <Card key={i} className="border-border/40 bg-card/30 hover:bg-card/50 transition-colors group">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <Badge variant={anomaly.severity === 'CRITICAL' ? 'destructive' : 'secondary'} className="text-[9px] uppercase font-bold px-3">
                           {anomaly.severity}
                         </Badge>
                         <span className="text-xs font-mono text-muted-foreground">{anomaly.source}</span>
                      </div>
                      <CardTitle className="text-lg font-headline pt-1">{anomaly.description}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                       <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                         <Zap className="h-3 w-3" /> 系統反應策略
                       </h4>
                       <p className="text-sm text-muted-foreground italic leading-relaxed">{anomaly.suggestedAction}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
             <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                   <CardTitle className="text-xl font-headline flex items-center gap-2 text-accent">
                     <Zap className="h-5 w-5" /> 自發性目標 (Emergent Goals)
                   </CardTitle>
                   <CardDescription className="text-[10px] uppercase tracking-widest text-accent/60">Autonomous task generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   {pulse.emergentGoals.map((goal, i) => (
                     <div key={i} className="p-4 rounded border border-accent/20 bg-background/50 group hover:border-accent transition-all">
                        <div className="flex items-center gap-3">
                           <div className="h-6 w-6 rounded-full border border-accent/40 flex items-center justify-center text-[10px] font-mono text-accent">
                             {i + 1}
                           </div>
                           <p className="text-sm font-medium leading-relaxed">{goal}</p>
                        </div>
                     </div>
                   ))}
                </CardContent>
             </Card>

             <div className="p-8 rounded-3xl border border-border/40 bg-sidebar-background/50 space-y-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Sensing Accuracy</p>
                <div className="text-4xl font-mono font-bold text-primary">99.8%</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  基於 104,203 個全域節點實時回傳，數據信度達 Cronbach’s α = 0.94
                </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
