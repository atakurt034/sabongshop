import React from 'react'
import { Grid } from '@material-ui/core'

export const FormContainer = ({ children }) => {
  return (
    <Grid justify='center' container>
      <Grid item xs={12} md={6}>
        {children}
      </Grid>
    </Grid>
  )
}

export default FormContainer
