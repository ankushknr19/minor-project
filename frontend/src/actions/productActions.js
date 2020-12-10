import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  VENDOR_PRODUCT_LIST_REQUEST,
  VENDOR_PRODUCT_LIST_SUCCESS,
  VENDOR_PRODUCT_LIST_FAIL
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const listVendorProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(`/api/products/vendors/${id}`)

    dispatch({
      type: VENDOR_PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: VENDOR_PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}