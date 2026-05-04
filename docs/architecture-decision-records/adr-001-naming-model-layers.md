# ADR-001-NAMING-MODEL-LAYERS: Naming Model Layer Architecture

**Date**: 2026-04-18
**Status**: Accepted
**Spec Reference**: naming-spec-v1.md

## Context

Defines the three-layer naming model (Canonical, Composite, Protocol-Specific) to avoid identifier collisions across domains.

## Decision

Adopted as a hard rule in naming-spec-v1.md. Enforced by CI hard enforcement (14.1).

## Consequences

- Naming consistency is machine-verifiable across all platform resources.
- Violations block merge via CI gate.
- Exceptions require explicit registration in `governance/exceptions.yaml` (15).
