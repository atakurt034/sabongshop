import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Grid,
  CardMedia,
  Typography,
  Divider,
  Box,
  Table,
  TableRow,
  TableContainer,
  TableCell,
  FormControl,
  Button,
  TableBody,
} from '@material-ui/core'

import { listProductDetails } from '../../actions/productActions'
import { BackButton } from '../../components/NavItems/BackButton'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useStyle } from './ProductStyles'
import Ratings from '../../components/Rating'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

export const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
    }
  }, [dispatch, match, product])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const classes = useStyle()
  return (
    <>
      <Grid container spacing={2} justify='center'>
        {loading && <Loader />}
        {error && <Message error={error} />}
        <Grid item xs={12} className={classes.button}>
          <BackButton to={'/'} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardMedia component='img' image={product.image} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box p={2}>
            <Typography variant='h5' component='h3'>
              {product.name}
            </Typography>
          </Box>
          <Divider className={classes.divider} />

          <Box p={1}>
            <Ratings
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Box>
          <Divider className={classes.divider} />
          <Box p={2}>
            <Typography>Price: ₱ {product.price}</Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box p={1}>
            {' '}
            <Typography variant='subtitle1' component='p'>
              {product.description}
            </Typography>{' '}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TableContainer className={classes.table}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography>Price: </Typography>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <Typography>
                      ₱ {(product.price * qty).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography>Status: </Typography>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <Typography>
                      {product.countInStock === 0
                        ? 'Out of stocks'
                        : 'In Stock'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography>Quantity: </Typography>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <FormControl
                      component='select'
                      className={classes.option}
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell
                    className={classes.cart}
                    colSpan={3}
                    align='center'
                  >
                    <Button
                      disabled={product.countInStock === 0}
                      variant='contained'
                      className={classes.cartButton}
                      color='primary'
                      startIcon={<ShoppingCartIcon />}
                      onClick={addToCartHandler}
                    >
                      <Typography>Add to Cart</Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6}>
          <h2>Reviews</h2>
          {/* {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <List>
            {product.reviews.map((review) => (
              <ListItem key={review._id}>
                <strong>{review.name}</strong>
                <Ratings value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListItem>
            ))} */}
          {/* <ListItem>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='error'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListItem> */}
          {/* </List> */}
        </Grid>
      </Grid>
    </>
  )
}
