import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
// all keys will be automatically transformed into SNAKE_CASE in Types
const { Types, Creators } = createActions({
  requestList: null,
  listSuccessful: ['list'],
  requestSublist: ['id'],
  sublistSuccessful: ['id', 'sublist'],
  listRequestFailure: null,
  sublistRequestFailure: ['id']
})

export { Types }
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
  sublists: {},
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

export const requestList = (state) =>
  state.merge({
    ...INITIAL_STATE,
    fetching: true
  })

export const saveList = (state, action) => {
  const { list } = action
  return state.merge({ fetching: false, error: null, list })
}

export const listFailure = (state) =>
  state.merge({ fetching: false, error: true, list: [] })

export const requestsSublist = (state, {id}) =>
  ({
    ...state,
    sublists: {
      ...state.sublists,
      [id]: {
        fetching: true,
        error: null,
        list: []
      }
    }
  })

export const saveSublist = (state, {id, sublist}) => {
  return {
    ...state,
    sublists: {
      ...state.sublists,
      [id]: {
        fetching: false,
        error: null,
        list: sublist
      }
    }
  }
}

export const sublistFailure = (state, {id}) =>
  ({
    ...state,
    sublists: {
      ...state.sublists,
      [id]: {
        fetching: false,
        error: true,
        list: []
      }
    }
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_LIST]: requestList,
  [Types.LIST_SUCCESSFUL]: saveList,
  [Types.LIST_REQUEST_FAILURE]: listFailure,
  [Types.REQUEST_SUBLIST]: requestsSublist,
  [Types.SUBLIST_SUCCESSFUL]: saveSublist,
  [Types.SUBLIST_REQUEST_FAILURE]: sublistFailure
})
