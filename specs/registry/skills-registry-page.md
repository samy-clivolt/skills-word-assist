# Skills Registry Page (outline)

## Intro
- Registre prive de skills pour agents IA
- Lien vers le depot GitHub

## Installation

Exemples :

```
npx skills add <owner>/<repo>
npx skills add https://github.com/<owner>/<repo>
```

## Liste des skills
- Nom du skill
- Description courte
- Dossier / chemin

## Comment ajouter un skill
1. Creer un dossier sous `skills/`
2. Ajouter `SKILL.md` avec `name` et `description`
3. Commit + push
4. Regenerer l'index du registre si besoin

## Contribution
- PRs bienvenues
- Verifier le format du frontmatter
- Eviter les noms en doublon

## Liens
- GitHub
- JSON du registre (`/skills.json`)
