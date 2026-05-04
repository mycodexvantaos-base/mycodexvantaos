#!/bin/bash
# MyCodeXvantaOS 深度覆蓋率分析腳本

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPORT_DIR="$PROJECT_ROOT/docs/analysis"
REPORT_FILE="$REPORT_DIR/coverage-report.json"

# 確保報告目錄存在
mkdir -p "$REPORT_DIR"

echo "📊 開始深度覆蓋率分析..."
echo ""

# ========================================
# 計算函數
# ========================================

# 計算目錄中的檔案數量
count_files() {
    local dir="$1"
    local ext="$2"
    if [ -d "$dir" ]; then
        find "$dir" -type f -name "*.$ext" 2>/dev/null | grep -v node_modules | wc -l
    else
        echo 0
    fi
}

# 計算套件覆蓋率
analyze_packages() {
    echo "📦 分析套件覆蓋率..."
    
    local total=0
    local covered=0
    local details=""
    
    local packages=(
        "ai-agent" "ai-embedding" "ai-llm" "ai-memory"
        "api-generator" "schema-generator" "workflow-generator" "test-generator" "deployment-manifest-generator"
        "background-job-runtime" "builder" "runtime" "deployment" "config-sync"
        "core-auth" "core-config" "core-gateway" "core-kernel"
        "database" "data-graph" "data-pipeline" "data-vector-store"
        "docs-search" "events" "execution" "monitoring" "plugin-loader"
        "platform-notification" "platform-observability" "platform-scheduler"
        "providers" "scheduler" "security-secrets" "security-validation"
        "service-discovery" "session-runtime" "storage" "ui-generator" "governance-policy"
    )
    
    for pkg in "${packages[@]}"; do
        total=$((total + 1))
        local pkg_path="$PROJECT_ROOT/packages/$pkg"
        
        if [ -d "$pkg_path" ]; then
            local score=0
            [ -f "$pkg_path/package.json" ] && score=$((score + 25))
            [ -f "$pkg_path/src/index.ts" ] && score=$((score + 25))
            [ -d "$pkg_path/__tests__" ] && score=$((score + 25))
            [ -f "$pkg_path/README.md" ] && score=$((score + 25))
            
            if [ $score -ge 75 ]; then
                covered=$((covered + 1))
            fi
        fi
    done
    
    local percentage=0
    if [ $total -gt 0 ]; then
        percentage=$((covered * 100 / total))
    fi
    
    echo "  📦 套件覆蓋率: $covered/$total ($percentage%)"
    PACKAGE_COVERAGE="$covered:$total:$percentage"
}

