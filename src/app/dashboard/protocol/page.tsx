
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Network, Zap, Activity, ShieldCheck, Cpu, Code, Target, Waves } from "lucide-react";

export default function ProtocolPage() {
  const protocolPillars = [
    {
      id: "swarm",
      title: "認知流動層 (Cognitive Fluidity)",
      icon: Network,
      description: "基於 NRP 協議的動態蜂群智慧系統，實現專家 Agent 的即時組合與任務拆解。",
      content: {
        target: "建立去中心化的多智能體智慧協作層，讓專精模型根據需求即時組合、動態分工。",
        steps: [
          "能力向量註冊表：利用 Chroma/Milvus 向量資料庫儲存 Agent 能力向量。",
          "語義路由器 (Semantic Router)：在推理前以語意向量決定路由，將請求導向最佳工具。",
          "動態競標機制：引入 Contract Net Protocol (CNP) 進行任務協調與談判。",
          "決策融合：採用 Ensemble 方法與中央管理者 Agent 整合最終輸出。"
        ],
        frameworks: ["LangGraph", "CrewAI", "OpenAI Swarm", "Semantic Router"]
      }
    },
    {
      id: "action",
      title: "泛在行動網 (Ubiquitous Action)",
      icon: Zap,
      description: "Zero-Shot 工具生成與自主執行架構，賦予 AI 代理操作任何未知環境的能力。",
      content: {
        target: "實現 AI 從思考到行動的閉環，具備即時創建工具並操作任何介面的能力。",
        steps: [
          "界面探勘：採用 Playwright/BrowserGym 進行 DOM 結構與 API 文件解析。",
          "動態代碼生成：利用 LLM 配合 Python REPL 動態生成控制腳本。",
          "隔離沙盒執行：在 Docker 容器中執行生成的指令，確保系統安全性。",
          "自我修正迴圈：透過 Reflexion 模式讀取錯誤日誌並自動調整策略。"
        ],
        frameworks: ["OpenDevin", "AutoGPT", "BabyAGI", "IPython REPL"]
      }
    },
    {
      id: "evolution",
      title: "有機目標演化 (Goal Evolution)",
      icon: Activity,
      description: "環境感知驅動的目標演化架構，自動從全球數據異常中識別趨勢並生成任務。",
      content: {
        target: "從被動響應轉向主動感知，建立全球異常檢測矩陣並動態演化任務目標。",
        steps: [
          "全球數據串流：接入 Kafka/Flink 處理新聞、金融、GitHub 等異構資料流。",
          "異常檢測矩陣：建立穩定性基線，透過 LLM 辨識語意異常模式。",
          "自發性任務生成：針對異常觸發 Self-Instructing Prompts 生成行動計畫。",
          "多目標最佳化：透過強化學習動態調整任務優先級與資源分配。"
        ],
        frameworks: ["HuggingGPT", "SentinelAgent", "Apache Flink", "Global Pulse Sensing"]
      }
    },
    {
      id: "consensus",
      title: "價值與資源共識 (Consensus)",
      icon: ShieldCheck,
      description: "人類智慧融合與價值對齊機制，確保系統在複雜決策上的可靠性與倫理合規。",
      content: {
        target: "建立不確定性量化評估，將人類專家智慧納入 AI 決策迴圈，形成人機共識。",
        steps: [
          "信心閾值量化：使用 CoT-UQ 方法評估決策不確定性，觸發人類審核。",
          "動態懸賞系統：借鑒 Bittensor 模式，自動發布難題懸賞請全球專家協作。",
          "向量化知識吸收：將專家推理過程轉化為向量記憶，實現系統持續學習。",
          "對齊與治理：透過 RLHF 與監督者 Agent 確保行動符合人類期望。"
        ],
        frameworks: ["Bittensor TAO", "OpenAI Evals", "RLAIF", "Audit Trail Dashboard"]
      }
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto scanline">
      <div className="flex flex-col space-y-4 border-b border-border/20 pb-10">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Liquid Protocol Whitepaper</span>
        </div>
        <h1 className="text-5xl font-bold font-headline tracking-tighter uppercase max-w-4xl leading-tight">
          流動型超級智慧網絡 <span className="text-primary italic">實作指南</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl font-light">
          構建具備有機性與流動性的動態多智能體系統。本指南詳細闡述從認知流動到價值共識的四大核心架構實作策略。
        </p>
      </div>

      <Tabs defaultValue="swarm" className="space-y-8">
        <TabsList className="bg-white/5 border border-white/10 p-1 h-14 w-full justify-start overflow-x-auto">
          {protocolPillars.map((pillar) => (
            <TabsTrigger 
              key={pillar.id} 
              value={pillar.id} 
              className="px-8 font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <pillar.icon className="mr-2 h-4 w-4" />
              <span>{pillar.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {protocolPillars.map((pillar) => (
          <TabsContent key={pillar.id} value={pillar.id} className="animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center gap-3">
                      <pillar.icon className="h-6 w-6 text-primary" />
                      {pillar.title} 實作細節
                    </CardTitle>
                    <CardDescription className="text-sm font-light text-muted-foreground">{pillar.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                        <Target className="h-4 w-4" /> 核心目標
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{pillar.content.target}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                        <Code className="h-4 w-4" /> 具體實作步驟
                      </h4>
                      <div className="grid gap-4">
                        {pillar.content.steps.map((step, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/40">
                            <span className="text-xs font-mono text-primary font-bold">0{i+1}</span>
                            <p className="text-xs leading-relaxed text-muted-foreground">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="border-border/40 bg-card/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> 相關現有框架與工具
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pillar.content.frameworks.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10 group hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold uppercase tracking-tighter">{f}</span>
                        <Badge variant="outline" className="text-[9px] border-primary/20 text-primary">VERIFIED</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="p-8 rounded-3xl border border-primary/10 bg-primary/5 space-y-4 text-center">
                  <Waves className="h-10 w-10 text-primary mx-auto animate-pulse" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Implementation Status</p>
                  <div className="text-4xl font-mono font-bold text-primary">DEPLOYED</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed px-4">
                    該模組已成功整合至 Sentinel 核心協議，具備實時調度能力。
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
