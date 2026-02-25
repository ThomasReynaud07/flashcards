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

  public async edit({ params, view }: HttpContext) {
    const card = await Flashcard.find(params.id)
    const deck = await Deck.find(params.deckId)
    return view.render('pages/flashcards/edit', { card, deck })
  }

  public async update({ params, request, response }: HttpContext) {
    const card = await Flashcard.find(params.id)
    const data = request.only(['question', 'answer'])
    await card?.merge(data).save()
    return response.redirect().toPath(`/decks/${params.deckId}`)
  }

  public async destroy({ params, response }: HttpContext) {
    const card = await Flashcard.find(params.id)
    await card?.delete()
    return response.redirect().toPath(`/decks/${params.deckId}`)
  }
}
