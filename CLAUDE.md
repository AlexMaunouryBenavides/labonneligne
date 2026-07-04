# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

`eng-kit` is **not an application** — it is a reusable, frontmatter-indexed library of engineering
rules (Clean Code, architecture, security, Nest/React conventions, etc.). Its purpose is to be
**read and selectively applied to _other_ projects** via OpenSpec, so the author's standards are
capitalized once and re-applied everywhere without rewriting or forgetting them.

The content is written in **French**. Match that language when editing or adding rules.

There is no build, no test suite, and no runtime for this repo itself. The `tooling/` configs are
_payloads_ meant to be copied into target projects, not run here.

## Two modes of operation (the "commands")

Instead of build/lint/test, an agent does one of two jobs. The authoritative spec for both is
**`AGENTS.kit.md`** — read it in full before applying or reviewing.

1. **Setup / apply** (`/kit-init`-style): detect a target project's stack, select matching rule
   files, and inject their directives into the project's OpenSpec config + copy relevant `tooling/`
   configs. End with a summary of guardrails applied, preferences applied, preferences skipped (+why).
2. **Review** (`/kit-review`-style): take the target project's **git diff**, load only the
   `Check (review)` lines + `## Anti-patterns` for the relevant disciplines, and report violations
   **by rule id** (e.g. `validation.r4`) scoped strictly to the diff.

When _authoring_ rules in this repo (the common task here), there is no command to run — you edit
markdown. The only "test" of a rule is that its frontmatter is complete and its body follows the
template.

## Rule file model (the core architecture)

Every `rules/**/*.md` file has **YAML frontmatter** that drives selection, plus a **two-layer body**.
See `templates/_template.md` for the canonical shape and `rules/backend/validation.md` (kind: code)
/ `rules/infra/docker.md` (kind: config) for complete, `active` examples. `rules/testing/_strategy.md`
is the active example of `kind: checklist`.

Frontmatter fields that govern behavior:

- `status`: `draft` (**ignored entirely**) | `active` (selected). A file stays `draft` until finished.
  Currently `active`: all of `architecture/` (`nest.md`, `clean-archi-back.md`, `react.md`,
  `clean-archi-front.md`); most of `backend/` — `api-design.md`, `validation.md`, `error-handling.md`,
  `authentication.md`, `authorization.md`, `password-hashing.md`, `passport.md`, `nest-authz.md`;
  `frontend/data-fetching.md`, `frontend/react-query.md`; `infra/docker.md`; `process/git-workflow.md`;
  all of `modeling/` (`mcd.md`, `mld.md`, `mpd.md`); all of `shared/` (`clean-code.md`,
  `configuration.md`, `observability.md`, `security.md`, `typescript.md`); and all of `testing/`
  (`_strategy.md`, `vitest.md`, `jest.md`, `cypress.md`).
  Still `draft` stubs (never selected): `backend/data-access.md`, `backend/performance-backend.md`,
  `frontend/accessibility.md`, `frontend/performance-frontend.md`, `frontend/state-management.md`,
  `infra/ci-cd.md`, `infra/monorepo.md`. Re-check frontmatter rather than trusting this list; statuses
  flip as stubs are completed.
- `level`: `guardrail` (always applied, non-negotiable) | `preference` (applied **unless** it
  conflicts with an existing project convention).
- `tech`: `[]` = stack-agnostic | otherwise the file activates only if that tech is detected.
- `layer` / `phase` / `kind` / `discipline` / `id`: select by layer, route to the right OpenSpec
  artifact (`design`/`implementation`/`review`), shape the body, and namespace rule ids.

Body has **two layers**, and the distinction is load-bearing:

- **Layer 1 — directives** (`## Rules` for `kind: code`, `## Requirements` for `kind: config`):
  this is what gets **injected** into the agent's context. Dense, imperative, one rule per anchored
  block (`{#id.rN}`). Each rule carries a **`Vérifié par`** field: `eslint` / `tsc` / `hadolint`
  (free enforcement, removed from LLM review) or `manuel`. Plus a `## Anti-patterns` cheat-sheet.
- **Layer 2 — `## Reference`**: long rationale, edge cases, full config snippets. **Never injected
  by default** — read only on demand.

## Hard rules for any agent here

- **Never inject `## Reference` sections** by default.
- **Never select or apply `status: draft` files.**
- **Precedence:** detected project convention **>** `preference`; a `guardrail` outranks everything —
  if it clashes with a project convention, **flag it explicitly**, never silently bypass it.
  Two conflicting rules at equal level → ask the human.
- When applying to a target project, write **only** through OpenSpec's native extension points
  (`openspec/config.yaml` + copying `tooling/` configs by **reconciling**, never overwriting an
  existing project config). **Never touch `openspec/changes` or `openspec/specs`** — those stay
  vanilla so `openspec init` / `opsx` remain untouched.
- A rule marked `Vérifié par: eslint|tsc|hadolint` is enforced for free by tooling and must be
  **dropped from manual/LLM review** — review only `manuel` rules.

## Adding or editing a rule

1. `cp templates/_template.md rules/<zone>/<discipline>.md`.
2. Fill the frontmatter (no empty fields), then Layer 1 directives, then optional `## Reference`.
   Mirror `validation.md` for `kind: code`, `docker.md` for `kind: config`.
3. Flip `status: active` only when the file is complete.
4. Each rule block needs an anchored id, a one-line `Pourquoi`, a `Vérifié par`, and a
   `Check (review)` line.

## Directory map

```
rules/        backend · frontend · shared · infra · process · testing · architecture · modeling
              active: all of architecture/ (nest, clean-archi-back, react, clean-archi-front), all of
              shared/, all of testing/, all of modeling/ (mcd/mld/mpd), infra/docker, process/git-workflow,
              frontend/{data-fetching,react-query}, and most of backend/ (api-design, validation,
              error-handling, authentication, authorization, password-hashing, passport, nest-authz).
              auth is split by trigger: neutral OWASP (authentication, authorization, password-hashing) ·
              Nest-keyed wiring (nest-authz, tech:[nestjs]) · Passport+JWT (passport, tech:[nestjs,passport]).
              still draft stubs: backend/{data-access,performance-backend},
              frontend/{accessibility,performance-frontend,state-management}, infra/{ci-cd,monorepo}
checklists/   composed review checklists referencing rule ids (currently empty)
tooling/      zero-token enforcement payloads copied into target projects:
              eslint.config.mjs (stub), tsconfig.base.json, .prettierrc, .hadolint.yaml
templates/    _template.md — canonical rule shape (kind: code + kind: config variant)
books/        source material (Clean Code PDF + extracted text) feeding the rules — reference only
AGENTS.kit.md the agent operating manual (select / apply / verify) — authoritative
README.md     the human-facing usage guide (French)
```
