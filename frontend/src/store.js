import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { vendorDetailsReducer, vendorListReducer } from './reducers/vendorReducers'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  productListReducer,
  productDetailsReducer,
  vendorProductListReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import { customerAddressReducer, cartListReducer, cartItemDeleteReducer } from './reducers/customerReducers'

const reduce = {
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  vendorList: vendorListReducer,
  vendorDetails: vendorDetailsReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  vendorProductList: vendorProductListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  customerAddress: customerAddressReducer,
  cartList: cartListReducer,
  cartItemDelete: cartItemDeleteReducer
}

const reducer = combineReducers(reduce)

// const cartItemsFromStorage = localStorage.getItem('cartItems')
//   ? JSON.parse(localStorage.getItem('cartItems'))
//   : []

// const initialState = {
//   cart: { cartItems: cartItemsFromStorage }
// }

const middleware = [thunk]

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: Object.keys(reduce)
};

const store = createStore(persistReducer(persistConfig, reducer), composeEnhances(applyMiddleware(...middleware)))

export default store
