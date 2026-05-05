'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Zap,
  Globe,
  Eye,
  Cpu,
  ChevronRight,
  BookOpen,
  Target,
  BarChart3,
  Lightbulb,
  ArrowUpRight,
  Calendar,
  Star,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// ─── Trend Data ─────────────────────────────────────────────────────────────
const lmLandscape = [
  {
    category: '開源基礎模型',
    models: [
      { name: 'Llama 3.x', org: 'Meta', params: '8B / 70B / 405B', strength: '通用推理', maturity: 95 },
      { name: 'Mistral / Mixtral', org: 'Mistral AI', params: '7B / 8x7B', strength: '效率優先', maturity: 90 },
      { name: 'Qwen 2.5', org: 'Alibaba', params: '0.5B - 72B', strength: '多語言', maturity: 85 },
      { name: 'Gemma 3', org: 'Google', params: '1B - 27B', strength: '邊緣部署', maturity: 80 },
      { name: 'Phi-4', org: 'Microsoft', params: '3.8B - 14B', strength: '小模型推理', maturity: 82 },
    ],
  },
  {
    category: '程式碼專用模型',
    models: [
      { name: 'DeepSeek Coder V2', org: 'DeepSeek', params: '16B / 236B', strength: '程式碼生成', maturity: 92 },
      { name: 'CodeLlama', org: 'Meta', params: '7B - 70B', strength: '程式碼補全', maturity: 85 },
      { name: 'StarCoder2', org: 'BigCode', params: '3B - 15B', strength: '多語言程式碼', maturity: 80 },
    ],
  },
  {
    category: '多模態模型',
    models: [
      { name: 'LLaVA-Next', org: 'Community', params: '7B - 34B', strength: '視覺理解', maturity: 78 },
      { name: 'InternVL2', org: 'Shanghai AI Lab', params: '2B - 76B', strength: '視覺問答', maturity: 82 },
      { name: 'Qwen-VL', org: 'Alibaba', params: '7B - 72B', strength: '多語言視覺', maturity: 80 },
    ],
  },
];

const selectionGuide = [
  {
    useCase: '邊緣推理 / IoT',
    recommended: ['Gemma 3 1B-4B', 'Phi-4 3.8B', 'Qwen 2.5 0.5B-3B'],
    requirements: ['< 4GB VRAM', '低功耗', '離線運行'],
    tradeoffs: '能力受限，但延遲極低',
    icon: Zap,
  },
  {
    useCase: '程式碼助理 / IDE',
    recommended: ['DeepSeek Coder V2 16B', 'CodeLlama 13B', 'Qwen 2.5 Coder 7B'],
    requirements: ['8-16GB VRAM', '程式碼理解', 'FIM 支援'],
    tradeoffs: '需要較大記憶體，但程式碼品質高',
    icon: Brain,
  },
  {
    useCase: '企業 RAG / 知識庫',
    recommended: ['Llama 3.1 70B', 'Mistral Large', 'Qwen 2.5 72B'],
    requirements: ['40GB+ VRAM', '長上下文', '指令遵循'],
    tradeoffs: '資源消耗大，但準確率高',
    icon: BookOpen,
  },
  {
    useCase: '多模態理解',
    recommended: ['InternVL2 26B', 'LLaVA-Next 34B', 'Qwen-VL 72B'],
    requirements: ['24GB+ VRAM', '視覺編碼器', '多模態對齊'],
    tradeoffs: '需視覺硬體支援',
    icon: Eye,
  },
  {
    useCase: '代理人 / 工具調用',
    recommended: ['Llama 3.1 405B', 'Qwen 2.5 72B', 'Mistral Large 2'],
    requirements: ['Function Calling', '長上下文', '推理能力'],
    tradeoffs: '需要強推理能力，成本較高',
    icon: Cpu,
  },
  {
    useCase: '雲端高並發服務',
    recommended: ['Llama 3.1 8B (量化)', 'Mistral 7B', 'Gemma 3 4B'],
    requirements: ['高吞吐量', '批次推理', '成本效益'],
    tradeoffs: '平衡能力與成本',
    icon: Globe,
  },
];

