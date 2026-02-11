import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
import Flashcard from '#models/flashcard'

export default class extends BaseSeeder {
  async run() {
    const deckCapitales = await Deck.create({
      title: 'Capitales',
      description: 'Apprendre les capitales',
    })

    await Flashcard.createMany([
      {
        question: 'Capital de allemagne ?',
        answer: 'Berlin',
        deckId: deckCapitales.id,
      },
      {
        question: 'Capital de Suisse ?',
        answer: 'Berne',
        deckId: deckCapitales.id,
      },
    ])
  }
}
