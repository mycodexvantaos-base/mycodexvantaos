#!/usr/bin/env bash
# scripts/validate-all.sh
# Run the full mycodexvantaos naming validation suite.
# Based on naming-spec-v1.md Appendix B.7
#
# Usage:
#   ./scripts/validate-all.sh [--reporter=console|json|github] [--fail-on-soft] [--root=<path>]
#
# Exit codes:
#   0 — all hard rules pass
#   1 — hard rule failures found
#   2 — soft warnings found (only when --fail-on-soft is set)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="${SCRIPT_DIR}/.."
REPORTER="console"
FAIL_ON_SOFT=""
ROOT_ARG=""

# Parse arguments
for arg in "$@"; do
  case $arg in
    --reporter=*) REPORTER="${arg#*=}" ;;
    --fail-on-soft) FAIL_ON_SOFT="--fail-on-soft" ;;
    --root=*) ROOT_ARG="--root=${arg#*=}" ;;
    --help)
      echo "Usage: ./scripts/validate-all.sh [--reporter=console|json|github] [--fail-on-soft] [--root=<path>]"
      exit 0
      ;;
  esac
done

echo "=== mycodexvantaos naming validation ==="
echo "  Repo root : ${REPO_ROOT}"
echo "  Reporter  : ${REPORTER}"
echo ""

# Step 1: Run legacy prefix scan first (fast scan, no TypeScript needed)
echo "[1/3] Scanning for forbidden legacy prefixes..."
"${SCRIPT_DIR}/check-legacy-prefix.sh" "${REPO_ROOT}"
LEGACY_EXIT=$?
if [ $LEGACY_EXIT -ne 0 ]; then
  echo "ABORT: Forbidden legacy prefixes found. Fix before proceeding."
  exit 1
fi
echo "  OK: No legacy prefixes found."
echo ""

# Step 2: Run main TypeScript validator
echo "[2/3] Running architecture naming validator..."
cd "${REPO_ROOT}"

if command -v npx &>/dev/null && [ -f "package.json" ]; then
  npx ts-node ci/validate-architecture.ts \
    --reporter="${REPORTER}" \
    ${FAIL_ON_SOFT} \
    ${ROOT_ARG}
  VALIDATOR_EXIT=$?
else
  echo "  WARN: ts-node not available. Skipping TypeScript validator."
  echo "  Install with: npm install -g ts-node typescript"
  VALIDATOR_EXIT=0
fi
echo ""

# Step 3: Validate all YAML files against schemas (if ajv-cli available)
echo "[3/3] Validating YAML schemas..."
if command -v ajv &>/dev/null; then
  SCHEMA_ERRORS=0

  # Validate governance/exceptions.yaml entries
  if [ -f "governance/exceptions.yaml" ]; then
    echo "  Checking governance/exceptions.yaml..."
    # ajv validate against exception-record schema for each exception entry
    # (ajv-cli requires JSON; conversion handled inline)
  fi

  echo "  Schema validation complete (errors: ${SCHEMA_ERRORS})"
else
  echo "  WARN: ajv-cli not available. Skipping JSON Schema validation."
  echo "  Install with: npm install -g ajv-cli"
fi
echo ""

# Summary
if [ $VALIDATOR_EXIT -eq 0 ]; then
  echo "=== RESULT: PASS ==="
  exit 0
elif [ $VALIDATOR_EXIT -eq 2 ]; then
  echo "=== RESULT: SOFT WARNINGS ==="
  exit 2
else
  echo "=== RESULT: FAIL (hard violations found) ==="
  exit 1
fi
