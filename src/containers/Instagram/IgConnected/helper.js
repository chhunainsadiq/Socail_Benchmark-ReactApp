import { timeConverter } from '../../../config/utils'

const columnsToRender = [
  { key: 0, value: 'Id' },
  { key: 1, value: 'Media type' },
  { key: 2, value: 'Crawl time' },
  { key: 3, value: 'Likes' },
  { key: 4, value: 'Comments' },
  { key: 5, value: 'Visit' }
]

const extractRowData = (media, id) => {
  const { created_at } = media[id]
  const { media_type, likes_count, comments_count } = media[
    id
  ].media_insights[0]
  return [
    { key: 0, value: id },
    { key: 1, value: media_type },
    { key: 2, value: timeConverter(created_at) },
    { key: 3, value: likes_count },
    { key: 4, value: comments_count }
  ]
}

let crawlerMsg = 'Download all crawled media zip'
let actionBtnTitle = 'Download Zip'

export { columnsToRender, extractRowData, crawlerMsg, actionBtnTitle }
