import { put } from 'redux-saga/effects'
import SportListActions from '../Redux/SportListRedux'
import { StartupTypes } from '../Redux/StartupRedux'

export function * startup () {
  try {
    yield put({
      type: StartupTypes.INIT_WEBSOCKET
    })
    yield put(SportListActions.requestList())
  } catch (e) {
    yield put(SportListActions.listRequestFailure())
  }
}
