import React, { useState, useEffect } from 'react'
import AccountCircle from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/Save'
import CircularProgress from '@material-ui/core/CircularProgress'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import clsx from 'clsx'

import { TableOrders } from './TableOrders'
import { useStyles } from './psStyle'
import {
  FormControl,
  Button,
  Grid,
  Input,
  InputLabel,
  InputAdornment,
  Box,
  Container,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

export const ProfileScreen = ({ location, history }) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const [loadingBtn, setLoading] = useState(false)
  const [successBtn, setSuccess] = useState(false)
  const [errorBtn, setErrorBtn] = useState(null)
  const timer = React.useRef()

  console.log(errorBtn)

  const buttonClassname = clsx({
    [classes.buttonSuccess]: successBtn,
    [classes.error]: errorBtn === true,
  })

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setErrorBtn(true)
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const handleButtonClick = () => {
    if (!loadingBtn) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 2000)
    }
    if (!error && password === confirmPassword) {
      timer.current = window.setTimeout(() => {
        setErrorBtn(false)
      }, 2000)
    } else {
      timer.current = window.setTimeout(() => {
        setErrorBtn(true)
      }, 2000)
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <Container children>
            <h2>User Profile</h2>
            {errorBtn === true && <Message variant='error'>{message}</Message>}
            {error && <Message variant='error'>{error}</Message>}
            {success && <Message variant='error'>Profile Updated</Message>}
            {loading && <Loader />}

            <form onSubmit={submitHandler}>
              <FormControl fullWidth required>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <Input
                  required
                  type='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id='name'
                  startAdornment={
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl required fullWidth>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <Input
                  required
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  startAdornment={
                    <InputAdornment position='start'>
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  startAdornment={
                    <InputAdornment position='start'>
                      <LockOpenIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor='confirmPassword'>
                  confirmPassword
                </InputLabel>
                <Input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id='confirmPassword'
                  startAdornment={
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box justifyContent='center' display='flex' p={2}>
                <div className={classes.wrapper}>
                  <Button
                    className={buttonClassname}
                    startIcon={
                      errorBtn === null ? (
                        <SaveIcon />
                      ) : errorBtn === true ? (
                        <NotInterestedIcon />
                      ) : (
                        <CheckIcon />
                      )
                    }
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={loading}
                    onClick={handleButtonClick}
                  >
                    {success ? 'UPDATED' : 'UPDATE'}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
            </form>
          </Container>
        </Grid>
        <Grid item xs={12} sm={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='error'>{errorOrders}</Message>
          ) : (
            <TableOrders />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default ProfileScreen
