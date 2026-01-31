# Skills Registry Spec (v1)

## Objectif

Definir un format de registre de skills compatible avec les outils Word Assist et la CLI `skills`.

## Structure du depot

```
/
  skills/
    <path>/
      SKILL.md
      ... autres fichiers du skill
```

- `SKILL.md` est obligatoire.
- Le skill est le dossier qui contient `SKILL.md`.
- Les fichiers additionnels (ex: `README.md`, images, fichiers de reference) sont autorises dans le meme dossier.

## Regles de nommage

Frontmatter obligatoire dans `SKILL.md` :

```yaml
---
name: hello-skill
description: A short description
---
```

Regles :
- `name` en minuscules
- caracteres autorises: `a-z`, `0-9`, `-`, `.`
- `description` obligatoire et courte

## Chemins imbriques

Les skills peuvent etre imbriques :

```
skills/ops/checklist/SKILL.md
skills/doc/summary-helper/SKILL.md
```

Le `name` reste libre, mais doit rester unique dans le registre.

## Champs optionnels

Le frontmatter peut contenir :
- `license`
- `compatibility`
- `metadata`
- `allowed-tools`

Exemple :

```yaml
---
name: ops-checklist
description: Checklist ops basique
license: MIT
compatibility:
  agents: [codex, cursor]
allowed-tools: [shell, web]
metadata:
  internal: false
---
```

## Fichiers optionnels

Dans le dossier du skill, on peut ajouter :
- `metadata.json` (infos additionnelles)
- `README.md` (documentation)
- `rules/` (fichiers de regles ou exemples)

## Page de registre

Une page statique optionnelle peut lister les skills et expliquer :
- comment installer un skill
- comment contribuer
- lien vers le depot GitHub

## Packaging ZIP (agents externes)

Pour compatibilite, un zip peut contenir :

```
<skill-name>.zip
  SKILL.md
  ... autres fichiers du skill
```

Le zip doit representer le contenu du dossier du skill.
