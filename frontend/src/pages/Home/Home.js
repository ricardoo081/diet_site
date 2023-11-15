import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo .png'
import MenuImg from '../../assets/menu.png'
import MenuImgVertical from '../../assets/menuVertical.png'
import Ellipse from '../../assets/Ellipse.png'
import Info from '../../assets/Info.png'
import LogoutIcon from '../../assets/LogoutIcon.png'
import { Link } from 'react-router-dom'
import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FeedBack from '../../components/Feedback/vFeedback'
import Fl1 from '../../assets/feedback/fl1.png'
import Fl2 from '../../assets/feedback/fl2.png'
import Fl3 from '../../assets/feedback/fl3.png'
import Fl4 from '../../assets/feedback/fl4.png'
import Fr1 from '../../assets/feedback/fr1.png'
import Fr2 from '../../assets/feedback/fr2.png'
import Fr3 from '../../assets/feedback/fr3.png'
import Fr4 from '../../assets/feedback/fr4.png'
import { loadStripe } from '@stripe/stripe-js'
import HFeedback from '../../components/Feedback/hFeedback'
import { saveData } from '../../actions/data'

const stripePromise = loadStripe(
  // 'pk_test_51O5J9XDPK7woGdAhQ2Rt0c6e8dGr1sEa5txba301ActpICDsAaHtlTA0AeuwFBdNxEAfrXm67Rw4qyU2Bo8dAjg000pkUSIdbK'
  'pk_test_51O5v9AFJBGLh519d9ehIZaf1tnyZIHirWSdXuSBCjttgI3hqA5FPDSV54iCadburDQq4ix8xpj9dIkOrMcVLnkz000HAlXRcin'
  )

