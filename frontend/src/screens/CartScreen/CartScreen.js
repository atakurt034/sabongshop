import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import PaymentIcon from '@material-ui/icons/Payment'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {
  Grid,
  ListItem,
  List,
  CardMedia,
  FormControl,
  Button,
  Card,
  Typography,
  Select,
  InputLabel,
  makeStyles,
  Box,
  Divider,
  Container,
} from '@material-ui/core'
import Message from '../../components/Message'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import { BackButton } from '../../components/NavItems/BackButton'

const useStyle = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // height: 30,
  },
}))

export const CartScreen = ({ match, location, history }) => {
  const classes = useStyle()
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Container>
      <BackButton to='/' />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant='h4' component='h1' style={{ fontWeight: 900 }}>
            <ShoppingCartIcon /> Shopping Cart
          </Typography>
          {cartItems.length === 0 ? (
            <Box m={2}>
              <Message variant='error'>
                Your cart is empty <Link to='/'>Go Back</Link>
              </Message>
            </Box>
          ) : (
            <List dense>
              {cartItems.map((item) => (
                <React.Fragment key={item.name}>
                  <ListItem key={item.product}>
                    <Grid alignItems='center' container spacing={2}>
                      <Grid item xs={4} md={2}>
                        <CardMedia
                          style={{ borderRadius: 10 }}
                          component='img'
                          image={item.image}
                          alt={item.name}
                        />
                      </Grid>
                      <Grid item xs={4} sm={2} md={3}>
                        <Typography variant='body1' color='textPrimary'>
                          <Link
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                            }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={2}>
                        <Typography>
                          ₱ {(item.price * item.qty).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={2}>
                        <FormControl
                          variant='outlined'
                          className={classes.formControl}
                        >
                          <InputLabel id='selectCart'>Quantity</InputLabel>
                          <Select
                            style={{ fontSize: 15, fontWeight: 600 }}
                            native
                            autoWidth
                            label='Quantity'
                            labelId='selectCart'
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} sm={2}>
                        <Button
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={8}
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <List>
              <ListItem>
                <Typography
                  gutterBottom
                  variant='h5'
                  noWrap
                  style={{ fontWeight: 900 }}
                  component='h1'
                >
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </Typography>
              </ListItem>
              <ListItem>
                <Typography gutterBottom variant='body1' component='div'>
                  ₱{' '}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem>
                <Box mx='auto'>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    startIcon={<PaymentIcon />}
                  >
                    Proceed To Checkout
                  </Button>
                </Box>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
