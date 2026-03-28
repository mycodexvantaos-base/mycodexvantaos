import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, FileCode, Activity } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    { label: "Arch Reliability", value: 98.4, icon: Shield, color: "text-primary" },
    { label: "Active Risks", value: 2, icon: AlertTriangle, color: "text-amber-500" },
    { label: "Pass Rate", value: 100, icon: CheckCircle, color: "text-accent" },
    { label: "Sync Status", value: "Locked", icon: FileCode, color: "text-primary" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold font-headline">Architecture Health</h1>
        <p className="text-muted-foreground">Systems overview and zero-failure adherence metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/40 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{typeof stat.value === 'number' ? `${stat.value}%` : stat.value}</div>
              {typeof stat.value === 'number' && (
                <Progress value={stat.value} className="h-1 mt-2 bg-muted" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/40 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Deployment Resilience
            </CardTitle>
            <CardDescription>Performance of CI/CD pipelines over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center border-t border-border/20 mt-2">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-accent">100%</div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Perfect Pass Threshold Met</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Security Posture
            </CardTitle>
            <CardDescription>Vulnerabilities and compliance deviations detected.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Critical Vulnerabilities</span>
              <span className="text-sm font-bold text-accent">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Compliance Drift</span>
              <span className="text-sm font-bold text-amber-500">2 (Low)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pipeline Inefficiencies</span>
              <span className="text-sm font-bold text-primary">0</span>
            </div>
            <Progress value={90} className="h-2 bg-muted" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/40 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg font-headline">Recent Activity</CardTitle>
          <CardDescription>Latest changes synced from GitLab.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "System", action: "Refinement suggest: Applied Circuit Breaker pattern to PaymentService", time: "2h ago" },
              { user: "Dev Ops", action: "Pipeline generated: Production environment update", time: "5h ago" },
              { user: "Arch Bot", action: "Meticulous Check: GDPR Compliance Validated", time: "1d ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border/20 last:border-0">
                <div className="flex flex-col">
                  <span className="font-medium">{item.action}</span>
                  <span className="text-xs text-muted-foreground">{item.user}</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}