const Home = ({ isAuthenticated, user, dispatch }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const [open, setOpen] = useState()
  const form = useRef()
  const checkBtn = useRef()
  const [loading, setLoading] = useState(false)

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [goal, setGoal] = useState('')
  const [gender, setGender] = useState('')
  const [amountMeal, setAmountMeal] = useState('')
  const [comments, setComments] = useState('')


  // feedback images
  const feedbackImg1 = [
    { value: Fl1, label: 'Fl1' },
    { value: Fl2, label: 'Fl2' },
    { value: Fl3, label: 'Fl3' },
    { value: Fl4, label: 'Fl4' },
  ]
  const feedbackImg2 = [
    { value: Fr1, label: 'Fr1' },
    { value: Fr2, label: 'Fr2' },
    { value: Fr3, label: 'Fr3' },
    { value: Fr4, label: 'Fr4' },
  ]

  const goalOptions = [
    { value: 'lose weight', label: 'perder peso' },
    { value: 'maintain your physique', label: 'mantenha seu físico' },
    { value: 'gain lean mass', label: 'ganhar massa magra' },
    { value: 'gain fat mass', label: 'ganhar massa gorda' },
  ]

  const amountMealOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ]
  const genderOptions = [
    { value: 'Male', label: 'Macho' },
    { value: 'Female', label: 'Fêmea' },
  ]

  const weightRequired = (value) => {
    if (!value) {
      return <div className='text-red-500 text-sm mt-1'>Este campo é obrigatório!</div>
    }
  }
  const heightRequired = (value) => {
    if (!value) {
      return <div className='text-red-500 text-sm mt-1'>Este campo é obrigatório!</div>
    }
  }

  const onChangeWeight = (e) => {
    setWeight(e.target.value)
  }

  const onChangeHeight = (e) => {
    setHeight(e.target.value)
  }

  const onChangeGender = (selectedOption) => {
    setGender(selectedOption.value)
  }

  const onChangeGoal = (selectedOption) => {
    setGoal(selectedOption.value)
  }

  const onChangeMeal = (selectedOption) => {
    setAmountMeal(selectedOption.value)
  }

  const onChangeComments = (e) => {
    setComments(e.target.value)
  }

  const handleGenerateBtn = async (e) => {
    e.preventDefault()
    form.current.validateAll()
    if (!goal && !gender && !amountMeal) {
      toast.warning('Selecione suas informações!', {
        position: 'top-right',
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
      return
    }
    setLoading(true)

    localStorage.setItem('height', JSON.stringify(height))
    localStorage.setItem('weight', JSON.stringify(weight))
    localStorage.setItem('goal', JSON.stringify(goal))
    localStorage.setItem('gender', JSON.stringify(gender))
    localStorage.setItem('amountMeal', JSON.stringify(amountMeal))
    localStorage.setItem('comments', JSON.stringify(comments))

    navigate('/checkout')
  }

  return (
    <div className='relative'>
      <div
        className='flex justify-between items-center bg-[#006B99] opacity-80 w-full h-[60px] sm:h-[100px] top-0 left-0'
        style={{ position: 'fixed', zIndex: '100' }}
      >
        <div
          className={`${
            open ? 'block' : 'hidden'
          } absolute flex-col rounded-[20px] w-[457px] h-[60rem] bg-[#064B68] opacity-90 z-10`}
          style={{ position: 'fixed', height: '100vh', zIndex: '9', top: '0' }}
        >
          <ul className='pl-12 pt-[7rem] sm:pt-48 gap-14 flex flex-col justify-between h-screen'>
            <div>
              <li className='text-white text-4xl font-semibold mb-10'>{user?.name}</li>
              <li className='text-white text-[28px] font-normal mb-2'>
                <Link to='/info'>
                  <div className='flex gap-5'>
                    <img src={Info} alt='Contact us' />
                    <p>Contate-nos</p>
                  </div>
                </Link>
              </li>
              
            </div>

          <div className='flex justify-between mb-[2rem]'>
            <li className='text-white text-[28px] font-normal'>
              <button onClick={() => dispatch(logout())}>
                <div className='flex gap-5'>
                  <img src={LogoutIcon} alt='LogOut Icon' />
                  <p>Sair</p>
                </div>
              </button>
            </li>
            <li className='min-h-3'></li>
          </div>
            
          </ul>
        </div>
        <button
          className='ml-7 flex justify-center items-center py-1 z-100'
          style={{ position: 'relative', zIndex: '165' }}
          onClick={() => setOpen(!open)}
        >
          <img src={Ellipse} alt='Ellipse' className='absolute' />
          {!open ? (
            <img src={MenuImg} alt='menu' className='w-[30px] relative' />
          ) : (
            <img src={MenuImgVertical} alt='menu' className='w-[30px] relative' />
          )}
        </button>
        <img src={Logo} alt='Logo' className='w-[45px] sm:w-[83px] w-[45px] sm:h-[83px]' />
        <div></div>
      </div>

      <div className='sm:hidden mt-[60px]'>
        <HFeedback />
      </div>
      <p className='sm:hidden text-center text-black mt-[-65px] text-[30px] font-bold mb-3'>Informação</p>
      <div className='flex flex-col lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:grid-flow-col sm:mt-[84px]'>
        <div className='hidden lg:block col-span-2 w-96 items-center mt-5 lg:ml-20 z-[-1px]'>
          <FeedBack data={feedbackImg1} />
        </div>

        <div className='col-span-3'>
          <div className='w-full px-12 sm:max-w-[867px] md:m-auto md:mt-20'>
            <Form className='flex flex-col gap-3 text-center' onSubmit={handleGenerateBtn} ref={form}>
              <p className='text-black  font-semibold text-base lg:text-lg'>Peso (lb)</p>
              <Input
                name='weight'
                className='w-full bg-[#F1F4FF] rounded border-2 focus:outline-[#0095ff] focus:bg-sky-100 p-4 text-[#626262] text-base text-center font-medium h-[42px] md:h-[36px]'
                placeholder='Ex: 165'
                value={weight}
                validations={[weightRequired]}
                onChange={onChangeWeight}
              />
              <p className='text-black font-semibold text-base lg:text-lg'>Altura (M)</p>
              <Input
                name='height'
                className='w-full bg-[#F1F4FF] rounded border-2 text-center focus:outline-[#0095ff] focus:bg-sky-100 p-4 text-[#626262] text-base font-medium h-[42px] md:h-[36px]'
                placeholder='Ex: 1.70'
                value={height}
                validations={[heightRequired]}
                onChange={onChangeHeight}
              />
              <p className='text-black  font-semibold text-base lg:text-lg'>Meta</p>
              <Select options={goalOptions} onChange={onChangeGoal} placeholder='Selecione sua meta'/>
              <p className='text-black  font-semibold text-base lg:text-lg'>Quantidade de refeição</p>
              <Select options={amountMealOptions} onChange={onChangeMeal} placeholder='Selecione sua quantidade de refeição.' />
              <p className='text-black  font-semibold text-base lg:text-lg'>Gênero</p>
              <Select options={genderOptions} onChange={onChangeGender} placeholder='Selecione o seu sexo'/>
              <p className='text-black font-semibold text-base lg:text-lg'>Comentários</p>
              <textarea
                type='text'
                multiline={'comments'}
                name='comments'
                onChange={onChangeComments}
                className='bg-[#F1F4FF] rounded-[10px] border-2 border-[#0095ff] border-solid focus:outline-[#0095ff] p-5 text-[#626262] text-left text-base font-medium h-32'
                placeholder="Ex: I don't like fish, coffee. I have lactose intolerance, I like lots of eggs, chicken, rice..."
              />
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='w-72 sm:w-[357px] bg-[#006B99] px-[15px] text-xl py-2 sm:py-4 mb-8 sm:mb-0 rounded-[10px] text-white font-semibold mt-2 sm:mt-6 border-cyan-500 border-2 hover:bg-white hover:text-[#0095ff]'
                >
                  Gerar Dieta
                </button>
              </div>
              <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </Form>
          </div>
        </div>

        <div className='hidden lg:block  col-span-2 w-96 items-center mt-5 lg:ml-20 z-[-1px]'>
          <FeedBack data={feedbackImg2} />
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps)(Home)
