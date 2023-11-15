import React, { useState, useRef } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toast } from 'react-toastify'
import { adminLogin } from '../../../actions/auth'
import { useEffect } from 'react'

const AdminLogin = () => {
  const navigate = useNavigate()

  const form = useRef()
  const checkBtn = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const emailRequired = (value) => {
    const emailPatten = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      return <div className='text-red-500 text-sm mt-1'>This email is required!</div>
    } else if (!emailPatten.test(value)) {
      return <div className='text-red-500 text-sm mt-1'>This email doesn't match</div>
    }
  }
  const passwordRequired = (value) => {
    const passwordPatten = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    if (!value) {
      return <div className='text-red-500 text-sm mt-1'>This password is required!</div>
    }
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setMessage('')

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      adminLogin(email, password)
    }
  }

  const login = () => {
    navigate('/')
  }

  return (
    <div className='grid sm:grid-cols-2 items-center h-screen'>
      <div className='flex justify-center flex-col sm-6 px-[52px] lg:px-64'>
        <Form className='flex flex-col gap-4 sm:gap-[30px] w-full mt-5 sm:mt-16' onSubmit={handleLogin} ref={form}>
          <Input
            name='email'
            className='w-full bg-[#F1F4FF] rounded-[10px] border-2 border-[#1F41BB] hover:border-cyan-500 p-5 text-[#626262] text-base font-medium h-[50px] lg:h-auto'
            placeholder='Email'
            value={email}
            validations={[emailRequired]}
            onChange={onChangeEmail}
          />
          <Input
            name='password'
            className='w-full bg-[#F1F4FF] rounded-[10px] border-2 border-[#1F41BB] hover:border-cyan-500 p-5 text-[#626262] text-base font-medium h-[50px] lg:h-auto'
            type='password'
            value={password}
            placeholder='Password'
            validations={[passwordRequired]}
            onChange={onChangePassword}
          />
          <p className='flex flex-row-reverse sm:justify-center text-[#1F41BB] text-center text-[18px] font-semibold '>
            Forgot your password?
          </p>
          <button
            type='submit'
            className='bg-[#006B99] opacity-75 text-white text-xl px-5 py-4 rounded-[10px] font-semibold shadow-[0_10px_20px_0px_rgba(203,214,255,0)] border-cyan-500 border-2 hover:bg-white hover:text-[#0095ff]'
            disabled={loading}
          >
            {loading && <div className='inline-block animate-spin h-4 w-4 border-t-2 border-blue-500'></div>}
            Sign In
          </button>
          {message && (
            <div className='form-group'>
              <div className='bg-red-500 text-white p-3 rounded-lg shadow-md'>{message}</div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
        <div className='flex flex-col mt-11 sm:mt-[50px] w-full'>
          <button className='bg-[#FFF] text-[20px] sm:text-[30px] font-bold text-[#006B99] p-[10px]' onClick={login}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  )
}

// AdminLogin.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// }

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// })

// export default connect(mapStateToProps, { login })(AdminLogin)
export default AdminLogin
