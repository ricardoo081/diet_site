import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DietDoc } from '../../components/PdfDownload'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import { toast } from 'react-toastify'
import Logo from '../../assets/logo .png'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AuthService from '../../actions/auth'


const DietResult = ({ isAuthenticated, user, dispatch }) => {
  const [status, setStatus] = useState(null)
  const [open, setOpen] = useState()
  const [customerEmail, setCustomerEmail] = useState('')
  const navigate = useNavigate()
  const [dietResult, setDietResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(true)
  const weight = JSON.parse(localStorage.getItem('weight'))
  const height = JSON.parse(localStorage.getItem('height'))
  const goal = JSON.parse(localStorage.getItem('goal'))
  const gender = JSON.parse(localStorage.getItem('gender'))
  const amountMeal = JSON.parse(localStorage.getItem('amountMeal'))
  const comments = JSON.parse(localStorage.getItem('comments'))

  const generateDiet = async () => {
    try {
      const response = await AuthService.generateDiet(weight, height, goal, amountMeal, gender, comments)
      if (response.error) {
        toast.warning('Os dados são necessários!', {
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
      }
      if (response.body && response.body.getReader) {
        const reader = response.body.getReader()
        let output = ''

        while (true) {
          const { value, done } = await reader.read()

          if (done) {
            toast.success('Dieta gerada com sucesso!', {
              position: 'top-right',
              autoClose: 1300,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            })
            setDisabledBtn(false)
            break
          }

          const str = new TextDecoder().decode(value)
          output += str
          setDietResult(output)
        }
      } else {
        setLoading(false)
        console.error('A resposta não é um fluxo')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get('session_id')

    fetch(`http://koglim.com/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
      })
  }, [])

  useEffect(() => {
    if (status === 'complete') generateDiet()
  }, [status])
  const downloadPdf = async () => {
    const dietDoc = <DietDoc content={dietResult} />
    const blob = await pdf(dietDoc).toBlob()
    saveAs(blob, 'Diet.pdf')
    // toast.success('Successfully downloaded!', {
    //   position: 'top-right',
    //   autoClose: 1300,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: 'colored',
    // })
    navigate('/home')
  }

  if (status === 'open') {
    navigate('/checkout')
  }
  return (
    <div>
      <div className='flex justify-center items-center bg-[#006B99] opacity-80 w-full h-[60px] sm:h-[100px]'>
        <div><img src={Logo} alt='Logo' className='w-[45px] sm:w-[83px] h-[45px] sm:h-[83px]' /></div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-center px-0 lg:px-10 pt-4 md:pt-[50px] pb-[3px]'>
          {status === 'complete' ? (
            <div className='p-2 lg:p-5 border-violet-300 border-2 overflow-auto rounded-xl h-[31rem] sm:h-[43rem] w-[23rem] sm:w-[30rem] lg:w-[60rem] shadow-2xl bg-cyan-50'>
              <pre className='text-left text-xs sm:text-[17px] text-black font-medium whitespace-break-spaces'>
                {dietResult}
              </pre>
            </div>
          ) : null}
        </div>
        <div className='flex justify-center items-end'>
          <button
            type='submit'
            className={'disabled:bg-gray bg-[#006B99] w-72 md:w-[357px] px-[15px] text-xl py-2 sm:py-4 rounded-[10px] text-white font-semibold mt-6 border-cyan-500 border-2 hover:bg-white hover:text-[#0095ff]'}
            onClick={downloadPdf}
            disabled={disabledBtn}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

DietResult.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps)(DietResult)
