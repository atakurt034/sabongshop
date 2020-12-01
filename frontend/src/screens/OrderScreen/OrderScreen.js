import React, { useEffect, useState } from 'react'
import PaymentIcon from '@material-ui/icons/Payment'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import { useStyle } from './osStyle'
import {
  Grid,
  CardMedia,
  Card,
  Button,
  Typography,
  Box,
  Container,
  Divider,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../../actions/orderActions'
import Axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

export const OrderScreen = ({ match, history }) => {
  const classes = useStyle()

  const [sdkReady, setSdkReady] = useState(false)

  const orderId = match.params.id

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  if (!loading) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await Axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=PHP`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, order, successPay, successDeliver, userInfo, history])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='error'>{error}</Message>
  ) : (
    <>
      <Typography
        className={classes.title}
        variant='h4'
        component='h1'
        gutterBottom
      >
        Order No: {order._id}
      </Typography>
      <Grid spacing={1} container>
        <Grid spacing={2} item container md={8}>
          <Grid item xs={12}>
            <Box className={classes.box}>
              <Box alignItems='center' display='flex' mr={1}>
                <LocalShippingIcon />
              </Box>
              <Typography
                className={classes.title}
                variant='h5'
                component='span'
              >
                {'Shipping'}
              </Typography>
            </Box>
            <Typography>
              <strong>Name: </strong> {order.user.name}
            </Typography>
            <Typography>
              <strong>Email: </strong>{' '}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </Typography>
            <Typography>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </Typography>
            {order.isDelivered ? (
              <Container>
                <Message variant='success'>
                  Delivred On {order.deliveredAt}
                </Message>
              </Container>
            ) : (
              <Container>
                <Message variant='warning'>Not Delivered</Message>
              </Container>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Box className={classes.box}>
              <Box alignItems='center' display='flex' mr={1}>
                <PaymentIcon />
              </Box>
              <Typography
                className={classes.title}
                variant='h5'
                component='span'
              >
                Payment Method
              </Typography>
            </Box>
            <Typography>
              <strong>Method: </strong>
              {order.paymentMethod}
            </Typography>
            {order.isPaid ? (
              <Container>
                <Message variant='success'>Paid On {order.paidAt}</Message>
              </Container>
            ) : (
              <Container>
                <Message variant='warning'>Not Paid</Message>
              </Container>
            )}
          </Grid>

          <Grid item>
            <Divider />
            <Box className={classes.box}>
              <Box alignItems='center' display='flex' mr={1}>
                <ShoppingCartIcon />
              </Box>
              <Typography
                className={classes.title}
                variant='h5'
                component='span'
              >
                Order Items
              </Typography>
            </Box>
            {order.orderItems.length === 0 ? (
              <Message variant='error'>Your cart is empty</Message>
            ) : (
              <Grid container>
                {order.orderItems.map((item, index) => (
                  <Grid item key={index}>
                    <Grid
                      container
                      alignItems='center'
                      spacing={1}
                      className={classes.items}
                    >
                      <Grid item xs={2} md={1}>
                        <CardMedia
                          image={item.image}
                          alt={item.name}
                          component='img'
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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
        <Grid container className={classes.summaryRoot} item md={4}>
          <Container maxWidth='md'>
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
                    Items
                  </Grid>
                  <Grid item xs={6}>
                    ₱ {order.itemsPrice}
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6}>
                    Shipping
                  </Grid>
                  <Grid item xs={6}>
                    ₱ {order.shippingPrice}
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6}>
                    Tax
                  </Grid>
                  <Grid item xs={6}>
                    ₱ {order.taxPrice}
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='h6'>Total</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h6'>₱ {order.totalPrice}</Typography>
                  </Grid>
                </Grid>
                {!order.isPaid && (
                  <Grid container>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <Box mx='auto' p={2}>
                        <PayPalButton
                          currency={'PHP'}
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </Box>
                    )}
                  </Grid>
                )}
                <Grid container justify='center'>
                  {loadingDeliver && <Loader />}
                </Grid>
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <Grid container justify='center' style={{ padding: 10 }}>
                      <Button
                        variant='contained'
                        startIcon={<LocalShippingIcon />}
                        onClick={deliverHandler}
                      >
                        Mark as delivered
                      </Button>
                    </Grid>
                  )}
              </Grid>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}
