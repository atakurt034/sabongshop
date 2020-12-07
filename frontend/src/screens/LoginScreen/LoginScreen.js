import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  makeStyles,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { listMyOrders } from '../../actions/orderActions'

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

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {error && <Message variant='error'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className={classes.form} noValidate>
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
