# Méthodologie Git/GitHub – Projet Flashcards

> E-324 – Semaine 2, partie 1/2 : organisation de travail et méthodologie Git/GitHub
> Binôme : _Nom 1_ – _Nom 2_

## Projet de référence

**Flashcards** est une application web de révision par cartes, développée avec **AdonisJS** (TypeScript, Edge, Lucid ORM, Vite). Un utilisateur crée des *decks* contenant des cartes question/réponse, peut les modifier ou les supprimer, puis s'entraîner avec un mode « play » qui donne un score à la fin.

On imagine que le projet est repris par une petite équipe professionnelle qui doit le faire évoluer : authentification, rôles, partage de decks, statistiques.

---

## 1. Organisation générale

### Structure de l'équipe

On imagine une équipe de 5 personnes :

| Rôle | Responsabilités |
| --- | --- |
| **Product Owner** | Écrit et priorise le backlog (user stories), valide les fonctionnalités terminées, sert d'intermédiaire avec le « client » (l'enseignant). |
| **Lead développeur / mainteneur** | Responsable du dépôt GitHub : règles de protection des branches, releases, arbitrage technique. Il fait aussi des revues de code. |
| **Développeurs (×2)** | Développent les fonctionnalités et les corrections, écrivent les tests et relisent les PR des autres. |
| **Testeur / QA** (rôle tournant) | Teste les fonctionnalités sur la branche `develop`, ouvre des issues quand il trouve un bug. |

Dans notre binôme, ces rôles seraient cumulés : chacun développe et relit le code de l'autre, et le rôle de mainteneur change à chaque sprint.

### Communication et outils

