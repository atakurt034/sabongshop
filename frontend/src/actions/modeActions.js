import { CLICKED_BUTTON_TRUE } from '../constants/modeConstants'

export const setClickButton = (target) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLICKED_BUTTON_TRUE, payload: target })
  } catch (err) {
    console.log(err)
  }
}
