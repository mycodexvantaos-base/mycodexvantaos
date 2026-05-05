'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Brain,
  Network,
  Globe,
  Grid3x3,
  Compass,
  Shield,
  ScrollText,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Logo } from '@/components/icons/logo';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'inference', label: 'LM Inference', icon: Brain, href: '/dashboard/inference' },
  { id: 'connectors', label: 'Connectors', icon: Network, href: '/dashboard/connectors' },
  { id: 'edge', label: 'Edge Deploy', icon: Globe, href: '/dashboard/edge' },
  { id: 'scenarios', label: 'Scenarios', icon: Grid3x3, href: '/dashboard/scenarios' },
  { id: 'decisions', label: 'Decision Guide', icon: Compass, href: '/dashboard/decisions' },
  { id: 'security', label: 'Security', icon: Shield, href: '/dashboard/security' },
  { id: 'audit', label: 'Audit Log', icon: ScrollText, href: '/dashboard/audit' },
];

const bottomNavItems = [
  { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function IconSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full flex-col items-center justify-between border-r border-border bg-secondary/20 p-2">
      <div className="flex flex-col items-center gap-1">
        <Link href="/dashboard" className="mb-2 flex items-center justify-center">
          <Logo className="h-7 w-7 text-primary" />
        </Link>
        <div className="h-px w-6 bg-border mb-1" />
        {navItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Link href={item.href}>
                <Button
                  variant={isActive(item.href) ? 'secondary' : 'ghost'}
                  size="icon"
                  className={`h-10 w-10 ${isActive(item.href) ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1">
        {bottomNavItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Link href={item.href}>
                <Button
                  variant={isActive(item.href) ? 'secondary' : 'ghost'}
                  size="icon"
                  className={`h-10 w-10 ${isActive(item.href) ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}