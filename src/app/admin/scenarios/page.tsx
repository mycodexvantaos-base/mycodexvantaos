'use client';

import { useState } from 'react';
import {
  Grid3X3,
  Plus,
  Search,
  Filter,
  Cpu,
  Globe,
  Layers,
  Zap,
  Database,
  Brain,
  Eye,
  Mic,
  Code2,
  ChevronRight,
  Star,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ─── Scenario Data ──────────────────────────────────────────────────────────
const scenarios = [
  {
    id: 'lm-inference-edge',
    title: 'LM 邊緣推理',
    category: 'edge',
    icon: Zap,
    priority: 'high',
    status: 'active',
    description: '在邊緣設備上部署輕量化語言模型，實現低延遲本地推理，無需雲端連接。',
    connectors: ['connector-redis', 'native-queue'],
    capabilities: ['推理加速', '模型量化', '離線運行', '低功耗'],
    estimatedLatency: '< 50ms',
    modelSize: '1B - 7B',
    tags: ['邊緣運算', 'LM 推理', '離線'],
  },
  {
    id: 'multimodal-pipeline',
    title: '多模態處理管道',
    category: 'multimodal',
    icon: Eye,
    priority: 'high',
    status: 'active',
    description: '整合文字、圖像、音頻的多模態 AI 處理管道，支援跨模態理解與生成。',
    connectors: ['connector-s3', 'connector-kafka', 'connector-redis'],
    capabilities: ['視覺理解', '語音識別', '跨模態融合', '串流處理'],
    estimatedLatency: '200ms - 2s',
    modelSize: '7B - 70B',
    tags: ['多模態', '視覺', '音頻'],
  },
  {
    id: 'code-generation-studio',
    title: '程式碼生成工作站',
    category: 'code',
    icon: Code2,
    priority: 'high',
    status: 'active',
    description: 'AI 驅動的程式碼生成、重構、測試生成一體化工作站，整合 IDE 工作流。',
    connectors: ['connector-github', 'connector-postgresql'],
    capabilities: ['程式碼補全', '重構建議', '測試生成', '文檔生成'],
    estimatedLatency: '100ms - 500ms',
    modelSize: '7B - 34B',
    tags: ['程式碼', 'IDE', '開發工具'],
  },
  {
    id: 'rag-knowledge-base',
    title: 'RAG 知識庫系統',
    category: 'rag',
    icon: Database,
    priority: 'medium',
    status: 'active',
    description: '基於向量資料庫的檢索增強生成系統，支援大規模企業知識庫問答。',
    connectors: ['connector-postgresql', 'connector-elastic', 'connector-redis'],
    capabilities: ['向量檢索', '語義搜尋', '知識更新', '引用追蹤'],
    estimatedLatency: '300ms - 1s',
    modelSize: '7B - 70B',
    tags: ['RAG', '知識庫', '企業'],
  },
  {
    id: 'agent-orchestration',
    title: 'AI 代理人編排',
    category: 'agent',
    icon: Brain,
    priority: 'high',
    status: 'development',
    description: '多代理人協作框架，支援任務分解、角色分配、並行執行與治理合規。',
    connectors: ['connector-kafka', 'connector-redis', 'connector-postgresql'],
    capabilities: ['任務分解', '代理協作', '工作流執行', '治理合規'],
    estimatedLatency: '1s - 10s',
    modelSize: '7B - 70B',
    tags: ['代理人', '多代理', '自動化'],
  },
  {
    id: 'voice-assistant',
    title: '語音 AI 助理',
    category: 'multimodal',
    icon: Mic,
    priority: 'medium',
    status: 'planned',
    description: '端到端語音 AI 助理，整合 STT、LLM 推理、TTS，支援即時對話。',
    connectors: ['connector-s3', 'connector-redis'],
    capabilities: ['語音識別', '即時對話', '情感分析', '多語言'],
    estimatedLatency: '500ms - 2s',
    modelSize: '1B - 13B',
    tags: ['語音', '對話', '即時'],
  },
  {
    id: 'cloud-native-inference',
    title: '雲原生推理服務',
    category: 'cloud',
    icon: Globe,
    priority: 'medium',
    status: 'active',
    description: '基於 Kubernetes 的彈性 LM 推理服務，支援自動擴縮容與多模型路由。',
    connectors: ['connector-kafka', 'connector-postgresql', 'connector-redis'],
    capabilities: ['自動擴縮', '模型路由', '負載均衡', '監控告警'],
    estimatedLatency: '100ms - 1s',
    modelSize: '7B - 405B',
    tags: ['雲原生', 'K8s', '推理服務'],
  },
  {
    id: 'platform-monitoring',
    title: '平台可觀測性',
    category: 'ops',
    icon: Layers,
    priority: 'medium',
    status: 'active',
    description: '全平台可觀測性方案，整合指標、日誌、追蹤，支援 AI 異常偵測。',
    connectors: ['connector-elastic', 'connector-postgresql', 'connector-redis'],
    capabilities: ['指標收集', '日誌聚合', '分散式追蹤', 'AI 異常偵測'],
    estimatedLatency: '即時',
    modelSize: 'N/A',
    tags: ['可觀測性', '監控', '運維'],
  },
];

const categories = [
  { value: 'all', label: '全部場景' },
  { value: 'edge', label: '邊緣推理' },
  { value: 'multimodal', label: '多模態' },
  { value: 'code', label: '程式碼' },
  { value: 'rag', label: 'RAG' },
  { value: 'agent', label: '代理人' },
  { value: 'cloud', label: '雲原生' },
  { value: 'ops', label: '運維' },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: '運行中', className: 'border-accent/50 text-accent' },
  development: { label: '開發中', className: 'border-primary/50 text-primary' },
  planned: { label: '規劃中', className: 'border-yellow-500/50 text-yellow-500' },
};

