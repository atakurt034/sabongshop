import React from 'react'

import { Container, makeStyles, Typography } from '@material-ui/core'
import Logo from '@material-ui/icons/StrikethroughS'

const useStyle = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
  },
}))

const Footer = () => {
  const classes = useStyle()

  return (
    <Container className={classes.footer}>
      <Typography component='footer' align='center'>
        Copyright &copy;{' '}
        <Logo style={{ position: 'relative', bottom: '-6px' }} />
        SABONG {new Date().getFullYear()}
      </Typography>
    </Container>
  )
}

export default Footer
