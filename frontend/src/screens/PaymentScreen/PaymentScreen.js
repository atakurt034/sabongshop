import React, { useState } from 'react'
import PaymentIcon from '@material-ui/icons/Payment'
import {
  FormControl,
  Button,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  makeStyles,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartActions'

import { CheckSteps } from '../../components/NavItems/Stepper'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'yellow',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: '15px auto',
    width: '65%',
  },
}))

export const PaymentScreen = ({ history }) => {
  const classes = useStyles()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const dispatch = useDispatch()

  const changeHandler = (e) => {
    setPaymentMethod(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <>
      <CheckSteps numSteps={1} />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PaymentIcon color='action' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            PAYMENT METHOD
          </Typography>
          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'></FormLabel>
                  <RadioGroup
                    aria-label='gender'
                    name='gender1'
                    value={paymentMethod}
                    onChange={changeHandler}
                  >
                    <FormControlLabel
                      value='PayPal'
                      control={<Radio />}
                      label='PayPal / Credit Card'
                    />
                    <FormControlLabel
                      value='Gcash'
                      control={<Radio />}
                      label='Gcash'
                    />
                    <FormControlLabel
                      value='other'
                      control={<Radio />}
                      label='Other'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Continue
            </Button>
          </form>
        </div>
      </Container>
    </>
  )
}
