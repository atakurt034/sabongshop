import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'

import { Product } from './ProductScreen/Products/Product'
import products from '../Chicks'

const useStyle = makeStyles((theme) => ({
  item: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export const HomeScreen = () => {
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
              <Product product={product} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
