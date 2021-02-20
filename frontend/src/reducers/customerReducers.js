import {
    CUSTOMER_ADDRESS_REQUEST,
    CUSTOMER_ADDRESS_SUCCESS,
    CUSTOMER_ADDRESS_FAIL,
    CUSTOMER_ADDRESS_RESET,
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
