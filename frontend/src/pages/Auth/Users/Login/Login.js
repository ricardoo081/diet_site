import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import main from '../../../../assets/main.webp'
import MainDImg from '../../../../assets/LargeMain.png'
import TopImg from '../../../../assets/TopImg.png'
import SemNome from '../../../../assets/semNome.png'
import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toast } from 'react-toastify'
import { login } from '../../../../actions/auth'
import { useEffect } from 'react'

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated])

  const form = useRef()
  const checkBtn = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const emailRequired = (value) => {
    const emailPatten = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      return <div className='text-red-500 text-sm mt-1'>Este e-mail é obrigatório!</div>
    } else if (!emailPatten.test(value)) {
      return <div className='text-red-500 text-sm mt-1'>Este e-mail não corresponde!</div>
    }
  }
  const passwordRequired = (value) => {
    const passwordPatten = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    if (!value) {
      return <div className='text-red-500 text-sm mt-1'>Esta senha é obrigatória!</div>
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
      login(email, password)
    }
  }

  const register = () => {
    navigate('/register')
  }

  return (
    <div className='grid sm:grid-cols-2 items-center h-screen'>
      <div className='flex justify-center'>
        <div className='flex justify-center flex-col sm-6 px-[52px] lg:px-auto max-w-[560px]'>
          <div className='flex flex-col justify-center '>
            <div className='flex justify-center items-center sm:mt-16 sm:mb-8 gap-3 shrink-0'>
              <img src={SemNome} className='w-8 sm:w-14 lg:w-16  h-8 sm:h-14 lg:h-16' alt='SemNome' />
              <img src={TopImg} className='h-[47px] sm:h-[93px]' alt='TopImg' />
            </div>
            <div className='flex justify-center sm:px-3 sm:py-9 sm:hidden'>
              <img src={main} className='w-[220px] ' alt='img' />
            </div>
            <p className='text-[15px] text-black text-center font-semibold sm:hidden'>
            Transforme sua dieta com facilidade: Gere sua dieta completa em poucos cliques!
            </p>
            <p className='text-center text-black text-xl sm:text-[40px] font-bold hidden sm:block'>Entrar</p>
          </div>

          <Form className='flex flex-col gap-4 sm:gap-[30px] w-full mt-2 sm:mt-16' onSubmit={handleLogin} ref={form}>
            <Input
              name='email'
              className='w-full bg-[#F1F4FF] rounded-[10px] border-2 border-[#1F41BB] hover:border-cyan-500 p-4 text-[#626262] text-base font-medium h-[45px] lg:h-auto'
              placeholder='E-mail'
              value={email}
              validations={[emailRequired]}
              onChange={onChangeEmail}
            />
            <Input
              name='password'
              className='w-full bg-[#F1F4FF] rounded-[10px] border-2 border-[#1F41BB] hover:border-cyan-500 p-4 text-[#626262] text-base font-medium h-[45px] lg:h-auto'
              type='password'
              value={password}
              placeholder='Senha'
              validations={[passwordRequired]}
              onChange={onChangePassword}
            />
            <p className='flex flex-row-reverse sm:justify-center text-[#1F41BB] text-center text-[18px] font-semibold '>
            Esqueceu sua senha?
            </p>
            <button
              type='submit'
              className='bg-[#006B99] opacity-75 text-white text-xl px-5 py-[6px] sm:py-4 rounded-[10px] font-semibold shadow-[0_10px_20px_0px_rgba(203,214,255,0)] border-cyan-500 border-2 hover:bg-white hover:text-[#0095ff]'
              disabled={loading}
            >
              {loading && <div className='inline-block animate-spin h-4 w-4 border-t-2 border-blue-500'></div>}
              Entrar
            </button>
            {message && (
              <div className='form-group'>
                <div className='bg-red-500 text-white p-3 rounded-lg shadow-md'>{message}</div>
              </div>
            )}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
          <div className='flex flex-col mt-[22px] sm:mt-[50px] w-full'>
            <button
              className='bg-[#FFF] text-sm sm:text-[20px] text-[#494949] font-semibold px-5 sm:py-[10px] rounded-[10px]'
              onClick={register}
            >
              Criar nova conta
            </button>
            <button
              className='bg-[#FFF] text-[20px] sm:text-[30px] font-bold text-[#006B99] p-[10px]'
              onClick={register}
            >
              REGISTRO
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm-6 justify-center mx-6 lg:mx-auto max-w-[560px]'>
        <p className='text-xl lg:text-2xl text-black text-center font-semibold py-11 hidden sm:block'>
        Transforme sua dieta com facilidade: Gere sua dieta completa em poucos cliques!
        </p>

        <div className='hidden sm:block'>
          <img src={MainDImg} alt='Desktop image' />
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
