import axios from 'axios'
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
    CUSTOMER_ADDRESS_UPDATE_REQUEST,
    CUSTOMER_ADDRESS_UPDATE_SUCCESS,
    CUSTOMER_ADDRESS_UPDATE_FAIL,
  } from '../constants/addressConstants'


  export const getCustomerAddress = () => async (dispatch, getState) => {
    try {
      dispatch({
        type:  CUSTOMER_ADDRESS_LIST_REQUEST,
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
  
      const { data } = await axios.get(`/api/customer/address`, config)
  
      dispatch({
        type: CUSTOMER_ADDRESS_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: CUSTOMER_ADDRESS_LIST_FAIL,
        payload: message,
      })
    }
  }

  

  export const deleteCustomerAddress = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_ADDRESS_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.jwtToken}`,
        },
      }
  
      await axios.delete(`/api/customer/address`, config)
  
      dispatch({
        type: CUSTOMER_ADDRESS_DELETE_SUCCESS,
      })
      dispatch(getCustomerAddress())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          dispatch({
            type: CUSTOMER_ADDRESS_DELETE_FAIL,
            payload: message,
          })
      }
    }
  



  export const createCustomerAddress = (name, phone_number, city, area, address) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_ADDRESS_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.jwtToken}`,
        },
      }
  
      const { data } = await axios.post(`/api/customer/address`, {name, phone_number, city, area, address}, config)
  
      dispatch({
        type: CUSTOMER_ADDRESS_CREATE_SUCCESS,
        payload: data,
      })
      dispatch(getCustomerAddress())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: CUSTOMER_ADDRESS_CREATE_FAIL,
        payload: message,
      })
      }
    }
  



    export const updateCustomerAddress = (address) => async (dispatch, getState) => {
      try {
        dispatch({
          type: CUSTOMER_ADDRESS_UPDATE_REQUEST,
        })
    
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.jwtToken}`,
          },
        }
    
        const { data } = await axios.put(
          `/api/customer/address`,
          address,
          config
        )
    
        dispatch({
          type: CUSTOMER_ADDRESS_UPDATE_SUCCESS,
          payload: data,
        })
        dispatch(getCustomerAddress())
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
          type: CUSTOMER_ADDRESS_UPDATE_FAIL,
          payload: message,
        })
        }
      }
  