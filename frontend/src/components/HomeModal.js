import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { withRouter } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import { listSaleProducts } from '../actions/productActions'
import { ModalLoader } from './ModalLoader'
import { ModalMessage } from './ModalMessage'
import Slider from 'react-slick'

import { CustomSlide } from './Sliders/HomeSlider'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '80%',
    height: '80vh',
  },
  button: {
    textAlign: 'right',
    cursor: 'pointer',
  },
  saleText: {
    textAlign: 'center',
    padding: 10,
    margin: 10,
    color: 'red',
    fontWeight: 900,
  },
  text: {
    textAlign: 'center',
  },
  title: {
    color: 'red',
  },
  closeButton: {
    zIndex: 100,
    position: 'relative',
    padding: 10,
    margin: '0 5px',
    float: 'right',
    fontWeight: 600,
    '&:hover': {
      color: 'red',
    },
  },
}))

const HomeModal = ({ match }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const key = 'modalState'

  const productSale = useSelector((state) => state.productSale)
  const { products, loading, error } = productSale

  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  function setWithExpiry(key, value, ttl) {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  const handleClose = () => {
    setOpen(false)
  }

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

  const modalState = getWithExpiry(key)
  const dispatch = useDispatch()

  useEffect(() => {
    if (match.url === '/') {
      if (modalState === null) {
        setOpen(true)
      }
    }
    if (open) {
      setWithExpiry(key, false, 3600000)
    }
    if (
      (Storage !== 'undefined' && modalState !== 'undefined') ||
      modalState !== null
    ) {
      if (modalState === false) {
        setOpen(false)
      }
    }
  }, [match, open, modalState, dispatch])

  useEffect(() => {
    dispatch(listSaleProducts())
  }, [dispatch])

  const clickHandler = (params) => {
    setOpen(false)
  }

  return (
    <>
      {loading ? (
        <ModalLoader />
      ) : error ? (
        <ModalMessage variant='error'>{error}</ModalMessage>
      ) : (
        <Container>
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Grid container justify='center'>
                <Paper className={classes.paper}>
                  <IconButton
                    className={classes.closeButton}
                    onClick={clickHandler}
                  >
                    X
                  </IconButton>
                  <Typography
                    align='center'
                    variant='h4'
                    className={classes.title}
                  >
                    ON SALE
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
            </Fade>
          </Modal>
        </Container>
      )}
    </>
  )
}

export default withRouter(HomeModal)