# 計算服務覆蓋率
analyze_services() {
    echo "🔧 分析服務覆蓋率..."
    
    local total=0
    local covered=0
    
    # Dynamically get actual services from the services directory
    local services=()
    if [ -d "$PROJECT_ROOT/services" ]; then
        for svc_dir in "$PROJECT_ROOT/services"/*; do
            if [ -d "$svc_dir" ]; then
                local svc_name=$(basename "$svc_dir")
                services+=("$svc_name")
            fi
        done
    fi
    
    for svc in "${services[@]}"; do
        total=$((total + 1))
        local svc_path="$PROJECT_ROOT/services/$svc"
        
        if [ -d "$svc_path" ]; then
            local score=0
            [ -f "$svc_path/service-manifest.yaml" ] && score=$((score + 40))
            [ -f "$svc_path/Dockerfile" ] && score=$((score + 30))
            [ -d "$svc_path/config" ] && score=$((score + 30))
            
            if [ $score -ge 70 ]; then
                covered=$((covered + 1))
            fi
        fi
    done
    
    local percentage=0
    if [ $total -gt 0 ]; then
        percentage=$((covered * 100 / total))
    fi
    
    echo "  🔧 服務覆蓋率: $covered/$total ($percentage%)"
    SERVICE_COVERAGE="$covered:$total:$percentage"
}

# 計算層級覆蓋率
analyze_layers() {
    echo "🏛️ 分析層級覆蓋率..."
    
    local total=20
    local covered=0
    
    # Layer A: Builder
    [ -d "$PROJECT_ROOT/packages/builder" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/ui-generator" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/api-generator" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/schema-generator" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/workflow-generator" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/test-generator" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/deployment-manifest-generator" ] && covered=$((covered + 1)) && total=$((total + 1))
    
    # Layer B: Runtime
    [ -d "$PROJECT_ROOT/packages/runtime" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/execution" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/session-runtime" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/background-job-runtime" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/scheduler" ] && covered=$((covered + 1)) && total=$((total + 1))
    [ -d "$PROJECT_ROOT/packages/plugin-loader" ] && covered=$((covered + 1)) && total=$((total + 1))
    
    # Layer C: Native Services
    [ -d "$PROJECT_ROOT/packages/database" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/packages/storage" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/packages/core-auth" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/packages/events" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/packages/security-secrets" ] && covered=$((covered + 1))
    total=$((total + 5))
    
    # Layer D: Connector
    [ -d "$PROJECT_ROOT/packages/providers" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/packages/service-discovery" ] && covered=$((covered + 1))
    total=$((total + 2))
    
    # Layer E: Deployment
    [ -d "$PROJECT_ROOT/packages/deployment" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/services" ] && covered=$((covered + 1))
    total=$((total + 2))
    
    # Layer F: Governance
    [ -d "$PROJECT_ROOT/governance" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/ci" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/governance/platform-governance-spec.yaml" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/governance/provider-registry.yaml" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/governance/capability-set.yaml" ] && covered=$((covered + 1))
    total=$((total + 5))
    
    local percentage=0
    if [ $total -gt 0 ]; then
        percentage=$((covered * 100 / total))
    fi
    
    echo "  🏛️ 層級覆蓋率: $covered/$total ($percentage%)"
    LAYER_COVERAGE="$covered:$total:$percentage"
}

# 計算測試覆蓋率
analyze_tests() {
    echo "🧪 分析測試覆蓋率..."
    
    local test_count=$(find "$PROJECT_ROOT" \( -name "*.test.ts" -o -name "*.spec.ts" \) 2>/dev/null | grep -v node_modules | wc -l)
    local src_count=$(find "$PROJECT_ROOT/packages" -name "*.ts" 2>/dev/null | grep -v node_modules | grep -v test | grep -v spec | wc -l)
    
    local percentage=0
    if [ $src_count -gt 0 ]; then
        percentage=$((test_count * 100 / src_count))
    fi
    
    echo "  🧪 測試覆蓋率: $test_count/$src_count 檔案 ($percentage%)"
    TEST_COVERAGE="$test_count:$src_count:$percentage"
}

# 計算規範覆蓋率
analyze_specs() {
    echo "📜 分析規範覆蓋率..."
    
    local total=6
    local covered=0
    
    [ -f "$PROJECT_ROOT/governance/platform-governance-spec.yaml" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/governance/capability-set.yaml" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/governance/provider-registry.yaml" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/governance/namespace-policy.yaml" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/governance/lifecycle-policy.yaml" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/governance/exceptions.yaml" ] && covered=$((covered + 1))
    
    local percentage=$((covered * 100 / total))
    
    echo "  📜 規範覆蓋率: $covered/$total ($percentage%)"
    SPEC_COVERAGE="$covered:$total:$percentage"
}

# 計算配置覆蓋率
analyze_config() {
    echo "⚙️ 分析配置覆蓋率..."
    
    local total=11
    local covered=0
    
    [ -f "$PROJECT_ROOT/.env.native.example" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/.env.connected.example" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/.env.hybrid.example" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/.env.docker.example" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/.env.prod.example" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/tsconfig.json" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/jest.config.js" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/eslint.config.js" ] || [ -f "$PROJECT_ROOT/.eslintrc.js" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/prettier.config.js" ] || [ -f "$PROJECT_ROOT/.prettierrc" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/.github/workflows" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/package.json" ] && covered=$((covered + 1))
    
    local percentage=$((covered * 100 / total))
    
    echo "  ⚙️ 配置覆蓋率: $covered/$total ($percentage%)"
    CONFIG_COVERAGE="$covered:$total:$percentage"
}

# 計算文檔覆蓋率
analyze_docs() {
    echo "📚 分析文檔覆蓋率..."
    
    local total=10
    local covered=0
    
    [ -f "$PROJECT_ROOT/README.md" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/docs/ARCHITECTURE.md" ] || [ -f "$PROJECT_ROOT/ARCHITECTURE.md" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/CONTRIBUTING.md" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/docs/API.md" ] || [ -f "$PROJECT_ROOT/API.md" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/DEPLOYMENT.md" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/SECURITY.md" ] && covered=$((covered + 1))
    [ -f "$PROJECT_ROOT/CHANGELOG.md" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/docs/onboarding" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/docs/architecture-decision-records" ] && covered=$((covered + 1))
    [ -d "$PROJECT_ROOT/docs/analysis" ] && covered=$((covered + 1))
    
    local percentage=$((covered * 100 / total))
    
    echo "  📚 文檔覆蓋率: $covered/$total ($percentage%)"
    DOC_COVERAGE="$covered:$total:$percentage"
}

# 計算 CI 規則覆蓋率
analyze_ci_rules() {
    echo "📋 分析 CI 規則覆蓋率..."
    
    local total=20
    local covered=$(find "$PROJECT_ROOT/ci/rules" -name "*.rule.ts" 2>/dev/null | wc -l)
    
    local percentage=0
    if [ $total -gt 0 ]; then
        percentage=$((covered * 100 / total))
        [ $percentage -gt 100 ] && percentage=100
    fi
    
    echo "  📋 CI 規則覆蓋率: $covered/$total ($percentage%)"
    CI_COVERAGE="$covered:$total:$percentage"
}

# ========================================
# 執行所有分析
# ========================================

analyze_packages
analyze_services
analyze_layers
analyze_tests
analyze_specs
analyze_config
analyze_docs
analyze_ci_rules

# ========================================
# 生成報告
# ========================================

echo ""
echo "=============================================="
echo "📊 深度覆蓋率分析報告"
echo "=============================================="

# 解析並顯示結果
IFS=':' read -r pkg_cov pkg_total pkg_pct <<< "$PACKAGE_COVERAGE"
IFS=':' read -r svc_cov svc_total svc_pct <<< "$SERVICE_COVERAGE"
IFS=':' read -r lyr_cov lyr_total lyr_pct <<< "$LAYER_COVERAGE"
IFS=':' read -r tst_cov tst_total tst_pct <<< "$TEST_COVERAGE"
IFS=':' read -r spc_cov spc_total spc_pct <<< "$SPEC_COVERAGE"
IFS=':' read -r cfg_cov cfg_total cfg_pct <<< "$CONFIG_COVERAGE"
IFS=':' read -r doc_cov doc_total doc_pct <<< "$DOC_COVERAGE"
IFS=':' read -r ci_cov ci_total ci_pct <<< "$CI_COVERAGE"

# 顯示進度條
show_bar() {
    local pct=$1
    local filled=$((pct / 10))
    local empty=$((10 - filled))
    printf '█%.0s' $(seq 1 $filled) 2>/dev/null || true
    printf '░%.0s' $(seq 1 $empty) 2>/dev/null || true
}

echo ""
echo "各類覆蓋率:"
printf "  %-15s [%s] %3d%% (%d/%d)\n" "packages" "$(show_bar $pkg_pct)" $pkg_pct $pkg_cov $pkg_total
printf "  %-15s [%s] %3d%% (%d/%d)\n" "services" "$(show_bar $svc_pct)" $svc_pct $svc_cov $svc_total
printf "  %-15s [%s] %3d%% (%d/%d)\n" "layers" "$(show_bar $lyr_pct)" $lyr_pct $lyr_cov $lyr_total
printf "  %-15s [%s] %3d%% (%d/%d)\n" "tests" "$(show_bar $tst_pct)" $tst_pct $tst_cov $tst_total
printf "  %-15s [%s] %3d%% (%d/%d)\n" "specs" "$(show_bar $spc_pct)" $spc_pct $spc_cov $spc_total
printf "  %-15s [%s] %3d%% (%d/%d)\n" "config" "$(show_bar $cfg_pct)" $cfg_pct $cfg_cov $cfg_total
printf "  %-15s [%s] %3d%% (%d/%d)\n" "docs" "$(show_bar $doc_pct)" $doc_pct $doc_cov $doc_total
printf "  %-15s [%s] %3d%% (%d/%d)\n" "ci_rules" "$(show_bar $ci_pct)" $ci_pct $ci_cov $ci_total

# 計算總體覆蓋率
TOTAL_ITEMS=$((pkg_total + svc_total + lyr_total + spc_total + cfg_total + doc_total + ci_total))
COVERED_ITEMS=$((pkg_cov + svc_cov + lyr_cov + spc_cov + cfg_cov + doc_cov + ci_cov))

OVERALL_COVERAGE=0
if [ $TOTAL_ITEMS -gt 0 ]; then
    OVERALL_COVERAGE=$((COVERED_ITEMS * 100 / TOTAL_ITEMS))
fi

echo ""
echo "總體覆蓋率: $OVERALL_COVERAGE%"
echo "覆蓋項目: $COVERED_ITEMS/$TOTAL_ITEMS"

# 識別關鍵缺口
echo ""
echo "🚨 關鍵缺口:"
[ $pkg_pct -lt 50 ] && echo "  - 套件覆蓋率不足 ($pkg_pct%)"
[ $svc_pct -lt 50 ] && echo "  - 服務覆蓋率不足 ($svc_pct%)"
[ $lyr_pct -lt 50 ] && echo "  - 層級覆蓋率不足 ($lyr_pct%)"
[ $tst_pct -lt 50 ] && echo "  - 測試覆蓋率不足 ($tst_pct%)"
[ $spc_pct -lt 80 ] && echo "  - 規範覆蓋率不足 ($spc_pct%)"
[ $cfg_pct -lt 80 ] && echo "  - 配置覆蓋率不足 ($cfg_pct%)"
[ $doc_pct -lt 50 ] && echo "  - 文檔覆蓋率不足 ($doc_pct%)"

# 生成 JSON 報告
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

cat > "$REPORT_FILE" << EOF
{
  "timestamp": "$TIMESTAMP",
  "overallCoverage": $OVERALL_COVERAGE,
  "metrics": [
    {
      "type": "packages",
      "total": $pkg_total,
      "covered": $pkg_cov,
      "percentage": $pkg_pct
    },
    {
      "type": "services",
      "total": $svc_total,
      "covered": $svc_cov,
      "percentage": $svc_pct
    },
    {
      "type": "layers",
      "total": $lyr_total,
      "covered": $lyr_cov,
      "percentage": $lyr_pct
    },
    {
      "type": "tests",
      "total": $tst_total,
      "covered": $tst_cov,
      "percentage": $tst_pct
    },
    {
      "type": "specs",
      "total": $spc_total,
      "covered": $spc_cov,
      "percentage": $spc_pct
    },
    {
      "type": "config",
      "total": $cfg_total,
      "covered": $cfg_cov,
      "percentage": $cfg_pct
    },
    {
      "type": "docs",
      "total": $doc_total,
      "covered": $doc_cov,
      "percentage": $doc_pct
    },
    {
      "type": "ci_rules",
      "total": $ci_total,
      "covered": $ci_cov,
      "percentage": $ci_pct
    }
  ],
  "recommendations": [
    "改善文檔覆蓋率",
    "增加測試檔案覆蓋",
    "完善服務配置"
  ]
}
EOF

echo ""
echo "📄 報告已輸出至: $REPORT_FILE"