'use client';

import type { Dispatch, SetStateAction } from 'react';
import { FileCode, Share2, Puzzle, Settings, Shield, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface IconSidebarProps {
  activeView: string;
  setActiveView: Dispatch<SetStateAction<string>>;
}

export function IconSidebar({ activeView, setActiveView }: IconSidebarProps) {
  const navItems = [
    { id: 'files', label: 'File Explorer', icon: FileCode },
    { id: 'search', label: 'API Explorer', icon: Share2 },
    { id: 'source-control', label: 'Design Analysis', icon: ClipboardList },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'extensions', label: 'Extensions', icon: Puzzle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-between border-r border-border bg-secondary/20 p-2">
      <div className="flex flex-col items-center gap-2">
        {navItems.slice(0, 5).map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant={activeView === item.id ? 'secondary' : 'ghost'}
                size="icon"
                className={`h-10 w-10 ${activeView === item.id ? 'text-accent' : 'text-muted-foreground'}`}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        {navItems.slice(5).map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant={activeView === item.id ? 'secondary' : 'ghost'}
                size="icon"
                className={`h-10 w-10 ${activeView === item.id ? 'text-accent' : 'text-muted-foreground'}`}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon className="h-5 w-5" />
              </Button>
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
