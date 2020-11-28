import React from 'react'
import StarEmpty from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'
import StarHalf from '@material-ui/icons/StarHalf'

import {
  Icon,
  createMuiTheme,
  ThemeProvider,
  Typography,
  Container,
} from '@material-ui/core'
import yellow from '@material-ui/core/colors/yellow'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow[500],
    },
  },
})

const Rating = ({ value, text }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{ display: 'flex', alignItems: 'center' }}
        disableGutters
        className='rating'
      >
        <span>
          <Icon>
            {value >= 1 ? (
              <Star color='primary' />
            ) : value >= 0.5 ? (
              <StarHalf color='primary' />
            ) : (
              <StarEmpty color='primary' />
            )}
          </Icon>
        </span>
        <span>
          <Icon>
            {value >= 2 ? (
              <Star color='primary' />
            ) : value >= 1.5 ? (
              <StarHalf color='primary' />
            ) : (
              <StarEmpty color='primary' />
            )}
          </Icon>
        </span>
        <span>
          <Icon>
            {value >= 3 ? (
              <Star color='primary' />
            ) : value >= 2.5 ? (
              <StarHalf color='primary' />
            ) : (
              <StarEmpty color='primary' />
            )}
          </Icon>
        </span>
        <span>
          <Icon>
            {value >= 4 ? (
              <Star color='primary' />
            ) : value >= 3.5 ? (
              <StarHalf color='primary' />
            ) : (
              <StarEmpty color='primary' />
            )}
          </Icon>
        </span>
        <span>
          <Icon>
            {value >= 5 ? (
              <Star color='primary' />
            ) : value >= 4.5 ? (
              <StarHalf color='primary' />
            ) : (
              <StarEmpty color='primary' />
            )}
          </Icon>
        </span>{' '}
        <Typography
          display='inline'
          component='p'
          style={{ marginLeft: '5px' }}
        >
          {text && text}
        </Typography>
      </Container>
    </ThemeProvider>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
