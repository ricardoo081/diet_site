import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { loadUser } from './actions/auth'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Users/Login/Login'
import InfoPage from './pages/Home/Info'
import Register from './pages/Auth/Users/Register/Register'
import setAuthToken from './utils/setAuthToken'
import store from './store'
import emailjs from '@emailjs/browser'
import CheckoutForm from './pages/Payment/CheckoutForm'
import AdminLogin from './pages/Auth/Admin/Login'
import DietResult from './pages/Home/DietResult'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    emailjs.init('NGhf2a1xK4ST_jpsQ')
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/home' Component={Home} />
          <Route path='/info' Component={InfoPage} />
          <Route path='/admin' Component={AdminLogin} />
          <Route path='/dietResult' Component={DietResult} />
          <Route path='/checkout' element={<CheckoutForm />} />
          <Route path='/return' element={<DietResult />} />
        </Routes>
        <ToastContainer theme='colored' />
      </BrowserRouter>
    </>
  )
}

export default App
