// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = '') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })
  const exampleFunc = (params) => api.get('', params)
  return {
    // a list of the API functions
    exampleFunc
  }
}

// let's return back our create method as the default.
export default {
  create
}
