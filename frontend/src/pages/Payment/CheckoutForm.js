import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
// import Spinner from '../../components/spinner'
import { Spinner } from 'flowbite-react';
const stripePromise = loadStripe(
  // 'pk_test_51O5J9XDPK7woGdAhQ2Rt0c6e8dGr1sEa5txba301ActpICDsAaHtlTA0AeuwFBdNxEAfrXm67Rw4qyU2Bo8dAjg000pkUSIdbK'
  'pk_test_51O5v9AFJBGLh519d9ehIZaf1tnyZIHirWSdXuSBCjttgI3hqA5FPDSV54iCadburDQq4ix8xpj9dIkOrMcVLnkz000HAlXRcin'
)

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Create a Checkout Session as soon as the page loads
    fetch('http://koglim.com/create-checkout-session', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setClientSecret(data.clientSecret)
      })
  }, [])

  return (
    <div id='checkout' className='mt-16'>
      {loading ? ( 
        <div className='absolute top-1/2 left-1/2'>
          <Spinner />
        </div>
      ) : (
        <>
          {' '}
          {clientSecret && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </>
      )}
    </div>
  )
}

export default CheckoutForm
