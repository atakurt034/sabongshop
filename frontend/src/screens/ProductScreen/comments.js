import { Button, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import { useStyle } from './ProductStyles'

export const Comments = ({ text, click }) => {
  const [txt, setTxt] = useState(true)
  const [read, setRead] = useState('')
  const [comment, setComment] = useState('')

  const classes = useStyle()

  useEffect(() => {
    if (text) {
      setComment(text)
    }
    if (txt) {
      setRead('Read more')
    } else {
      setRead('Read less')
    }
  }, [txt, text])

  const clickHandler = (params) => {
    setTxt(!txt)
  }

  const readmore = (props) => {
    if (txt) {
      return props.substring(0, 100) + '...'
    } else {
      return props
    }
  }

  return (
    <>
      {` - ${readmore(comment)}`}{' '}
      <Button variant='text' onClick={clickHandler}>
        <Typography
          className={classes.buttonComment}
          variant='caption'
          component='p'
        >
          {read}
        </Typography>
      </Button>
    </>
  )
}
