import type { Metadata } from 'next';
import Link from 'next/link';
import {
  LayoutDashboard,
  Layers,
  Grid3X3,
  TrendingUp,
  ShieldCheck,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'MyCodeXvantaOS Admin',
  description: 'Administrator Control Panel for MyCodeXvantaOS Platform',
};

const navItems = [
  {
    href: '/admin',
    label: '主儀表板',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    href: '/admin/architecture',
    label: '架構視覺化',
    icon: Layers,
    badge: '80%',
  },
  {
    href: '/admin/scenarios',
    label: '應用場景矩陣',
    icon: Grid3X3,
    badge: null,
  },
  {
    href: '/admin/trends',
    label: '技術趨勢展望',
    icon: TrendingUp,
    badge: 'New',
  },
  {
    href: '/admin/security',
    label: '安全與合規',
    icon: ShieldCheck,
    badge: null,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-foreground font-body">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-border bg-secondary/20">
        {/* Logo */}
        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
          <Logo className="h-7 w-7 text-primary" />
          <div>
            <p className="text-sm font-bold font-headline leading-tight">MyCodeXvantaOS</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">管理員工作站</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            平台管理
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.badge && (
                      <Badge
                        variant="outline"
                        className="h-5 px-1.5 text-xs border-primary/30 text-primary"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            系統
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/settings"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                <span>系統設定</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>返回主站</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Info */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                VA
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">VantaOS Developer</p>
              <p className="text-xs text-muted-foreground truncate">admin@mycodexvantaos.dev</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
