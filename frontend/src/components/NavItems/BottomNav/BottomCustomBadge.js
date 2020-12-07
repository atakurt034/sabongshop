import React, { useState, useEffect } from 'react'
import { ListItemIcon, ListItemText, Avatar } from '@material-ui/core/'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Admin } from '../Account/Admin'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../actions/userActions'
import { StyledBadge, StyledMenu, StyledMenuItem, useStyles } from './bnStyle'

import { getAvatar } from '../../../actions/userActions'

export const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const count = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <StyledBadge badgeContent={count} color='error'>
      <Link
        style={{ textDecoration: 'none', color: 'inherit' }}
        to='/cart/:id?'
      >
        <ShoppingCartIcon />
      </Link>
    </StyledBadge>
  )
}

export const Home = () => {
  return (
    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
      <HomeIcon />
    </Link>
  )
}

export const Account = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [avatar, setAvatars] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userAvatar = useSelector((state) => state.userAvatar)
  const { user } = userAvatar

  let link = '/login'
  if (userInfo) {
    link = '#'
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    handleClose()
  }

  useEffect(() => {
    if (!user || !user.name || !userInfo) {
      dispatch(getAvatar('profile'))
    } else {
      setAvatars(user.image)
    }
  }, [dispatch, user, userInfo])

  return (
    <>
      <Link
        to={link}
        onClick={userInfo && handleClick}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {userInfo && user ? (
          <Avatar src={avatar} className={classes.avatar} />
        ) : (
          <PersonIcon />
        )}
      </Link>

      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <Link
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            to='/profile'
          >
            <ListItemIcon>
              <PersonIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </Link>
        </StyledMenuItem>
        {userInfo && userInfo.isAdmin && <Admin />}
        <StyledMenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
      </StyledMenu>
    </>
  )
}
