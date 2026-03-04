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

router.get('/decks/:deckId/edit', [DecksController, 'edit']).as('decks.edit')
router.post('/decks/:deckId', [DecksController, 'update']).as('decks.update')

router.post('/decks/:deckId/delete', [DecksController, 'destroy']).as('decks.destroy')

router.get('/decks/:deckId', [DecksController, 'show']).as('decks.show')

router.get('/decks/:deckId/cards/create', [FlashcardsController, 'create']).as('flashcards.create')
router.post('/decks/:deckId/cards', [FlashcardsController, 'store']).as('flashcards.store')

router.get('/decks/:deckId/cards/:id/edit', [FlashcardsController, 'edit']).as('flashcards.edit')
router.post('/decks/:deckId/cards/:id', [FlashcardsController, 'update']).as('flashcards.update')

router
  .post('/decks/:deckId/cards/:id/delete', [FlashcardsController, 'destroy'])
  .as('flashcards.destroy')
