import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Cart, Account } from './BottomCustomBadge'

import HomeIcon from '@material-ui/icons/Home'

import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setClickButton } from '../../../actions/modeActions'
import { CLICKED_BUTTON_FALSE } from '../../../constants/modeConstants'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: '5px 0',
  },
  icon: {
    color: theme.palette.action.active,
  },
}))

const SimpleBottomNavigation = ({ history, match }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [clicked, setCLicked] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const clickHandler = (e) => {
    setValue(e)
  }

  const accountHandler = (target) => {
    setCLicked(!clicked)
    if (clicked) {
      setValue('account')
      dispatch(setClickButton(target.currentTarget))
    } else {
      dispatch(setClickButton())
    }
  }

  useEffect(() => {
    if (history.location.pathname !== '/') {
      setValue('')
    }
    if (value === 'home') {
      history.push('/')
      dispatch({ type: CLICKED_BUTTON_FALSE })
    } else if (value === 'cart') {
      history.push('/cart/:id?')
    } else if (value === 'account') {
      dispatch({ type: CLICKED_BUTTON_FALSE })
      if (!userInfo) {
        history.push('/login')
      }
    }
  }, [value, history, dispatch, userInfo])

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
        icon={<Account className={classes.icon} />}
        onClick={accountHandler}
      />
      <BottomNavigationAction
        value={'home'}
        label='Home'
        icon={<HomeIcon className={classes.icon} />}
        onClick={() => clickHandler('home')}
      />
      <BottomNavigationAction
        value={'cart'}
        label='Cart'
        icon={<Cart className={classes.icon} />}
        onClick={() => clickHandler('cart')}
      />
    </BottomNavigation>
  )
}

export default withRouter(SimpleBottomNavigation)
