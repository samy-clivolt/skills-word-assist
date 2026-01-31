# Feature: Custom skills registry spec and seed content

## Metadata
adw_id: `test-skill-registry`
prompt: `Define a spec for a custom skills registry (compatible with Word Assist tooling) and seed it with test skills, including a linked registry page.`

## Feature Description
Define a clear, versioned specification for a custom skills registry that can be hosted as a GitHub repository + optional static page. The spec should document directory layout, required files (SKILL.md), optional metadata, and release workflow (including zipped artifacts for other agents). Provide a minimal set of test skills that validate installation and search, and publish a simple registry page that links to skills and installation instructions.

## User Story
As a Word Assist maintainer
I want a documented registry format with sample skills
So that I can publish and test a custom skills registry and have the agent install skills from it reliably.

## Problem Statement
The current tooling can only search/install skills from GitHub repositories with a /skills structure. Without a formal spec and seeded examples, it is hard to stand up a custom registry, validate search/install flows, and communicate to users how to host and maintain the registry.

## Solution Statement
Create a registry spec that formalizes repository layout, naming constraints, optional metadata fields, and a lightweight registry page. Add sample skills that cover common cases (simple skill, nested skill path). Provide a workflow to publish/update skills and verify them with Word Assist tooling.

## Relevant Files
Use these files to implement the feature:
- `word-assist-ui/src/skills/skills-registry.ts` — current registry search/install behavior (GitHub /skills structure, recursive scan).
- `word-assist-ui/src/skills/sdk-skill-adapter.ts` — skill frontmatter rules and allowed fields.
- `word-assist-ui/src/skills/skills-zip.ts` — ZIP format expectations for skills.
- `word-assist-ui/src/office/word-tools.ts` — tool schemas for skills search/install (user-facing instructions).
- `README.md` — top-level codebase expectations and docs conventions.

### New Files
- `specs/registry/skills-registry-spec.md` — formal spec for registry layout, naming rules, metadata fields.
- `specs/registry/skills-registry-page.md` — content outline for the public registry page.
- `specs/registry/skills-registry-seed-plan.md` — plan for seed/test skills and their purpose.

## Implementation Plan
### Phase 1: Foundation
Define the registry spec and naming constraints based on current tooling and validation rules (SKILL.md frontmatter, allowed fields, folder structure). Document optional metadata and how nested paths map to skill names.

### Phase 2: Core Implementation
Design a minimal seed set of test skills (e.g., `hello-skill`, `ops/checklist`, `doc/summary-helper`) with clear SKILL.md content and optional metadata.json. Specify ZIP packaging for external agents.

### Phase 3: Integration
Describe how the registry page (static site) links to the GitHub repo and provides installation instructions. Include compatibility notes for Word Assist tooling and test commands.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Draft registry spec
- Document repository layout: `/skills/<path>/SKILL.md` required, files under the same folder.
- Document name rules (lowercase, hyphen/dot allowed) and how nested paths map to names.
- Specify optional files: `metadata.json`, `README.md`, `rules/`.
- Clarify frontmatter fields (name, description, license, compatibility, metadata, allowed-tools).

### 2. Define seed/test skills
- Propose at least 3 skills with varying depth (root + nested path).
- Provide minimal SKILL.md templates for each (frontmatter + simple steps).
- Describe expected outcomes when installed (visible in skills UI, usable by agent).

### 3. Define registry page content
- Outline a simple static page: intro, list of skills, install examples, GitHub link.
- Include “How to add a skill” guidelines and contribution steps.

### 4. Validation checklist
- Document validation steps: search via `skills_registry_search`, install via `skills_registry_install`.
- Include checks for name/description validation and warning handling.

## Testing Strategy
### Unit Tests
- If tooling changes are needed, add tests for name validation and path resolution.

### Edge Cases
- Skill folder without SKILL.md should be ignored.
- Nested skills with dots in names.
- SKILL.md frontmatter missing required fields.

## Acceptance Criteria
- Spec documents repository layout, naming rules, and required files.
- Seed skills are defined with SKILL.md templates and intended use.
- Registry page outline is provided with install commands.
- Validation steps include search/install commands for Word Assist.

## Validation Commands
Execute these commands to validate the feature is complete:
- `skills_registry_search` (Word Assist tool) against the registry repo URL
- `skills_registry_install` (Word Assist tool) for each seed skill

## Notes
- Keep the registry format aligned with the current GitHub scanning logic in `skills-registry.ts`.
- If a future manifest JSON is desired, define it as an optional extension to the spec (v2).
