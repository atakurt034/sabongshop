import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import {
  useTheme,
  useMediaQuery,
  Container,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  Paper,
} from '@material-ui/core'
import BottomNav from './components/NavItems/BottomNav/BottomNav'

import { HomeScreen } from './screens/HomeScreen'
import { ProductScreen } from './screens/ProductScreen/ProductScreen'
import { CartScreen } from './screens/CartScreen/CartScreen'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen/RegisterScreen'
import { ShippingScreen } from './screens/ShippingScreen/ShippingScreen'
import { PaymentScreen } from './screens/PaymentScreen/PaymentScreen'
import { PlaceOrderScreen } from './screens/PlaceOrderScreen/PlaceOrderScreen'
import { OrderScreen } from './screens/OrderScreen/OrderScreen'
import { OrderListScreen } from './screens/OrderListScreen/OrderListScreen'
import { ProfileScreen } from './screens/ProfileScreen/ProfileScreen'
import { UserListScreen } from './screens/UserListScreen/UserListScreen'
import { UserEditScreen } from './screens/UserEditScreen/UserEditScreen'
import { ProductListScreen } from './screens/ProductList/ProductListScreen'
import { ProductEditScreen } from './screens/ProductEditScreen/ProductEditScreen'
import { MyOrdersScreen } from './screens/MyOrdersScreen/MyOrdersScreen'
import { NotFoundScreen } from './screens/NotFoundScreen'

import grey from '@material-ui/core/colors/grey'
import { useSelector } from 'react-redux'

function App() {
  const [dark, setDark] = useState(false)

  const setMode = useSelector((state) => state.setMode)
  const { mode } = setMode

  const useStyle = makeStyles((theme) => ({
    root: {
      margin: '20px auto',
      [theme.breakpoints.down('xs')]: {
        margin: '80px auto',
      },
      minHeight: '80vh',
    },
    background: {
      backgroundColor: dark ? grey[900] : grey[100],
      minHeight: '100vh',
    },
  }))

  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyle()

  const newTheme = createMuiTheme({
    palette: {
      primary: {
        main: grey[800],
        dark: grey[900],
      },
      type: dark ? 'dark' : 'light',
    },
  })

  useEffect(() => {
    if (mode) {
      setDark(true)
    } else {
      setDark(false)
    }
  }, [mode])

  return (
    <Router>
      <ThemeProvider theme={newTheme}>
        <Paper className={classes.background}>
          <Header />
          <main>
            <Container className={classes.root}>
              <Route path='/myorders' component={MyOrdersScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route
                path='/notfound/:keyword'
                component={NotFoundScreen}
                exact
              />
              <Route path='/search/:keyword' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} exact />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={HomeScreen}
                exact
              />
              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
              />

              <Route
                path='/admin/productlist'
                component={ProductListScreen}
                exact
              />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/' component={HomeScreen} exact />
            </Container>
          </main>
          {xs && <BottomNav />}
          <Footer />
        </Paper>
      </ThemeProvider>
    </Router>
  )
}

export default App
