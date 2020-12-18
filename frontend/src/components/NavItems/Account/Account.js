import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useStyles, StyledBadge } from './acStyle'
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
  Avatar,
} from '@material-ui/core'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { MyOrdersBadge } from './MyOrdersBadge'

import { Admin } from './Admin'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../actions/userActions'
import { listMyOrders } from '../../../actions/orderActions'

import { getAvatar } from '../../../actions/userActions'

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

export const Account = (e) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [avatar, setAvatars] = useState('')
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles()

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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userAvatar = useSelector((state) => state.userAvatar)
  const { user } = userAvatar

  const orderCreate = useSelector((state) => state.orderCreate)
  const { success } = orderCreate

  const orderPay = useSelector((state) => state.orderPay)
  const { success: successPay } = orderPay

  const orderCancel = useSelector((state) => state.orderCancel)
  const { success: successCancel } = orderCancel

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutHandler = () => {
    dispatch(logout())
    handleClose()
  }
  let size = 'small'
  if (sm) {
    size = 'large'
  }
  const avatarIcon = (
    <StyledBadge
      overlap='circle'
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant={count !== 0 ? 'dot' : 'standard'}
    >
      <Avatar alt={user.name} src={avatar} className={classes.avatar} />
    </StyledBadge>
  )

  const logged = (
    <>
      <Link className={classes.link} to='/login'>
        <Button
          variant='contained'
          disableElevation
          color='primary'
          onClick={userInfo && handleClick}
          size='small'
          startIcon={
            userInfo && user ? avatarIcon : <PersonIcon fontSize={size} />
          }
          endIcon={userInfo && <ArrowDropDownIcon />}
        >
          <Typography variant='caption'>
            {userInfo ? (
              userInfo.name.split(' ')[0]
            ) : (
              <Typography style={{ fontWeight: 600 }} variant='caption'>
                LOGIN
              </Typography>
            )}
          </Typography>
        </Button>
      </Link>

      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <Link className={classes.link} to='/profile'>
            <ListItemIcon>
              <PersonIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </Link>
        </StyledMenuItem>
        {userInfo && userInfo.isAdmin && <Admin />}
        <StyledMenuItem onClick={handleClose}>
          <Link className={classes.link} to='/myorders'>
            <ListItemIcon>
              <MyOrdersBadge />
            </ListItemIcon>
            <ListItemText primary='Orders' />
          </Link>
        </StyledMenuItem>
        <StyledMenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
      </StyledMenu>
    </>
  )

  return logged
}
