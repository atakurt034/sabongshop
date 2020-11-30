import React from 'react'

import {
  AppBar,
  Toolbar,
  makeStyles,
  Grid,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'

import { Search } from './NavItems/Search'
import { Brand } from './NavItems/Brand'

import CustomBadge from './NavItems/CustomBadge'
import { Account } from './NavItems/Account'

const useStyle = makeStyles((theme) => ({
  brand: {
    flex: 1,
    width: 'auto',
  },
}))

const Header = () => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyle()

  let pos = 'static'
  if (!sm) {
    pos = 'fixed'
  }

  return (
    <AppBar position={pos}>
      <Toolbar>
        <Grid className={classes.brand}>
          <Brand />
        </Grid>
        {sm && <Search />}
        {sm && <CustomBadge />}
        <Account />
      </Toolbar>
    </AppBar>
  )
}

export default Header
