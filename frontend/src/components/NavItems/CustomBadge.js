import React from 'react'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 1,
    padding: '0 1px',
  },
}))(Badge)

export default function CustomizedBadges() {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const count = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <IconButton
      style={{ margin: '0 5px' }}
      size='small'
      color={count ? 'inherit' : 'default'}
      aria-label='cart'
    >
      <StyledBadge badgeContent={count} color='error'>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to='/cart/:id?'
        >
          <ShoppingCartIcon />
        </Link>
      </StyledBadge>
    </IconButton>
  )
}
