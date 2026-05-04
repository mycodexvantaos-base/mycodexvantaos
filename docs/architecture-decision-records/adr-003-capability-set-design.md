# ADR-003-CAPABILITY-SET-DESIGN: Canonical Capability Set Design

**Date**: 2026-04-18
**Status**: Accepted
**Spec Reference**: naming-spec-v1.md

## Context

Defines 19 canonical capability identifiers as the closed set for provider abstraction, preventing vendor lock-in in service identities.

## Decision

Adopted as a hard rule in naming-spec-v1.md. Enforced by CI hard enforcement (14.1).

## Consequences

- Naming consistency is machine-verifiable across all platform resources.
- Violations block merge via CI gate.
- Exceptions require explicit registration in `governance/exceptions.yaml` (15).