const techTrends = [
  {
    trend: 'MoE 架構普及',
    description: '混合專家模型（Mixture of Experts）降低推理成本，Mixtral、DeepSeek-V3 等已驗證其效能。',
    impact: 'high',
    timeline: '2024-2025',
    relevance: 95,
  },
  {
    trend: '量化技術成熟',
    description: 'GGUF、AWQ、GPTQ 等量化方案使大模型在消費級硬體上運行，邊緣部署門檻大幅降低。',
    impact: 'high',
    timeline: '2024',
    relevance: 92,
  },
  {
    trend: '長上下文窗口',
    description: '主流模型支援 128K-1M token 上下文，RAG 架構需求部分被原生長上下文取代。',
    impact: 'medium',
    timeline: '2024-2025',
    relevance: 85,
  },
  {
    trend: '多模態原生整合',
    description: '視覺、語音、文字的原生多模態模型興起，取代管道式多模態方案。',
    impact: 'high',
    timeline: '2025',
    relevance: 88,
  },
  {
    trend: '推理效率優化',
    description: 'Speculative Decoding、Flash Attention 3、PagedAttention 等技術持續提升推理吞吐量。',
    impact: 'medium',
    timeline: '2024-2025',
    relevance: 80,
  },
  {
    trend: '代理人框架標準化',
    description: 'OpenAI Agents SDK、LangGraph、AutoGen 等框架趨向標準化，多代理協作模式成熟。',
    impact: 'high',
    timeline: '2025',
    relevance: 90,
  },
  {
    trend: '本地推理生態',
    description: 'Ollama、LM Studio、llama.cpp 等本地推理工具普及，開發者本地測試門檻降至最低。',
    impact: 'medium',
    timeline: '2024',
    relevance: 82,
  },
  {
    trend: '小模型能力躍升',
    description: '1B-7B 參數模型在特定任務上接近大模型表現，邊緣 AI 應用場景大幅擴展。',
    impact: 'high',
    timeline: '2024-2025',
    relevance: 94,
  },
];

