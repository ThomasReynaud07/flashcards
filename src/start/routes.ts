/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// start/routes.ts
import router from '@adonisjs/core/services/router'

// Ajoute "typeof DecksController" ici pour que TS voit toutes les méthodes (index, show, create, etc.)
const DecksController = () => import('#controllers/decks_controller')

router.get('/', [DecksController, 'index'])
router.get('/decks/:id', [DecksController, 'show']).as('decks.show')
