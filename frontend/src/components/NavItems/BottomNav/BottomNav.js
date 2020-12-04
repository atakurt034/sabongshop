import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Cart, Home, Account } from './BottomCustomBadge'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: '5px 0',
  },
})

export default function SimpleBottomNavigation() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      style={{ zIndex: 100 }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label='Account' icon={<Account />} />
      <BottomNavigationAction label='Home' icon={<Home />} />
      <BottomNavigationAction label='Cart' icon={<Cart />} />
    </BottomNavigation>
  )
}
