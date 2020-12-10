import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { useStyles } from './hsStyle'
import { useDispatch, useSelector } from 'react-redux'
import { Paginate } from '../components/Paginate'

import { Product } from './ProductScreen/Products/Product'
import { listProducts } from '../actions/productActions'
import { ModalLoader } from '../components/ModalLoader'
import { ModalMessage } from '../components/ModalMessage'

import { PRODUCT_DETAILS_RESET } from '../constants/productConstants'
import { HomeSlider } from '../components/Sliders/HomeSlider'
import { BackButton } from '../components/NavItems/BackButton'

import HomeModal from '../components/HomeModal'

export const HomeScreen = ({ match }) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useDispatch()
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET })
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const classes = useStyles()
  return (
    <Container style={{ padding: 15 }}>
      {!keyword ? (
        <HomeSlider />
      ) : (
        <Box p={1}>
          <BackButton to='/' />
        </Box>
      )}

      {loading ? (
        <ModalLoader />
      ) : error ? (
        <ModalMessage variant='error'>{error}</ModalMessage>
      ) : (
        <>
          <HomeModal />
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box m={4}>
                {!keyword && (
                  <Typography
                    variant={sm ? 'h4' : 'h3'}
                    className={classes.title}
                  >
                    Latest Products
                  </Typography>
                )}
              </Box>
            </Grid>
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
        </>
      )}
      <Grid container justify='center' className={classes.rootPaginate}>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
      </Grid>
    </Container>
  )
}
