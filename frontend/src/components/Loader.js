import React from 'react'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function CircularIndeterminate() {
  return (
    <Grid container justify='center'>
      <CircularProgress color='secondary' />
    </Grid>
  )
}
