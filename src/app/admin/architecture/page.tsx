'use client';

import { useState } from 'react';
import {
  Layers,
  Package,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Info,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

// ─── Architecture Data ──────────────────────────────────────────────────────
const architectureLayers = [
  {
    id: 'A',
    name: 'Application Layer',
    nameZh: '應用層',
    description: '用戶端應用生成與 Studio 工具',
    color: 'border-accent/60 bg-accent/5',
    headerColor: 'bg-accent/10 text-accent',
    packages: [
      { name: 'builder', status: 'complete', tests: 15, desc: '應用建構引擎' },
      { name: 'ui-generator', status: 'complete', tests: 15, desc: 'UI 元件生成器' },
      { name: 'app-dev-studio', status: 'complete', tests: 15, desc: 'MyCodeXvantaOS Studio 核心' },
    ],
  },
  {
    id: 'B',
    name: 'Runtime & Execution Layer',
    nameZh: '執行層',
    description: '多環境執行引擎與背景任務排程',
    color: 'border-primary/60 bg-primary/5',
    headerColor: 'bg-primary/10 text-primary',
    packages: [
      { name: 'runtime', status: 'complete', tests: 15, desc: '核心執行環境' },
      { name: 'execution', status: 'complete', tests: 15, desc: '任務執行引擎' },
      { name: 'background-job-runtime', status: 'complete', tests: 15, desc: '背景任務執行器' },
    ],
  },
  {
    id: 'C',
    name: 'Native Services Layer',
    nameZh: '原生服務層',
    description: '平台級基礎設施原語',
    color: 'border-blue-500/60 bg-blue-500/5',
    headerColor: 'bg-blue-500/10 text-blue-400',
    packages: [
      { name: 'core-auth', status: 'complete', tests: 15, desc: '認證與授權' },
      { name: 'core-kernel', status: 'complete', tests: 15, desc: '系統核心' },
      { name: 'core-gateway', status: 'complete', tests: 15, desc: 'API 閘道' },
      { name: 'core-config', status: 'complete', tests: 15, desc: '配置管理' },
      { name: 'database', status: 'complete', tests: 15, desc: '資料庫抽象層' },
      { name: 'storage', status: 'complete', tests: 15, desc: '雲端儲存' },
      { name: 'events', status: 'complete', tests: 15, desc: '事件匯流排' },
      { name: 'native-logging', status: 'complete', tests: 15, desc: '日誌系統' },
      { name: 'native-queue', status: 'complete', tests: 15, desc: '佇列管理' },
      { name: 'native-validation', status: 'complete', tests: 15, desc: '驗證引擎' },
      { name: 'ssl-manager', status: 'complete', tests: 15, desc: 'SSL 憑證管理' },
    ],
  },
  {
    id: 'D',
    name: 'Connector Layer',
    nameZh: '連接器層',
    description: '外部系統整合介面',
    color: 'border-purple-500/60 bg-purple-500/5',
    headerColor: 'bg-purple-500/10 text-purple-400',
    packages: [
      { name: 'connector-github', status: 'complete', tests: 15, desc: 'GitHub 整合' },
      { name: 'connector-kafka', status: 'complete', tests: 15, desc: 'Kafka 訊息佇列' },
      { name: 'connector-mongodb', status: 'complete', tests: 15, desc: 'MongoDB 連接器' },
      { name: 'connector-postgresql', status: 'complete', tests: 15, desc: 'PostgreSQL 連接器' },
      { name: 'connector-redis', status: 'complete', tests: 15, desc: 'Redis 快取' },
      { name: 'connector-s3', status: 'complete', tests: 15, desc: 'S3 物件儲存' },
      { name: 'connector-elastic', status: 'complete', tests: 15, desc: 'Elasticsearch 搜尋' },
      { name: 'connector-auth', status: 'complete', tests: 15, desc: '認證連接器' },
    ],
  },
  {
    id: 'E',
    name: 'Deployment Layer',
    nameZh: '部署層',
    description: 'GitOps 驅動的部署編排',
    color: 'border-orange-500/60 bg-orange-500/5',
    headerColor: 'bg-orange-500/10 text-orange-400',
    packages: [
      { name: 'deployment', status: 'complete', tests: 15, desc: '部署引擎' },
      { name: 'deployment-manifest-generator', status: 'complete', tests: 15, desc: 'Manifest 生成器' },
      { name: 'argocd-gitops', status: 'complete', tests: 12, desc: 'ArgoCD GitOps' },
      { name: 'kubernetes-base', status: 'partial', tests: 8, desc: 'K8s 基礎配置' },
      { name: 'helm-charts', status: 'partial', tests: 6, desc: 'Helm 圖表' },
    ],
  },
  {
    id: 'F',
    name: 'Governance Layer',
    nameZh: '治理層',
    description: '命名策略、合規驗證、審計',
    color: 'border-yellow-500/60 bg-yellow-500/5',
    headerColor: 'bg-yellow-500/10 text-yellow-400',
    packages: [
      { name: 'governance-policy', status: 'complete', tests: 15, desc: '治理策略引擎' },
      { name: 'ci-validate-architecture', status: 'complete', tests: 15, desc: '架構 CI 驗證' },
      { name: 'naming-spec-v1', status: 'complete', tests: 15, desc: '命名規範 v1' },
      { name: 'capability-set', status: 'complete', tests: 15, desc: '能力集定義' },
      { name: 'urn-registry', status: 'partial', tests: 8, desc: 'URN 命名空間' },
      { name: 'provider-registry', status: 'partial', tests: 6, desc: 'Provider 登記' },
    ],
  },
];

const aiModules = [
  {
    name: 'mycodexvantaos-ai-team-orchestrator',
    desc: '多代理協作、任務分解、工作流執行',
    files: ['agent-manager.ts', 'message-bus.ts', 'orchestrator.ts', 'task-decomposer.ts', 'workflow-engine.ts', 'governance-enforcer.ts'],
  },
  {
    name: 'mycodexvantaos-persona-engine',
    desc: '9 種 Persona 原型、語意遮罩偵測、根因分析',
    files: ['persona-manager.ts', 'mask-detector.ts', 'root-cause-analyzer.ts', 'solution-generator.ts'],
  },
  {
    name: 'mycodexvantaos-agent-toolkit',
    desc: '代理人工具集、能力擴展框架',
    files: ['tool-registry.ts', 'capability-loader.ts', 'agent-factory.ts'],
  },
];

// ─── Package Item ───────────────────────────────────────────────────────────
function PackageItem({
  pkg,
}: {
  pkg: { name: string; status: string; tests: number; desc: string };
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border/40 px-3 py-2 text-sm">
      <div className="flex items-center gap-2">
        {pkg.status === 'complete' ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
        ) : (
          <Circle className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
        )}
        <span className="font-mono text-xs">{pkg.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground hidden sm:block">{pkg.desc}</span>
        <Badge
          variant="outline"
          className={`text-xs ${
            pkg.status === 'complete'
              ? 'border-accent/40 text-accent'
              : 'border-yellow-500/40 text-yellow-500'
          }`}
        >
          {pkg.tests} tests
        </Badge>
      </div>
    </div>
  );
}

// ─── Layer Card ─────────────────────────────────────────────────────────────
function LayerCard({ layer }: { layer: (typeof architectureLayers)[0] }) {
  const [open, setOpen] = useState(layer.id === 'A' || layer.id === 'D');
  const complete = layer.packages.filter((p) => p.status === 'complete').length;
  const pct = Math.round((complete / layer.packages.length) * 100);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className={`border ${layer.color} transition-all`}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${layer.headerColor}`}
                >
                  {layer.id}
                </div>
                <div>
                  <CardTitle className="text-base">
                    {layer.name}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({layer.nameZh})
                    </span>
                  </CardTitle>
                  <CardDescription className="mt-0.5">{layer.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {complete}/{layer.packages.length}
                  </p>
                  <p className="text-xs text-muted-foreground">{pct}% 完成</p>
                </div>
                {open ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
            <Progress value={pct} className="h-1 mt-2" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {layer.packages.map((pkg) => (
                <PackageItem key={pkg.name} pkg={pkg} />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function ArchitecturePage() {
  const totalPackages = architectureLayers.reduce((sum, l) => sum + l.packages.length, 0);
  const completedPackages = architectureLayers.reduce(
    (sum, l) => sum + l.packages.filter((p) => p.status === 'complete').length,
    0
  );
  const overallPct = Math.round((completedPackages / totalPackages) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            架構視覺化
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            MyCodeXvantaOS 六層架構 — 包裹覆蓋率與實作狀態
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          匯出報告
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: '總包裹數', value: totalPackages, unit: '個' },
          { label: '已完成', value: completedPackages, unit: '個' },
          { label: '整體覆蓋率', value: `${overallPct}%`, unit: '' },
          { label: '架構層數', value: 6, unit: '層' },
        ].map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-4 pb-4">
              <p className="text-2xl font-bold">
                {stat.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Architecture Diagram (ASCII) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4 text-primary" />
            平台架構概覽
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs font-mono text-muted-foreground bg-secondary/30 rounded-md p-4 overflow-x-auto leading-relaxed">
{`┌─────────────────────────────────────────────────────────────────┐
│                    MyCodeXvantaOS Platform                      │
├─────────────────────────────────────────────────────────────────┤
│  Layer A — Application Layer                        [3/3  ✓]    │
│  Builder · UI Generator · App Dev Studio                        │
├─────────────────────────────────────────────────────────────────┤
│  Layer B — Runtime & Execution Layer                [3/3  ✓]    │
│  Runtime · Execution Engine · Background Job Runtime            │
├─────────────────────────────────────────────────────────────────┤
│  Layer C — Native Services Layer                    [11/11 ✓]   │
│  Auth · Config · Database · Storage · Secrets                   │
│  Event Bus · Logging · Validation · Queue · SSL                 │
├─────────────────────────────────────────────────────────────────┤
│  Layer D — Connector Layer                          [8/8  ✓]    │
│  GitHub · Kafka · MongoDB · PostgreSQL · Redis                  │
│  S3 · Elasticsearch · Auth                                      │
├─────────────────────────────────────────────────────────────────┤
│  Layer E — Deployment Layer                         [3/5  ~]    │
│  Deployment Engine · Manifest Generator · ArgoCD GitOps         │
├─────────────────────────────────────────────────────────────────┤
│  Layer F — Governance Layer                         [4/6  ~]    │
│  Naming Policy · Architecture Validation · CI Rules             │
└─────────────────────────────────────────────────────────────────┘
  ✓ = 完整實作   ~ = 部分完成`}
          </pre>
        </CardContent>
      </Card>

      {/* Layer Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold">各層詳細狀態</h2>
          <Badge variant="outline" className="ml-auto">
            點擊展開/收合
          </Badge>
        </div>
        {architectureLayers.map((layer) => (
          <LayerCard key={layer.id} layer={layer} />
        ))}
      </div>

      <Separator />

      {/* AI Core Modules */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          AI 核心模組
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {aiModules.map((mod) => (
            <Card key={mod.name} className="border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono">{mod.name}</CardTitle>
                <CardDescription className="text-xs">{mod.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {mod.files.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-accent shrink-0" />
                      <span className="font-mono">{f}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
