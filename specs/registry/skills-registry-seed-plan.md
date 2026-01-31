# Seed Plan: test skills

## Objectif

Fournir un set minimal de skills de test pour valider :
- la detection simple (root)
- la detection imbriquee (nested paths)
- l'installation et la recherche

## Skills proposes

1. `hello-skill` (root)
   - Chemin: `skills/hello-skill/SKILL.md`
   - But: test de base

2. `ops-checklist` (nested)
   - Chemin: `skills/ops/checklist/SKILL.md`
   - But: test de chemin imbrique

3. `summary-helper` (nested)
   - Chemin: `skills/doc/summary-helper/SKILL.md`
   - But: test de chemin imbrique + nom avec tiret

## Attendus

- Chaque skill est visible dans la liste du registre
- Chaque skill est installable via `skills_registry_install`
- Les champs `name` et `description` sont valides
