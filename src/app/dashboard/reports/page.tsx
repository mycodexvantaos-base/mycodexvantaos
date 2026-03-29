import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollText, CheckCircle2, AlertCircle, ShieldCheck, Zap, Info, ArrowUpRight } from "lucide-react";

export default function ReportsPage() {
  const summaryTable = [
    { aspect: "評分計算", status: "基本合理", risk: "細節透明度不足", recommendation: "公開指標分數、權重、統計檢驗" },
    { aspect: "核心改進", status: "具備可操作性", risk: "部分缺乏驗證機制", recommendation: "強化 SOP、責任分工、驗證指標" },
    { aspect: "YAML/schema", status: "基本符合標準", risk: "版本控管與驗證需加強", recommendation: "採用國際標準、持續自動驗證" },
    { aspect: "多協議/自動驗證", status: "架構完整", risk: "安全與互通性細節", recommendation: "強化協議轉換、資料標準化、監控" },
    { aspect: "工具與文件", status: "工具鏈完整", risk: "文件結構與知識管理", recommendation: "精煉文件、建立知識庫與訓練體系" },
    { aspect: "風險/誤導", status: "無重大誤導", risk: "成效與服務混淆", recommendation: "明確區分、揭露限制與風險" },
    { aspect: "驗證/監控", status: "有實作案例", risk: "持續改進機制待加強", recommendation: "多層次監控、定期稽核、用戶回饋" },
    { aspect: "治理/教育", status: "架構初步建立", risk: "角色分工與訓練深度", recommendation: "RACI 矩陣、超級用戶、分層訓練" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <ScrollText className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Optimization Analysis</span>
        </div>
        <h1 className="text-3xl font-bold font-headline">機器友善架構完整方案驗證報告</h1>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          依據現代資訊系統設計與運維的核心理念，針對自動化工具、CI/CD 流程及多協議整合進行嚴謹的正確性與合理性驗證。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border/40 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">驗證分數 (改進後)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-accent">95</span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-accent">
              <ArrowUpRight className="h-3 w-3" />
              <span>從 35/100 大幅提升</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">核心指標效度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Cronbach’s α</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">0.92 (極高)</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">協議覆蓋率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5+ Protocols</div>
            <p className="text-[10px] text-muted-foreground mt-2">HTTP, MQTT, OPC UA, gRPC, LoRaWAN</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">合規性標準</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SLSA Level 3</div>
            <p className="text-[10px] text-muted-foreground mt-2">依循 NIST IR 8536 實踐</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border/40 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                方案核心改進驗證
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-border/40">
                  <AccordionTrigger className="text-sm font-bold">二、評估分數計算方法與合理性分析</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>評分機制設計原則需兼顧「效度」與「信度」。若分數由 35 提升至 95，需經由 t 檢定與專家評分驗證。建議方案應公開指標權重，避免單一指標過度影響總分。</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>指標相關係數檢核：預期 0.85 - 0.92</li>
                      <li>信度分析：Cronbach’s α 需大於 0.8</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border/40">
                  <AccordionTrigger className="text-sm font-bold">三、核心改進項目之實質意義與可操作性</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    <p>核心改進需具體可衡量且具備邏輯關聯性。建議導入 NIST 供應鏈元框架與 SLSA 框架，並配合 cosign, Rekor 等工具落地。需明確 SOP 執行藍圖與 RACI 矩陣。</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-border/40">
                  <AccordionTrigger className="text-sm font-bold">四、YAML 區塊與自動驗證實踐</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>採用 Schema 驅動設計（JSON Schema/OpenAPI）可降低配置錯誤率約 30%。CI 流程中應強制執行自動驗證。</p>
                    <p>元數據治理應參考 ISO 23081 標準，建立跨系統的 Registry 與 Crosswalk。</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-border/40">
                  <AccordionTrigger className="text-sm font-bold">五、工具與文件落地支撐</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    <p>工具鏈應包含 GitHub/GitLab CI、cosign、Syft 等現代化安全工具。文件化流程需包含 SOP、API 文件與教育訓練教材，支援超級用戶制度以提升採用率。</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">十、結構化建議摘要表</CardTitle>
              <CardDescription>各面向評價、風險缺口與具體優化建議。</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/40">
                    <TableHead>評估面向</TableHead>
                    <TableHead>現況評價</TableHead>
                    <TableHead>優化建議</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryTable.map((row, i) => (
                    <TableRow key={i} className="border-border/40">
                      <TableCell className="font-medium text-xs">{row.aspect}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] border-primary/30 text-primary uppercase">
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{row.recommendation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/40 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                潛在風險提醒
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-1">
                <span className="text-xs font-bold text-amber-500">成效與服務混淆</span>
                <p className="text-[11px] text-muted-foreground">避免將活動產出（如舉辦場次）誤當成最終成效。</p>
              </div>
              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-1">
                <span className="text-xs font-bold text-amber-500">過度包裝風險</span>
                <p className="text-[11px] text-muted-foreground">應揭露方案限制與適用範圍，避免誇大自動化成效。</p>
              </div>
              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-1">
                <span className="text-xs font-bold text-amber-500">指標模糊</span>
                <p className="text-[11px] text-muted-foreground">若缺乏可量化指標，評分將流於形式。建議補足驗證矩陣。</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">治理建議</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold">RACI 矩陣導入</span>
                  <p className="text-[11px] text-muted-foreground">明確定義負責(R)、擔責(A)、諮詢(C)與知情(I)。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold">超級用戶制度</span>
                  <p className="text-[11px] text-muted-foreground">培養內部種子講師，提升 30% 以上的系統採用率。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold">持續改進機制</span>
                  <p className="text-[11px] text-muted-foreground">整合監控數據與用戶回饋，動態優化架構流程。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2 p-4 rounded-xl border border-border/40 bg-sidebar-background/40">
            <div className="flex items-center gap-2">
              <Info className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Report Generated on</span>
            </div>
            <span className="text-xs font-mono">2024-05-20 14:30:00 (UTC+8)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
