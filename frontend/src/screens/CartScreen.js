import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { deleteCartItem, getCart, updateCartItem } from '../actions/cartActions'
import { CART_ITEM_ADD_RESET } from '../constants/cartConstants'
import Loader from '../components/Loader'

const CartScreen = ({ match, location, history }) => {

  const dispatch = useDispatch()

  const cartList = useSelector((state) => state.cartList)
  const { loading, error, cartItems } = cartList

  const cartItemDelete = useSelector((state) => state.cartItemDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = cartItemDelete

  const cartItemUpdate = useSelector((state) => state.cartItemUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = cartItemUpdate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({type:CART_ITEM_ADD_RESET})

        if (!userInfo || !userInfo?.is_customer) {
      history.push('/login?redirect=cart')
      dispatch(getCart())
    }else{
      dispatch(getCart())
    }
  }, [dispatch, history, userInfo, successDelete,successUpdate])

  const removeFromCartHandler = (id) => {
    dispatch(deleteCartItem(id))
  }

  const updateCartItemHandler = (id, qty) => {
    dispatch(updateCartItem(id, qty))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=placeorder')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {loading
        ? (<Loader />)
        : error
          && (
            <Message variant='danger'>{error}</Message>
            )
          }
        {cartItems?.length === 0 ? (
          <Message>
            Your cart is empty! <Link to='/'> Shop now! </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems?.map((cartItem) => (
              userInfo?.customer_id === cartItem.customer_id &&
              <ListGroup.Item key={cartItem.product_id}>
                <Row>
                  <Col md={3}>
                      <Link to={`/products/${cartItem.product_id}`}>
                          <Image src={cartItem.product_image} alt={cartItem.product_name} fluid rounded />
                      </Link>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${cartItem.product_id}`}>{cartItem.product_name}</Link>
                    <br/>
                    <br/>
                    <Link to={`/vendors/${cartItem.vendor_id}`}>{cartItem.vendor_name}</Link>
                  </Col>
                  <Col md={2}>Rs {cartItem.product_price}</Col>
                  <Col md={2}>
                    Qty:
                    <Form.Control
                      as='select'
                      value={cartItem.qty}
                      onChange={(e) =>
                          updateCartItemHandler(cartItem.cart_id, Number(e.target.value))
                      }
                    >
                      {
                        Array.from({length: cartItem.count_in_stock}, (v,i) => i).map(
                            (x) => (
                                <option key={x + 1} value={x + 1}>
                                   {x + 1}
                                </option>
                                )
                              )
                            }
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(cartItem.cart_id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card >
          <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>
                   Subtotal
                </h2>
                <h3>
                ({cartItems?.reduce((acc, cartItem) => acc + cartItem.qty, 0)})
                items
              </h3>
              </ListGroup.Item>
              <ListGroup.Item>
              {cartItems?.map((cartItem) => (
                <Row>
                  <Col md={4}>
               {cartItem.product_name}  
               </Col>
               <Col>
               {cartItem.qty} x Rs {cartItem.product_price} = Rs {cartItem.qty * cartItem.product_price}
                </Col>
               </Row>
              ))}
              </ListGroup.Item>
              <ListGroup.Item>
              <h2>
              Rs {cartItems
                ?.reduce((acc, cartItem) => acc + cartItem.qty * cartItem.product_price, 0)
                ?.toFixed(2)}
               </h2> 
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems?.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          
          </ListGroup>
        </Card>
        
      </Col>
    </Row>
  )
}

export default CartScreen
