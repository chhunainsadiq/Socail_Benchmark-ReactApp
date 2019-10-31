import { schema } from 'normalizr'

const media = new schema.Entity('media', {}, { idAttribute: 'id' })
export const mediaSchema = [media]

const comment = new schema.Entity('comments', {}, { idAttribute: 'id' })

export const commentSchema = [comment]
