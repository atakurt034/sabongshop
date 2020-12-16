import React from 'react'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

export const NotFoundScreen = ({ match }) => {
  const keyword = match.params.keyword
  return (
    <>
      <Message variant='error'>
        {`Did not find "${keyword}" `}
        <Link style={{ marginLeft: 5 }} to='/'>
          {' '}
          Go Back
        </Link>
      </Message>
    </>
  )
}
