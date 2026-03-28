"use client";

import { useState } from "react";
import { validateAndSuggestChecklists, ValidateAndSuggestChecklistsOutput } from "@/ai/flows/validate-and-suggest-checklists";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Loader2, Plus, AlertCircle, CheckCircle2, Shield } from "lucide-react";

export default function ChecklistsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidateAndSuggestChecklistsOutput | null>(null);
  
  const [customItems, setCustomItems] = useState([
    "All secrets must be stored in GitLab CI/CD protected variables",
    "Database migrations must be decoupled from app deployment",
    "Zero-downtime rollback strategy must be explicitly defined",
    "Internal traffic must be encrypted via mTLS"
  ]);

  const runValidation = async () => {
    setLoading(true);
    try {
      const output = await validateAndSuggestChecklists({
        architectureDefinition: "Microservices using service mesh Linkerd.",
        ciCdPipelineConfig: "stages: build, deploy. deploy: script: kubectl rollout restart",
        customChecklist: customItems,
      });
      setResult(output);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-bold font-headline">Zero-Failure Policy</h1>
          <p className="text-muted-foreground">Automated enforcement of architectural and CI/CD best practices.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90" 
          onClick={runValidation}
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ClipboardCheck className="mr-2 h-4 w-4" />}
          Enforce Policies
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/40 bg-card/50 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">Active Policies</CardTitle>
              <CardDescription>Custom 'Zero-Failure' checklist.</CardDescription>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {customItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded hover:bg-sidebar-background/50 transition-colors">
                <Checkbox id={`check-${i}`} defaultChecked />
                <label htmlFor={`check-${i}`} className="text-xs leading-relaxed text-muted-foreground cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {!result ? (
            <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-border/40 rounded-xl space-y-4 text-center px-8">
               <Shield className="h-12 w-12 text-muted-foreground/30" />
               <p className="text-muted-foreground font-medium">Policy engine idle.<br/>Run validation to check adherence against active policies.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
               <Card className="border-border/40 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg font-headline">Validation Findings</CardTitle>
                  <CardDescription>Meticulous check of definition vs custom policies.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {result.validationResults.map((res, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/40">
                      {res.status === 'ADHERENT' ? (
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                      ) : res.status === 'VIOLATED' ? (
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                      ) : (
                        <Shield className="h-5 w-5 text-muted-foreground/50 mt-0.5" />
                      )}
                      <div className="space-y-1">
                         <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{res.policy}</span>
                            <Badge variant={res.status === 'ADHERENT' ? 'secondary' : 'outline'} className="text-[10px] uppercase">
                              {res.status}
                            </Badge>
                         </div>
                         <p className="text-xs text-muted-foreground italic">{res.details}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg font-headline">AI-Suggested Enhancements</CardTitle>
                  <CardDescription>Meticulous additions to your zero-failure protocol.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.suggestedPolicies.map((sug, i) => (
                    <div key={i} className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-sm font-bold text-accent">{sug.policy}</span>
                         <Button size="sm" variant="ghost" className="h-7 text-[10px] hover:bg-accent hover:text-accent-foreground">ADD TO CHECKLIST</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{sug.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}