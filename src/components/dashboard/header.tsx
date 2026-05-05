'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  ShieldCheck,
  ChevronRight,
  Search,
  RefreshCw,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/icons/logo';
import { useNotificationStore } from '@/lib/stores/notification-store';
import { useDashboardStore } from '@/lib/stores/dashboard-store';

type UserProfile = {
  name: string;
  email: string;
  avatarUrl: string;
  avatarHint: string;
};

const breadcrumbMap: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/inference': 'LM Inference',
  '/dashboard/connectors': 'Connectors',
  '/dashboard/edge': 'Edge Deploy',
  '/dashboard/scenarios': 'Scenarios',
  '/dashboard/decisions': 'Decision Guide',
  '/dashboard/security': 'Security',
  '/dashboard/audit': 'Audit Log',
  '/dashboard/settings': 'Settings',
};

export function AdminHeader() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const pathname = usePathname();
  const { unreadCount, notifications, markAllAsRead } = useNotificationStore();
  const { lastSync, fetchOverview } = useDashboardStore();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
    fetchProfile();
  }, []);

  const breadcrumb = breadcrumbMap[pathname] || 'Dashboard';

  const handleRefresh = () => {
    fetchOverview();
  };

  return (
    <header className="flex h-12 items-center justify-between border-b border-border px-4">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-semibold font-headline text-sm">MyCodeXvantaOS</span>
        </Link>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ChevronRight className="h-3 w-3" />
          <span>{breadcrumb}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search commands..."
            className="h-8 w-56 pl-8 text-xs bg-secondary/50 border-border"
          />
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRefresh}>
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-3.5 w-3.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 5).map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3">
                <span className="text-sm font-medium">{n.title}</span>
                <span className="text-xs text-muted-foreground">{n.message}</span>
              </DropdownMenuItem>
            ))}
            {notifications.length === 0 && (
              <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 ml-1">
          <Badge variant="outline" className="h-6 gap-1 text-[10px] border-accent/30 text-accent">
            <ShieldCheck className="h-3 w-3" />
            2FA
          </Badge>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {userProfile ? (
                  <AvatarImage src={userProfile.avatarUrl} alt="User Avatar" data-ai-hint={userProfile.avatarHint} />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                )}
                <AvatarFallback>
                  {userProfile ? userProfile.name.charAt(0).toUpperCase() : 'A'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userProfile ? userProfile.name : 'My Account'}</DropdownMenuLabel>
            {userProfile && <DropdownMenuSeparator />}
            {userProfile && <DropdownMenuItem disabled className="text-xs text-muted-foreground">{userProfile.email}</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuItem>API Keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/">Log out</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}