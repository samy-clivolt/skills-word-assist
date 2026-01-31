# Installation depuis le registre

Ce document explique les deux modes d'installation possibles :
- via le repo GitHub (CLI `skills`)
- via le registre custom (`skills.json` + `zipUrl`)

## 1) Installation via le repo GitHub (CLI `skills`)

Ce mode n'utilise pas `skills.json`. Le CLI clone le repo et lit les `SKILL.md`.

Exemples :

```bash
npx skills add samy-clivolt/skills-word-assist --list
npx skills add samy-clivolt/skills-word-assist@hello-skill
```

Conditions :
- le repo doit etre public (ou credentials Git configures)
- le repo doit avoir une structure `skills/<path>/SKILL.md`

## 2) Installation via le registre custom (skills.json + zipUrl)

Ce mode est utile pour les agents qui ne peuvent pas cloner un repo Git.

### Flux d'installation

1. Telecharger le registry JSON :
   `GET https://skills-word-assist.vercel.app/skills.json`

2. Trouver le skill par `name` (et eventuellement `folder` ou `path`).

3. Telecharger le ZIP du skill via `zipUrl` :
   `https://skills-word-assist.vercel.app/zips/<skill>.zip`

4. Dezipper le ZIP et verifier :
   - presence de `SKILL.md`
   - frontmatter valide (`name`, `description`)

5. Copier le dossier du skill vers le dossier cible de l'agent.

### Exemple de shape `skills.json`

```json
{
  "generatedAt": "2026-01-31T16:37:06.604Z",
  "skills": [
    {
      "name": "hello-skill",
      "description": "Skill de test minimal pour valider le registre.",
      "path": "skills/hello-skill/SKILL.md",
      "folder": "hello-skill",
      "zipUrl": "https://skills-word-assist.vercel.app/zips/hello-skill.zip"
    }
  ]
}
```

### Pourquoi `zipUrl` ?

Si un skill contient plusieurs fichiers ou sous-dossiers, le ZIP garantit
que tout le contenu est disponible sans devoir exposer tout le repo.

## Commandes de validation (Word Assist)

- `skills_registry_search` avec `https://skills-word-assist.vercel.app/skills.json`
- `skills_registry_install` avec `skill: "hello-skill"`

## Notes

- Si le repo est public, l'installation via `npx skills` est la plus simple.
- Si l'agent ne peut pas utiliser Git, il doit passer par le registre custom.
