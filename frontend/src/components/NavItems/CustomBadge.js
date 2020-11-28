import React from 'react'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 1,
    padding: '0 1px',
  },
}))(Badge)

export default function CustomizedBadges({ cart }) {
  return (
    <IconButton
      style={{ margin: '0 5px' }}
      size='small'
      color='inherit'
      aria-label='cart'
    >
      <StyledBadge badgeContent={cart} color='error'>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  )
}
