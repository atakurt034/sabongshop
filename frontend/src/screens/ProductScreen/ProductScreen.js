import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Grid,
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  InputLabel,
  Select,
  TextField,
  Container,
} from '@material-ui/core'

import {
  listProductDetails,
  createProductReview,
} from '../../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'

import { BackButton } from '../../components/NavItems/BackButton'
import { ModalLoader } from '../../components/ModalLoader'
import { ModalMessage } from '../../components/ModalMessage'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useStyle } from './ProductStyles'
import Ratings from '../../components/Rating'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import Rating from '../../components/Rating'
import { Link } from 'react-router-dom'
import { Comments } from './comments'
import { ReviewPaginate } from '../../components/ReviewPaginate'

import { ProductSlider } from './ProductSlider'
import { textSale } from '../../components/TextSale'
import NumberFormat from 'react-number-format'

export const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [price, setPrice] = useState()

  const itemsPerPage = 2
  const [page, setPage] = useState(1)

  const handleChange = (event, value) => {
    setPage(value)
  }

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    } else {
      if (product.isOnSale) {
        setPrice(product.salePrice)
      } else {
        setPrice(product.price)
      }
    }
  }, [dispatch, match, successProductReview, product])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  const classes = useStyle()
  let content = (
    <>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12} className={classes.button}>
          <BackButton to={'/'} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ProductSlider image={product.image} />
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
            <Typography component='div'>
              Price:{' '}
              {product.isOnSale ? textSale(product.price, price) : `₱ ${price}`}
            </Typography>
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
                      <NumberFormat
                        prefix={'₱'}
                        thousandSeparator
                        decimalScale={2}
                        displayType='text'
                        value={price * qty}
                      />
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box mt={2} mx={2}>
            <Typography variant='h5' component='h1'>
              Reviews
            </Typography>
          </Box>
          <List dense className={classes.root}>
            {product.reviews.length === 0 && (
              <Message variant='error'>No Reviews</Message>
            )}
            {product.reviews
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((review) => {
                return (
                  <React.Fragment key={review._id}>
                    <ListItem key={review._id} alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar alt='Remy Sharp' src={review.image} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={<Rating value={review.rating} />}
                        secondary={
                          <>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'
                            >
                              {review.name}
                            </Typography>
                            <Typography
                              variant='body2'
                              component='span'
                              className={classes.textReviews}
                            >
                              {review.comment.length <= 100 ? (
                                ` - ${review.comment}`
                              ) : (
                                <Comments text={review.comment} />
                              )}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                  </React.Fragment>
                )
              })}
            <ReviewPaginate page={page} handleChange={handleChange} />
          </List>
        </Grid>
        <Grid item sm={6}>
          <Box mt={2} mx={2}>
            <Typography variant='h5' component='h1'>
              Write a Customer Review
            </Typography>
          </Box>
          <Container maxWidth='md'>
            {successProductReview && (
              <Message variant='success'>Review submitted successfully</Message>
            )}
            {loadingProductReview && <Loader />}
            {errorProductReview && (
              <Message variant='error'>{errorProductReview}</Message>
            )}
            {userInfo ? (
              <Grid container spacing={2}>
                <FormControl
                  component='form'
                  onSubmit={submitHandler}
                  fullWidth
                  variant='outlined'
                  className={classes.formControl}
                >
                  <Grid item xs={8}>
                    <InputLabel required htmlFor='filled-age-native-simple'>
                      Rating
                    </InputLabel>
                    <Select
                      required
                      labelWidth={50}
                      native
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option aria-label='None' value='' />
                      <option value={1}>1 - Poor</option>
                      <option value={2}>2 - Fair</option>
                      <option value={3}>3 - Good</option>
                      <option value={4}>4 - Very Good</option>
                      <option value={5}>5 - Excellent</option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} className={classes.textField}>
                    <TextField
                      id='outlined-multiline-static'
                      label='Reviews'
                      multiline
                      rowsMax={6}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>
                  <Grid container justify='center'>
                    <Button
                      disabled={loadingProductReview}
                      type='submit'
                      size='large'
                      variant='contained'
                    >
                      Submit
                    </Button>
                  </Grid>
                </FormControl>
              </Grid>
            ) : (
              <Message variant='warning'>
                Please <Link to='/login'>Sign in</Link> to write a review{' '}
              </Message>
            )}
          </Container>
        </Grid>
      </Grid>
    </>
  )
  if (loading) {
    content = <ModalLoader />
  } else if (error) {
    content = <ModalMessage variant='error'>{error}</ModalMessage>
  }

  return content
}
