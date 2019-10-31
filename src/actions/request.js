const axios = require('axios')

export const makeRequest = ({
  requestType,
  url,
  token = null,
  data = null,
  params
}) => {
  let config = { headers: { Authorization: 'Bearer ' + token }, params }
  if (!token) config = null
  if (requestType === 'get') {
    return new Promise((resolve, reject) => {
      try {
        const response = axios.get(url, config)
        resolve(response)
      } catch (error) {
        reject(error.response)
      }
    })
  } else if (requestType === 'post') {
    return new Promise((resolve, reject) => {
      try {
        const response = axios.post(url, data, config)
        resolve(response)
      } catch (error) {
        reject(error.response)
      }
    })
  }
}
