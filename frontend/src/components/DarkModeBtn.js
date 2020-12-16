import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { SET_MODE_FALSE, SET_MODE_TRUE } from '../constants/modeConstants'
import { useDispatch } from 'react-redux'

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 1,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch)

export const DarkModeBtn = () => {
  const [checked, setChecked] = React.useState(false)

  const handleChange = (event) => {
    setChecked(!checked)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (checked) {
      dispatch({ type: SET_MODE_TRUE })
    } else {
      dispatch({ type: SET_MODE_FALSE })
    }
  }, [checked, dispatch])

  return (
    <FormGroup>
      <Typography variant='caption' component='div'>
        <Grid component='label' container alignItems='center' spacing={1}>
          <Grid item>
            <AntSwitch checked={checked} onChange={handleChange} />
          </Grid>
          <Grid item>Dark Mode</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  )
}
