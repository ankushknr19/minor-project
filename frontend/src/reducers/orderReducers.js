import { ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_CREATE_FAIL, 
    ORDER_DETAILS_CREATE_REQUEST, 
    ORDER_DETAILS_CREATE_SUCCESS, 
    ORDER_DETAILS_CREATE_RESET, 
    CUSTOMER_ORDER_LIST_REQUEST,
    CUSTOMER_ORDER_LIST_SUCCESS,
    CUSTOMER_ORDER_LIST_FAIL,
    CUSTOMER_ORDER_DETAILS_REQUEST,
    CUSTOMER_ORDER_DETAILS_SUCCESS,
    CUSTOMER_ORDER_DETAILS_FAIL,
    CUSTOMER_ORDER_DETAILS_RESET,
    CUSTOMER_ORDER_LIST_RESET,
    VENDOR_ORDER_DETAILS_LIST_REQUEST,
    VENDOR_ORDER_DETAILS_LIST_SUCCESS,
    VENDOR_ORDER_DETAILS_LIST_FAIL,
    VENDOR_ORDER_DETAILS_LIST_RESET,
    UPDATE_COUNTINSTOCK_FAIL,
    UPDATE_COUNTINSTOCK_SUCCESS,
    UPDATE_COUNTINSTOCK_REQUEST
} from "../constants/orderConstants"




export const orderCreateReducer = (state = { }, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true }
      case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, newOrder: action.payload }
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case ORDER_CREATE_RESET:
        return { }
      default:
        return state
    }
  }


export const orderDetailsCreateReducer = (state = { }, action) => {
    switch (action.type) {
      case ORDER_DETAILS_CREATE_REQUEST:
        return { loading: true }
      case ORDER_DETAILS_CREATE_SUCCESS:
        return { loading: false, success: true, newOrderDetails: action.payload }
      case ORDER_DETAILS_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case ORDER_DETAILS_CREATE_RESET:
        return { }
      default:
        return state
    }
  }

  export const customerOrderListReducer = (state = { customerOrders: [] }, action) => {
    switch (action.type) {
      case CUSTOMER_ORDER_LIST_REQUEST:
        return { loading: true}
      case CUSTOMER_ORDER_LIST_SUCCESS:
        return { loading: false, customerOrders: action.payload }
      case CUSTOMER_ORDER_LIST_FAIL:
        return { loading: false, error: action.payload }
      case CUSTOMER_ORDER_LIST_RESET:
        return { customerOrders: [] }
      default:
        return state
    }
  }

  export const customerOrderDetailsReducer = (state = { orderDetails: [] }, action) => {
    switch (action.type) {
      case CUSTOMER_ORDER_DETAILS_REQUEST:
        return { loading: true, orderDetails: [] }
      case CUSTOMER_ORDER_DETAILS_SUCCESS:
        return { loading: false, orderDetails: action.payload }
      case CUSTOMER_ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      case CUSTOMER_ORDER_DETAILS_RESET:
        return { orderDetails: [] }
      default:
        return state
    }
  }


  export const countInStockUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_COUNTINSTOCK_REQUEST:
        return { loading: true }
      case UPDATE_COUNTINSTOCK_SUCCESS:
        return { loading: false, success: true}
      case UPDATE_COUNTINSTOCK_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }



  export const vendorOrderDetailsListReducer = (state = { vendorOrders: [] }, action) => {
    switch (action.type) {
      case VENDOR_ORDER_DETAILS_LIST_REQUEST:
        return { loading: true}
      case VENDOR_ORDER_DETAILS_LIST_SUCCESS:
        return { loading: false, vendorOrders: action.payload }
      case VENDOR_ORDER_DETAILS_LIST_FAIL:
        return { loading: false, error: action.payload }
      case VENDOR_ORDER_DETAILS_LIST_RESET:
        return { vendorOrders: [] }
      default:
        return state
    }
  }

