import React, { useState, useEffect } from 'react'
import { ListItemIcon, ListItemText, Avatar } from '@material-ui/core/'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Admin } from '../Account/Admin'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../actions/userActions'
import { listMyOrders } from '../../../actions/orderActions'
import { StyledBadge, StyledMenu, StyledMenuItem, useStyles } from './bnStyle'

import { getAvatar } from '../../../actions/userActions'
import { MyOrdersBadge } from '../Account/MyOrdersBadge'
import { StyledBadge as AvatarIcon } from '../Account/acStyle'

export const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const count = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <StyledBadge badgeContent={count} color='error'>
      <ShoppingCartIcon />
    </StyledBadge>
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

  const orderCount = []
  const orderListMy = useSelector((state) => state.orderListMy)
  const { orders } = orderListMy
  if (orders) {
    orders.map(
      (order) =>
        !order.isPaid && !order.isCancelled && orderCount.push(order._id)
    )
  }
  const count = orderCount.length

  const orderCreate = useSelector((state) => state.orderCreate)
  const { success } = orderCreate

  const orderPay = useSelector((state) => state.orderPay)
  const { success: successPay } = orderPay

  const orderCancel = useSelector((state) => state.orderCancel)
  const { success: successCancel } = orderCancel

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user || !user.name || !userInfo) {
      dispatch(getAvatar('profile'))
    } else {
      setAvatars(user.image)
    }
    if (success || successPay || successCancel) {
      dispatch(listMyOrders())
    }
  }, [dispatch, user, userInfo, success, successPay, successCancel])

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutHandler = () => {
    dispatch(logout())
    handleClose()
  }

  let link = '/login'
  if (userInfo) {
    link = '#'
  }

  const avatarIcon = (
    <AvatarIcon
      onClick={handleClick}
      overlap='circle'
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      variant={count !== 0 ? 'dot' : 'standard'}
    >
      <Avatar alt='Remy Sharp' src={avatar} className={classes.avatar} />
    </AvatarIcon>
  )

  return (
    <>
      <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
        {userInfo && user ? avatarIcon : <PersonIcon />}
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
        <StyledMenuItem onClick={handleClose}>
          <Link className={classes.link} to='/myorders'>
            <ListItemIcon>
              <MyOrdersBadge />
            </ListItemIcon>
            <ListItemText primary='Orders' />
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
