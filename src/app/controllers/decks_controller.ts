import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { createDeckValidator } from '#validators/deck'

export default class DecksController {
  public async index({ view }: HttpContext) {
    const decks = await Deck.query().withCount('flashcards')
    return view.render('pages/home', { decks })
  }

  public async create({ view }: HttpContext) {
    return view.render('pages/decks/create')
  }

  public async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.deckId).preload('flashcards').firstOrFail()
    return view.render('pages/decks/show', { deck })
  }

  public async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    return view.render('pages/decks/edit', { deck })
  }

  public async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createDeckValidator)
    await Deck.create(payload)
    session.flash('notification', 'Deck créé avec succès !')
    return response.redirect().toRoute('decks.index')
  }

  public async update({ params, request, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    const payload = await request.validateUsing(createDeckValidator)
    await deck.merge(payload).save()
    session.flash('notification', 'Deck mis à jour !')
    return response.redirect().toRoute('decks.show', { deckId: deck.id })
  }

  public async destroy({ params, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    await deck.delete()

    session.flash('notification', 'Deck supprimé')
    return response.redirect().toRoute('decks.index')
  }

  public async play({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.deckId).preload('flashcards').firstOrFail()
    return view.render('pages/decks/play', { deck })
  }
}
