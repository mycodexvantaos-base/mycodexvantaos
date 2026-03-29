"use client";

import { useState } from "react";
import { forgeDynamicTool, ToolForgeOutput } from "@/ai/flows/zero-shot-tool-forge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Zap, Loader2, Terminal, ShieldCheck, Cpu, Code } from "lucide-react";

export default function ToolForgePage() {
  const [loading, setLoading] = useState(false);
  const [env, setEnv] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<ToolForgeOutput | null>(null);

  const handleForge = async () => {
    setLoading(true);
    try {
      const output = await forgeDynamicTool({
        environmentDescription: env,
        taskGoal: goal,
      });
      setResult(output);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto scanline">
      <div className="flex flex-col space-y-2 border-b border-border/20 pb-8">
        <div className="flex items-center gap-2 text-primary">
          <Cpu className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Sub-System: Tool Forge</span>
        </div>
        <h1 className="text-4xl font-bold font-headline tracking-tighter uppercase">即時工具鍛造 (Zero-Shot Tool Forge)</h1>
        <p className="text-muted-foreground font-light max-w-2xl">
          AI 實時研讀未知環境文件並生成即時控制代碼。任務完成後自動銷毀，實現極致的流動整合。
        </p>
      </div>

      {!result ? (
        <Card className="border-border/40 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg">Forge Configuration</CardTitle>
            <CardDescription>Input novelty parameters for tool generation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">未知環境描述 / 文件 (Novel Environment)</label>
              <Textarea 
                placeholder="貼上 API 文件、DOM 結構或系統行為描述..."
                className="bg-background/50 border-border/40 min-h-[200px] font-mono text-xs"
                value={env}
                onChange={(e) => setEnv(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">執行目標 (Action Goal)</label>
              <Textarea 
                placeholder="AI 需要在這個環境下執行什麼操作？"
                className="bg-background/50 border-border/40"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-bold uppercase tracking-widest"
              onClick={handleForge}
              disabled={loading || !env || !goal}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-2 h-4 w-4" />
              )}
              <span>鍛造即時工具 (FORGE TOOL)</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2 animate-in fade-in duration-500">
          <Card className="border-border/40 bg-card/30 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  Generated Ephemeral Code
                </CardTitle>
                <CardDescription>Generated for single-use execution.</CardDescription>
              </div>
              <Button size="sm" variant="ghost" className="text-xs uppercase tracking-tighter" onClick={() => setResult(null)}>Reset Forge</Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="p-4 bg-black/40 h-full font-mono text-[11px] leading-relaxed overflow-auto max-h-[600px] border-t border-border/20">
                <pre className="text-primary/90">{result.generatedCode}</pre>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
             <Card className="border-border/40 bg-card/30">
               <CardHeader>
                 <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                   <Code className="h-4 w-4" /> Reverse Engineering Report
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-sm text-muted-foreground leading-relaxed italic">{result.reverseEngineeringReport}</p>
               </CardContent>
             </Card>

             <Card className="border-primary/20 bg-primary/5">
               <CardHeader>
                 <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                   <ShieldCheck className="h-4 w-4" /> Automated Safety Audit
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center gap-4 p-4 rounded bg-background/50 border border-primary/20">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <ShieldCheck className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-medium leading-relaxed">{result.safetyAudit}</p>
                 </div>
               </CardContent>
             </Card>

             <div className="p-6 rounded-lg bg-sidebar-background border border-border/40 text-center">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Sandbox Execution Status</p>
                <Badge className="bg-primary text-primary-foreground font-mono text-[10px] px-4 py-1">READY_FOR_SINGLE_USE_DEPLOYMENT</Badge>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
