import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import { getCart } from '../actions/customerActions'
import CartItem from '../components/CartItem'

const CartScreenNew = ({ match, location, history }) => {

  const dispatch = useDispatch()

  const cartList = useSelector((state) => state.cartList)
  const { loading: cartLoading,
    error: cartError, 
    cartItems } = cartList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
            {cartItems?.length > 0 &&
                cartItems?.map(cartItem => (
                  <Col key={cartItem?.cart_id} sm={12} md={6} lg={4} xl={3}>
                    <CartItem cart={cartItem} />
                  </Col>
                ))
            }
      </Col>
    </Row>
  )
}
export default CartScreenNew
