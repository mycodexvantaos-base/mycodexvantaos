'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Lock,
  Key,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Eye,
  GitBranch,
  Server,
  Database,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// ─── Security Data ──────────────────────────────────────────────────────────
const ciRules = [
  { rule: 'validate-architecture', status: 'pass', description: '架構層級命名驗證', lastRun: '2 分鐘前' },
  { rule: 'naming-spec-v1', status: 'pass', description: '包裹命名規範檢查', lastRun: '2 分鐘前' },
  { rule: 'test-coverage-threshold', status: 'pass', description: '測試覆蓋率 > 80%', lastRun: '5 分鐘前' },
  { rule: 'dependency-audit', status: 'warning', description: '依賴安全審計', lastRun: '1 小時前' },
  { rule: 'typescript-strict', status: 'pass', description: 'TypeScript 嚴格模式', lastRun: '5 分鐘前' },
  { rule: 'lint-check', status: 'pass', description: 'ESLint 規則檢查', lastRun: '5 分鐘前' },
  { rule: 'secret-scan', status: 'pass', description: '敏感資訊掃描', lastRun: '1 小時前' },
  { rule: 'license-compliance', status: 'pass', description: '授權合規檢查', lastRun: '1 天前' },
];

const securityPolicies = [
  {
    category: '身份認證',
    icon: Key,
    policies: [
      { name: 'RBAC 角色控制', status: 'enabled', detail: '管理員 / 開發者 / 讀取者' },
      { name: '2FA 雙因素認證', status: 'enabled', detail: 'TOTP + 備用碼' },
      { name: 'JWT Token 輪換', status: 'enabled', detail: '24h 過期，自動刷新' },
      { name: 'API Key 管理', status: 'enabled', detail: '加密儲存於 security-secrets' },
    ],
  },
  {
    category: '資料保護',
    icon: Database,
    policies: [
      { name: '傳輸加密 (TLS 1.3)', status: 'enabled', detail: 'ssl-manager 管理憑證' },
      { name: '靜態資料加密', status: 'enabled', detail: 'AES-256-GCM' },
      { name: '敏感欄位遮罩', status: 'enabled', detail: '日誌自動遮罩' },
      { name: '資料隔離', status: 'enabled', detail: '租戶級別隔離' },
    ],
  },
  {
    category: '網路安全',
    icon: Server,
    policies: [
      { name: 'IP 白名單', status: 'partial', detail: '管理後台限制 IP' },
      { name: 'Rate Limiting', status: 'enabled', detail: '100 req/min per IP' },
      { name: 'CORS 策略', status: 'enabled', detail: '嚴格來源驗證' },
      { name: 'CSP 標頭', status: 'partial', detail: '部分頁面待設定' },
    ],
  },
  {
    category: 'CI/CD 安全',
    icon: GitBranch,
    policies: [
      { name: '分支保護規則', status: 'enabled', detail: 'main 需 PR 審核' },
      { name: 'Secret 掃描', status: 'enabled', detail: 'GitHub Advanced Security' },
      { name: '依賴更新自動化', status: 'partial', detail: 'Dependabot 部分啟用' },
      { name: 'SBOM 生成', status: 'planned', detail: '軟體物料清單' },
    ],
  },
];

const namingDriftItems = [
  { package: 'services/mycodexvantaos-ai-team-service', issue: '服務目錄命名待統一', severity: 'low' },
  { package: 'packages/providers', issue: '非標準目錄名稱', severity: 'low' },
  { package: 'packages/analytics', issue: '缺少 @mycodexvantaos scope 前綴', severity: 'medium' },
];

