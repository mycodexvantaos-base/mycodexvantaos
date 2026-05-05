# ADR-004-NO-VERSION-IN-CANONICAL: No Version in Canonical Identifiers

**Date**: 2026-04-18
**Status**: Accepted
**Spec Reference**: naming-spec-v1.md

## Context

Prohibits version numbers in canonical identifiers to maintain stable resource identities across releases.

## Decision

Adopted as a hard rule in naming-spec-v1.md. Enforced by CI hard enforcement (14.1).

## Consequences

- Naming consistency is machine-verifiable across all platform resources.
- Violations block merge via CI gate.
- Exceptions require explicit registration in `governance/exceptions.yaml` (15).
