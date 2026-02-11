import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'

export default class DecksController {
  // Affiche la liste
  async index({ view }: HttpContext) {
    const decks = await Deck.query().withCount('flashcards')
    return view.render('pages/home', { decks })
  }

  // Affiche UN deck (C'est ça qui te manque !)
  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('flashcards').firstOrFail()

    return view.render('pages/decks/show', { deck })
  }
}
