import React from 'react'
import { Route } from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  makeStyles,
  Grid,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'

import { Search } from './NavItems/Search/Search'
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
        <Route render={({ history }) => <Search history={history} />} />
        {sm && <CustomBadge />}
        {sm && <Account />}
      </Toolbar>
    </AppBar>
  )
}

export default Header
