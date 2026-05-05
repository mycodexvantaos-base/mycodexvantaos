'use client';

import { useState } from 'react';
import {
  Activity,
  Package,
  TestTube2,
  GitBranch,
  Layers,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Database,
  Shield,
  Zap,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

// ─── Static platform metrics ───────────────────────────────────────────────
const platformMetrics = {
  overallCoverage: 80,
  totalPackages: 66,
  coveredPackages: 47,
  testDensity: 216,
  ciRules: 100,
  namingCompliance: 100,
  layers: [
    { name: 'Layer A — Application', covered: 3, total: 3, color: 'bg-accent' },
    { name: 'Layer B — Runtime', covered: 3, total: 3, color: 'bg-accent' },
    { name: 'Layer C — Native Services', covered: 11, total: 11, color: 'bg-accent' },
    { name: 'Layer D — Connector', covered: 8, total: 8, color: 'bg-accent' },
    { name: 'Layer E — Deployment', covered: 5, total: 7, color: 'bg-primary' },
    { name: 'Layer F — Governance', covered: 4, total: 6, color: 'bg-primary' },
  ],
};

const connectors = [
  { name: 'connector-github', status: 'active', latency: '42ms' },
  { name: 'connector-postgresql', status: 'active', latency: '8ms' },
  { name: 'connector-redis', status: 'active', latency: '2ms' },
  { name: 'connector-kafka', status: 'idle', latency: '—' },
  { name: 'connector-mongodb', status: 'active', latency: '15ms' },
  { name: 'connector-s3', status: 'active', latency: '120ms' },
  { name: 'connector-elastic', status: 'idle', latency: '—' },
  { name: 'connector-auth', status: 'active', latency: '5ms' },
];

const recentActivities = [
  { time: '剛才', event: '架構驗證通過', type: 'success', detail: 'CI validate-architecture.ts — 100%' },
  { time: '2 分鐘前', event: '測試套件執行完成', type: 'success', detail: '98/99 套件通過，覆蓋率 80%+' },
  { time: '5 分鐘前', event: 'Layer D 連接器健康檢查', type: 'success', detail: '8/8 連接器回應正常' },
  { time: '12 分鐘前', event: 'GitHub 推送完成', type: 'success', detail: 'main branch — b361e4b' },
  { time: '1 小時前', event: '命名規範掃描', type: 'warning', detail: '發現 3 個遺留前綴待處理' },
];

const aiModules = [
  { name: 'AI Team Orchestrator', status: 'running', agents: 9, tasks: 24 },
  { name: 'Persona Engine', status: 'running', agents: 9, tasks: 12 },
  { name: 'Agent Toolkit', status: 'standby', agents: 0, tasks: 0 },
];

// ─── Stat Card Component ────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  description,
  trend,
}: {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
  description?: string;
  trend?: 'up' | 'stable';
}) {
  return (
    <Card className="transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        {trend === 'up' && (
          <div className="mt-1 flex items-center gap-1 text-xs text-accent">
            <TrendingUp className="h-3 w-3" />
            <span>持續提升中</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">平台管理儀表板</h1>
          <p className="text-sm text-muted-foreground mt-1">
            MyCodeXvantaOS v1.0.0 — 管理員專屬工作站
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-accent/50 text-accent gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            系統運行正常
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            重新整理
          </Button>
          <Button size="sm" variant="outline" className="gap-2" asChild>
            <a
              href="https://github.com/mycodexvantaos/mycodexvantaos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="整體覆蓋率"
          value={platformMetrics.overallCoverage}
          unit="%"
          icon={Activity}
          description="目標 >80% ✓"
          trend="up"
        />
        <StatCard
          title="總包裹數"
          value={platformMetrics.totalPackages}
          unit="個"
          icon={Package}
          description={`已覆蓋 ${platformMetrics.coveredPackages} 個`}
        />
        <StatCard
          title="測試密度"
          value={platformMetrics.testDensity}
          unit="%"
          icon={TestTube2}
          description="每包 15+ 測試"
          trend="stable"
        />
        <StatCard
          title="CI 規則"
          value={platformMetrics.ciRules}
          unit="%"
          icon={CheckCircle2}
          description="全部通過"
        />
        <StatCard
          title="命名規範"
          value={platformMetrics.namingCompliance}
          unit="%"
          icon={Shield}
          description="符合率"
        />
        <StatCard
          title="活躍連接器"
          value={connectors.filter((c) => c.status === 'active').length}
          unit={`/ ${connectors.length}`}
          icon={Zap}
          description="外部整合"
        />
      </div>

      {/* Layer Coverage + Connectors */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Layer Coverage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="h-4 w-4 text-primary" />
              六層架構覆蓋率
            </CardTitle>
            <CardDescription>各層級包裹實作狀態</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {platformMetrics.layers.map((layer) => {
              const pct = Math.round((layer.covered / layer.total) * 100);
              return (
                <div key={layer.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{layer.name}</span>
                    <span className="font-medium">
                      {layer.covered}/{layer.total}
                      <span className="ml-1 text-xs text-muted-foreground">({pct}%)</span>
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Connector Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-4 w-4 text-primary" />
              連接器健康狀態
            </CardTitle>
            <CardDescription>Layer D 外部服務整合監控</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {connectors.map((connector) => (
                <div
                  key={connector.name}
                  className="flex items-center justify-between rounded-md border border-border/50 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        connector.status === 'active'
                          ? 'bg-accent animate-pulse'
                          : 'bg-muted-foreground'
                      }`}
                    />
                    <span className="text-sm font-mono">{connector.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">
                      {connector.latency}
                    </span>
                    <Badge
                      variant={connector.status === 'active' ? 'outline' : 'secondary'}
                      className={`text-xs ${
                        connector.status === 'active'
                          ? 'border-accent/50 text-accent'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {connector.status === 'active' ? '運行中' : '待機'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Modules + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* AI Modules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Cpu className="h-4 w-4 text-primary" />
              AI 核心模組狀態
            </CardTitle>
            <CardDescription>AI Team Orchestrator 與 Persona Engine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiModules.map((mod) => (
              <div
                key={mod.name}
                className="rounded-md border border-border/50 p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{mod.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      mod.status === 'running'
                        ? 'border-accent/50 text-accent'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {mod.status === 'running' ? '執行中' : '待機'}
                  </Badge>
                </div>
                {mod.status === 'running' && (
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>代理人數：<strong className="text-foreground">{mod.agents}</strong></span>
                    <span>活躍任務：<strong className="text-foreground">{mod.tasks}</strong></span>
                  </div>
                )}
              </div>
            ))}

            <Separator />

            <div className="rounded-md bg-primary/5 p-3 text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">當前聚焦領域</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {[
                  'LM 推理全景',
                  '多模態生態',
                  '邊緣推理',
                  '應用場景矩陣',
                  '選型決策指南',
                  '技術趨勢展望',
                ].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-primary" />
              近期活動記錄
            </CardTitle>
            <CardDescription>平台事件與操作日誌</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 shrink-0">
                    {activity.type === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate">{activity.event}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">快速操作</CardTitle>
          <CardDescription>常用管理員工作流程</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: '執行架構驗證', icon: Layers, href: '/admin/architecture' },
              { label: '查看場景矩陣', icon: Cpu, href: '/admin/scenarios' },
              { label: '技術趨勢分析', icon: TrendingUp, href: '/admin/trends' },
              { label: '安全掃描', icon: Shield, href: '/admin/security' },
            ].map((action) => (
              <a key={action.label} href={action.href}>
                <Button
                  variant="outline"
                  className="w-full h-auto flex-col gap-2 py-4 hover:border-primary/50 hover:bg-primary/5"
                >
                  <action.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
