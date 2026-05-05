#!/bin/bash

# Coverage Analysis Script for MyCodeXvantaOS
# Analyzes test coverage for all 27 packages

echo "========================================"
echo "MyCodeXvantaOS Coverage Analysis"
echo "========================================"
echo ""

# Create package jest config template
create_jest_config() {
  cat > "$1/jest.config.js" << 'JESTEOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        module: 'commonjs',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        target: 'ES2020',
        sourceMap: true,
        inlineSourceMap: true,
        inlineSources: true
      }
    }]
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ],
  coverageReporters: ['text', 'json'],
  testTimeout: 15000
};
JESTEOF
}

# Array to store results
declare -a results
total_packages=0
total_tests=0
total_statements=0
total_covered=0

# Process each package
for pkg in packages/*/; do
  pkg_name=$(basename "$pkg")
  
  # Create jest config for package
  create_jest_config "$pkg"
  
  echo "Analyzing: $pkg_name"
  
  # Run tests with coverage
  cd "$pkg"
  output=$(npx jest --coverage --testTimeout=15000 --silent 2>&1)
  cd - > /dev/null
  
  # Extract coverage from output
  stmt=$(echo "$output" | grep "index.ts" | awk '{print $2}' | sed 's/%//')
  
  if [ -n "$stmt" ]; then
    echo "  Statements: $stmt%"
    results+=("$pkg_name: $stmt%")
    total_packages=$((total_packages + 1))
  fi
  
  echo ""
done

echo "========================================"
echo "Coverage Summary"
echo "========================================"
for result in "${results[@]}"; do
  echo "$result"
done