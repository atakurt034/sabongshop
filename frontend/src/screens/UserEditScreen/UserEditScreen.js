import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  CardMedia,
} from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import NotInterestedIcon from '@material-ui/icons/NotInterested'

import {
  USER_UPDATE_RESET,
  USER_UPDATE_PROFILE_RESET,
} from '../../constants/userConstants'
import {
  getUserDetails,
  updateUser,
  updateUserProfile,
} from '../../actions/userActions'

import { ModalMessage } from '../../components/ModalMessage'
import { ModalLoader } from '../../components/ModalLoader'
import { BackButton } from '../../components/NavItems/BackButton'

export const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [image, setImage] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(updateUserProfile({ name, email }))
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setImage(user.image)
      }
    }
  }, [dispatch, user, userId, successUpdate, history, name, email])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <Container maxWidth='sm'>
      <h2>Edit User</h2>
      <BackButton to={'/admin/userlist'} />
      {loadingUpdate && <ModalLoader />}
      {errorUpdate && (
        <ModalMessage variant='error'>{errorUpdate}</ModalMessage>
      )}
      {loading ? (
        <ModalLoader />
      ) : error ? (
        <ModalMessage variant='error'>{error}</ModalMessage>
      ) : (
        <Container maxWidth='sm'>
          <Paper style={{ padding: 25 }}>
            <CardMedia
              image={image}
              component='img'
              style={{
                borderRadius: '100%',
                width: '50%',
                padding: 10,
                margin: 'auto',
              }}
            />
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

              <Box py={2} display='flex'>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      icon={<NotInterestedIcon color='secondary' />}
                      checkedIcon={
                        <CheckCircleIcon
                          style={{
                            color: 'green',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                          }}
                        />
                      }
                      name='isAdmin'
                    />
                  }
                  label='Admin?'
                />
              </Box>

              <Box justifyContent='center' display='flex' p={2}>
                <div>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={loading}
                  >
                    UPDATE
                  </Button>
                </div>
              </Box>
            </form>
          </Paper>
        </Container>
      )}
    </Container>
  )
}
