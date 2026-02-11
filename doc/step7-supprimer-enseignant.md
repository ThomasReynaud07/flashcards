# Application des surnoms des enseignants avec Adonis - Step7

Pour pouvoir supprimer un enseignant, nous allons devoir :

- créer une route
- ajouter une méthode au contrôleur

Par contre, nous n'aurons pas besoin d'une nouvelle vue, car nous allons rediriger l'utilisateur vers la home après la suppression.

## Route

Dans le fichier `routes.ts`:

```js
// Route permettant de supprimer un enseignant
router.delete('/teacher/:id/destroy', [TeachersController, 'destroy']).as('teacher.destroy')
```

Dans AdonisJS, la méthode `allowMethodSpoofing` est utilisée pour permettre le spoofing de méthode HTTP, c'est-à-dire pour "simuler" une méthode HTTP différente de celle utilisée dans une requête. Cela est souvent utile pour contourner les limitations des formulaires HTML, qui ne prennent en charge que les méthodes `GET` et `POST`.

Pour voir utiliser la méthode `delete`, il faut donc activer `allowMethodSpoofing` dans le fichier `config/app.ts`.

```js
...
allowMethodSpoofing: true,
...
```

## Contrôleur

Dans le contrôleur `teachers_controller.ts` :

```js
/**
 * Supprimer un enseignant
 */
async destroy({ params, session, response }: HttpContext) {
  // Sélectionne l'enseignant à supprimer
  const teacher = await Teacher.findOrFail(params.id)

  // Supprime l'enseignant
  await teacher.delete()

  // Afficher un message à l'utilisateur
  session.flash(
    'success',
    `L'enseignant ${teacher.lastname} ${teacher.firstname} a été supprimé avec succès !`
  )

  // Redirige l'utilisateur sur la home
  return response.redirect().toRoute('home')
}
```

Il est important de noter que nous allons utiliser un système de message Flash directement disponible dans AdonisJS.

Nous devons créer un peu de code de template pour afficher le message dans les vues :

Voici le fichier `views/patials/flash.edge`

```edge
@if(flashMessages.has('success'))
  <div class="alert alert-success">
    {{ old('success') }}
  </div>
@end

@if(flashMessages.has('error'))
  <div class="alert alert-danger">
    {{ old('error') }}
  </div>
@end
```

Et il faut l'inclure dans le `layout.edge`

```edge
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>
      {{ title || "Application des surnoms des enseignants" }}
    </title>
  </head>
  <body>
    @include('partials/header')
    @include('partials/flash')
    <div class="container">
      {{{ await $slots.main() }}}
    </div>
    @include('partials/footer')
  </body>
</html>
```

## Modifier la homepage et la page des détails

Dans la vue `homepage`, nous devons mettre à jour le code pour supprimer un enseignant.

```edge
@component('components/layout', { title: 'Accueil' })
  <h3>
    Liste des enseignants
  </h3>
  <table>
    <thead>
      <tr>
        <th>
          Nom
        </th>
        <th>
          Surnom
        </th>
        <th>
          Options
        </th>
      </tr>
    </thead>
    <tbody>
      @each ((teacher, index) in teachers)
        <tr>
          <td>
            {{ teacher.lastname }} {{ teacher.firstname }}
          </td>
          <td>
            {{ teacher.nickname }}
          </td>
          <td class="containerOptions">
            <a href="#">
              <img height="20em" src="./img/edit.png" alt="edit" />
            </a>
            {{-- Ajout d'un formulaire pour la suppression d'un enseignant --}}
            <form
              action="{{ route('teacher.destroy', { id: teacher.id }) }}?_method=DELETE"
              method="POST"
              style="display: inline"
            >
              {{ csrfField() }}
              <button type="submit" style="background: none; border: none; padding: 0; cursor: pointer;">
                <img height="20em" src="/img/delete.png" alt="delete" />
              </button>
            </form>

            <a href="{{ route('teacher.show', {id: teacher.id}) }}">
              <img height="20em" src="/img/detail.png" alt="detail" />
            </a>
          </td>
        </tr>
      @end
    </tbody>
  </table>
@endcomponent
```

> Exercice :<br>
> Vous devez faire la même chose pour le bouton `supprimer` présent dans la page `détail d'un enseignant`.

## Prochaine étape

Dans la prochaine étape <a href="https://github.com/GregLeBarbar/app-teachers-adonisjs-2026/tree/step8">step8</a>, nous allons gérer l'ajout d'un nouvel enseignant.
