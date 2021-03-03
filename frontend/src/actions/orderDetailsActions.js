import axios from 'axios'
import {
    ORDER_DETAILS_CREATE_FAIL, 
    ORDER_DETAILS_CREATE_REQUEST, 
    ORDER_DETAILS_CREATE_SUCCESS, 
    CUSTOMER_ORDER_DETAILS_REQUEST,
    CUSTOMER_ORDER_DETAILS_SUCCESS,
    CUSTOMER_ORDER_DETAILS_FAIL,
    UPDATE_COUNTINSTOCK_SUCCESS,
    UPDATE_COUNTINSTOCK_FAIL,
    UPDATE_COUNTINSTOCK_REQUEST,
    VENDOR_ORDER_DETAILS_LIST_REQUEST,
    VENDOR_ORDER_DETAILS_LIST_SUCCESS,
    VENDOR_ORDER_DETAILS_LIST_FAIL,
    ADMIN_ORDER_DETAILS_REQUEST,
    ADMIN_ORDER_DETAILS_SUCCESS,
    ADMIN_ORDER_DETAILS_FAIL
} from "../constants/orderConstants"
import { getCustomerOrderList } from './orderActions'
import { listProducts } from './productActions'


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



export const createOrderDetails = (orderDetails) => async (dispatch, getState) => {
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
  
      const { data } = await axios.post(`/api/orders/orderdetails`, orderDetails, config)
  
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



    export const updateCountInStock = (product_id, qty) => async (dispatch, getState) => {
      try {
        dispatch({
          type: UPDATE_COUNTINSTOCK_REQUEST,
        })
    
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
    
        const { data } = await axios.patch(
          `/api/products/${product_id}`,
          {qty},
          config
        )
    
        dispatch({
          type: UPDATE_COUNTINSTOCK_SUCCESS,
          payload: data,
        })
        dispatch(listProducts())
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
          type: UPDATE_COUNTINSTOCK_FAIL,
          payload: message,
        })
        }
      }  

    export const getVendorOrderDetailsList = () => async (dispatch, getState) => {
      try {
        dispatch({
          type:  VENDOR_ORDER_DETAILS_LIST_REQUEST,
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
    
        const { data } = await axios.get(`/api/orders/vendor/orderdetails`, config)
        dispatch({
          type: VENDOR_ORDER_DETAILS_LIST_SUCCESS,
          payload: data,
        })
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    
        dispatch({
          type: VENDOR_ORDER_DETAILS_LIST_FAIL,
          payload: message,
        })
      }
    }


    export const getAllOrderDetails = (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type:  ADMIN_ORDER_DETAILS_REQUEST,
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
    
        const { data } = await axios.get(`/api/orders/${id}/orderdetails`, config)
        dispatch({
          type: ADMIN_ORDER_DETAILS_SUCCESS,
          payload: data,
        })
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    
        dispatch({
          type: ADMIN_ORDER_DETAILS_FAIL,
          payload: message,
        })
      }
    }