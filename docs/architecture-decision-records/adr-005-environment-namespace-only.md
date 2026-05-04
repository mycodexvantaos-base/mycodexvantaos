# ADR-005-ENVIRONMENT-NAMESPACE-ONLY: Environment Markers in Namespace Only

**Date**: 2026-04-18
**Status**: Accepted
**Spec Reference**: naming-spec-v1.md

## Context

Restricts dev/staging/prod environment markers to Kubernetes namespaces only, preventing environment drift in resource names.

## Decision

Adopted as a hard rule in naming-spec-v1.md. Enforced by CI hard enforcement (14.1).

## Consequences

- Naming consistency is machine-verifiable across all platform resources.
- Violations block merge via CI gate.
- Exceptions require explicit registration in `governance/exceptions.yaml` (15).
