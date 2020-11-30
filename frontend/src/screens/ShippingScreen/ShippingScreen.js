import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { CheckSteps } from '../../components/NavItems/Stepper'
import { saveShippingAddress } from '../../actions/cartActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const ShippingScreen = ({ history }) => {
  const classes = useStyles()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const [message, setMessage] = useState(null)
  const [errorField, setErrorField] = useState({
    address: false,
    city: false,
    postalCode: false,
    country: false,
  })

  const submitHandler = (e) => {
    e.preventDefault()
    if (!address) {
      setMessage('Fill up Address')
      setErrorField({ address: true })
    } else if (!city) {
      setMessage('Fill up City')
      setErrorField({ city: true })
    } else if (!postalCode) {
      setMessage('Fill up Postal Code')
      setErrorField({ postalCode: true })
    } else if (!country) {
      setMessage('Fill up Country')
      setErrorField({ country: true })
    } else {
      setErrorField({ ...errorField }, true)
      dispatch(saveShippingAddress({ address, city, postalCode, country }))
      history.push('/payment')
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      <CheckSteps numSteps={0} />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalShippingIcon />
          </Avatar>
          <Typography component='h1' variant='h4'>
            SHIPPING
          </Typography>
          {message && <Message variant='error'>{message}</Message>}
          {error && <Message variant='error'>{error}</Message>}
          {loading && <Loader />}

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errorField.address}
                  autoComplete='address'
                  name='address'
                  variant='outlined'
                  type='text'
                  required
                  fullWidth
                  id='address'
                  label='Address'
                  autoFocus
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={errorField.city}
                  type='text'
                  variant='outlined'
                  required
                  fullWidth
                  id='city'
                  label='City'
                  name='city'
                  autoComplete='city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorField.postalCode}
                  variant='outlined'
                  required
                  fullWidth
                  name='postalCode'
                  label='Postal Code'
                  type='text'
                  id='postalCode'
                  autoComplete='current-postalCode'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorField.country}
                  variant='outlined'
                  required
                  fullWidth
                  name='country'
                  label='Country'
                  type='text'
                  id='country'
                  autoComplete='current-password'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
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
