import vine from '@vinejs/vine'

const createDeckValidator = vine.compile(
  vine.object({
    title: vine.string().trim().unique({ table: 'decks', column: 'title' }),
    description: vine.string().trim().minLength(10).optional(),
  })
)

export { createDeckValidator }
