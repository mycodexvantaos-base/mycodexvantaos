#!/bin/bash
# MyCodeXvantaOS 規範測試執行腳本

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPORT_DIR="$PROJECT_ROOT/docs/analysis"
REPORT_FILE="$REPORT_DIR/spec-test-report.json"

# 確保報告目錄存在
mkdir -p "$REPORT_DIR"

echo "🚀 開始執行 MyCodeXvantaOS 規範測試..."
echo ""

# 初始化計數器
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# 測試結果數組
declare -a TEST_RESULTS

# 測試函數
run_test() {
    local category="$1"
    local test_name="$2"
    local condition="$3"
    local message="$4"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if eval "$condition"; then
        PASSED_TESTS=$((PASSED_TESTS + 1))
        echo "  ✅ [$category] $test_name: $message"
        TEST_RESULTS+=("{\"category\":\"$category\",\"testName\":\"$test_name\",\"passed\":true,\"message\":\"$message\"}")
    else
        FAILED_TESTS=$((FAILED_TESTS + 1))
        echo "  ❌ [$category] $test_name: $message"
        TEST_RESULTS+=("{\"category\":\"$category\",\"testName\":\"$test_name\",\"passed\":false,\"message\":\"$message\"}")
    fi
}

# ========================================
# A. 身份錨點測試
# ========================================
echo "📋 執行身份錨點測試..."

# 檢查治理規範存在
GOVERNANCE_SPEC="$PROJECT_ROOT/governance/platform-governance-spec.yaml"
run_test "Identity" "governance_spec_exists" "[ -f '$GOVERNANCE_SPEC' ]" "治理規範檔案存在"

# 檢查組織身份
if [ -f "$GOVERNANCE_SPEC" ]; then
    ORG_IDENTITY=$(grep "org_identity:" "$GOVERNANCE_SPEC" | head -1 | cut -d'"' -f2)
    run_test "Identity" "org_identity_correct" "[ '$ORG_IDENTITY' = 'mycodexvantaos' ]" "組織身份為 mycodexvantaos"
    
    ROOT_PREFIX=$(grep "root_prefix:" "$GOVERNANCE_SPEC" | head -1 | cut -d'"' -f2)
    run_test "Identity" "root_prefix_correct" "[ '$ROOT_PREFIX' = 'mycodexvantaos' ]" "根前綴為 mycodexvantaos"
    
    NPM_SCOPE=$(grep "npm_scope:" "$GOVERNANCE_SPEC" | head -1 | cut -d'"' -f2)
    run_test "Identity" "npm_scope_correct" "[ '$NPM_SCOPE' = '@mycodexvantaos' ]" "NPM Scope 為 @mycodexvantaos"
fi

# ========================================
# B. 套件結構測試
# ========================================
echo ""
echo "📦 執行套件結構測試..."

PACKAGES_DIR="$PROJECT_ROOT/packages"
run_test "Package" "packages_dir_exists" "[ -d '$PACKAGES_DIR' ]" "packages 目錄存在"

if [ -d "$PACKAGES_DIR" ]; then
    PACKAGE_COUNT=$(find "$PACKAGES_DIR" -maxdepth 1 -type d | wc -l)
    PACKAGE_COUNT=$((PACKAGE_COUNT - 1)) # 減去當前目錄
    run_test "Package" "package_count_sufficient" "[ $PACKAGE_COUNT -ge 20 ]" "套件數量足夠 ($PACKAGE_COUNT >= 20)"
    
    # 檢查命名慣例
    INVALID_PACKAGES=$(find "$PACKAGES_DIR" -maxdepth 2 -name "package.json" -exec grep -L '"name": "@mycodexvantaos' {} \; 2>/dev/null | wc -l)
    run_test "Package" "naming_convention" "[ $INVALID_PACKAGES -eq 0 ]" "所有套件遵循命名慣例"
fi

# ========================================
# C. 服務結構測試
# ========================================
echo ""
echo "🔧 執行服務結構測試..."

SERVICES_DIR="$PROJECT_ROOT/services"
run_test "Service" "services_dir_exists" "[ -d '$SERVICES_DIR' ]" "services 目錄存在"

