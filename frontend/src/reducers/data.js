import { SAVE_DATA } from '../actions/type'

const initialState = {
  data: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SAVE_DATA:
      return {
        ...state,
        data: payload,
      }
    default:
      return state
  }
}
