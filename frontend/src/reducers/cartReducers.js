import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_ITEM_DELETE_REQUEST,
  CART_ITEM_DELETE_SUCCESS,
  CART_ITEM_DELETE_FAIL,
  CART_ITEM_ADD_REQUEST,
  CART_ITEM_ADD_SUCCESS,
  CART_ITEM_ADD_FAIL,
  CART_ITEM_UPDATE_REQUEST,
  CART_ITEM_UPDATE_SUCCESS,
  CART_ITEM_UPDATE_FAIL,
  CART_ITEM_ADD_RESET,
} from '../constants/cartConstants'



export const cartListReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true, cartItems: [] }
    case CART_LIST_SUCCESS:
      return { loading: false, cartItems: action.payload }
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cartItemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ITEM_DELETE_REQUEST:
      return { loading: true }
    case CART_ITEM_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CART_ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cartItemAddReducer = (state = { newCartItem: {} }, action) => {
  switch (action.type) {
    case CART_ITEM_ADD_REQUEST:
      return { loading: true }
    case CART_ITEM_ADD_SUCCESS:
      return { loading: false, success: true, newCartItem: action.payload }
    case CART_ITEM_ADD_FAIL:
      return { loading: false, error: action.payload }
    case CART_ITEM_ADD_RESET:
      return { newCartItem: {} }
    default:
      return state
  }
}

export const cartItemUpdateReducer = (state = { }, action) => {
  switch (action.type) {
    case CART_ITEM_UPDATE_REQUEST:
      return { loading: true }
    case CART_ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true}
    case CART_ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}