import React, { useState, useEffect } from 'react'

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
  OutlinedInput,
  Avatar,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import {
  getUserDetails,
  updateUserProfile,
  getAvatar,
} from '../../actions/userActions'
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

  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const [loadingBtn, setLoading] = useState(false)
  const [successBtn, setSuccess] = useState(false)
  const [errorBtn, setErrorBtn] = useState(null)
  const timer = React.useRef()

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
        dispatch(getAvatar('profile'))
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setImage(user.image)
        setEmail(user.email)
        if (!error && password === confirmPassword && success)
          setErrorBtn(false)
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    user,
    success,
    error,
    confirmPassword,
    password,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setErrorBtn(true)
    } else {
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
          setPassword('')
          setConfirmPassword('')
        }, 2000)
      } else {
        if (!name || !email) {
          timer.current = window.setTimeout(() => {
            setErrorBtn(true)
          }, 2000)
        }
      }
      dispatch(
        updateUserProfile({ id: user._id, name, image, email, password })
      )
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload/avatar', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
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
              <Box m={2}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='image' variant='outlined'>
                    Image
                  </InputLabel>
                  <OutlinedInput
                    id='image'
                    value={image}
                    labelWidth={50}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <Grid container justify='center'>
                    <input
                      accept='image/*'
                      multiple
                      style={{ display: 'none' }}
                      id='contained-button-file'
                      type='file'
                      onChange={uploadFileHandler}
                    />
                    <Box p={2}>
                      <label htmlFor='contained-button-file'>
                        <Button
                          variant='contained'
                          color='primary'
                          component='span'
                          size='small'
                          startIcon={<CloudUploadIcon fontSize='small' />}
                        >
                          {'Upload'}
                        </Button>
                      </label>
                    </Box>
                  </Grid>
                  {uploading && <Loader />}
                </FormControl>
              </Box>

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
                      <Avatar style={{ width: 20, height: 20 }} src={image} />
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
                  >
                    {errorBtn === null
                      ? 'UPDATE'
                      : errorBtn === true
                      ? 'ERROR'
                      : 'UPDATED'}
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
          <h2>My Order History</h2>
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
