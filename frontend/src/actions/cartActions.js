import axios from 'axios'
import {
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
    CART_LIST_FAIL,
    CART_ITEM_DELETE_REQUEST,
    CART_ITEM_DELETE_SUCCESS,
    CART_ITEM_DELETE_FAIL,
    CART_ITEM_UPDATE_REQUEST,
    CART_ITEM_UPDATE_SUCCESS,
    CART_ITEM_UPDATE_FAIL,
    CART_ITEM_ADD_REQUEST,
    CART_ITEM_ADD_SUCCESS,
    CART_ITEM_ADD_FAIL,
  } from '../constants/cartConstants'




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
        Authorization: `Bearer ${userInfo?.jwtToken}`,
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
        Authorization: `Bearer ${userInfo?.jwtToken}`,
      },
    }

    await axios.delete(`/api/customer/cart/${id}`, config)

    dispatch({
      type: CART_ITEM_DELETE_SUCCESS,
    })
    dispatch(getCart())
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

  export const addCartItem = (product_id, qty) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_ITEM_ADD_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.jwtToken}`,
        },
      }
  
      const { data } = await axios.post(`/api/customer/cart`, {product_id, qty}, config)
  
      dispatch({
        type: CART_ITEM_ADD_SUCCESS,
        payload: data,
      })
      dispatch(getCart())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: CART_ITEM_ADD_FAIL,
        payload: message,
      })
      }
    }
  
    export const updateCartItem = (cart_id, qty) => async (dispatch, getState) => {
      try {
        dispatch({
          type: CART_ITEM_UPDATE_REQUEST,
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
    
        const { data } = await axios.put(
          `/api/customer/cart/${cart_id}`,
          {qty},
          config
        )
    
        dispatch({
          type: CART_ITEM_UPDATE_SUCCESS,
          payload: data,
        })
        dispatch(getCart())
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
          type: CART_ITEM_UPDATE_FAIL,
          payload: message,
        })
        }
      }