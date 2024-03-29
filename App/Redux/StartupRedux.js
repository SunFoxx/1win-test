import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  initWebsocket: null
})

export const StartupTypes = Types
export default Creators
