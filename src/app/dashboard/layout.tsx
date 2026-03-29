import { SidebarProvider, SidebarInset, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Shield, LayoutDashboard, Database, Repeat, ClipboardCheck, History, Settings, FileCode, SearchCheck, ScrollText } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Database, label: "Architecture", href: "/dashboard/architecture" },
    { icon: FileCode, label: "CI/CD Pipeline", href: "/dashboard/pipeline" },
    { icon: SearchCheck, label: "Risk Analysis", href: "/dashboard/analysis" },
    { icon: Repeat, label: "Refinement", href: "/dashboard/refinement" },
    { icon: ClipboardCheck, label: "Checklists", href: "/dashboard/checklists" },
    { icon: ScrollText, label: "Verification Reports", href: "/dashboard/reports" },
    { icon: History, label: "Audit Trail", href: "/dashboard/history" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar variant="sidebar" className="border-r border-border/40">
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-border/40">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold tracking-tight font-headline">SENTINEL</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-6 text-[10px] uppercase tracking-wider text-muted-foreground mt-4 mb-2">Core Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild tooltip={item.label} className="h-10 px-6 hover:bg-sidebar-accent transition-colors">
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-border/40">
            <SidebarMenuButton asChild className="h-10 px-4 hover:bg-sidebar-accent transition-colors">
              <Link href="/dashboard/settings" className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col bg-background">
          <header className="h-16 flex items-center px-8 border-b border-border/40 bg-background/50 backdrop-blur sticky top-0 z-40">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-muted-foreground">Sentinel Architecture System</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">GitLab Synced</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
