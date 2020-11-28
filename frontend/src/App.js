import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Header from './components/Header'
import Footer from './components/Footer'

import { HomeScreen } from './screens/HomeScreen'
import { ProductScreen } from './screens/ProductScreen/ProductScreen'
import { CartScreen } from './screens/CartScreen/CartScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container style={{ margin: '20px auto' }}>
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
