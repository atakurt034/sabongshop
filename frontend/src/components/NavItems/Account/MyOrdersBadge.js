import React from 'react'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useSelector } from 'react-redux'

import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 1,
    padding: '0 1px',
  },
}))(Badge)

export const MyOrdersBadge = () => {
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

  return (
    <IconButton
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        width: 20,
      }}
      size='small'
      color={count ? 'inherit' : 'default'}
      aria-label='cart'
    >
      <StyledBadge badgeContent={count} color='error'>
        <LocalLibraryIcon />
      </StyledBadge>
    </IconButton>
  )
}
