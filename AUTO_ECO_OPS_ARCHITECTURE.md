# AutoEcoOps Ecosystem Architecture Design

## 1. 系統上下文與容器架構 (System Context & Container Diagram)

AutoEcoOps 是一個企業級自動化維運與生態系統平台，旨在透過高度自動化、零人類介入的流程，實現軟體生命週期的全面管理。系統架構基於領域驅動設計 (DDD)，將核心控制平面與業務平台分離，確保高可用性、安全合規與可擴展性。

### 1.1 核心架構圖

```mermaid
C4Context
    title System Context & Container Diagram - AutoEcoOps Ecosystem

    Person(user, "使用者／系統", "通過契約呼叫平台功能")

    System_Ext(repo, "Git Repo", "部署清單、Helm Charts、策略定義")

    Boundary(boundary_shared, "Shared Kernel (控制平面)") {
        Container(auth, "Auth Service", "Keycloak/Supabase", "身份驗證、RBAC、Token 發放")
        Container(memory, "Memory Hub", "pgvector + Embeddings", "文件切片、向量檢索、RAG 上下文")
        Container(event, "Event Bus", "Kafka/Redis Streams", "事件路由、重放、去重")
        Container(policy, "Policy & Audit", "OPA/Kyverno + 不可變日誌", "策略判決、審計軌跡")
        Container(infra, "Infra Manager", "ArgoCD/Helm 控制器", "漂移檢測、同步、回滾鉤子")
    }

    Boundary(boundary_platforms, "Platforms (業務域)") {
        Container(p01, "Platform-01", "IndestructibleAutoOps", "觀測、自癒、修復編排")
        Container(p02, "Platform-02", "IAOps", "IaC、GitOps、供應鏈合規")
        Container(p03, "Platform-03", "MachineNativeOps", "節點基線、硬體納管、邊緣代理")
    }

    Boundary(boundary_interfaces, "契約層 & SDK") {
        Container(contracts, "Interfaces", "OpenAPI / AsyncAPI / JSON Schema", "版本化合約")
        Container(sdk, "SDK", "TypeScript / Python", "統一認證、追蹤、錯誤處理")
    }

    Rel(user, contracts, "使用", "HTTPS/gRPC")
    Rel(contracts, p01, "實現", "")
    Rel(contracts, p02, "實現", "")
    Rel(contracts, p03, "實現", "")

    Rel(p01, auth, "驗證授權", "")
    Rel(p01, memory, "查詢上下文", "")
    Rel(p01, event, "發布事件", "")
    Rel(p01, policy, "寫入審計", "")

    Rel(p02, auth, "驗證授權", "")
    Rel(p02, memory, "查詢上下文", "")
    Rel(p02, event, "發布／訂閱", "")
    Rel(p02, policy, "寫入審計", "")
    Rel(p02, infra, "觸發同步", "")

    Rel(p03, auth, "驗證授權", "")
    Rel(p03, memory, "查詢上下文", "")
    Rel(p03, event, "發布事件", "")
    Rel(p03, policy, "寫入審計", "")
    Rel(p03, infra, "取得意圖狀態", "")

    Rel(infra, repo, "監控變更", "GitOps")
```

## 2. 核心工作流程 (Core Workflows)

### 2.1 同步請求與非同步事件流

```mermaid
flowchart TB
    subgraph 同步請求流
        User[使用者/系統] -->|API 呼叫| P01[Platform-01/API]
        P01 -->|1. 驗證| Auth[Auth Service]
        Auth -->|2. 身分/權限| P01
        P01 -->|3. 查詢上下文| Memory[Memory Hub]
        Memory -->|4. 向量檢索| P01
        P01 -->|5. 業務處理| P01
        P01 -->|6. 同步寫入審計| Audit[Policy & Audit]
        Audit -->|7. 審計日誌儲存| AuditDB[(不可變儲存)]
        P01 -->|8. API 回應| User
    end

    subgraph 非同步事件流
        direction LR
        Producer[平台產生事件] -->|發布| EB[Event Bus]
        EB -->|投遞| Subscriber1[Platform-02 IAOps]
        EB -->|投遞| Subscriber2[Platform-03 MachineNativeOps]
        EB -->|投遞| SubscriberN[其他訂閱者]
        Producer -.->|事件存證| Audit
        Subscriber1 -.->|處理結果審計| Audit
        Subscriber2 -.->|處理結果審計| Audit
    end

    subgraph 事件特性
        direction TB
        Event[事件 Payload] -->|含| TraceID[traceId]
        Event -->|含| Actor[actor]
        Event -->|含| Resource[resource]
        Event -->|含| Decision[policy decision]
        EB -->|支援| Replay[重放]
        EB -->|支援| Dedup[去重 / idempotency key]
    end
```

