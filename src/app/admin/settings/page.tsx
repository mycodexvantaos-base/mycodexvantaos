'use client';

import { useState } from 'react';
import {
  Settings,
  Database,
  Bell,
  Palette,
  Globe,
  Save,
  RefreshCw,
  CheckCircle2,
  GitBranch,
  Cpu,
  Key,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    ciFailure: true,
    coverageDrop: true,
    securityAlert: true,
    deploymentComplete: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            系統設定
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            管理員後台配置與平台參數設定
          </p>
        </div>
        <Button size="sm" onClick={handleSave} className="gap-2">
          {saved ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saved ? '已儲存' : '儲存設定'}
        </Button>
      </div>

      {/* Platform Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4 text-primary" />
            平台基本資訊
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">平台名稱</Label>
              <Input defaultValue="MyCodeXvantaOS" className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">版本號</Label>
              <Input defaultValue="1.0.0" className="h-8 text-sm" readOnly />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">NPM Scope</Label>
              <Input defaultValue="@mycodexvantaos" className="h-8 text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">URN 命名空間</Label>
              <Input defaultValue="urn:mycodexvantaos" className="h-8 text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Kubernetes API Group</Label>
              <Input defaultValue="mycodexvantaos.quantum" className="h-8 text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">主要語言</Label>
              <Input defaultValue="TypeScript (89%)" className="h-8 text-sm" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitBranch className="h-4 w-4 text-primary" />
            GitHub 整合設定
          </CardTitle>
          <CardDescription>connector-github 配置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">倉庫 URL</Label>
              <Input
                defaultValue="https://github.com/mycodexvantaos/mycodexvantaos"
                className="h-8 text-sm font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">預設分支</Label>
              <Input defaultValue="main" className="h-8 text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-accent/5 border border-accent/30 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent">GitHub 連接正常</span>
            <Badge variant="outline" className="ml-auto border-accent/50 text-accent text-xs">
              已認證
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Cpu className="h-4 w-4 text-primary" />
            AI 模型配置
          </CardTitle>
          <CardDescription>Genkit + Google AI 設定</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">預設模型</Label>
              <Select defaultValue="gemini-2.5-flash">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-2.5-flash">googleai/gemini-2.5-flash</SelectItem>
                  <SelectItem value="gemini-1.5-pro">googleai/gemini-1.5-pro</SelectItem>
                  <SelectItem value="gemini-1.5-flash">googleai/gemini-1.5-flash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">AI 框架</Label>
              <Input defaultValue="Genkit v1.x" className="h-8 text-sm" readOnly />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">API Key 狀態</Label>
            <div className="flex items-center gap-2 rounded-md border border-border/40 px-3 py-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-mono text-muted-foreground">GEMINI_API_KEY = ••••••••••••••••</span>
              <Badge variant="outline" className="ml-auto text-xs border-accent/50 text-accent">
                已設定
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4 text-primary" />
            資料庫連接設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'PostgreSQL', env: 'DATABASE_URL', status: 'connected', desc: '主資料庫' },
            { name: 'Redis', env: 'REDIS_URL', status: 'connected', desc: '快取與佇列' },
            { name: 'MongoDB', env: 'MONGODB_URI', status: 'disconnected', desc: '文件資料庫' },
            { name: 'Elasticsearch', env: 'ELASTIC_URL', status: 'disconnected', desc: '搜尋引擎' },
          ].map((db) => (
            <div
              key={db.name}
              className="flex items-center justify-between rounded-md border border-border/40 px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full ${
                    db.status === 'connected' ? 'bg-accent animate-pulse' : 'bg-muted-foreground/30'
                  }`}
                />
                <div>
                  <p className="text-sm font-medium">{db.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{db.env}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:block">{db.desc}</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    db.status === 'connected'
                      ? 'border-accent/50 text-accent'
                      : 'border-muted-foreground/50 text-muted-foreground'
                  }`}
                >
                  {db.status === 'connected' ? '已連接' : '未連接'}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" />
            通知設定
          </CardTitle>
          <CardDescription>管理員事件通知偏好</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'ciFailure', label: 'CI 規則失敗', desc: '架構驗證或測試失敗時通知' },
            { key: 'coverageDrop', label: '覆蓋率下降', desc: '測試覆蓋率低於 80% 時通知' },
            { key: 'securityAlert', label: '安全警報', desc: '發現漏洞或命名漂移時通知' },
            { key: 'deploymentComplete', label: '部署完成', desc: '成功推送至 GitHub 時通知' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={(val) =>
                  setNotifications((prev) => ({ ...prev, [item.key]: val }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4 text-primary" />
            介面外觀
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">主題</Label>
              <Select defaultValue="dark">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">深色模式（預設）</SelectItem>
                  <SelectItem value="light">淺色模式</SelectItem>
                  <SelectItem value="system">跟隨系統</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">語言</Label>
              <Select defaultValue="zh-TW">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh-TW">繁體中文</SelectItem>
                  <SelectItem value="zh-CN">簡體中文</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base text-destructive">危險操作區</CardTitle>
          <CardDescription>以下操作不可逆，請謹慎執行</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-md border border-destructive/30 px-3 py-2.5">
            <div>
              <p className="text-sm font-medium">重置所有設定</p>
              <p className="text-xs text-muted-foreground">恢復所有設定至預設值</p>
            </div>
            <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10 gap-2">
              <RefreshCw className="h-3.5 w-3.5" />
              重置
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-md border border-destructive/30 px-3 py-2.5">
            <div>
              <p className="text-sm font-medium">清除快取資料</p>
              <p className="text-xs text-muted-foreground">清除 Redis 快取與本地儲存</p>
            </div>
            <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10 gap-2">
              <Database className="h-3.5 w-3.5" />
              清除
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
