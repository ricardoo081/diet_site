import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
  LOGIN_FAIL,
} from '../actions/type'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: null,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    default:
      return state
  }
}
