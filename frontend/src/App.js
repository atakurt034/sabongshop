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
import BottomNav from './components/NavItems/BottomNav'

import { HomeScreen } from './screens/HomeScreen'
import { ProductScreen } from './screens/ProductScreen/ProductScreen'
import { CartScreen } from './screens/CartScreen/CartScreen'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'

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
          <Route path='/login' component={LoginScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
      {xs && <BottomNav />}
    </Router>
  )
}

export default App
