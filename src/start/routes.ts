/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import DecksController from '#controllers/decks_controller'
import FlashcardsController from '#controllers/flashcards_controller'

router.get('/', [DecksController, 'index']).as('decks.index')

router.get('/decks/create', [DecksController, 'create']).as('decks.create')

router.post('/decks', [DecksController, 'store']).as('decks.store')

router.get('/decks/:id', [DecksController, 'show']).as('decks.show')
