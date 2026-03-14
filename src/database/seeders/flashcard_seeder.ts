import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
import Flashcard from '#models/flashcard'

export default class extends BaseSeeder {
  async run() {
    const deckCapitales = await Deck.create({
      title: 'Capitales du Monde',
      description: 'Testez vos connaissances sur les capitales internationales.',
    })

    await Flashcard.createMany([
      {
        question: "Quelle est la capitale de l'Allemagne ?",
        answer: 'Berlin',
        deckId: deckCapitales.id,
      },
      {
        question: 'Quelle est la capitale de la Suisse ?',
        answer: 'Berne',
        deckId: deckCapitales.id,
      },
      {
        question: 'Quelle est la capitale du Japon ?',
        answer: 'Tokyo',
      },
      {
        question: 'Quelle est la capitale du Canada ?',
        answer: 'Ottawa',
        deckId: deckCapitales.id,
      },
      {
        question: "Quelle est la capitale de l'Australie ?",
        answer: 'Canberra',
        deckId: deckCapitales.id,
      },
    ])

    const deckJS = await Deck.create({
      title: 'JavaScript Avancé',
      description: 'Concepts clés du langage JS et Node.js.',
    })

    await Flashcard.createMany([
      {
        question: 'Que signifie "NaN" ?',
        answer: 'Not a Number',
        deckId: deckJS.id,
      },
      {
        question: 'Quelle méthode transforme un objet JSON en chaîne de caractères ?',
        answer: 'JSON.stringify()',
        deckId: deckJS.id,
      },
      {
        question: 'Quelle est la différence entre "let" et "var" ?',
        answer: 'let a une portée de bloc, var a une portée de fonction.',
        deckId: deckJS.id,
      },
      {
        question: "Comment appelle-t-on une fonction qui s'appelle elle-même ?",
        answer: 'Une fonction récursive',
        deckId: deckJS.id,
      },
    ])

    const deckEnglish = await Deck.create({
      title: 'Anglais - Business',
      description: 'Vocabulaire utile pour le monde du travail.',
    })

    await Flashcard.createMany([
      {
        question: 'Comment dit-on "Compte rendu" en anglais ?',
        answer: 'Minutes (of the meeting)',
        deckId: deckEnglish.id,
      },
      {
        question: 'Traduisez : "To schedule a meeting"',
        answer: 'Planifier une réunion',
        deckId: deckEnglish.id,
      },
      {
        question: 'Que signifie l\'idiome "To call it a day" ?',
        answer: "S'arrêter pour aujourd'hui (finir sa journée)",
        deckId: deckEnglish.id,
      },
      {
        question: 'Comment dit-on "Congés payés" ?',
        answer: 'Paid leave / Paid holidays',
        deckId: deckEnglish.id,
      },
    ])
  }
}
