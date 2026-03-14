import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Flashcard from '#models/flashcard'
import { createFlashcardValidator } from '#validators/flashcard'

export default class FlashcardsController {
  public async create({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    return view.render('pages/flashcards/create', { deck })
  }

  public async store({ params, request, response, session }: HttpContext) {
    const deckId = params.deckId
    const payload = await request.validateUsing(createFlashcardValidator)
    const existing = await Flashcard.query()
      .where('deck_id', deckId)
      .where('question', payload.question)
      .first()

    if (existing) {
      session.flash('errors.question', 'Cette question existe déjà dans ce deck')
      session.flashAll()
      return response.redirect().back()
    }
    await Flashcard.create({ ...payload, deckId })
    session.flash('notification', 'La carte a été ajoutée !')
    return response.redirect().toRoute('decks.show', { deckId })
  }

  public async edit({ params, view }: HttpContext) {
    const card = await Flashcard.findOrFail(params.id)
    const deck = await Deck.findOrFail(params.deckId)
    return view.render('pages/flashcards/edit', { card, deck })
  }

  public async update({ params, request, response, session }: HttpContext) {
    const card = await Flashcard.findOrFail(params.id)
    const payload = await request.validateUsing(createFlashcardValidator)
    await card.merge(payload).save()
    session.flash('notification', 'La carte a été modifiée !')
    return response.redirect().toRoute('decks.show', { deckId: params.deckId })
  }

  public async destroy({ params, response, session }: HttpContext) {
    const card = await Flashcard.findOrFail(params.id)
    await card.delete()
    session.flash('notification', 'Carte supprimée')
    return response.redirect().toRoute('decks.show', { deckId: params.deckId })
  }
}
