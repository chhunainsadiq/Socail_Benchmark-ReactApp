import { timeConverter } from '../../../config/utils'

const columnsToRender = [
  { key: 0, value: 'Id' },
  { key: 1, value: 'Insta uid' },
  { key: 2, value: 'Media type' },
  { key: 3, value: 'Crawl time' },
  { key: 4, value: 'Filter used' },
  { key: 5, value: 'Likes' },
  { key: 6, value: 'Comments' },
  { key: 7, value: 'Visit' }
]

const extractRowData = (media, id) => {
  const { created_at, insta_user_id } = media[id]
  const { media_type, likes_count, comments_count, filter_used } = media[
    id
  ].media_insights[0]
  return [
    { key: 0, value: id },
    { key: 1, value: insta_user_id },
    { key: 2, value: media_type },
    { key: 3, value: timeConverter(created_at) },
    { key: 4, value: filter_used },
    { key: 5, value: likes_count },
    { key: 6, value: comments_count }
  ]
}
export { columnsToRender, extractRowData }
