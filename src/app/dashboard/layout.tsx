import { SidebarProvider, SidebarInset, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Shield, LayoutDashboard, Database, Repeat, ClipboardCheck, History, Settings, FileCode, SearchCheck, ScrollText, Cpu } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Command Center", href: "/dashboard" },
    { icon: Database, label: "Arch Definition", href: "/dashboard/architecture" },
    { icon: FileCode, label: "CI/CD Pipeline", href: "/dashboard/pipeline" },
    { icon: SearchCheck, label: "Risk Audit", href: "/dashboard/analysis" },
    { icon: Repeat, label: "Refinement", href: "/dashboard/refinement" },
    { icon: ClipboardCheck, label: "Zero-Failure Policy", href: "/dashboard/checklists" },
    { icon: ScrollText, label: "Verification Reports", href: "/dashboard/reports" },
    { icon: History, label: "Audit Trail", href: "/dashboard/history" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full font-body">
        <Sidebar variant="sidebar" className="border-r border-border/40 bg-sidebar-background">
          <SidebarHeader className="h-20 flex items-center px-6 border-b border-border/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter font-headline leading-none">SENTINEL</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-primary/70 mt-1">Architecture</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mt-6 mb-2">Security Operations</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild tooltip={item.label} className="h-11 px-6 hover:bg-sidebar-accent transition-all group">
                      <Link href={item.href} className="flex items-center gap-4">
                        <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-6 border-t border-border/10">
            <div className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/10">
              <Cpu className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-foreground">CORE_VERSION</span>
                <span className="text-[8px] font-mono text-muted-foreground">v2.4.0-STABLE</span>
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
              <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Protocol: NIST IR 8536 Enforcement</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">GitLab Stream Active</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                 <Cpu className="h-4 w-4 text-muted-foreground" />
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