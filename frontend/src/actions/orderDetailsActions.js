import axios from 'axios'
import {
    ORDER_DETAILS_CREATE_FAIL, 
    ORDER_DETAILS_CREATE_REQUEST, 
    ORDER_DETAILS_CREATE_SUCCESS, 
    CUSTOMER_ORDER_DETAILS_REQUEST,
    CUSTOMER_ORDER_DETAILS_SUCCESS,
    CUSTOMER_ORDER_DETAILS_FAIL
} from "../constants/orderConstants"
import { getCustomerOrderList } from './orderActions'


export const getCustomerOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type:  CUSTOMER_ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo?.jwtToken}`,
      },
    }

    const { data } = await axios.get(`/api/orders/customer/${id}/orderdetails`, config)
    dispatch({
      type: CUSTOMER_ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: CUSTOMER_ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}



export const createOrderDetails = (order_id, product_id, vendor_id, qty, price) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.jwtToken}`,
        },
      }
  
      const { data } = await axios.post(`/api/orders/orderdetails`, {order_id, product_id, vendor_id, qty, price}, config)
  
      dispatch({
        type: ORDER_DETAILS_CREATE_SUCCESS,
        payload: data,
      })
      dispatch(getCustomerOrderList())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: ORDER_DETAILS_CREATE_FAIL,
        payload: message,
      })
      }
    }