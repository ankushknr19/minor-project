import axios from 'axios'
import {
    CUSTOMER_ADDRESS_REQUEST,
    CUSTOMER_ADDRESS_SUCCESS,
    CUSTOMER_ADDRESS_FAIL,
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
    CART_LIST_FAIL,
    CART_ITEM_DELETE_REQUEST,
    CART_ITEM_DELETE_SUCCESS,
    CART_ITEM_DELETE_FAIL,
  } from '../constants/customerConstants'

  export const getCustomerAddress = () => async (dispatch, getState) => {
    try {
      dispatch({
        type:  CUSTOMER_ADDRESS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo.jwtToken}`,
        },
      }
  
      const { data } = await axios.get(`/api/customer/address`, config)
  
      dispatch({
        type: CUSTOMER_ADDRESS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: CUSTOMER_ADDRESS_FAIL,
        payload: message,
      })
    }
  }

  export const getCart = () => async (dispatch, getState) => {
    try {
      dispatch({
        type:  CART_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo.jwtToken}`,
        },
      }

      const { data } = await axios.get(`/api/customer/cart`, config)
      dispatch({
        type: CART_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: CART_LIST_FAIL,
        payload: message,
      })
    }
  }

  export const deleteCartItem = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_ITEM_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.jwtToken}`,
        },
      }
  
      await axios.delete(`/api/customer/cart/${id}`, config)
  
      dispatch({
        type: CART_ITEM_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          dispatch({
            type: CART_ITEM_DELETE_FAIL,
            payload: message,
          })
      }
    }