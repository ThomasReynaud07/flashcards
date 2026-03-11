import vine from '@vinejs/vine'

const deskValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(5).maxLength(255),
    description: vine.string().minLength(2),
  })
)

export { deskValidator }
