import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Flashcard from '#models/flashcard'

export default class FlashcardsController {
  public async create({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    return view.render('pages/flashcards/create', { deck })
  }

  public async store({ params, request, response }: HttpContext) {
    const data = request.only(['question', 'answer'])
    await Flashcard.create({ ...data, deckId: params.deckId })
    return response.redirect().toPath(`/decks/${params.deckId}`)
  }
