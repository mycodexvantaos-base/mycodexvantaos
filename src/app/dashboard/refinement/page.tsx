"use client";

import { useState } from "react";
import { suggestArchitectureRefinements, SuggestArchitectureRefinementsOutput } from "@/ai/flows/suggest-architecture-refinements-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Loader2, Repeat, Target, Terminal } from "lucide-react";

export default function RefinementPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestArchitectureRefinementsOutput | null>(null);

  const getRefinements = async () => {
    setLoading(true);
    try {
      const output = await suggestArchitectureRefinements({
        currentArchitectureDescription: "Traditional N-tier web application with monolithic backend and RDBMS.",
        architecturalGoals: "Scale horizontally, move to event-driven processing, achieve 99.99% uptime.",
        pastIncidentsSummary: "Database lock contention during peak traffic caused 15 mins downtime last month.",
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
          <h1 className="text-3xl font-bold font-headline">Intelligent Refinement</h1>
          <p className="text-muted-foreground">AI suggestions for zero-failure resilience patterns.</p>
        </div>
        <Button 
          className="bg-accent text-accent-foreground hover:bg-accent/90" 
          onClick={getRefinements}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Repeat className="mr-2 h-4 w-4" />
          )}
          <span>Generate Refinement Plan</span>
        </Button>
      </div>

      {!result ? (
        <Card className="border-border/40 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Strategic Optimization
            </CardTitle>
            <CardDescription>Targeting resilience and scalability through expert pattern application.</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground text-center">
            Click 'Generate Refinement Plan' to receive AI-powered design patterns<br/>and GitLab integration strategies.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
           <Card className="border-border/40 bg-primary/5 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg">Refinement Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.overallSummary}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {result.suggestions.map((suggestion, i) => (
              <Card key={i} className="border-border/40 bg-card/50">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-widest">{suggestion.category}</Badge>
                      <Badge variant={suggestion.impact === 'High' ? 'default' : 'outline'} className={suggestion.impact === 'High' ? 'bg-accent text-accent-foreground' : ''}>
                        {suggestion.impact} Impact
                      </Badge>
                    </div>
                    <CardTitle className="text-xl pt-2 font-headline">{suggestion.description.split('.')[0]}</CardTitle>
                  </div>
                  <Lightbulb className="h-6 w-6 text-accent" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Technical Reasoning</h4>
                      <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                    </div>
                    <div className="space-y-2 p-4 rounded-lg bg-sidebar-background border border-border/40">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                        <Terminal className="h-3 w-3" />
                        GitLab Implications
                      </h4>
                      <p className="text-sm text-muted-foreground italic">{suggestion.gitlabImplications}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}