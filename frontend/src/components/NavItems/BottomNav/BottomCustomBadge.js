import React, { useState } from 'react'
import {
  Badge,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Admin } from '../Account/Admin'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../actions/userActions'

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

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  let link = '/login'
  if (userInfo) {
    link = '#'
  }

  let anchorOriginSettings = {
    vertical: 'bottom',
    horizontal: 'center',
  }

  let transformOriginSettings = {
    vertical: 'top',
    horizontal: 'center',
  }

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={anchorOriginSettings}
      transformOrigin={transformOriginSettings}
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