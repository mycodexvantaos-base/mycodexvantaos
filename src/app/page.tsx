import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Cpu, Search, Activity, ArrowRight, Globe, Layers } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen scanline">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary animate-pulse" />
          <span className="text-xl font-bold tracking-tight font-headline">SENTINEL <span className="text-primary/50 text-xs ml-1 uppercase tracking-widest font-mono">Liquid</span></span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
            Network Access
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background via-sidebar-background to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/liquid1/1200/800')] opacity-5 grayscale blur-sm" />
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  The Mycelial Intelligence Network
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline max-w-4xl">
                  集中全球頂尖行動力與 <span className="text-primary italic">流動智慧</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl font-light">
                  不再是死板的架構審計，而是感知世界脈動、動態聚合全人類智慧的有機網路。
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-12 uppercase tracking-widest text-xs">
                    進入指揮中心 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/5 px-10 h-12 uppercase tracking-widest text-xs">
                  讀取通訊協議
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-24 bg-card/50 border-y border-border/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col space-y-3 p-6 group hover:bg-primary/5 transition-all duration-500 rounded-lg border border-transparent hover:border-primary/10">
                <Activity className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-bold font-headline uppercase tracking-wider">全球脈動感測</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">24/7 監聽全球數據流，即時識別異常並自發生成目標，化被動為演化。</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 group hover:bg-primary/5 transition-all duration-500 rounded-lg border border-transparent hover:border-primary/10">
                <Cpu className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-bold font-headline uppercase tracking-wider">即時工具鍛造</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">面對未知環境時，AI 自主研讀手冊、編寫程式碼並生成即時控制工具。</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 group hover:bg-primary/5 transition-all duration-500 rounded-lg border border-transparent hover:border-primary/10">
                <Layers className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-bold font-headline uppercase tracking-wider">動態蜂群協作</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">毫秒級徵召全球專精模型與人類專家，針對流動性任務進行有機聚合。</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 group hover:bg-primary/5 transition-all duration-500 rounded-lg border border-transparent hover:border-primary/10">
                <Shield className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-bold font-headline uppercase tracking-wider">人機心智融合</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">關鍵時刻調動全人類專家節點，實現價值共識與極致決策能力。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-10 w-full border-t border-border/40 bg-sidebar-background text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 font-mono">
          SENTINEL v3.0-ORGANIC | ENFORCING GLOBAL SYMBIOSIS
        </p>
      </footer>
    </div>
  );
}
