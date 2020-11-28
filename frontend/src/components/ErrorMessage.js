import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}))

export default function ValidationTextFields({ error }) {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          error
          id='outlined-error-helper-text'
          label='Error'
          defaultValue={error}
          helperText='Incorrect entry.'
          variant='outlined'
        />
      </div>
    </form>
  )
}