- **GitHub** : code, issues, Pull Requests, releases, et plus tard GitHub Actions (partie 2).
- **GitHub Projects** (tableau Kanban) : *Backlog → To do → In progress → In review → Done*. On l'a préféré à Trello ou Jira parce qu'il est directement lié aux issues et aux PR : une carte passe toute seule en *Done* quand la PR est mergée.
- **Discord** : un serveur avec un salon `#general`, un salon `#dev` pour les questions techniques et un salon `#github` qui reçoit les notifications du dépôt (webhook).
- **Réunions** : un daily de 10 minutes au début de chaque séance de travail, puis une démo et une rétrospective à la fin de chaque sprint (1 à 2 semaines).
- **Journal de travail** : chaque membre tient son journal (déjà demandé par l'ETML), en y mettant les liens vers les issues et PR concernées.

### Transparence et suivi des tâches

- Aucun travail sans issue : chaque tâche, bug ou amélioration a son issue sur GitHub, avec un label (`feature`, `bug`, `docs`, `refactor`), un responsable et un milestone (sprint ou version).
- Chaque branche et chaque PR renvoie à son issue (`Closes #12`), ce qui ferme l'issue automatiquement au moment du merge.
- Le tableau Projects est mis à jour en continu, si bien que n'importe qui voit à tout moment qui fait quoi.
- Les décisions importantes (choix technique, changement de modèle de données) sont écrites dans l'issue ou dans un fichier `doc/decisions.md`, pas seulement dites à l'oral ou sur Discord.

---

## 2. Workflow Git/GitHub

### Workflow choisi : Git Flow simplifié (Feature Branch + `develop`)

On garde deux branches permanentes et des branches courtes pour chaque tâche :

```
main      ──●────────────────●──────────────●──   (versions publiées, taguées)
             \              / \            /
develop   ────●──●───●────●───●───●──●────●────   (intégration)
                 \  /    \  /       \  /
feature/…         ●●      ●●         ●●            (une branche par issue)
```

**Pourquoi ce choix :**
- `main` contient toujours une version stable et déployable, ce qui servira de base au CD dans la partie 2.
- `develop` permet d'intégrer et de tester plusieurs fonctionnalités ensemble avant une release.
- Les branches de fonctionnalité isolent le travail de chacun, et toute modification passe par une PR, donc par une revue.
- Le Git Flow complet (avec des branches `release/*`) est trop lourd pour une équipe de 2 à 5 personnes. Le *trunk based* demande une CI très mature et des *feature flags*, ce qu'on n'a pas encore.

### Organisation des branches

| Branche | Rôle | Créée depuis | Mergée dans | Protection |
| --- | --- | --- | --- | --- |
| `main` | Production, versions taguées | – | – | Push direct interdit, PR obligatoire, CI verte, 1 approbation |
| `develop` | Intégration continue des fonctionnalités | `main` | `main` (release) | Push direct interdit, PR obligatoire, CI verte, 1 approbation |
| `feature/<n°>-<description>` | Nouvelle fonctionnalité | `develop` | `develop` | – |
| `fix/<n°>-<description>` | Correction de bug non urgente | `develop` | `develop` | – |
| `hotfix/<n°>-<description>` | Correction urgente en production | `main` | `main` **et** `develop` | – |
| `docs/…`, `chore/…` | Documentation, configuration | `develop` | `develop` | – |

Exemples : `feature/24-mode-play-score`, `fix/31-redirection-edit-deck`, `hotfix/40-crash-login`.

Règles :
- Une branche correspond à une issue et à une PR, et elle doit vivre peu de temps (quelques jours au plus).
- La branche est supprimée après le merge (option automatique de GitHub).
- Avant d'ouvrir une PR, on met sa branche à jour avec `develop` (`git pull --rebase origin develop`).

### Politique de versionnage : Semantic Versioning

Format **`vMAJEUR.MINEUR.CORRECTIF`** :

- **MAJEUR** : changement incompatible, par exemple une refonte du modèle de données qui demande de migrer les données existantes (`v2.0.0`).
- **MINEUR** : nouvelle fonctionnalité compatible, par exemple le mode play ou la gestion des rôles (`v1.3.0`).
- **CORRECTIF** : correction de bug (`v1.3.1`).

Les versions `0.x.y` servent pendant le développement initial, et `v1.0.0` correspond à la première version rendue au client. Chaque merge de `develop` dans `main` crée un **tag Git** et une **Release GitHub**, avec des notes de version générées à partir des commits. Le numéro de version est aussi mis à jour dans `package.json`.

### Convention de commits : Conventional Commits

Format : `type(portée): description courte à l'impératif`

| Type | Usage | Exemple |
| --- | --- | --- |
| `feat` | Nouvelle fonctionnalité | `feat(play): ajoute le calcul du score final` |
| `fix` | Correction de bug | `fix(deck): corrige la redirection après édition` |
| `docs` | Documentation | `docs(readme): ajoute les étapes d'installation` |
| `style` | Mise en forme sans changement de logique | `style(card): formate avec prettier` |
| `refactor` | Restructuration du code | `refactor(controller): extrait la validation des decks` |
| `test` | Ajout ou modification de tests | `test(deck): teste l'unicité du titre` |
| `chore` | Configuration, dépendances | `chore(deps): met à jour adonisjs` |
| `ci` | Pipeline CI/CD | `ci: ajoute le job de lint` |

Règles :
- La description fait au plus 72 caractères, sans point final.
- Un corps de message explique le *pourquoi* quand ce n'est pas évident.
- On ajoute `Refs #n°` ou `Closes #n°` en pied de message.
- Un changement incompatible est signalé par `!` (`feat(api)!: …`) ou par `BREAKING CHANGE:`, ce qui implique une version majeure.
- Ce format sera vérifié automatiquement (hook `commitlint` avec Husky) et servira à générer le changelog.

> Remarque : dans l'historique actuel de Flashcards, on trouve des types qui ne font pas partie de la convention (`update(seader)`) et des portées peu claires (`feat(delete&edit button)`). Avec cette méthodologie, on aurait écrit `feat(seeder): ajoute des decks par défaut` et `feat(deck): ajoute les boutons modifier et supprimer`.

---

## 3. Processus de revue de code

### Déroulement d'une Pull Request

1. Le développeur pousse sa branche et ouvre une PR vers `develop` (une **draft PR** s'il veut un premier retour avant d'avoir fini).
2. La PR suit un **modèle** (`.github/pull_request_template.md`) :
   - description du changement et lien vers l'issue (`Closes #n°`) ;
   - comment tester (étapes, captures d'écran pour les changements d'interface) ;
   - checklist (tests, lint, documentation).
3. La CI se lance automatiquement : lint, vérification des types, tests (détaillés dans la partie 2).
4. Un ou plusieurs relecteurs sont assignés (automatiquement grâce à un fichier `CODEOWNERS`).
5. Le relecteur commente ligne par ligne, puis choisit *Approve*, *Request changes* ou *Comment*.
6. L'auteur corrige et répond à chaque commentaire, puis le relecteur résout les fils de discussion.
7. Une fois les critères remplis, **l'auteur** merge la PR en **squash merge**, ce qui donne un commit propre par fonctionnalité sur `develop`, avec un message au format Conventional Commits.

On vise des PR petites, de moins de 400 lignes modifiées environ, pour que les revues restent sérieuses.

### Nombre d'approbations

- **Vers `develop` : 1 approbation minimum**, d'une autre personne que l'auteur. Dans une équipe de 2 à 5 personnes, en demander 2 bloquerait le travail trop souvent.
- **Vers `main` (release ou hotfix) : 1 approbation du mainteneur**, plus la validation fonctionnelle du Product Owner.
- Si on pousse un nouveau commit après l'approbation, l'approbation est annulée (*dismiss stale reviews*).
- Dans une équipe plus grande, ou pour du code sensible (authentification, rôles), on passerait à 2 approbations.

### Critères de validation avant merge (Definition of Done)

- [ ] La CI est verte : `npm run lint`, `npm run typecheck` et `npm test` passent.
- [ ] Les nouvelles fonctionnalités sont couvertes par des tests (tests fonctionnels Japa pour les routes et contrôleurs).
- [ ] Le code respecte les conventions du projet (ESLint et Prettier, nommage, structure AdonisJS).
- [ ] Les commits et le titre de la PR respectent les Conventional Commits.
- [ ] La branche est à jour avec `develop` et ne contient pas de conflits.
- [ ] Les migrations et seeders sont fournis si le modèle de données change.
- [ ] La documentation (README, `doc/`) est mise à jour si besoin.
- [ ] Aucun secret dans le code (`.env` jamais commité, seulement `.env.example`).
- [ ] Tous les commentaires de revue sont résolus.
- [ ] La fonctionnalité a été testée à la main en local par le relecteur.

---

## 4. Bonnes pratiques de collaboration

### Fréquence de commit et de push

- **Commiter souvent**, dès qu'une petite étape cohérente fonctionne (un commit = un changement logique), donc plusieurs fois par séance.
- **Pousser au moins à la fin de chaque séance de travail** pour ne rien perdre et rendre le travail visible, même sur une branche pas terminée.
- **Se synchroniser avec `develop` chaque jour** (`git fetch` puis `git rebase origin/develop`) pour limiter les conflits.
- Ne jamais réécrire l'historique d'une branche partagée (`push --force` interdit sur `main` et `develop`, `--force-with-lease` seulement sur sa propre branche).

### Gestion des conflits de merge

- **Prévention** : des branches courtes, des PR petites, une synchronisation quotidienne, et prévenir l'équipe sur Discord avant de modifier un fichier sensible (routes `start/routes.ts`, migrations, layout Edge principal).
- **Résolution** : c'est l'auteur de la PR qui résout le conflit, dans sa branche, en faisant un rebase sur `develop`. Si le conflit touche le code de quelqu'un d'autre, on le résout à deux, en direct ou sur Discord.
- **Après résolution**, on relance les tests en local avant de pousser, et la CI vérifie de nouveau.
- **Migrations** : on ne modifie jamais une migration déjà mergée, on en crée une nouvelle, pour éviter les conflits de schéma de base de données.

### Traçabilité des décisions

- **Issues** : chaque besoin, bug ou discussion technique a son issue, avec labels, milestone et responsable.
- **Pull Requests** : elles relient le code à l'issue (`Closes #n°`) et gardent l'historique de la revue.
- **Messages de commit** : au format conventionnel, avec le *pourquoi* dans le corps du message.
- **Releases et CHANGELOG** : générés à partir des commits, ils montrent ce qui a changé dans chaque version.
- **Journal de travail et `doc/decisions.md`** : on y consigne les choix d'architecture et leur justification.

Avec ces éléments, on peut retrouver pour n'importe quelle ligne de code (`git blame`) le commit, la PR, l'issue et donc la raison du changement.

### Garantir la qualité du code avant intégration

- **Outils locaux** : ESLint et Prettier (déjà configurés dans le projet), plus des hooks Git avec Husky et lint-staged (lint et format au *pre-commit*, commitlint au *commit-msg*).
- **Tests automatisés** : tests unitaires et fonctionnels avec Japa (le framework de test d'AdonisJS).
- **Intégration continue** : GitHub Actions lance lint, vérification des types, tests et build à chaque PR (détaillé dans la partie 2).
- **Protection des branches** : impossible de merger dans `develop` ou `main` sans une CI verte et une revue approuvée.
- **Revue de code humaine** : elle vérifie la logique, la lisibilité et la sécurité (validation des entrées avec VineJS, contrôle des rôles).
- **Dependabot** : il propose les mises à jour des dépendances et signale les failles de sécurité connues.

---

## 5. Justification du choix de cette organisation

### Avantages

- **Stabilité** : `main` est toujours déployable et `develop` permet de tester les fonctionnalités ensemble avant une release.
- **Qualité** : chaque ligne de code est relue par une autre personne et vérifiée par la CI avant d'être intégrée.
- **Traçabilité complète** : on peut remonter de l'issue à la branche, à la PR, au commit puis à la release, ce qui facilite le débogage, le journal de travail et l'évaluation.
- **Adaptée à une petite équipe** : une seule approbation et pas de branches `release/*`, donc peu de lourdeur administrative.
- **Prépare le CI/CD** : les conventions (branches protégées, Conventional Commits, SemVer, tags) se prêtent bien à l'automatisation : tests à chaque PR, déploiement à chaque tag sur `main`, changelog automatique.

### Limites

- **Plus de démarches** qu'un simple push sur `main` : il faut créer une issue, une branche et une PR même pour un petit changement, et le temps de revue peut ralentir le travail.
- **Dépendance au relecteur** : dans un binôme, si l'un des deux est absent, l'autre ne peut plus merger. Solution : autoriser le mainteneur à merger avec une justification écrite en cas d'urgence.
- **La branche `develop` ajoute un niveau** : il peut y avoir un décalage entre `develop` et `main` si les releases sont rares. Il faut donc publier régulièrement, par exemple à la fin de chaque sprint.
- **Discipline nécessaire** : les conventions de commits et de branches ne sont utiles que si tout le monde les respecte, d'où l'importance des vérifications automatiques (hooks, CI).
- Si l'équipe et la CI deviennent plus matures, on pourrait passer au **trunk based development** pour livrer encore plus souvent.
