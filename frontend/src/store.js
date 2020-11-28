import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducers } from './reducers/cartReducers'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'

const midlleware = [thunk]

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
})

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...midlleware))
)

export default store
