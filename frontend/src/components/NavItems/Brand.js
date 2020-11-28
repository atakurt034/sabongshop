import React from 'react'

import { NavLink } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import Logo from '@material-ui/icons/StrikethroughS'

export const Brand = () => {
  return (
    <>
      <Box p={2}>
        <Typography component='span' style={{ marginLeft: '1ch' }} noWrap>
          <NavLink
            activeStyle={{ color: '#fff' }}
            style={{ textDecoration: 'none' }}
            to='/'
          >
            <Logo style={{ position: 'relative', top: 7 }} />
            SABONG
          </NavLink>
        </Typography>
      </Box>
    </>
  )
}
