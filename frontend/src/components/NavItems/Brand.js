import React from 'react'

import { NavLink } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import Logo from '@material-ui/icons/StrikethroughS'

export const Brand = () => {
  return (
    <>
      <Typography component='span' style={{ marginLeft: '1ch' }} noWrap>
        <NavLink
          activeStyle={{ color: '#fff' }}
          style={{ textDecoration: 'none' }}
          to='/'
        >
          <Logo style={{ position: 'absolute', left: 5 }} />
          SABONG
        </NavLink>
      </Typography>
    </>
  )
}
