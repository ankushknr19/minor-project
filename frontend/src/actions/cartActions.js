import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.product_id,
      name: data.product_name,
      image: data.product_image,
      price: data.product_price,
      count_in_stock: data.count_in_stock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
} 

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
