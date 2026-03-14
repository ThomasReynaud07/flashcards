import vine from '@vinejs/vine'

export const createFlashcardValidator = vine.compile(
  vine.object({
    question: vine.string().trim().minLength(10),
    answer: vine.string().trim().minLength(1),
  })
)
