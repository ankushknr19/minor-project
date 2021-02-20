import axios from 'axios'
import {
    CUSTOMER_ADDRESS_REQUEST,
    CUSTOMER_ADDRESS_SUCCESS,
    CUSTOMER_ADDRESS_FAIL,
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

  