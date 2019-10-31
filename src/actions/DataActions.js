import {
  FetchMediaURL,
  FetchMediaDetailURL,
  FetchNewDataURL,
  CrawlUserURL,
  CrawlImagesDownloadURL,
  CrawlStatusURL
} from '../config/urls'
import {
  ADD_USER_MEDIA,
  DATA_LOADING,
  SET_IGCONNECT_SEARCH_TEXT,
  SET_SELECTED_MEDIA,
  SET_ZIP_LINK
} from './types'
import { makeRequest } from './request'
import { ToastsStore } from 'react-toasts'
import history from '../config/history'

export const fetchUserMedia = (token, page, search = '') => {
  return dispatch => {
    dispatch(startDataLoadingSpinner())
    let params = { page, search }
    makeRequest({ requestType: 'get', url: FetchMediaURL, params, token })
      .then(response => {
        console.log('fetch media response: ', response)
        dispatch(addUserMedia(response.data))
        dispatch(stopDataLoadingSpinner())
      })
      .catch(error => {
        console.log('fetch media error: ', error)
        dispatch(stopDataLoadingSpinner())
      })
  }
}

export const fetchMediaDetail = (token, mediaId) => {
  return dispatch => {
    makeRequest({
      requestType: 'get',
      url: `${FetchMediaDetailURL}/${mediaId}`,
      token
    })
      .then(response => {
        console.log('fetch media detail response: ', response)
        dispatch(addMediaDetail(response.data))
      })
      .catch(error => {
        console.log('fetch media detail error: ', error)
      })
  }
}

export const FetchNewData = (token, accessTokenIG) => {
  return dispatch => {
    dispatch(startDataLoadingSpinner())
    makeRequest({
      requestType: 'post',
      url: FetchNewDataURL,
      token,
      data: { access_token: accessTokenIG }
    })
      .then(response => {
        console.log('fetch new connected Insta user data response: ', response)
        dispatch(fetchUserMedia(token, 1))
        ToastsStore.success(
          'You account has been connected and data fetched successfully'
        )
        dispatch(stopDataLoadingSpinner())
        history.push('/igconnected')
      })
      .catch(error => {
        console.log('fetch new Insta user error: ', error)
        dispatch(stopDataLoadingSpinner())
      })
  }
}

export const CrawlNewUser = (token, usertoCrawl) => {
  return dispatch => {
    dispatch(startDataLoadingSpinner())
    makeRequest({
      requestType: 'post',
      url: CrawlUserURL,
      token,
      data: {
        username: usertoCrawl
      }
    })
      .then(response => {
        console.log('Crawl new user response: ', response)
        let crawler_id = response.data.CrawlerID
        if (crawler_id) {
          dispatch(checkCrawlerStatus(crawler_id, token))
          ToastsStore.success('Crawler initiated successfully')
        } else {
          ToastsStore.error('Crawler is not ready on server')
          dispatch(stopDataLoadingSpinner())
        }
      })
      .catch(error => {
        console.log('Crawl new user error: ', error)
        dispatch(stopDataLoadingSpinner())
      })
  }
}

export const checkCrawlerStatus = (crawler_id, token) => {
  return dispatch => {
    let timerId = setInterval(() => {
      makeRequest({
        requestType: 'get',
        url: `${CrawlStatusURL}/${crawler_id}`,
        token
      })
        .then(response => {
          console.log('Crawl check status response: ', response)
          let status = response.data.status
          if (status === 'Completed') {
            dispatch(CrawledImagesDownload(token, crawler_id))
            clearInterval(timerId)
          } else if (status === 'Invalid_Profile') {
            ToastsStore.error(
              'This Instagram user either public or does not exists.'
            )
            dispatch(stopDataLoadingSpinner())
            clearInterval(timerId)
          }
        })
        .catch(error => {
          console.log('Crawl check status error: ', error)
          dispatch(stopDataLoadingSpinner())
          ToastsStore.error('Allow popups for this site in browser')
        })
    }, 5000)
  }
}

export const CrawledImagesDownload = (token, crawlerID) => {
  return dispatch => {
    makeRequest({
      requestType: 'get',
      url: `${CrawlImagesDownloadURL}/${crawlerID}`,
      token
    })
      .then(response => {
        if (response.config) {
          dispatch(stopDataLoadingSpinner())
          console.log('Crawled images download response: ', response.config)
          dispatch(setCrawledImagesZIPlink(response.config.url))
        }
      })
      .catch(error => {
        console.log('Crawled images download error: ', error)
      })
  }
}

const addUserMedia = payload => {
  return { type: ADD_USER_MEDIA, payload: payload }
}

export const setIgConnectSearchText = searchText => {
  return dispatch => {
    dispatch(setSearchText(searchText))
  }
}

export const setCrawledImagesZIPlink = link => {
  return dispatch => {
    dispatch(addCrawledImagesZIPlink(link))
  }
}

export const setSelectedMedia = media => {
  return dispatch => {
    dispatch(setMedia(media))
  }
}

export const addMediaDetail = media => {
  return dispatch => {
    dispatch(setMedia(media))
  }
}

const startDataLoadingSpinner = () => {
  return { type: DATA_LOADING, payload: true }
}

const stopDataLoadingSpinner = () => {
  return { type: DATA_LOADING, payload: false }
}

const setSearchText = searchText => {
  return { type: SET_IGCONNECT_SEARCH_TEXT, payload: searchText }
}

const setMedia = media => {
  return { type: SET_SELECTED_MEDIA, payload: media }
}

const addCrawledImagesZIPlink = link => {
  return { type: SET_ZIP_LINK, payload: link }
}