if [ -d "$SERVICES_DIR" ]; then
    SERVICE_COUNT=$(find "$SERVICES_DIR" -maxdepth 1 -type d | wc -l)
    SERVICE_COUNT=$((SERVICE_COUNT - 1))
    run_test "Service" "service_count_sufficient" "[ $SERVICE_COUNT -ge 15 ]" "服務數量足夠 ($SERVICE_COUNT >= 15)"
    
    # 檢查服務命名
    VALID_SERVICES=$(find "$SERVICES_DIR" -maxdepth 1 -type d -name "mycodexvantaos-*" | wc -l)
    run_test "Service" "service_naming" "[ $VALID_SERVICES -gt 0 ]" "服務遵循命名慣例 ($VALID_SERVICES 個)"
fi

# ========================================
# D. 層級架構測試
# ========================================
echo ""
echo "🏛️ 執行層級架構測試..."

# Builder 層
BUILDER_EXISTS=$([ -d "$PACKAGES_DIR/builder" ] && echo "true" || echo "false")
run_test "Layer" "builder_layer" "$BUILDER_EXISTS" "Builder 層存在"

# Runtime 層
RUNTIME_EXISTS=$([ -d "$PACKAGES_DIR/runtime" ] && echo "true" || echo "false")
run_test "Layer" "runtime_layer" "$RUNTIME_EXISTS" "Runtime 層存在"

# Deployment 層
DEPLOYMENT_EXISTS=$([ -d "$PACKAGES_DIR/deployment" ] && echo "true" || echo "false")
run_test "Layer" "deployment_layer" "$DEPLOYMENT_EXISTS" "Deployment 層存在"

# Governance 層
GOVERNANCE_EXISTS=$([ -d "$PROJECT_ROOT/governance" ] && echo "true" || echo "false")
run_test "Layer" "governance_layer" "$GOVERNANCE_EXISTS" "Governance 層存在"

# ========================================
# E. 治理規則測試
# ========================================
echo ""
echo "📜 執行治理規則測試..."

CI_RULES_DIR="$PROJECT_ROOT/ci/rules"
run_test "Governance" "ci_rules_dir_exists" "[ -d '$CI_RULES_DIR' ]" "CI 規則目錄存在"

if [ -d "$CI_RULES_DIR" ]; then
    RULE_COUNT=$(find "$CI_RULES_DIR" -name "*.rule.ts" | wc -l)
    run_test "Governance" "rule_files_sufficient" "[ $RULE_COUNT -ge 15 ]" "規則檔案數量足夠 ($RULE_COUNT >= 15)"
fi

# Provider 註冊表
PROVIDER_REGISTRY="$PROJECT_ROOT/governance/provider-registry.yaml"
run_test "Governance" "provider_registry_exists" "[ -f '$PROVIDER_REGISTRY' ]" "Provider 註冊表存在"

# 例外檔案
EXCEPTIONS_FILE="$PROJECT_ROOT/governance/exceptions.yaml"
run_test "Governance" "exceptions_file_exists" "[ -f '$EXCEPTIONS_FILE' ]" "例外檔案存在"

# ========================================
# F. 能力集合測試
# ========================================
echo ""
echo "⚡ 執行能力集合測試..."

CAPABILITY_SET="$PROJECT_ROOT/governance/capability-set.yaml"
run_test "Capability" "capability_set_exists" "[ -f '$CAPABILITY_SET' ]" "能力集合檔案存在"

if [ -f "$CAPABILITY_SET" ]; then
    CAPABILITY_COUNT=$(grep -c "^  - id:" "$CAPABILITY_SET" 2>/dev/null || echo 0)
    run_test "Capability" "capability_count" "[ $CAPABILITY_COUNT -ge 15 ]" "能力定義數量足夠 ($CAPABILITY_COUNT >= 15)"
fi

# ========================================
# G. 測試覆蓋率測試
# ========================================
echo ""
echo "🧪 執行測試覆蓋率測試..."

# 計算測試檔案數量
TEST_COUNT=$(find "$PROJECT_ROOT" -name "*.test.ts" -o -name "*.spec.ts" 2>/dev/null | grep -v node_modules | wc -l)
run_test "Test" "test_files_exist" "[ $TEST_COUNT -gt 0 ]" "測試檔案存在 ($TEST_COUNT 個)"

