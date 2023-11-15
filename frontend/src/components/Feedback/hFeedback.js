import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Fl1 from '../../assets/feedback/fl1.png'
import Fl2 from '../../assets/feedback/fl2.png'
import Fl3 from '../../assets/feedback/fl3.png'
import Fl4 from '../../assets/feedback/fl4.png'
import Fr1 from '../../assets/feedback/fr1.png'
import Fr2 from '../../assets/feedback/fr2.png'
import Fr3 from '../../assets/feedback/fr3.png'
import Fr4 from '../../assets/feedback/fr4.png'

const HFeedback = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    horizontal: true,
    horizontalSwiping: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  }
  const feedbackImg = [
    { value: Fl1, label: 'Fl1' },
    { value: Fl2, label: 'Fl2' },
    { value: Fl3, label: 'Fl3' },
    { value: Fl4, label: 'Fl4' },
    { value: Fr1, label: 'Fr1' },
    { value: Fr2, label: 'Fr2' },
    { value: Fr3, label: 'Fr3' },
    { value: Fr4, label: 'Fr4' },
  ]
  return (
    <div>
      <Slider {...settings}>
        {feedbackImg.map((item, index) => (
          <div key={index}>
            <img src={item.value} alt={item.label} className='w-[230px] h-56' />
          </div>
        ))}
      </Slider>
    </div>
  )
}
export default HFeedback
