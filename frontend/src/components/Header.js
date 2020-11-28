import React from 'react'

import { AppBar, Toolbar, makeStyles, Grid } from '@material-ui/core'

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
  const classes = useStyle()

  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid className={classes.brand}>
          <Brand />
        </Grid>
        <Search />
        <CustomBadge cart={2} />
        <Account />
      </Toolbar>
    </AppBar>
  )
}

export default Header
