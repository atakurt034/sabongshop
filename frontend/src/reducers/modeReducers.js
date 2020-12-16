import { SET_MODE_FALSE, SET_MODE_TRUE } from '../constants/modeConstants'

export const setModeReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MODE_TRUE:
      return { mode: true }
    case SET_MODE_FALSE:
      return { mode: false }
    default:
      return state
  }
}
