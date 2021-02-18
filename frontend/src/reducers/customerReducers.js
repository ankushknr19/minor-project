import {
    CUSTOMER_ADDRESS_REQUEST,
    CUSTOMER_ADDRESS_SUCCESS,
    CUSTOMER_ADDRESS_FAIL,
    CUSTOMER_ADDRESS_RESET,
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
    CART_LIST_FAIL,
    CART_ITEM_DELETE_REQUEST,
    CART_ITEM_DELETE_SUCCESS,
    CART_ITEM_DELETE_FAIL,
  } from '../constants/customerConstants'


export const customerAddressReducer = (state = { address: {} }, action) => {
    switch (action.type) {
      case CUSTOMER_ADDRESS_REQUEST:
        return { ...state, loading: true }
      case CUSTOMER_ADDRESS_SUCCESS:
        return { loading: false, address: action.payload }
      case CUSTOMER_ADDRESS_FAIL:
        return { loading: false, error: action.payload }
      case CUSTOMER_ADDRESS_RESET:
        return { address: {} }
      default:
        return state
    }
  }


export const cartListReducer = (state = { cartList: [] }, action) => {
    switch (action.type) {
      case CART_LIST_REQUEST:
        return { ...state, loading: true }
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