const statusConfig = {
  pass: { label: '通過', icon: CheckCircle2, className: 'text-accent' },
  warning: { label: '警告', icon: AlertTriangle, className: 'text-yellow-500' },
  fail: { label: '失敗', icon: XCircle, className: 'text-destructive' },
  enabled: { label: '已啟用', badge: 'border-accent/50 text-accent' },
  partial: { label: '部分', badge: 'border-yellow-500/50 text-yellow-500' },
  planned: { label: '規劃中', badge: 'border-muted-foreground/50 text-muted-foreground' },
};

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function SecurityPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setScanDone(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanDone(true);
    }, 2500);
  };

  const passCount = ciRules.filter((r) => r.status === 'pass').length;
  const warnCount = ciRules.filter((r) => r.status === 'warning').length;
  const failCount = ciRules.filter((r) => r.status === 'fail').length;

  const enabledPolicies = securityPolicies
    .flatMap((cat) => cat.policies)
    .filter((p) => p.status === 'enabled').length;
  const totalPolicies = securityPolicies.flatMap((cat) => cat.policies).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            安全與合規
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            CI 規則狀態、安全策略、命名規範合規監控
          </p>
        </div>
        <Button
          size="sm"
          onClick={handleScan}
          disabled={isScanning}
          className="gap-2"
        >
          {isScanning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {isScanning ? '掃描中...' : '執行全面掃描'}
        </Button>
      </div>

      {/* Scan Result */}
      {scanDone && (
        <Alert className="border-accent/50 bg-accent/5">
          <ShieldCheck className="h-4 w-4 text-accent" />
          <AlertTitle className="text-accent">掃描完成</AlertTitle>
          <AlertDescription>
            全面安全掃描已完成。CI 規則 {passCount}/{ciRules.length} 通過，
            發現 {warnCount} 個警告，{namingDriftItems.length} 個命名漂移項目待處理。
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-accent">{passCount}</p>
            <p className="text-xs text-muted-foreground mt-1">CI 規則通過</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-yellow-500">{warnCount}</p>
            <p className="text-xs text-muted-foreground mt-1">警告項目</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold">
              {enabledPolicies}/{totalPolicies}
            </p>
            <p className="text-xs text-muted-foreground mt-1">安全策略啟用</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-yellow-500">
              {namingDriftItems.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">命名漂移</p>
          </CardContent>
        </Card>
      </div>

      {/* CI Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileCheck className="h-4 w-4 text-primary" />
            CI 規則狀態
          </CardTitle>
          <CardDescription>
            架構驗證、命名規範、測試覆蓋率等自動化檢查
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-muted-foreground">整體通過率</span>
              <span className="text-sm font-medium">
                {Math.round((passCount / ciRules.length) * 100)}%
              </span>
            </div>
            <Progress value={(passCount / ciRules.length) * 100} className="h-2" />
          </div>
          <div className="space-y-2">
            {ciRules.map((rule) => {
              const cfg = statusConfig[rule.status as keyof typeof statusConfig] as {
                label: string;
                icon: React.ElementType;
                className: string;
              };
              const Icon = cfg.icon;
              return (
                <div
                  key={rule.rule}
                  className="flex items-center justify-between rounded-md border border-border/40 px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 shrink-0 ${cfg.className}`} />
                    <div>
                      <p className="text-sm font-mono">{rule.rule}</p>
                      <p className="text-xs text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {rule.lastRun}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        rule.status === 'pass'
                          ? 'border-accent/50 text-accent'
                          : rule.status === 'warning'
                          ? 'border-yellow-500/50 text-yellow-500'
                          : 'border-destructive/50 text-destructive'
                      }`}
                    >
                      {cfg.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Security Policies */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" />
          安全策略狀態
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {securityPolicies.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.category}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="h-4 w-4 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.policies.map((policy) => {
                      const badgeCfg = statusConfig[policy.status as 'enabled' | 'partial' | 'planned'] as {
                        label: string;
                        badge: string;
                      };
                      return (
                        <div
                          key={policy.name}
                          className="flex items-center justify-between rounded-md border border-border/40 px-3 py-2"
                        >
                          <div>
                            <p className="text-sm font-medium">{policy.name}</p>
                            <p className="text-xs text-muted-foreground">{policy.detail}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs shrink-0 ml-2 ${badgeCfg.badge}`}
                          >
                            {badgeCfg.label}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Naming Drift */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-4 w-4 text-primary" />
            命名漂移報告
          </CardTitle>
          <CardDescription>
            與 naming-spec-v1 不符的包裹與目錄
          </CardDescription>
        </CardHeader>
        <CardContent>
          {namingDriftItems.length === 0 ? (
            <div className="flex items-center gap-2 text-accent text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>無命名漂移，所有包裹符合規範</span>
            </div>
          ) : (
            <div className="space-y-2">
              {namingDriftItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-md border border-border/40 px-3 py-2.5"
                >
                  <ShieldAlert
                    className={`h-4 w-4 mt-0.5 shrink-0 ${
                      item.severity === 'medium' ? 'text-yellow-500' : 'text-muted-foreground'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono truncate">{item.package}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.issue}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs shrink-0 ${
                      item.severity === 'medium'
                        ? 'border-yellow-500/50 text-yellow-500'
                        : 'border-muted-foreground/50 text-muted-foreground'
                    }`}
                  >
                    {item.severity === 'medium' ? '中' : '低'}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <ShieldX className="h-4 w-4" />
              生成修復腳本
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FileCheck className="h-4 w-4" />
              標記為例外
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RBAC Summary */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Key className="h-4 w-4 text-primary" />
            RBAC 角色摘要
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                role: 'Admin',
                permissions: ['全部讀寫', '系統配置', '用戶管理', '安全設定'],
                color: 'border-accent/40 bg-accent/5',
                badge: 'border-accent/50 text-accent',
              },
              {
                role: 'Developer',
                permissions: ['程式碼讀寫', '部署執行', '日誌查看', 'API 存取'],
                color: 'border-primary/40 bg-primary/5',
                badge: 'border-primary/50 text-primary',
              },
              {
                role: 'Viewer',
                permissions: ['儀表板查看', '日誌讀取', '報告下載'],
                color: 'border-border/60',
                badge: 'border-muted-foreground/50 text-muted-foreground',
              },
            ].map((role) => (
              <div key={role.role} className={`rounded-md border p-3 ${role.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">{role.role}</p>
                  <Badge variant="outline" className={`text-xs ${role.badge}`}>
                    角色
                  </Badge>
                </div>
                <div className="space-y-1">
                  {role.permissions.map((perm) => (
                    <div key={perm} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-accent shrink-0" />
                      {perm}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