const impactConfig: Record<string, { label: string; className: string }> = {
  high: { label: '高影響', className: 'border-accent/50 text-accent' },
  medium: { label: '中影響', className: 'border-primary/50 text-primary' },
  low: { label: '低影響', className: 'border-muted-foreground/50 text-muted-foreground' },
};

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function TrendsPage() {
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            技術趨勢展望
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            LM 推理全景、多模態生態、選型決策指南
          </p>
        </div>
        <Badge variant="outline" className="border-accent/50 text-accent gap-1.5">
          <Calendar className="h-3 w-3" />
          2024 Q4 — 2025 Q2
        </Badge>
      </div>

      <Tabs defaultValue="landscape">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="landscape">LM 推理全景</TabsTrigger>
          <TabsTrigger value="guide">選型決策指南</TabsTrigger>
          <TabsTrigger value="trends">技術趨勢</TabsTrigger>
        </TabsList>

        {/* LM Landscape Tab */}
        <TabsContent value="landscape" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl font-bold">
                  {lmLandscape.reduce((sum, cat) => sum + cat.models.length, 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">追蹤模型數</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl font-bold">{lmLandscape.length}</p>
                <p className="text-xs text-muted-foreground mt-1">模型類別</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl font-bold text-accent">87%</p>
                <p className="text-xs text-muted-foreground mt-1">平均成熟度</p>
              </CardContent>
            </Card>
          </div>

          {lmLandscape.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="text-base">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.models.map((model) => (
                    <div
                      key={model.name}
                      className="flex items-center justify-between rounded-md border border-border/40 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <Brain className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{model.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {model.org} · {model.params}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                          <p className="text-xs text-muted-foreground">強項</p>
                          <p className="text-xs font-medium">{model.strength}</p>
                        </div>
                        <div className="w-24">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">成熟度</span>
                            <span className="text-xs font-medium">{model.maturity}%</span>
                          </div>
                          <Progress value={model.maturity} className="h-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Selection Guide Tab */}
        <TabsContent value="guide" className="mt-6 space-y-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">選型決策框架</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    根據使用場景、硬體資源、延遲需求選擇最適合的開源 LM 模型。點擊卡片查看詳細建議。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectionGuide.map((guide, i) => {
              const Icon = guide.icon;
              const isSelected = selectedGuide === i;
              return (
                <Card
                  key={guide.useCase}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary/60 shadow-md shadow-primary/10'
                      : 'hover:border-primary/40'
                  }`}
                  onClick={() => setSelectedGuide(isSelected ? null : i)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm">{guide.useCase}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">推薦模型</p>
                      <div className="space-y-1">
                        {guide.recommended.map((model, j) => (
                          <div key={model} className="flex items-center gap-2 text-xs">
                            <Star
                              className={`h-3 w-3 ${
                                j === 0 ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'
                              }`}
                            />
                            <span className={j === 0 ? 'font-medium' : 'text-muted-foreground'}>
                              {model}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {isSelected && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1.5">硬體需求</p>
                          <div className="flex flex-wrap gap-1">
                            {guide.requirements.map((req) => (
                              <Badge key={req} variant="secondary" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-md bg-secondary/30 px-3 py-2 text-xs">
                          <p className="text-muted-foreground">取捨分析</p>
                          <p className="mt-0.5">{guide.tradeoffs}</p>
                        </div>
                      </>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-xs text-muted-foreground hover:text-foreground"
                    >
                      {isSelected ? '收合' : '查看詳情'}
                      <ChevronRight
                        className={`h-3 w-3 transition-transform ${isSelected ? 'rotate-90' : ''}`}
                      />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Tech Trends Tab */}
        <TabsContent value="trends" className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl font-bold">{techTrends.length}</p>
                <p className="text-xs text-muted-foreground mt-1">追蹤趨勢</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl font-bold text-accent">
                  {techTrends.filter((t) => t.impact === 'high').length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">高影響趨勢</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            {techTrends
              .sort((a, b) => b.relevance - a.relevance)
              .map((trend) => {
                const impact = impactConfig[trend.impact];
                return (
                  <Card
                    key={trend.trend}
                    className="transition-all hover:border-primary/40"
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 shrink-0">
                          <Lightbulb className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold">{trend.trend}</h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`text-xs ${impact.className}`}
                              >
                                {impact.label}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <Calendar className="h-2.5 w-2.5 mr-1" />
                                {trend.timeline}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1.5">
                            {trend.description}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">相關性</span>
                            <Progress value={trend.relevance} className="h-1 flex-1 max-w-24" />
                            <span className="text-xs font-medium">{trend.relevance}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>

          <Card className="border-accent/30 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4 text-accent" />
                對 MyCodeXvantaOS 的影響評估
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  area: 'connector-* 層',
                  impact: '需新增 Ollama、vLLM、TGI 等推理框架連接器',
                  priority: '高',
                },
                {
                  area: 'ai-llm 包裹',
                  impact: '擴展支援 GGUF 量化模型載入與本地推理',
                  priority: '高',
                },
                {
                  area: 'AI Team Orchestrator',
                  impact: '整合 Function Calling 標準，支援工具調用代理',
                  priority: '中',
                },
                {
                  area: 'platform-observability',
                  impact: '新增 LM 推理指標監控（tokens/s、TTFT、延遲）',
                  priority: '中',
                },
              ].map((item) => (
                <div
                  key={item.area}
                  className="flex items-start gap-3 rounded-md border border-border/40 px-3 py-2.5"
                >
                  <ArrowUpRight className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium font-mono">{item.area}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.impact}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`ml-auto shrink-0 text-xs ${
                      item.priority === '高'
                        ? 'border-accent/50 text-accent'
                        : 'border-primary/50 text-primary'
                    }`}
                  >
                    {item.priority}優先
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
