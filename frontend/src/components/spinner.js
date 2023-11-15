import React, { Fragment } from 'react'
import spinner2 from '../assets/spinner/spinner2.gif'
export default () => (
  <Fragment>
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <img src={spinner2} style={{ width: '100px', margin: 'auto', display: 'block' }} alt='Loading...' />
    </div>
  </Fragment>
)
