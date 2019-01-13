import { call, take, put } from 'redux-saga/effects'
import { END, eventChannel } from 'redux-saga'
import SportListActions from '../Redux/SportListRedux'

function getChannel (socket) {
  return eventChannel((emit) => {
    const eventHandler = (socketChannel, data) => {
      emit({ channel: socketChannel, data })
    }
    socket.on('sport-list', (data) => { eventHandler('sport-list', data) })
    socket.on('get-sport', (data) => { eventHandler('get-sport', data) })

    return () => {
      emit(END)
      socket.clearSocketListener()
    }
  })
}

export function * listenSocket (socket) {
  const socketAPI = socket.getSocketInstance()
  const chan = yield call(getChannel, socketAPI)
  try {
    while (true) {
      const dataObj = yield take(chan)
      const { data, channel } = dataObj
      console.log(dataObj, data, channel)
      switch (channel) {
        case 'sport-list':
          yield put(SportListActions.listSuccessful(data))
          break
        case 'get-sport':
          yield put(SportListActions.sublistSuccessful(data.meta.id, data.response))
          break
        default: break
      }
    }
  } finally {
    console.log('closing channel')
  }
}

export default {}
