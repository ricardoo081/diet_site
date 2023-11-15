import { SAVE_DATA } from './type'

const env = process.env.NODE_ENV

export const saveData = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_DATA,
    payload: data,
  })
}