# Jest 配置
JEST_CONFIG="$PROJECT_ROOT/jest.config.js"
run_test "Test" "jest_config_exists" "[ -f '$JEST_CONFIG' ]" "Jest 配置存在"

# ========================================
# H. 配置覆蓋率測試
# ========================================
echo ""
echo "⚙️ 執行配置覆蓋率測試..."

# 環境配置範本
ENV_NATIVE="$PROJECT_ROOT/.env.native.example"
ENV_CONNECTED="$PROJECT_ROOT/.env.connected.example"
ENV_HYBRID="$PROJECT_ROOT/.env.hybrid.example"

run_test "Config" "env_native_exists" "[ -f '$ENV_NATIVE' ]" "原生模式配置範本存在"
run_test "Config" "env_connected_exists" "[ -f '$ENV_CONNECTED' ]" "連接模式配置範本存在"
run_test "Config" "env_hybrid_exists" "[ -f '$ENV_HYBRID' ]" "混合模式配置範本存在"

# TypeScript 配置
TSCONFIG="$PROJECT_ROOT/tsconfig.json"
run_test "Config" "tsconfig_exists" "[ -f '$TSCONFIG' ]" "TypeScript 配置存在"

# ========================================
# I. 文檔覆蓋率測試
# ========================================
echo ""
echo "📚 執行文檔覆蓋率測試..."

DOCS_DIR="$PROJECT_ROOT/docs"
run_test "Docs" "docs_dir_exists" "[ -d '$DOCS_DIR' ]" "docs 目錄存在"

if [ -d "$DOCS_DIR" ]; then
    README_EXISTS=$([ -f "$PROJECT_ROOT/README.md" ] && echo "true" || echo "false")
    run_test "Docs" "readme_exists" "$README_EXISTS" "README.md 存在"
    
    ARCHITECTURE_EXISTS=$([ -f "$DOCS_DIR/ARCHITECTURE.md" ] || [ -f "$PROJECT_ROOT/ARCHITECTURE.md" ] && echo "true" || echo "false")
    run_test "Docs" "architecture_doc_exists" "$ARCHITECTURE_EXISTS" "架構文檔存在"
fi

# ========================================
# J. Provider 測試
# ========================================
echo ""
echo "🔌 執行 Provider 測試..."

PROVIDERS_DIR="$PROJECT_ROOT/providers"
run_test "Provider" "providers_dir_optional" "[ -d '$PROVIDERS_DIR' ] || [ -d '$PACKAGES_DIR/providers' ]" "Provider 目錄存在"

# ========================================
# 生成報告
# ========================================
echo ""
echo "=============================================="
echo "📊 規範測試報告"
echo "=============================================="
echo "總測試數: $TOTAL_TESTS"
echo "通過: $PASSED_TESTS ✅"
echo "失敗: $FAILED_TESTS ❌"

COVERAGE=0
if [ $TOTAL_TESTS -gt 0 ]; then
    COVERAGE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
fi
echo "覆蓋率: ${COVERAGE}%"
echo ""

# 生成 JSON 報告
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "{" > "$REPORT_FILE"
echo "  \"timestamp\": \"$TIMESTAMP\"," >> "$REPORT_FILE"
echo "  \"totalTests\": $TOTAL_TESTS," >> "$REPORT_FILE"
echo "  \"passed\": $PASSED_TESTS," >> "$REPORT_FILE"
echo "  \"failed\": $FAILED_TESTS," >> "$REPORT_FILE"
echo "  \"coverage\": $COVERAGE," >> "$REPORT_FILE"
echo "  \"results\": [" >> "$REPORT_FILE"

for i in "${!TEST_RESULTS[@]}"; do
    if [ $i -lt $((${#TEST_RESULTS[@]} - 1)) ]; then
        echo "    ${TEST_RESULTS[$i]}," >> "$REPORT_FILE"
    else
        echo "    ${TEST_RESULTS[$i]}" >> "$REPORT_FILE"
    fi
done

echo "  ]" >> "$REPORT_FILE"
echo "}" >> "$REPORT_FILE"

echo "📄 報告已輸出至: $REPORT_FILE"

# 返回適當的退出碼
if [ $FAILED_TESTS -gt 0 ]; then
    exit 1
else
    exit 0
fi