import React, { useEffect, useState } from 'react'
import PaymentIcon from '@material-ui/icons/Payment'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import NotInterestedIcon from '@material-ui/icons/NotInterested'

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
  cancelOrder,
} from '../../actions/orderActions'
import Axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CANCEL_RESET,
  ORDER_CREATE_RESET,
} from '../../constants/orderConstants'

import { updateProductStock } from '../../actions/productActions'
import { PRODUCT_DETAILS_RESET } from '../../constants/productConstants'

import Message from '../../components/Message'
import { ModalLoader } from '../../components/ModalLoader'
import { ModalMessage } from '../../components/ModalMessage'

import NumberFormat from 'react-number-format'

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

  const orderCancel = useSelector((state) => state.orderCancel)
  const { loading: loadingCancel, success: successCancel } = orderCancel

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

    if (
      !order ||
      successPay ||
      successDeliver ||
      order._id !== orderId ||
      successCancel
    ) {
      dispatch(getOrderDetails(orderId))
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_CANCEL_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
    if (successCancel) {
      if (order.orderItems) {
        order.orderItems.map((item) =>
          dispatch(updateProductStock(item.product, item.qty, 'cancel'))
        )
      }
      dispatch({ type: PRODUCT_DETAILS_RESET })
    }
  }, [
    dispatch,
    orderId,
    order,
    successPay,
    successDeliver,
    userInfo,
    history,
    successCancel,
  ])

  const successPaymentHandler = async (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  const cancelHandler = () => {
    if (
      window.confirm(
        `cancel order: ${order.orderItems.map(
          (item) => ' ' + JSON.stringify(item.name)
        )} ?`
      )
    ) {
      dispatch(cancelOrder(order))
    }
  }

  return loading ? (
    <ModalLoader />
  ) : error ? (
    <ModalMessage variant='error'>{error}</ModalMessage>
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
            {order.isDelivered && !order.isCancelled ? (
              <Container>
                <Message variant='success'>
                  Delivred On {order.deliveredAt}
                </Message>
              </Container>
            ) : order.isCancelled ? (
              <Container>
                <Message variant='error'>
                  CANCELLED on {order.cancelledAt.substring(0, 10)}
                </Message>
              </Container>
            ) : (
              <Container>
                <Message variant='warning'>Not Delivered</Message>
              </Container>
            )}
          </Grid>
          {!order.isCancelled && (
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
              {order.isPaid && !order.isCancelled ? (
                <Container>
                  <Message variant='success'>Paid On {order.paidAt}</Message>
                </Container>
              ) : (
                <Container>
                  <Message variant='warning'>Not Paid</Message>
                </Container>
              )}
            </Grid>
          )}

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
                Items Ordered
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
                          image={item.image[item.image.length - 1]}
                          alt={item.name}
                          component='img'
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Grid>
                      <Grid item md={4}>
                        {item.qty} x{' '}
                        <NumberFormat
                          prefix={'₱'}
                          thousandSeparator
                          decimalScale={2}
                          displayType='text'
                          value={item.isOnSale ? item.salePrice : item.price}
                        />{' '}
                        ={' '}
                        <NumberFormat
                          prefix={'₱'}
                          thousandSeparator
                          decimalScale={2}
                          displayType='text'
                          value={
                            item.isOnSale
                              ? item.qty * item.salePrice
                              : item.qty * item.price
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        {loadingCancel && <ModalLoader />}
        {!order.isCancelled && (
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
                      <NumberFormat
                        prefix={'₱ '}
                        thousandSeparator
                        decimalScale={2}
                        displayType='text'
                        value={order.itemsPrice}
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={6}>
                      Shipping
                    </Grid>
                    <Grid item xs={6}>
                      <NumberFormat
                        prefix={'₱ '}
                        thousandSeparator
                        decimalScale={2}
                        displayType='text'
                        value={order.shippingPrice}
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={6}>
                      Tax
                    </Grid>
                    <Grid item xs={6}>
                      <NumberFormat
                        prefix={'₱ '}
                        thousandSeparator
                        decimalScale={2}
                        displayType='text'
                        value={order.taxPrice}
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant='h6'>Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6'>
                        <NumberFormat
                          prefix={'₱ '}
                          thousandSeparator
                          decimalScale={2}
                          displayType='text'
                          value={order.totalPrice}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                  {!order.isPaid && (
                    <Grid container>
                      {loadingPay && <ModalLoader />}
                      {!sdkReady ? (
                        <ModalLoader />
                      ) : (
                        <Box mx='auto' p={2}>
                          <PayPalButton
                            currency={'PHP'}
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        </Box>
                      )}
                      <Grid
                        item
                        xs={12}
                        style={{ padding: 10, textAlign: 'center' }}
                      >
                        <Button
                          className={classes.cancel}
                          variant='contained'
                          color='secondary'
                          startIcon={<NotInterestedIcon color='error' />}
                          onClick={cancelHandler}
                        >
                          Cancel Order?
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                  <Grid container justify='center'>
                    {loadingDeliver && <ModalLoader />}
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
        )}
      </Grid>
    </>
  )
}
