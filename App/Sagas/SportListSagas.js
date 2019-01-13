import actions from '../Redux/SportListRedux'

export function * getSportSubList (socket, action) {
  // make the call to the api
  const { id } = action
  try {
    socket.emit('get-sport', { id })
  } catch (e) {
    yield actions.sublistRequestFailure(id)
  }
}
