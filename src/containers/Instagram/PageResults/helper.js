import { timeConverter } from '../../../config/utils'

const extractData = media => {
  return [
    { key: 0, label: 'Comments count', data: media.comments_count },
    { key: 1, label: 'Likes count', data: media.likes_count },
    { key: 2, label: 'Caption', data: media.media_caption },
    { key: 3, label: 'Tags', data: media.media_tags },
    {
      key: 4,
      label: 'Posted on Instagram',
      data: timeConverter(media.post_created_time)
    }
  ]
}

export { extractData }
