# Flashcards — Application de révision interactive

> Application web de mémorisation par cartes, développée avec **AdonisJS** dans le cadre d'un projet de développement backend.

---

## 1. Objectifs du projet

### Objectifs pédagogiques

Ce projet a pour but de construire de construire un backend dans une application web (Flashcards) à l'aide du framework **AdonisJS**. Le projet impose des points à tenir comme : commit rigoureux Github, tenue d'un journal de travail et une analyse fontionnelle avec des points à atteindre. L'objectif final est d'avoir une application web fonctionnel mais aussi d'avoir des bases sur le framework AdonisJS

### Objectifs produit

**Flashcards** Il s'agit d'une plateforme web conçue pour les étudiants qui veulent apprendre de nouvelles choses de manière active. Les étudiants peuvent notamment apprendre du vocabulaire, des formules mathématiques et des dates historiques. Un deck est comme un paquet de cartes. Chaque carte contient une question et une réponse. Les utilisateurs peuvent facilement ajouter, modifier ou supprimer leurs decks et cartes grâce à une interface simple et facile à utiliser.

L'application propose également un mode entraînement. Dans ce mode, l'étudiant regarde les cartes dans un deck, retourne chaque carte pour voir la réponse, et dit s'il a répondu correctement ou non. À la fin, il obtient un score. Pour s'assurer que les informations sont de bonne qualité, il y a des règles qui doivent être suivies. Par exemple, chaque deck doit avoir un titre unique et une description suffisamment longue. Ce projet ressemble beaucoup à l'application Quizlet!

---

## 2. Installation et démarrage

Ces instructions permettent à tout développeur, même sans connaissance d'AdonisJS, de lancer l'application en local.

### Prérequis

| Outil                         | Version minimale    |
| ----------------------------- | ------------------- |
| [Node.js](https://nodejs.org) | 20 ou supérieure    |
| npm                           | Inclus avec Node.js |

### Étapes d'installation

**1. Cloner le dépôt et se placer dans le dossier du projet**

```bash
git clone <url-du-repo>
cd flashcards
```

**2. Installer les dépendances**

```bash
npm install
```

**3. Configurer les variables d'environnement**

```bash
cp .env.example .env
```

Ouvrez le fichier `.env` et renseignez au minimum la clé `APP_KEY`. Vous pouvez en générer une avec :

```bash
node ace generate:key
```

> L'application utilise **MySQL** par défaut (Docker est fortement conseillé pour faire tourner MySQL).

**4. Créer la structure de la base de données**

```bash
node ace migration:run
```

Cette commande crée toutes les tables nécessaires (utilisateurs, decks, cartes).

**5. Lancer le serveur de développement**

```bash
npm run dev
```

**6. Accéder à l'application**

Ouvrez votre navigateur à l'adresse : [http://localhost:3333](http://localhost:3333)

Vous arriverez sur l'application, et vous pourrez commencer à l'utiliser!

---

## 3. Bilan du projet

### Fonctionnalités réalisées

- Un **système de gestion de decks et de cartes** complet est mis en place selon l'analyse fontionnelle.

- Le **mode d'entraînement** permet de naviguer carte par carte, avec un effet de retournement, une évaluation du type juste ou faux, et un calcul automatique du score final.

- Des **notifications** apparaissent après chaque création, modification ou suppression pour confirmer les opérations effectuées.

- Des **contrôles de validation** sont en place pour garantir des données cohérentes, notamment des titres de decks uniques, des descriptions d'au moins 10 caractères, des questions non dupliquées et des réponses non vides, avec des messages d'erreur précis pour chaque cas.

- L'**expérience utilisateur** a été soigneusement pensée, avec des détails tels que le changement de curseur sur les éléments cliquables, des fenêtres contextuelles pour confirmer les suppressions, et des champs pré-remplis lors de l'édition.

### Regard critique

Le projet a atteint ses objectifs, tant sur le plan fonctionnel que pédagogique. Le processus d'apprentissage d'AdonisJS a été plus difficile que prévu, notamment en ce qui concerne les imports ESM et la configuration des relations Lucid. Cependant, nous avons pu surmonter ces difficultés en utilisant la documentation officielle d'AdonisJS et en analysant de manière structurée les erreurs qui se sont produites. Le code que nous avons produit est maintenant entièrement compris et peut être expliqué de manière claire.

---

## 4. Stratégie d'utilisation de l'IA

Pour ce projet, j'ai utilisé l'IA comme un tuteur et un outil pour résoudre les problèmes, mais pas pour créer du code automatiquement. L'IA m'a aidé à comprendre des concepts d'AdonisJS qui n'étaient pas clairs dans la documentation officielle, comme la syntaxe ESM, les middlewares de session et les relations Lucid. Elle a utilisé des analogies et des exemples concrets pour m'expliquer ces concepts. Lorsque je rencontrais des erreurs, l'IA m'aidait à comprendre les journaux de debug et me montrait la bonne direction, mais c'était à moi de corriger les erreurs. Parfois, j'ai utilisé des propositions de code générées par l'IA, mais j'avais une règle stricte : je ne pouvais jamais intégrer une ligne de code sans être capable de l'expliquer mot pour mot. J'ai donc étudié chaque suggestion, la réécrite à ma façon et l'ai adaptée à ma structure de données. Cette approche a parfois ralenti le développement du projet, mais elle m'a permis de garantir que chaque partie du projet correspond techniquement à mes compétences et que les compétences que j'ai acquises sont durables. L'IA m'a été très utile pour ce projet, car elle m'a aidé à apprendre et à comprendre les concepts d'AdonisJS de manière approfondie.

---
