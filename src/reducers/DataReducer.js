import {
  ADD_USER_MEDIA,
  DATA_LOADING,
  SET_IGCONNECT_SEARCH_TEXT,
  SET_SELECTED_MEDIA,
  ADD_MEDIA_DETAIL,
  SET_ZIP_LINK
} from '../actions/types'
import { normalize } from 'normalizr'
import { mediaSchema } from '../config/schema'

const INITIAL_STATE = {
  instaMedia: {},
  instaMediaIds: [],
  mediaCount: 0,
  nextMedia: null,
  dataLoading: false,
  igConnectSearchText: '',
  selectedMedia: null,
  zipImagesLink: null
}

const DataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return { ...state, dataLoading: action.payload }
    case ADD_USER_MEDIA:
      let normalizedMedia = normalize(action.payload.results, mediaSchema)
      let { ids, normalizedData } = concatNewData(
        state.instaMediaIds,
        state.instaMedia,
        normalizedMedia.result,
        normalizedMedia.entities.media
      )
      return {
        ...state,
        instaMedia: normalizedData,
        instaMediaIds: ids,
        mediaCount: action.payload.count,
        nextMedia: action.payload.next
      }
    case SET_IGCONNECT_SEARCH_TEXT:
      return { ...state, igConnectSearchText: action.payload }
    case SET_SELECTED_MEDIA || ADD_MEDIA_DETAIL:
      return { ...state, selectedMedia: action.payload }
    case SET_ZIP_LINK:
      return { ...state, zipImagesLink: action.payload }
    default:
      return { ...state }
  }
}

export { DataReducer }

const concatNewData = (ids, normalizedData, newIds, newNormalizedData) => {
  for (let newId of newIds) { // eslint-disable-line no-unused-vars
    if (!ids.includes(newId)) {
      ids = ids.concat(newId)
      normalizedData[newId] = newNormalizedData[newId]
    }
  }

  return { ids, normalizedData }
}
