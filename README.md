# mycodexvantaos

> **Platform root monorepo** for the MyCodexVantaOS platform.
> Naming governed by [`docs/naming-spec-v1.md`](docs/naming-spec-v1.md).

## Quick Start

```bash
# Install dependencies
pnpm install

# Validate all naming (hard + soft enforcement)
pnpm validate

# Check for forbidden legacy prefixes only
pnpm check-legacy

# Scan for naming drift (outputs YAML backlog)
pnpm scan-drift

# Check exception expiry
pnpm check-exceptions

# Generate a new service scaffold
pnpm scaffold mycodexvantaos-ai-reasoning --capabilities=llm,embedding
```

## Architecture

All naming rules are defined in `docs/naming-spec-v1.md` and enforced by:

| Enforcement | File | Trigger |
|---|---|---|
| Hard (blocks merge) | `ci/validate-architecture.ts` | Every PR |
| Legacy prefix scan | `scripts/check-legacy-prefix.sh` | Every PR |
| Manifest schema validation | `.github/workflows/validate-naming.yml` | Every PR |
| Exception expiry | `.github/workflows/expire-exceptions.yml` | Weekly (Monday) |

## Directory Structure

See [`mycodexvantaos-directory-tree.md`](docs/naming-spec-v1.md) for the full annotated directory tree.

| Directory | Purpose |
|---|---|
| `docs/` | Specification documents and ADRs |
| `governance/` | Naming policy, exceptions, capability set |
| `ci/` | CI validators (TypeScript) |
| `scripts/` | Shell utilities |
| `services/` | Service source code |
| `modules/` | Module manifests |
| `packages/` | npm packages |
| `providers/` | Provider instance definitions |
| `infra/` | Kubernetes and OCI infrastructure |
| `vector-store/` | Vector collections and retrieval pipelines |
| `knowledge-graph/` | Graph namespaces, relations, indexes |
| `schemas/` | JSON Schemas |
| `catalog/` | Service catalog and capability matrix |

## Naming Rules Quick Reference

| Resource | Format | Example |
|---|---|---|
| service-id | `mycodexvantaos-<domain>-<capability>` | `mycodexvantaos-ai-embedding` |
| package-name | `@mycodexvantaos/<short-id>` | `@mycodexvantaos/ai-embedding` |
| capability-id | canonical set only | `embedding` |
| provider-instance | `<capability>-<provider>` | `embedding-openai` |
| env-var | `MYCODEXVANTAOS_<SUBSYSTEM>_<KEY>` | `MYCODEXVANTAOS_LLM_API_KEY` |
| k8s namespace | `mycodexvantaos-<env>` | `mycodexvantaos-prod` |

See `docs/naming-spec-v1.md` for the complete specification.
