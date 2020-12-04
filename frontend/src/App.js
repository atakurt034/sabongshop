import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import {
  useTheme,
  useMediaQuery,
  Container,
  makeStyles,
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
import { ProfileScreen } from './screens/ProfileScreen/ProfileScreen'
import { UserListScreen } from './screens/UserListScreen/UserListScreen'
import { UserEditScreen } from './screens/UserEditScreen/UserEditScreen'

function App() {
  const useStyle = makeStyles((theme) => ({
    root: {
      margin: '20px auto',
      [theme.breakpoints.down('xs')]: {
        margin: '80px auto',
      },
    },
  }))

  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyle()

  return (
    <Router>
      <Header />
      <main>
        <Container className={classes.root}>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
      {xs && <BottomNav />}
    </Router>
  )
}

export default App
