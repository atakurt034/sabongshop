import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  SvgIcon,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import FacebookIcon from '@material-ui/icons/Facebook'
import { listMyOrders } from '../../actions/orderActions'
import DividerWithText from '../../components/DividerWithText/DividerWithText'
import { useStyles } from './lsStyle'

import {
  getGoogleUserInfo,
  getFacebookUserInfo,
} from '../../actions/userActions'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'
import clsx from 'clsx'

export const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
      dispatch(listMyOrders())
    }
  }, [history, redirect, userInfo, dispatch])

  useEffect(() => {
    if (!userInfo) {
      dispatch(getGoogleUserInfo())
      dispatch(getFacebookUserInfo())
    }
    // eslint-disable-next-line
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const signInWithGoogleHandler = async (e) => {
    e.preventDefault()
    // history.push(`/api/auth/google?redirect=${redirect}`)
    window.location.href = `/api/auth/google?redirect=${redirect}`
  }
  const signInWithFacebookHandler = async (e) => {
    e.preventDefault()
    // history.push(`/api/auth/google?redirect=${redirect}`)
    window.location.href = `/api/auth/facebook?redirect=${redirect}`
  }

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />

      <div className={classes.paper}>
        <Typography
          className={classes.icon}
          gutterBottom
          component='h1'
          variant='h5'
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />{' '}
          </Avatar>{' '}
          Sign in with
        </Typography>

        <Button
          type='button'
          className={classes.button}
          onClick={signInWithGoogleHandler}
          fullWidth
          variant='contained'
          color='secondary'
          startIcon={
            <SvgIcon>
              <path d='M 2.1875 0 C 0.988281 0 0 0.988281 0 2.1875 L 0 21.8125 C 0 23.011719 0.988281 24 2.1875 24 L 21.8125 24 C 23.011719 24 24 23.011719 24 21.8125 L 24 2.1875 C 24 0.988281 23.011719 0 21.8125 0 Z M 9.1875 3.90625 L 13.59375 3.90625 L 12.1875 4.59375 L 11 4.59375 C 11.5 5.09375 12.5 5.898438 12.5 7.5 C 12.5 9.101563 11.585938 9.800781 10.6875 10.5 C 10.386719 10.800781 10.09375 11.101563 10.09375 11.5 C 10.09375 12 10.386719 12.207031 10.6875 12.40625 L 11.5 13 C 12.398438 13.800781 13.3125 14.5 13.3125 16 C 13.3125 18 11.289063 20 7.6875 20 C 4.585938 20 3.09375 18.5 3.09375 17 C 3.09375 16.199219 3.511719 15.207031 4.8125 14.40625 C 6.113281 13.605469 7.90625 13.507813 8.90625 13.40625 C 8.605469 13.007813 8.3125 12.601563 8.3125 12 C 8.3125 11.601563 8.398438 11.386719 8.5 11.1875 L 7.8125 11.1875 C 5.3125 11.289063 4 9.605469 4 7.90625 C 4 6.90625 4.507813 5.792969 5.40625 5.09375 C 6.605469 4.09375 8.085938 3.90625 9.1875 3.90625 Z M 7.90625 4.59375 C 7.304688 4.59375 6.707031 4.914063 6.40625 5.3125 C 6.007813 5.8125 5.90625 6.40625 5.90625 6.90625 C 5.90625 8.304688 6.695313 10.6875 8.59375 10.6875 C 9.09375 10.6875 9.695313 10.394531 10.09375 10.09375 C 10.59375 9.59375 10.59375 8.894531 10.59375 8.59375 C 10.59375 6.992188 9.707031 4.59375 7.90625 4.59375 Z M 17 8 L 19 8 L 19 11 L 22 11 L 22 13 L 19 13 L 19 16 L 17 16 L 17 13 L 14 13 L 14 11 L 17 11 Z M 8.90625 14.09375 C 8.707031 14.09375 7.492188 14.105469 6.59375 14.40625 C 6.09375 14.605469 4.8125 15.09375 4.8125 16.59375 C 4.8125 18.09375 6.292969 19.1875 8.59375 19.1875 C 10.695313 19.1875 11.8125 18.207031 11.8125 16.90625 C 11.8125 15.804688 11.101563 15.195313 9.5 14.09375 Z' />
            </SvgIcon>
          }
        >
          Sign in with google
        </Button>
        <Button
          onClick={signInWithFacebookHandler}
          className={clsx(classes.button, classes.facebook)}
          fullWidth
          variant='contained'
          startIcon={<FacebookIcon />}
        >
          Sign in with facebook
        </Button>
        {error && <Message variant='error'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          <DividerWithText>Or</DividerWithText>
          <TextField
            type='email'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={6}>
              <Link to='/forgot' variant='body2'>
                <Typography variant='caption'>Forgot password?</Typography>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                variant='body2'
              >
                <Typography variant='caption'>
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
