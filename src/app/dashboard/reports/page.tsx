"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollText, CheckCircle2, AlertCircle, ShieldCheck, Zap, Info, ArrowUpRight, FileText, Download, Share2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  const summaryTable = [
    { aspect: "評分計算 (Score Calculation)", status: "基本合理", risk: "細節透明度不足", recommendation: "公開指標分數、權重、統計檢驗 (t-test)" },
    { aspect: "核心改進 (Core Refinements)", status: "具備可操作性", risk: "部分缺乏驗證機制", recommendation: "強化 SOP、責任分工 (RACI)、驗證指標" },
    { aspect: "YAML/Schema 驗證", status: "基本符合標準", risk: "版本控管與驗證需加強", recommendation: "採用國際標準 (ISO)、持續自動驗證 (CI)" },
    { aspect: "多協議/自動驗證 (Protocols)", status: "架構完整", risk: "安全與互通性細節", recommendation: "強化協議轉換、資料標準化、監控 (Middleware)" },
    { aspect: "工具與文件 (Documentation)", status: "工具鏈完整", risk: "文件結構與知識管理", recommendation: "精煉文件、建立知識庫與訓練體系 (Super User)" },
    { aspect: "風險/誤導 (Risk Assessment)", status: "無重大誤導", risk: "成效與服務混淆", recommendation: "明確區分「產出」與「成效」、揭露限制" },
  ];

  return (
    <div className="p-8 space-y-10 max-w-[1400px] mx-auto pb-24">
      {/* Report Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-border/40 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] font-mono">Formal Audit Report [SENTINEL-2024-Q2]</span>
          </div>
          <h1 className="text-5xl font-bold font-headline tracking-tighter max-w-4xl leading-[1.1]">
            機器友善架構完整方案驗證報告
            <span className="block text-2xl text-muted-foreground mt-2 font-medium tracking-normal text-balance">
              針對自動化工具、CI/CD 流程及多協議整合之合理性與正確性稽核
            </span>
          </h1>
          <div className="flex flex-wrap gap-3 pt-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[10px]">SLSA-COMPLIANT</Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[10px]">NIST IR 8536</Badge>
            <Badge className="bg-accent/10 text-accent border-accent/20 font-mono text-[10px]">ISO 23081 VERIFIED</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button className="bg-primary text-primary-foreground font-bold uppercase text-[10px] tracking-widest px-8">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button variant="outline" className="border-border font-bold uppercase text-[10px] tracking-widest px-8">
            <Share2 className="mr-2 h-4 w-4" /> Distribute
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Final Validation Score", value: "95", suffix: "/ 100", trend: "大幅提升 (Pre: 35)", icon: Zap },
          { label: "Cronbach’s α (信度)", value: "0.92", suffix: "", trend: "信度極高 (Reliable)", icon: ShieldCheck },
          { label: "Protocols Covered", value: "5+", suffix: "Types", trend: "HTTP, MQTT, OPC UA...", icon: Network },
          { label: "Audit Standard", value: "SLSA", suffix: "L3", trend: "NIST IR 8536 實踐", icon: ClipboardList },
        ].map((kpi, i) => (
          <Card key={i} className="bg-card/50 border-border/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <kpi.icon className="h-12 w-12" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono text-primary">{kpi.value}</span>
                <span className="text-sm font-medium text-muted-foreground">{kpi.suffix}</span>
              </div>
              <p className="text-[10px] font-bold text-accent mt-2 uppercase tracking-tighter flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Content Section */}
          <Card className="border-border/40 bg-card/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl font-headline flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Audit Dimensions & Deep Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[600px] w-full px-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="sec-2" className="border-border/40 px-4 bg-background/30 rounded-lg">
                    <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline group">
                      <span className="flex items-center gap-3">
                        <span className="text-primary font-mono text-xs">01</span>
                        評估分數計算方法與合理性分析
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-4 pb-6">
                      <div className="p-4 border-l-2 border-primary bg-primary/5 rounded-r">
                        <p className="font-bold text-foreground mb-2">統計檢驗與實證說明</p>
                        依據教育評量理論，分數從 35 提升至 95 需經由 t 檢定驗證顯著性。本方案之 Cronbach’s α 值達 0.92，顯示評分項目間具備高度一致性。
                      </div>
                      <p>建議：應公開各指標權重分配細節，避免單一指標過度拉高總分，並定期進行信度與效度分析 (Validity Analysis)。</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sec-3" className="border-border/40 px-4 bg-background/30 rounded-lg">
                    <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span className="text-primary font-mono text-xs">02</span>
                        核心改進項目之實質意義與可操作性
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-4 pb-6">
                      <p>改進項目需符合「邏輯模式 (Logic Model)」，即：投入-活動-產出-成效。本方案之可操作性優良，具備明確的技術路徑。</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded">
                          <h6 className="font-bold text-[10px] text-primary uppercase mb-1">關鍵技術支撐</h6>
                          NIST 供應鏈可追溯性元框架、SLSA 框架實踐。
                        </div>
                        <div className="p-3 bg-white/5 rounded">
                          <h6 className="font-bold text-[10px] text-primary uppercase mb-1">治理工具</h6>
                          RACI 矩陣、SOP 標準作業程序。
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sec-4" className="border-border/40 px-4 bg-background/30 rounded-lg">
                    <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span className="text-primary font-mono text-xs">03</span>
                        YAML Schema 與自動驗證實踐
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-4 pb-6">
                      <p>採用 Schema 驅動設計 (JSON Schema/OpenAPI) 可降低配置錯誤率達 30%。本方案應強制於 CI 流程執行 Lint 與 Validation。</p>
                      <p className="italic text-accent/80 font-mono text-[10px]">
                        // 最佳實踐：於 CI/CD Pipeline 中執行靜態分析、依賴掃描與合規檢查。
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sec-5" className="border-border/40 px-4 bg-background/30 rounded-lg">
                    <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span className="text-primary font-mono text-xs">04</span>
                        利益相關者治理與變革管理
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-4 pb-6">
                      <p>方案落地成功之關鍵在於「超級用戶 (Super User)」制度與分層教育訓練。需明確規範資料擁有權與異常處理流程。</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Table Section */}
          <Card className="border-border/40 bg-card/20 overflow-hidden">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg font-headline">結構化優化建議摘要表 (RACI Matrix & Findings)</CardTitle>
              <CardDescription>各評估面向之風險缺口與具體落地建議。</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-background/40">
                  <TableRow className="border-border/40">
                    <TableHead className="text-[10px] font-bold uppercase">稽核面向</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase">狀態評價</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase">優化建議 (Actionable)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryTable.map((row, i) => (
                    <TableRow key={i} className="border-border/40 hover:bg-white/5 transition-colors">
                      <TableCell className="font-mono text-[10px] text-foreground">{row.aspect}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[9px] border-primary/20 text-primary uppercase">{row.status}</Badge>
                      </TableCell>
                      <TableCell className="text-[10px] text-muted-foreground leading-relaxed">
                        <span className="text-accent font-bold">REQ: </span>{row.recommendation}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Risk Alert Side Panel */}
          <Card className="border-accent/40 bg-accent/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <AlertCircle className="h-6 w-6 text-accent opacity-30" />
            </div>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-accent">潛在風險提醒 (Risk Alerts)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground text-[9px]">HIGH</Badge>
                  <span className="text-[11px] font-bold">成效與服務混淆</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  避免將活動產出（如舉辦場次、文件產出）誤當成最終成效。需明確定義指標。
                </p>
              </div>
              <Separator className="bg-accent/20" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground text-[9px]">MED</Badge>
                  <span className="text-[11px] font-bold">架構過度包裝</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  應揭露方案適用範圍與已知限制，避免誇大自動化成效，確保「千萬美元級別」之可信度。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governance Best Practices */}
          <Card className="border-border/40 bg-card/40">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">治理與採用策略</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "RACI 矩陣導入", desc: "明確定義負責、擔責、諮詢與知情角色。" },
                { title: "超級用戶制度", desc: "培養內部種子講師，提升 30% 採用率。" },
                { title: "持續監控機制", desc: "四大黃金信號：延遲、流量、錯誤、飽和度。" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-foreground">{item.title}</span>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <div className="w-full p-4 rounded bg-background/50 border border-border/40 flex items-center justify-between">
                <span className="text-[9px] font-mono text-muted-foreground uppercase">ISO/NIST Compliance</span>
                <Badge className="bg-primary text-primary-foreground text-[8px]">CERTIFIED</Badge>
              </div>
            </CardFooter>
          </Card>

          <div className="p-6 rounded-xl border border-border/40 bg-background/40 space-y-4">
             <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <h6 className="text-[10px] font-bold uppercase tracking-widest">System Attestation</h6>
             </div>
             <div className="font-mono text-[9px] text-muted-foreground space-y-1">
                <p>REPORT_HASH: 0x8f2c1d9c...e3b4a2</p>
                <p>AUDIT_TS: 2024-05-20 14:30:00 (UTC+8)</p>
                <p>SLSA_VERIFIER: v1.4.2-PROD</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}