### 2.2 CI/CD 與 GitOps 部署流程

```mermaid
flowchart TD
    subgraph 開發階段
        Dev[開發者] -->|push code| Repo[GitHub Monorepo]
        Repo -->|觸發| CI[GitHub Actions CI]
        CI -->|單元/合約測試| Test
        CI -->|SAST/密碼掃描| Sec[Security Scan]
        CI -->|產生 SBOM| SBOM
        CI -->|簽章| Sign[cosign/slsa]
        CI -->|產出| Artifact[OCI Artifact / Image]
        Artifact -->|推送| Registry[容器註冊表]
    end

    subgraph 部署階段
        GitOpsRepo[GitOps 設定 Repo] -->|ArgoCD 監控| Argo[ArgoCD Server]
        Argo -->|同步| Cluster[Kubernetes 叢集]
        Cluster --> CoreNS[core 命名空間]
        Cluster --> Platform01NS[platform-01 命名空間]
        Cluster --> Platform02NS[platform-02 命名空間]
        Cluster --> Platform03NS[platform-03 命名空間]
        Registry -->|拉取| Cluster
    end

    subgraph 策略與審計
        Policy[OPA/Kyverno] -->|驗證簽章/准入| Cluster
        Audit[審計日誌] -->|記錄部署事件| AuditStore
        InfraMgr[Infra Manager] -->|drift detect| Cluster
        InfraMgr -->|回滾觸發| Argo
    end

    Repo -.->|helm-charts, manifests| GitOpsRepo
    CI -->|更新部署清單| GitOpsRepo
```

## 3. 企業級核心能力規範

| 領域 | 規範與實作要求 |
| :--- | :--- |
| **身分與授權** | - 統一使用 OIDC 聯盟（Keycloak/Supabase）<br>- RBAC 權限模型集中定義，平台僅讀取決策<br>- 所有 API 請求必須通過 JWT 驗證，並綁定 traceId / sessionId |
| **可觀測性** | - 結構化日誌強制包含 timestamp, traceId, spanId, service, platformId, action, decision<br>- 指標曝露符合 OpenMetrics，SLO 定義：可用性 ≥99.99%、P95 延遲 ≤200ms、錯誤率 ≤0.1%<br>- 分散式追蹤取樣率 100% 儲存關鍵路徑 |
| **合規審計** | - 所有審計日誌儲存於不可變儲存（Object Lock / Append‑only 資料庫）<br>- 審計事件必須包含：操作人、資源、動作、結果、策略版本、合規標籤<br>- 提供合規報表自動生成介面（SOC2、ISO27001 就緒） |
| **供應鏈安全** | - 達到 SLSA Build Level 3：建置流程隔離、產出摘要簽章、可重現建置<br>- 每個 artifact 必須附 SBOM（CycloneDX）並簽署（cosign）<br>- 部署前須通過政策驗證：簽章有效、漏洞掃描無高風險、SBOM 授權合規 |
| **災備與彈性** | - 支援多集群部署（Active‑Active / Active‑Standby）<br>- 跨區域複製審計資料與事件流<br>- 定義 RPO ≤ 1 小時，RTO ≤ 15 分鐘 |

## 4. 共享內核（控制平面）強化規範

所有 `core/*` 服務須滿足：高可用、橫向擴展、版本化介面、安全預設。

### 4.1 auth-service（身分代理）
- 對外提供 OIDC Discovery Endpoint
- 內部 RBAC 規則由 policy-audit 定期同步，不儲存業務權限
- 必須支援 API 金鑰輪換與撤銷清單（CRL）

### 4.2 memory-hub
- 文件入庫前必須掃毒（ClamAV）
- 向量嵌入模型版本固定，切換版本需審計記錄
