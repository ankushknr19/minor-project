import {
    CUSTOMER_ADDRESS_LIST_REQUEST,
    CUSTOMER_ADDRESS_LIST_SUCCESS,
    CUSTOMER_ADDRESS_LIST_FAIL,
    CUSTOMER_ADDRESS_DELETE_REQUEST,
    CUSTOMER_ADDRESS_DELETE_SUCCESS,
    CUSTOMER_ADDRESS_DELETE_FAIL,
    CUSTOMER_ADDRESS_CREATE_REQUEST,
    CUSTOMER_ADDRESS_CREATE_SUCCESS,
    CUSTOMER_ADDRESS_CREATE_FAIL,
    CUSTOMER_ADDRESS_CREATE_RESET,
    CUSTOMER_ADDRESS_UPDATE_REQUEST,
    CUSTOMER_ADDRESS_UPDATE_SUCCESS,
    CUSTOMER_ADDRESS_UPDATE_FAIL,
    CUSTOMER_ADDRESS_UPDATE_RESET,
  } from '../constants/addressConstants'


export const customerAddressReducer = (state = { address: {} }, action) => {
    switch (action.type) {
      case CUSTOMER_ADDRESS_LIST_REQUEST:
        return { ...state, loading: true }
      case CUSTOMER_ADDRESS_LIST_SUCCESS:
        return { loading: false, address: action.payload }
      case CUSTOMER_ADDRESS_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const customerAddressDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CUSTOMER_ADDRESS_DELETE_REQUEST:
        return { loading: true }
      case CUSTOMER_ADDRESS_DELETE_SUCCESS:
        return { loading: false, success: true }
      case CUSTOMER_ADDRESS_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const customerAddressCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CUSTOMER_ADDRESS_CREATE_REQUEST:
        return { loading: true }
      case CUSTOMER_ADDRESS_CREATE_SUCCESS:
        return { loading: false, success: true, address: action.payload }
      case CUSTOMER_ADDRESS_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case CUSTOMER_ADDRESS_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const customerAddressUpdateReducer = (state = { }, action) => {
    switch (action.type) {
      case CUSTOMER_ADDRESS_UPDATE_REQUEST:
        return { loading: true }
      case CUSTOMER_ADDRESS_UPDATE_SUCCESS:
        return { loading: false, success: true}
      case CUSTOMER_ADDRESS_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case CUSTOMER_ADDRESS_UPDATE_RESET:
        return { }
      default:
        return state
    }
  }
