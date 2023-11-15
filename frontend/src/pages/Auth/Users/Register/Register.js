import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TopImg from '../../../../assets/TopImg.png'
import SemNome from '../../../../assets/semNome.png'
import SignUpImg from '../../../../assets/signUpImg.png'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { register } from '../../../../actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const Register = ({ register, isAuthenticated }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated])

  const form = useRef()
  const checkBtn = useRef()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState('')

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const onChangePassword2 = (e) => {
    setPassword2(e.target.value)
  }

  const emailRequired = (value) => {
    const emailPatten = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      return <div className='flex justify-start text-red-500 text-sm mt-1'>Este e-mail é obrigatório!</div>
    } else if (!emailPatten.test(value)) {
      return <div className='flex justify-start text-red-500 text-sm mt-1'>Este e-mail não corresponde!</div>
    }
  }
  const passwordRequired = (value) => {
    const passwordPatten = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    if (!value) {
      return <div className=' flex justify-start text-red-500 text-sm mt-1'>Esta senha é obrigatória!</div>
    } 
    // else if (!passwordPatten.test(value)) {
    //   return <div className='flex justify-start text-red-500 text-sm mt-1'>This password required strong!</div>
    // } 
    else if (value.length < 6 || value.length > 40) {
      return (
        <div className='flex justify-start text-red-500 text-sm mt-1'>
          {' '}
          A senha deve ter entre 6 e 40 caracteres.
        </div>
      )
    }
  }

  const nameRequired = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className='flex justify-start text-red-500 text-sm mt-1'>
          O nome de usuário deve ter entre 3 e 20 caracteres.
        </div>
      )
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (password != password2) {
      toast.error('Senha não corresponde!', {
        position: 'top-right',
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    } else {
      form.current.validateAll()
      register(name, email, password);
    }
  }

  const Login = () => {
    navigate('/')
  }

  return (
    <div className='grid sm:grid-cols-2 items-center h-screen'>
      <div className='flex justify-center'>
        <div className='flex justify-center flex-col sm-6 px-[50px] xl:px-auto max-w-[560px]'>
          {' '}
          <div className='flex justify-center items-center mt-[3.25rem] sm:mt-16 mb-1 gap-3'>
            <img src={SemNome} className='w-8 sm:w-14 lg:w-16  h-8 sm:h-14 lg:h-16' alt='SemNome' />
            <img src={TopImg} className='h-[47px] sm:h-[60px] lg:h-[93px]' alt='TopImg' />
          </div>
          <div className='flex flex-col items-center lg:pl-9 lg:pr-[35px] text-center'>
            <div className='flex flex-col w-full'>
              <p className='text-3xl text-black font-bold px-[38px] lg:mt-[45px]'>Inscrever-se</p>
              <p className='px-4 gap-[21px] mt-[21px] text-black font-medium text-[15px] sm:text-lg'>
              Tenha acesso a um modo de dieta completo especialmente para você e seus padrões
              </p>
              <Form className='flex flex-col gap-5 lg:gap-[26px] w-full mt-[10px] sm:mt-[43px]' onSubmit={handleRegister} ref={form}>
                <Input
                  placeholder='Escreva seu nome completo'
                  className='w-full bg-[#F1F4FF] rounded-[5px] sm:rounded-[10px] border-2 border-blue-600 hover:border-cyan-500 p-4 text-[#626262] text-base font-medium h-[45px] lg:h-auto cursor-pointer'
                  name='name'
                  onChange={onChangeName}
                  validations={[nameRequired]}
                />

                <Input
                  placeholder='Digite seu e-mail'
                  className='w-full bg-[#F1F4FF] rounded-[5px] sm:rounded-[10px] border-blue-600 hover:border-cyan-500 border-2 p-4 text-[#626262] text-base font-medium h-[45px] lg:h-auto cursor-pointer'
                  name='email'
                  onChange={onChangeEmail}
                  validations={[emailRequired]}
                />
                <Input
                  type='password'
                  className='w-full bg-[#F1F4FF] rounded-[5px] sm:rounded-[10px] border-blue-600   hover:border-cyan-500 border-2 p-4 text-[#626262] text-base font-medium h-[45px] lg:h-auto cursor-pointer'
                  placeholder='Digite a senha'
                  name='password'
                  onChange={onChangePassword}
                  validations={[passwordRequired]}
                />
                <Input
                  type='password'
                  className='w-full bg-[#F1F4FF] rounded-[5px] sm:rounded-[10px] border-blue-600 hover:border-cyan-500 border-2 p-4 text-[#626262] text-base font-medium h-[45px] lg:h-auto cursor-pointer'
                  placeholder='Confirme sua senha'
                  name='password2'
                  onChange={onChangePassword2}
                />

                <div className='flex flex-col w-full mt-3'>
                  <button
                    className='bg-[#006B99] opacity-75 text-white text-xl px-5 py-[6px] sm:py-4 rounded-[10px] font-semibold shadow-[0_10px_20px_0px_rgba(203,214,255,0)] border-cyan-500 border-2 hover:bg-white hover:text-[#0095ff]'
                    type='submit'
                  >
                    Inscrever-se
                  </button>
                </div>
                {message && (
                  <div className='form-group'>
                    <div className='bg-red-500 text-white p-3 rounded-lg shadow-md'>{message}</div>
                  </div>
                )}
                <CheckButton style={{ display: 'none' }} ref={checkBtn} />
              </Form>
            </div>
            <div className='flex flex-col mt-[18px] sm:mt-[30px] mb-[30px] sm:mb-[62px] w-full'>
              <button
                className='bg-[#FFF] text-[#0A2FB6] px-5 py-[10px] font-semibold leading-normal text-base md:text-xl '
                onClick={Login}
              >
                Já tem uma conta
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden sm:block'>
        <img src={SignUpImg} alt='Desktop image' />
      </div>
    </div>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { register })(Register)
