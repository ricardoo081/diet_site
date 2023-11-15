import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ContactInfo = () => {
  const navigate = useNavigate()
  const emailRef = useRef()
  const nameRef = useRef()
  const messageRef = useRef()
  const subjectRef = useRef()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const serviceId = 'service_nphi8pg'
    // const templateId = 'template_a8q8qbm'
    const serviceId = 'service_joqpync'
    const templateId = 'template_743nird'
    const publicKey = 'kVhhcLeFvw1UdR9qD'
    try {
      setLoading(true)
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: nameRef.current.value,
          recipient: emailRef.current.value,
          subject: subjectRef.current.value,
          message: messageRef.current.value,
        },
        publicKey
      )
      toast.success('Submetido com sucesso!', {
        position: 'top-right',
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
      navigate('/home')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-black opacity-80'>
      <div className='border-2 border-gray-700 px-5 md:px-10 py-5'>
        <form onSubmit={handleSubmit} className='flex flex-col w-[330px] md:w-[500px] gap-3'>
          <label className='text-md font-semibold text-white'>Nome</label>
          <input
            type='text'
            ref={nameRef}
            name='user_name'
            className='rounded-md h-11 hover:border-violet-500 text-bold px-4 text-lg border-none text-black'
            placeholder='Escreva seu nome completo'
          />
          <label className='text-md font-semibold text-white'>E-mail</label>
          <input
            type='email'
            name='user_email'
            ref={emailRef}
            className='rounded-md h-11 text-bold px-4 text-lg hover:border-violet-500  border-none'
            placeholder='Digite seu e-mail'
          />
          <label className='text-md font-semibold text-white'>Assunto</label>
          <input
            type='text'
            name='user_subject'
            ref={subjectRef}
            className='rounded-md h-11 text-bold px-4 text-lg hover:border-violet-500  border-none'
            placeholder='digite seu assunto'
          />
          <label className='text-md font-semibold text-white'>Mensagem</label>
          <textarea
            name='message'
            ref={messageRef}
            className='rounded-md text-bold p-4 text-lg  hover:border-violet-500  border-none h-24'
          />
          <div className='flex justify-between mt-6 items-center'>
            <Link to='/home' className='text-white hover:text-sky-500'>
            Vá para a página inicial
            </Link>
            <input
              type='submit'
              value='Send'
              className='rounded-md h-11 hover:border-violet-500 hover:text-violet-500 text-md font-semibold text-sky-500  border-2 w-20 md:w-56 cursor-pointer'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactInfo
