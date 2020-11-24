import axios from 'axios'
import {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_DETAILS_FAIL
} from '../constants/vendorConstants'

export const listVendors = () => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_LIST_REQUEST })

    const { data } = await axios.get('/api/vendors')

    dispatch({
      type: VENDOR_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}
export const listVendorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/vendors/${id}`)

    dispatch({
      type: VENDOR_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: VENDOR_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}