import React, { useEffect } from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { Product } from './ProductScreen/Products/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const useStyle = makeStyles((theme) => ({
  item: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const classes = useStyle()
  return (
    <Container style={{ padding: 15 }}>
      <Grid container spacing={4}>
        {products.map((product) => {
          return (
            <Grid
              className={classes.item}
              key={product._id}
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={2}
            >
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='error'>{error}</Message>
              ) : (
                <Product product={product} />
              )}
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
