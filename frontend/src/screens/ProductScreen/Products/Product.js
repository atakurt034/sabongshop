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
  Box,
} from '@material-ui/core'

import Stars from '../../../components/Rating'
import NumberFormat from 'react-number-format'

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
  const textSale = (
    <Box
      style={{
        textDecoration: 'line-through',
        color: 'red',
        display: 'inline',
      }}
    >
      <NumberFormat
        prefix={'₱'}
        thousandSeparator
        decimalScale={2}
        displayType='text'
        value={product.price}
      />
    </Box>
  )

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <Link className={classes.link} to={`/product/${product._id}`}>
            <CardMedia
              image={product.image[product.image.length - 1]}
              className={classes.media}
            />
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
            {product.isOnSale ? (
              textSale
            ) : (
              <NumberFormat
                prefix={'₱'}
                thousandSeparator
                decimalScale={2}
                displayType='text'
                value={product.price}
              />
            )}{' '}
            {product.isOnSale && (
              <NumberFormat
                prefix={'₱'}
                thousandSeparator
                decimalScale={2}
                displayType='text'
                value={product.salePrice}
              />
            )}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}
