# Application des surnoms des enseignants - Step6

Pour pouvoir afficher les détails d'un enseignant, nous allons devoir :

- créer une route
- ajouter une méthode au contrôleur
- ajouter une vue

## Route

Dans le fichier `routes.ts`:

```js
// Route permettant de voir les détails d'un enseignant
router.get('/teacher/:id/show', [TeachersController, 'show']).as('teacher.show')
```

Nous avons besoin d'un id dans l'URL qui correspond à l'id du Teacher.

Nous utiliserons cet id dans le contrôleur pour récupérer le "bon" enseignant en DB.

A noter le nom de la route `teacher.show`.

## Contrôleur

Dans le contrôleur `teachers_controller.ts` :

```js
/**
 * Afficher les détails d'un enseignant (y compris le nom de sa section)
 */
async show({ params, view }: HttpContext) {
  // Sélectionner l'enseignant dont on veut afficher les détails
  const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()

  // Afficher la vue
  return view.render('pages/teachers/show.edge', { title: "Détail d'un enseignant", teacher })
}
```

### Que fait le code ?

```js
const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()
```

On récupère le "bon" enseignant à l'aide de l'id présente dans l'URL que l'on récupère grâce à `params.id`.

Comme on veut également pouvoir afficher la section de l'enseignant, on utilise la relation entre le modèle `Teacher` et le modèle `Section` pour faire le `preload('section')`

Rappel : Voici la relation présente dans le modèle Teacher :

```js
@belongsTo(() => Section)
declare section: BelongsTo<typeof Section> // Relation vers le modèle Section
```

## Vue

Nous devons créer la vue `show.edge` dans le dossier `ressources\views\pages\teachers`.

A noter que nous créons un répertoire `teachers` pour ne pas avoir toutes les vues 'en vrac' à la racine dans `pages`

```js
@component('components/layout', { title: title })
  <div class="user-head">
    <h3>
      Détail : {{ teacher.firstname }} {{ teacher.lastname }}
        <img
        style="margin-left: 1vw;"
        height="20em"
        alt="male symbole"
        @if(teacher.gender === 'woman')
        src="/img/femelle.png"
        @elseif(teacher.gender === 'man')
        src="/img/male.png"
        @else
          src="/img/autre.png"
        @end
      />
    </h3>
    <p>
      {{ teacher.section.name }}
    </p>
    <div class="actions">
      <a href="#">
        <img height="20em" src="/img/edit.png" alt="edit" />
      </a>
      <a href="#">
        <img height="20em" src="/img/delete.png" alt="delete" />
      </a>
    </div>
  </div>
  <div class="user-body">
    <div class="left">
      <p>
        Surnom : {{ teacher.nickname }}
      </p>
      <p>
        {{ teacher.origine }}
      </p>
    </div>
  </div>
  <div class="user-footer">
    <a href="{{ route('home') }}">Retour à la page d'accueil</a>
  </div>
@endcomponent
```

Pour la `homepage.edge` nous avions vu la boucle, ici nous rencontrons le `if` !

## Modifier la homepage

Dans la homepage, nous devons mettre à jour le lien pour afficher les détails d'un enseignant à l'aide de la route.

```edge
<a href="{{ route('teacher.show', {id: teacher.id}) }}">
  <img height="20em" src="/img/detail.png" alt="detail" />
</a>
```

## Etat de l'application à la fin de cette étape

<img src="./doc/images/step6-fin.png" style="width:70%"/>

Dans la prochaine étape <a href="https://github.com/GregLeBarbar/app-teachers-adonisjs-2026/tree/step7">step7</a>, nous allons gérer la suppression d'un nouvel enseignant.
