import React, { useEffect, useState } from 'react'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import PaymentIcon from '@material-ui/icons/Payment'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useStyle } from './posStyle.js'
import {
  Grid,
  CardMedia,
  Card,
  Button,
  Typography,
  Divider,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../../actions/orderActions'
import { CART_RESET } from '../../constants/cartConstants'

import {
  updateProductStock,
  listProductDetails,
} from '../../actions/productActions'
import { PRODUCT_DETAILS_RESET } from '../../constants/productConstants'

import { CheckSteps } from '../../components/NavItems/Stepper'
import Message from '../../components/Message'

export const PlaceOrderScreen = ({ history }) => {
  const classes = useStyle()
  const cart = useSelector((state) => state.cart)
  const [stock, setStock] = useState({ name: '', hasStock: true })

  //    Calculate prices

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 100).toFixed(2)
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: CART_RESET })
      if (cart.cartItems) {
        cart.cartItems.map((item) =>
          dispatch(updateProductStock(item.product, item.qty, 'placeorder'))
        )
      }
      dispatch({ type: PRODUCT_DETAILS_RESET })
      localStorage.removeItem('cartItems')
    }
    if (cart) {
      cart.cartItems.map((item) => dispatch(listProductDetails(item.product)))
    }
    if (product.countInStock === 0) {
      setStock({ name: product.name, hasStock: false })
    }
  }, [
    history,
    success,
    order,
    userInfo,
    dispatch,
    cart,
    product.countInStock,
    product.name,
  ])

  const placeOrderHandler = (params) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckSteps numSteps={2} />
      <Grid container>
        <Grid item md={8}>
          <Grid container item>
            <Grid item xs={12}>
              <Typography variant='h5'>
                <Button
                  size='large'
                  startIcon={<LocalShippingIcon fontSize='small' />}
                >
                  Shipping
                </Button>
              </Typography>
              <Typography variant='body2' component='p'>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <Button
                  size='large'
                  startIcon={<PaymentIcon fontSize='small' />}
                >
                  Payment Method
                </Button>
              </Typography>
              <Typography variant='body2' component='div'>
                <strong>Method: </strong>
                {cart.paymentMethod ? (
                  cart.paymentMethod
                ) : (
                  <Message variant='error'>
                    Please select<Link to='/payment'> Payment Method</Link>
                  </Message>
                )}
              </Typography>
              <Divider />
            </Grid>

            <Grid className={classes.orderItems} item xs={12}>
              <Typography variant='h5' align='center'>
                <ShoppingCartIcon fontSize='small' />
                Order Items
              </Typography>
              {cart.cartItems.length === 0 ? (
                <Message variant='error'>Your cart is empty</Message>
              ) : (
                <Grid container spacing={1}>
                  {cart.cartItems.map((item, index) => (
                    <Grid item key={index}>
                      <Grid container alignItems='center' spacing={1}>
                        <Grid item xs={2} md={1}>
                          <CardMedia
                            image={item.image[item.image.length - 1]}
                            alt={item.name}
                            component='img'
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item md={4}>
                          {item.qty} x ₱ {item.price} = ₱{' '}
                          {(item.qty * item.price).toFixed(2)}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container item md={4} className={classes.summaryRoot}>
          <Card raised={true} elevation={10} className={classes.card}>
            <Grid spacing={1} container className={classes.summary}>
              <Grid item xs={12}>
                <Typography align='center' variant='h5' component='h1'>
                  <Button
                    className={classes.summaryTitle}
                    size='large'
                    startIcon={<AssignmentIcon fontSize='small' />}
                  >
                    Order Summary
                  </Button>
                </Typography>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                  Items:{' '}
                </Grid>
                <Grid item xs={6}>
                  ₱ {cart.itemsPrice}
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                  Shipping:{' '}
                </Grid>
                <Grid item xs={6}>
                  ₱ {cart.shippingPrice}
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                  Tax:{' '}
                </Grid>
                <Grid item xs={6}>
                  ₱ {cart.taxPrice}
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                  Total:{' '}
                </Grid>
                <Grid item xs={6}>
                  ₱ {cart.totalPrice}
                </Grid>
              </Grid>

              <Grid container>
                {error && <Message variant='error'>{error}</Message>}
              </Grid>

              <Grid justify='center' container>
                {!stock.hasStock ? (
                  <Message variant='error'>{`${stock.name} is out of stock`}</Message>
                ) : (
                  <Button
                    className={classes.placeOrderBtn}
                    variant='contained'
                    color='primary'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
