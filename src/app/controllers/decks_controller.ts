import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'

export default class DecksController {
  public async index({ view }: HttpContext) {
    const decks = await Deck.query().withCount('flashcards')
    return view.render('pages/home', { decks })
  }

  public async create({ view }: HttpContext) {
    return view.render('pages/decks/create')
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description'])
    await Deck.create(data)
    return response.redirect().toRoute('decks.index')
  }

  public async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.deckId).preload('flashcards').firstOrFail()

    return view.render('pages/decks/show', { deck })
  }

  public async edit({ params, view }: HttpContext) {
    const deck = await Deck.find(params.deckId)
    return view.render('pages/decks/edit', { deck })
  }

  public async destroy({ params, response }: HttpContext) {
    const deck = await Deck.find(params.deckId)
    await deck?.delete()
    return response.redirect().toRoute('decks.index')
  }
  public async update({ params, request, response }: HttpContext) {
    const deck = await Deck.find(params.deckId)
    const data = request.only(['title', 'description'])
    await deck?.merge(data).save()
    return response.redirect().toPath(`/decks/${params.deckId}`)
  }
}
