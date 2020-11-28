import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

export const BackButton = () => {
  return (
    <Link to='/' style={{ textDecoration: 'none' }}>
      <IconButton>
        <ArrowBackIosIcon /> <Typography>Back</Typography>
      </IconButton>
    </Link>
  )
}
