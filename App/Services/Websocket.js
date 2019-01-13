import io from 'socket.io-client'

const create = (socketUrl) => {
  const ioClient = io(socketUrl, {
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': Infinity,
    'transports': ['websocket']
  })

  const emit = (eventName, props) => {
    ioClient.emit(eventName, props)
  }
  const addSocketListener = (eventName, callback) => {
    ioClient.on(eventName, data => { callback(data) })
  }

  const clearSocketListener = (eventName) => {
    ioClient.removeAllListeners(eventName)
  }

  const getSocketInstance = () => ioClient

  return {
    emit,
    addSocketListener,
    clearSocketListener,
    getSocketInstance
  }
}

export default {
  create
}
