import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'

export const Account = () => {
  return (
    <IconButton style={{ height: '55px' }} color='inherit' size='small'>
      <PersonIcon />
      <Typography style={{ fontSize: '11px' }} variant='body1' component='p'>
        Sign In
      </Typography>
    </IconButton>
  )
}
