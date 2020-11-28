import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  makeStyles,
  CardActionArea,
} from '@material-ui/core'

import Stars from '../../../components/Rating'

const useStyle = makeStyles((theme) => ({
  root: {
    width: '300px',
    borderRadius: 5,
  },
  media: {
    height: '200px',
  },
  star: {
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}))

export const Product = ({ product }) => {
  const classes = useStyle()
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <Link className={classes.link} to={`/product/${product._id}`}>
            <CardMedia image={product.image} className={classes.media} />
            <CardContent>
              <Typography variant='h6' component='h2' gutterBottom>
                {product.name}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
        <Divider />
        <CardContent>
          <Typography variant='body2' component='div' className={classes.star}>
            <Stars
              text={`${product.numReviews} reviews`}
              value={product.rating}
            />
          </Typography>
          <Typography variant='h6' component='h2' style={{ padding: 5 }}>
            {' '}
            ₱ {product.price}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}
