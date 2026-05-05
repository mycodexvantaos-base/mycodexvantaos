'use client';

import { useState } from 'react';
import {
  Bot,
  User,
  Wand2,
  Stethoscope,
  Rocket,
  BarChart3,
  ShieldCheck,
  Send,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ChatMessage = ({ role, children }: { role: 'user' | 'bot'; children: React.ReactNode }) => {
  return (
    <div className={`flex items-start gap-3 ${role === 'user' ? 'justify-end' : ''}`}>
      {role === 'bot' && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      <div className={`max-w-[85%] rounded-lg p-3 text-sm ${role === 'bot' ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
        {children}
      </div>
      {role === 'user' && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

const agents = [
  {
    id: 'diagnostic',
    name: 'Diagnostic Agent',
    icon: Stethoscope,
    description: 'Run health checks on all connectors and services',
    color: 'text-chart-1',
  },
  {
    id: 'deployment',
    name: 'Deployment Agent',
    icon: Rocket,
    description: 'Deploy models to edge regions with verification',
    color: 'text-chart-2',
  },
  {
    id: 'analysis',
    name: 'Analysis Agent',
    icon: BarChart3,
    description: 'Compare inference metrics and generate insights',
    color: 'text-chart-4',
  },
  {
    id: 'governance',
    name: 'Governance Agent',
    icon: ShieldCheck,
    description: 'Generate compliance reports and audit summaries',
    color: 'text-chart-5',
  },
];

export function AiPanel() {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    setIsProcessing(true);
    // Simulated AI response
    setTimeout(() => {
      setIsProcessing(false);
      setMessage('');
    }, 1500);
  };

  const handleAgentRun = (agentId: string) => {
    setActiveAgent(agentId);
    setTimeout(() => {
      setActiveAgent(null);
    }, 2000);
  };

  return (
    <div className="w-80 border-l border-border bg-secondary/30 flex flex-col">
      <Tabs defaultValue="chat" className="flex h-full flex-col">
        <div className="flex h-10 items-center justify-center border-b border-border">
          <TabsList className="grid w-[calc(100%-2rem)] grid-cols-2">
            <TabsTrigger value="chat">
              <Bot className="mr-2 h-3.5 w-3.5" /> Chat
            </TabsTrigger>
            <TabsTrigger value="agent">
              <Wand2 className="mr-2 h-3.5 w-3.5" /> Agent
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex flex-1 flex-col overflow-hidden p-0 m-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <ChatMessage role="bot">
                Hello! I'm your MyCodeXvantaOS operations assistant. I can help you monitor inference, diagnose connector issues, review deployment status, or generate governance reports. What do you need?
              </ChatMessage>
              <ChatMessage role="user">
                What's the current status of all connectors?
              </ChatMessage>
              <ChatMessage role="bot">
                All 4 connectors are currently operational. PostgreSQL and Redis are showing healthy metrics with latencies under 5ms. The GitHub integration is active with 12 webhooks configured. No alerts or degraded performance detected.
              </ChatMessage>
            </div>
          </ScrollArea>
          <div className="border-t border-border p-3">
            <div className="relative">
              <Textarea
                placeholder="Ask about system status, diagnostics..."
                className="pr-12 text-sm"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button
                size="icon"
                className="absolute bottom-2 right-2 h-7 w-7"
                onClick={handleSend}
                disabled={isProcessing || !message.trim()}
              >
                {isProcessing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="agent" className="flex-1 overflow-y-auto p-4 m-0">
          <div className="space-y-3">
            <div className="mb-2">
              <h3 className="text-sm font-medium">Operations Agents</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Run pre-configured workflow agents for common operational tasks.
              </p>
            </div>
            {agents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary ${agent.color}`}>
                      <agent.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{agent.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{agent.description}</p>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-2 h-7 text-xs"
                        onClick={() => handleAgentRun(agent.id)}
                        disabled={activeAgent !== null}
                      >
                        {activeAgent === agent.id ? (
                          <>
                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" /> Running...
                          </>
                        ) : (
                          'Run Agent'
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="mt-4">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Last Run</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-xs text-muted-foreground">No agents have been run yet.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}