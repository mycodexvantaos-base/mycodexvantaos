
"use client";

import { SidebarProvider, SidebarInset, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Globe, LayoutDashboard, History, ScrollText, Cpu, Activity, Zap, Users, ShieldAlert, Network, Settings, ClipboardCheck, FileCode, Search, Target, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuGroups = [
    {
      label: "核心感知 (Core Intel)",
      items: [
        { icon: LayoutDashboard, label: "Command Center", href: "/dashboard" },
        { icon: Activity, label: "Pulse Sensing", href: "/dashboard/pulse" },
        { icon: Users, label: "Swarm Orchestration", href: "/dashboard/swarm" },
        { icon: ShieldAlert, label: "Global Consensus", href: "/dashboard/consensus" },
      ]
    },
    {
      label: "工程鍛造 (Forge & Build)",
      items: [
        { icon: Zap, label: "Tool Forge", href: "/dashboard/forge" },
        { icon: FileCode, label: "CI/CD Generator", href: "/dashboard/pipeline" },
        { icon: Target, label: "Intelligent Refinement", href: "/dashboard/refinement" },
      ]
    },
    {
      label: "治理稽核 (Governance)",
      items: [
        { icon: BookOpen, label: "Protocol Whitepaper", href: "/dashboard/protocol" },
        { icon: Search, label: "Risk & Compliance", href: "/dashboard/analysis" },
        { icon: ClipboardCheck, label: "Zero-Failure Policy", href: "/dashboard/checklists" },
        { icon: ScrollText, label: "Verification Reports", href: "/dashboard/reports" },
        { icon: History, label: "Audit Trail", href: "/dashboard/history" },
      ]
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full font-body">
        <Sidebar variant="sidebar" className="border-r border-border/40 bg-sidebar-background">
          <SidebarHeader className="h-20 flex items-center px-6 border-b border-border/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center animate-pulse">
                <Globe className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter font-headline leading-none uppercase">SENTINEL</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-primary/70 mt-1">Liquid Intel</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="custom-scrollbar">
            {menuGroups.map((group) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel className="px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mt-4 mb-2">
                  {group.label}
                </SidebarGroupLabel>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.label} 
                        className={`h-10 px-6 transition-all group ${pathname === item.href ? 'bg-sidebar-accent text-primary' : 'hover:bg-sidebar-accent/50'}`}
                      >
                        <Link href={item.href} className="flex items-center gap-4 w-full">
                          <item.icon className={`h-4 w-4 ${pathname === item.href ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">
                            <span>{item.label}</span>
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter className="p-6 border-t border-border/10">
            <div className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/10">
              <Cpu className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-foreground">SWARM_SYNC_OK</span>
                <span className="text-[8px] font-mono text-muted-foreground">FLUID_V3.0.4</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col bg-background overflow-hidden">
          <header className="h-16 flex items-center px-10 border-b border-border/10 glass-panel sticky top-0 z-50">
            <div className="flex-1 flex items-center gap-4">
              <Badge variant="outline" className="text-[9px] font-mono border-primary/30 text-primary uppercase bg-primary/5">
                Node: Sentinel-Master-01
              </Badge>
              <div className="h-4 w-[1px] bg-border/40" />
              <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Protocol: Liquid Consensus Layer v2</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest whitespace-nowrap">Global Pulse Stream: Active</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                 <Settings className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
