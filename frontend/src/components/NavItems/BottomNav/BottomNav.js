import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Cart, Account } from './BottomCustomBadge'
import { useSelector } from 'react-redux'

import HomeIcon from '@material-ui/icons/Home'

import { withRouter } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: '5px 0',
  },
})

const SimpleBottomNavigation = ({ history }) => {
  const classes = useStyles()
  const [value, setValue] = useState('home')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // let link = '/login'
  // if (userInfo) {
  //   link = '#'
  // }
  useEffect(() => {
    if (value === 'home') {
      history.push('/')
    } else if (value === 'cart') {
      history.push('/cart/:id?')
    }
  }, [value, history])

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
      <BottomNavigationAction
        value={'account'}
        label='Account'
        icon={<Account />}
      />
      <BottomNavigationAction value={'home'} label='Home' icon={<HomeIcon />} />
      <BottomNavigationAction value={'cart'} label='Cart' icon={<Cart />} />
    </BottomNavigation>
  )
}

export default withRouter(SimpleBottomNavigation)
