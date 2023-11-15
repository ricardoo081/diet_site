import axios from 'axios'
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, CLEAR_PROFILE, LOGOUT } from './type'
import setAuthToken from '../utils/setAuthToken'
import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
import { setAlert } from './alert'

const API_URL = 'http://koglim.com'

// const API_URL = process.env.NODE_ENV == 'production' ? 'http://koglim.com' : 'http://localhost:8000'

const env = process.env.NODE_ENV
// const navigate = useNavigate()

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    console.log('url', API_URL)
    const res = await axios.get(API_URL + '/api/auth')
    // console.log('success')

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    // console.log('error')
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL + '/api/auth', { email, password })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
    toast.success('Login realizado com sucesso!', {
      position: 'top-right',
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL,
    })
    toast.warning('A credencial não está correta!', {
      position: 'top-right',
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
    console.log(errors)
  }
}

export const adminLogin = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL + '/api/admin', { email, password })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
    toast.success('Successfully Logined!', {
      position: 'top-right',
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
    }
    console.log(errors)
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL + '/api/users', { name, email, password })
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
    toast.success('Registrado com sucesso!', {
      position: 'top-right',
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
    console.log(123123);
    return true;
  } catch (err) {
    const errors = err.response.data.errors
    console.log(errors)
  }
  return false
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const generateDiet = async (weight, height, goal, amountMeal, gender, comments) => {
  const res = await fetch(API_URL + '/api/generateDiet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      weight,
      height,
      goal,
      amountMeal,
      gender,
      comments,
    }),
  })
  return res
}
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT })
}

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
  generateDiet,
}

export default AuthService
