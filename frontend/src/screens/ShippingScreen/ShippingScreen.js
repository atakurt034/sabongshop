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

  const [inputs, setInputs] = useState({
    address: shippingAddress.address ? shippingAddress.address : '',
    city: shippingAddress.city ? shippingAddress.city : '',
    postalCode: shippingAddress.postalCode ? shippingAddress.postalCode : '',
    country: shippingAddress.country ? shippingAddress.country : '',
  })

  const { address, city, postalCode, country } = inputs

  const inputHandler = (input) => (event) => {
    setInputs({ ...inputs, [input]: event.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
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
            <LocalShippingIcon color='action' />
          </Avatar>
          <Typography component='h1' variant='h4'>
            SHIPPING
          </Typography>
          {error && <Message variant='error'>{error}</Message>}
          {loading && <Loader />}

          <form onSubmit={submitHandler} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  aria-invalid={!address}
                  error={!address}
                  name='address'
                  variant='outlined'
                  type='text'
                  fullWidth
                  required
                  id='address'
                  label='Address'
                  autoFocus
                  value={address}
                  onChange={inputHandler('address')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  aria-invalid={!city}
                  required
                  error={!city}
                  type='text'
                  variant='outlined'
                  fullWidth
                  id='city'
                  label='City'
                  name='city'
                  value={city}
                  onChange={inputHandler('city')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!postalCode}
                  variant='outlined'
                  required
                  fullWidth
                  name='postalCode'
                  label='Postal Code'
                  type='text'
                  id='postalCode'
                  value={postalCode}
                  onChange={inputHandler('postalCode')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!country}
                  variant='outlined'
                  required
                  fullWidth
                  name='country'
                  label='Country'
                  type='text'
                  id='country'
                  value={country}
                  onChange={inputHandler('country')}
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
