import { takeLatest, all, takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
import WebSocket from '../Services/Websocket'
import Constants from '../Config/AppConfig'
import { StartupTypes } from '../Redux/StartupRedux'
import { Types as SportListTypes } from '../Redux/SportListRedux'

import { startup } from './StartupSagas'
import { getSportSubList } from './SportListSagas'
import { listenSocket } from './SocketSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create(Constants.apiPath)
const websocket = WebSocket.create(Constants.socketPath)

/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup, api, websocket),
    takeEvery(StartupTypes.INIT_WEBSOCKET, listenSocket, websocket),
    takeLatest(SportListTypes.REQUEST_SUBLIST, getSportSubList, websocket)
  ])
}
