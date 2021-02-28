import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { vendorDetailsReducer, vendorListReducer } from './reducers/vendorReducers'
// import { composeWithDevTools } from 'redux-devtools-extension'
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
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import { 
  customerAddressCreateReducer,
  customerAddressDeleteReducer,
  customerAddressReducer,
  customerAddressUpdateReducer, 
} from './reducers/addressReducers'
import {  
  cartListReducer, 
  cartItemDeleteReducer, 
  cartItemAddReducer, 
  cartItemUpdateReducer, 
} from './reducers/cartReducers'
import { 
  customerOrderListReducer,
  orderCreateReducer, 
  orderDetailsCreateReducer, 
  customerOrderDetailsReducer,
} from './reducers/orderReducers'




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
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  customerAddress: customerAddressReducer,
  customerAddressCreate: customerAddressCreateReducer,
  customerAddressUpdate: customerAddressUpdateReducer,
  customerAddressDelete: customerAddressDeleteReducer,
  cartList: cartListReducer,
  cartItemDelete: cartItemDeleteReducer,
  newCartItem: cartItemAddReducer,
  cartItemUpdate: cartItemUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetailsCreate: orderDetailsCreateReducer,
  customerOrderList: customerOrderListReducer,
  customerOrderDetails: customerOrderDetailsReducer,
}

const reducer = combineReducers(reduce)


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  user: { userInfo: userInfoFromStorage}
}


const middleware = [thunk]

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: Object.keys(reduce)
};

const store = createStore(persistReducer(persistConfig, reducer), composeEnhances(applyMiddleware(...middleware)))
// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
