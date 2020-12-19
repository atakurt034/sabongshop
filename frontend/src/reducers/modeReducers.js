import {
  SET_MODE_FALSE,
  SET_MODE_TRUE,
  CLICKED_BUTTON_FALSE,
  CLICKED_BUTTON_TRUE,
} from '../constants/modeConstants'

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
export const setClickedButtonReducer = (state = {}, action) => {
  switch (action.type) {
    case CLICKED_BUTTON_TRUE:
      return { mode: true, target: action.payload }
    case CLICKED_BUTTON_FALSE:
      return { mode: false, target: {} }
    default:
      return state
  }
}
