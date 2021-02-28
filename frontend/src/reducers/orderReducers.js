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
    CUSTOMER_ORDER_DETAILS_RESET
} from "../constants/orderConstants"




export const orderCreateReducer = (state = { newOrder: {} }, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true }
      case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, newOrder: action.payload }
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case ORDER_CREATE_RESET:
        return { newOrder: {} }
      default:
        return state
    }
  }


export const orderDetailsCreateReducer = (state = { newOrderDetails: [] }, action) => {
    switch (action.type) {
      case ORDER_DETAILS_CREATE_REQUEST:
        return { loading: true }
      case ORDER_DETAILS_CREATE_SUCCESS:
        return { loading: false, success: true, newOrderDetails: action.payload }
      case ORDER_DETAILS_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case ORDER_DETAILS_CREATE_RESET:
        return { newOrderDetails: [] }
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