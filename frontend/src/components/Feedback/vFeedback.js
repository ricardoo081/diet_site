import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const VerticalMode = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  }
  return (
    <div>
      {data && (
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index}>
              <img src={item.value} alt={item.label} className='w-[250px] lg:w-[300px]' />
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}
export default VerticalMode
