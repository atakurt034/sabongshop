import React, { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../../actions/productActions'
import { Box, CardMedia, Grid, Typography, Paper } from '@material-ui/core'
import Message from '../Message'
import { ModalLoader } from '../ModalLoader'
import { Link } from 'react-router-dom'
import { useStyles } from './hsStyle'
import './slickStyle.css'

import { textSale } from '../TextSale'
import NumberFormat from 'react-number-format'

export const CustomSlide = ({
  image,
  name,
  id,
  price,
  salePrice,
  isOnSale,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Grid container justify='center' {...props}>
      <Grid className={classes.item} item xs={8} sm={4}>
        <Link className={classes.link} to={`/product/${id}`}>
          <CardMedia
            className={classes.image}
            image={image}
            alt={name}
            component='img'
          />
          <Typography variant='h5'>{name}</Typography>
          <Typography variant='h6'>
            {isOnSale ? (
              textSale(price, salePrice)
            ) : (
              <NumberFormat
                prefix={'₱ '}
                readOnly
                thousandSeparator
                decimalScale={2}
                displayType='text'
                value={price}
              />
            )}
          </Typography>
        </Link>
      </Grid>
    </Grid>
  )
}

export const HomeSlider = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    arrows: false,
    fade: true,
  }

  return (
    <div>
      {loading ? (
        <ModalLoader />
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : (
        <>
          <Grid container justify='center'>
            <Paper className={classes.paper}>
              <Typography align='center' variant='h4' className={classes.title}>
                TOP PRODUCTS
              </Typography>
              <Slider {...settings}>
                {products.map((product) => {
                  return (
                    <Box key={product._id} p={2}>
                      <CustomSlide
                        image={product.image[product.image.length - 1]}
                        name={product.name}
                        id={product._id}
                        price={product.price}
                        isOnSale={product.isOnSale}
                        salePrice={product.salePrice}
                      />
                    </Box>
                  )
                })}
              </Slider>
            </Paper>
          </Grid>
        </>
      )}
    </div>
  )
}
