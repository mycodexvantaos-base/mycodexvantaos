import { FileExplorer } from './file-explorer';
import { ResearchPanel } from './research-panel';
import { SecurityPanel } from './security-panel';
import { ApiExplorer } from './api-explorer';
import { DesignAnalyzer } from './design-analyzer';

interface LeftPanelProps {
  activeView: string;
}

export function LeftPanel({ activeView }: LeftPanelProps) {
  return (
    <div className="w-72 border-r border-border bg-secondary/30">
      {activeView === 'files' && <FileExplorer />}
      {activeView === 'source-control' && <DesignAnalyzer />}
      {activeView === 'search' && <ApiExplorer />}
      {activeView === 'security' && <SecurityPanel />}
      {activeView === 'extensions' && <ResearchPanel title="Extensions" />}
      {activeView === 'settings' && <ResearchPanel title="Settings" />}
    </div>
  );
}
