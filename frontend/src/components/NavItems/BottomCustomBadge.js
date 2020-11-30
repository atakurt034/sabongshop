import React, { useState } from 'react'
import {
  Badge,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import InboxIcon from '@material-ui/icons/MoveToInbox'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/userActions'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 1,
    padding: '0 1px',
  },
}))(Badge)

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
  const [anchorEl, setAnchorEl] = useState(null)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let link = '/login'
  if (userInfo) {
    link = '#'
  }

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ))

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem)

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

  return (
    <>
      <Link
        to={link}
        onClick={userInfo && handleClick}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <PersonIcon fontSize='small' />
      </Link>

      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </StyledMenuItem>
        <StyledMenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <InboxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Inbox' />
        </StyledMenuItem>
      </StyledMenu>
    </>
  )
}
