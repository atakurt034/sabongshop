import { Box, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import './psStyle.css'

export const ProductSlider = ({ image }) => {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const [slider1, setSlider1] = useState(null)
  const [slider2, setSlider2] = useState(null)
  const [images, setImages] = useState([])

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
    if (image) {
      setImages(image)
    }
  }, [slider1, slider2, image])

  let newImg = images.concat()
  newImg.reverse()

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  }
  const settingsThumbs = {
    slidesToShow: images.length !== 2 ? images.length - 1 : images.length,
    slidesToScroll: 1,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true,
    centerPadding: '10px',
  }

  return (
    <Grid container className='slider-wrapper'>
      <Grid item xs={12}>
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {newImg.map((img) => (
            <div key={img}>
              <img className='slider-image' src={img} alt={img} />
            </div>
          ))}
        </Slider>
      </Grid>
      {images.length !== 1 && (
        <Grid item xs={12}>
          <div className='thumbnail-slider-wrap'>
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={(slider) => setSlider2(slider)}
            >
              {newImg.map((img) => (
                <Box className='box' key={img}>
                  <img className='slick-slide-image' src={img} alt={img} />
                </Box>
              ))}
            </Slider>
          </div>
        </Grid>
      )}
    </Grid>
  )
}
