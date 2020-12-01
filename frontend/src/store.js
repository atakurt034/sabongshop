import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import {
  orderCreateReducers,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
} from './reducers/orderReducers'

const midlleware = [thunk]

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...midlleware))
)

export default store