const priorityConfig: Record<string, { label: string; stars: number }> = {
  high: { label: '高優先', stars: 3 },
  medium: { label: '中優先', stars: 2 },
  low: { label: '低優先', stars: 1 },
};

// ─── Scenario Card ──────────────────────────────────────────────────────────
function ScenarioCard({ scenario }: { scenario: (typeof scenarios)[0] }) {
  const status = statusConfig[scenario.status];
  const priority = priorityConfig[scenario.priority];
  const Icon = scenario.icon;

  return (
    <Card className="group transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{scenario.title}</CardTitle>
              <div className="flex items-center gap-1 mt-0.5">
                {Array.from({ length: priority.stars }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                ))}
                {Array.from({ length: 3 - priority.stars }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-muted-foreground/30" />
                ))}
              </div>
            </div>
          </div>
          <Badge variant="outline" className={`text-xs ${status.className}`}>
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{scenario.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-secondary/30 px-2 py-1.5">
            <p className="text-muted-foreground">延遲</p>
            <p className="font-medium mt-0.5">{scenario.estimatedLatency}</p>
          </div>
          <div className="rounded-md bg-secondary/30 px-2 py-1.5">
            <p className="text-muted-foreground">模型規模</p>
            <p className="font-medium mt-0.5">{scenario.modelSize}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1.5">所需連接器</p>
          <div className="flex flex-wrap gap-1">
            {scenario.connectors.map((c) => (
              <Badge key={c} variant="secondary" className="text-xs font-mono">
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1.5">核心能力</p>
          <div className="flex flex-wrap gap-1">
            {scenario.capabilities.map((cap) => (
              <Badge key={cap} variant="outline" className="text-xs border-border/60">
                {cap}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {scenario.tags.map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-xs text-muted-foreground hover:text-foreground"
        >
          查看詳細配置
          <ChevronRight className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Matrix View ────────────────────────────────────────────────────────────
function MatrixView() {
  const matrixData = [
    { scenario: 'LM 邊緣推理', edge: true, cloud: false, realtime: true, batch: false, cost: '低', complexity: '中' },
    { scenario: '多模態管道', edge: false, cloud: true, realtime: false, batch: true, cost: '高', complexity: '高' },
    { scenario: '程式碼生成', edge: false, cloud: true, realtime: true, batch: true, cost: '中', complexity: '中' },
    { scenario: 'RAG 知識庫', edge: false, cloud: true, realtime: true, batch: true, cost: '中', complexity: '中' },
    { scenario: '代理人編排', edge: false, cloud: true, realtime: false, batch: true, cost: '高', complexity: '高' },
    { scenario: '語音助理', edge: true, cloud: true, realtime: true, batch: false, cost: '中', complexity: '高' },
    { scenario: '雲原生推理', edge: false, cloud: true, realtime: true, batch: true, cost: '高', complexity: '中' },
    { scenario: '可觀測性', edge: true, cloud: true, realtime: true, batch: true, cost: '低', complexity: '低' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-3 text-muted-foreground font-medium">應用場景</th>
            <th className="text-center py-2 px-3 text-muted-foreground font-medium">邊緣</th>
            <th className="text-center py-2 px-3 text-muted-foreground font-medium">雲端</th>
            <th className="text-center py-2 px-3 text-muted-foreground font-medium">即時</th>
            <th className="text-center py-2 px-3 text-muted-foreground font-medium">批次</th>
            <th className="text-center py-2 px-3 text-muted-foreground font-medium">成本</th>
            <th className="text-center py-2 px-3 text-muted-foreground font-medium">複雜度</th>
          </tr>
        </thead>
        <tbody>
          {matrixData.map((row, i) => (
            <tr key={i} className="border-b border-border/40 hover:bg-secondary/20">
              <td className="py-2 px-3 font-medium">{row.scenario}</td>
              <td className="py-2 px-3 text-center">
                {row.edge ? (
                  <span className="text-accent">✓</span>
                ) : (
                  <span className="text-muted-foreground/30">—</span>
                )}
              </td>
              <td className="py-2 px-3 text-center">
                {row.cloud ? (
                  <span className="text-accent">✓</span>
                ) : (
                  <span className="text-muted-foreground/30">—</span>
                )}
              </td>
              <td className="py-2 px-3 text-center">
                {row.realtime ? (
                  <span className="text-accent">✓</span>
                ) : (
                  <span className="text-muted-foreground/30">—</span>
                )}
              </td>
              <td className="py-2 px-3 text-center">
                {row.batch ? (
                  <span className="text-accent">✓</span>
                ) : (
                  <span className="text-muted-foreground/30">—</span>
                )}
              </td>
              <td className="py-2 px-3 text-center">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    row.cost === '低'
                      ? 'border-accent/40 text-accent'
                      : row.cost === '中'
                      ? 'border-primary/40 text-primary'
                      : 'border-destructive/40 text-destructive'
                  }`}
                >
                  {row.cost}
                </Badge>
              </td>
              <td className="py-2 px-3 text-center">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    row.complexity === '低'
                      ? 'border-accent/40 text-accent'
                      : row.complexity === '中'
                      ? 'border-primary/40 text-primary'
                      : 'border-destructive/40 text-destructive'
                  }`}
                >
                  {row.complexity}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function ScenariosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredScenarios = scenarios.filter((s) => {
    const matchesSearch =
      searchQuery === '' ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Grid3X3 className="h-6 w-6 text-primary" />
            應用場景矩陣
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            LM 推理、多模態生態、邊緣運算等應用場景管理
          </p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          新增場景
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        <Card className="text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold">{scenarios.length}</p>
            <p className="text-xs text-muted-foreground mt-1">總場景數</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-accent">
              {scenarios.filter((s) => s.status === 'active').length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">運行中</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-primary">
              {scenarios.filter((s) => s.status === 'development').length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">開發中</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-yellow-500">
              {scenarios.filter((s) => s.status === 'planned').length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">規劃中</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="cards">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="cards">卡片視圖</TabsTrigger>
            <TabsTrigger value="matrix">矩陣視圖</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋場景..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 w-48 text-sm"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-9 w-36 text-sm">
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="cards" className="mt-4">
          {filteredScenarios.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Cpu className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p>未找到符合條件的場景</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredScenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="matrix" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">場景特性對比矩陣</CardTitle>
              <CardDescription>各場景在部署環境、處理模式、成本與複雜度的對比</CardDescription>
            </CardHeader>
            <CardContent>
              <MatrixView />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Quick Scenario Generator */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-primary" />
            快速場景生成器
          </CardTitle>
          <CardDescription>
            根據需求快速生成應用場景配置建議
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: '邊緣推理場景', icon: Zap, desc: '低延遲、離線' },
              { label: '多模態場景', icon: Eye, desc: '視覺+語音+文字' },
              { label: '代理人場景', icon: Brain, desc: '多代理協作' },
              { label: '雲原生場景', icon: Globe, desc: '彈性擴縮容' },
            ].map((item) => (
              <Button
                key={item.label}
                variant="outline"
                className="h-auto flex-col gap-1.5 py-4 hover:border-primary/50 hover:bg-primary/5"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
