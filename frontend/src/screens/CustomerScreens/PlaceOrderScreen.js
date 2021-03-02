import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import { getCustomerAddress } from '../../actions/addressActions'
import { LinkContainer } from 'react-router-bootstrap'
import { createOrder } from '../../actions/orderActions'
import { createOrderDetails, updateCountInStock } from '../../actions/orderDetailsActions'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants'
import { deleteCartItem } from '../../actions/cartActions'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cartList = useSelector((state) => state.cartList)
  const { cartItems } = cartList

  const customerAddress = useSelector((state) => state.customerAddress)
  const {  address: addressCustomer } = customerAddress


  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cartItems.itemsPrice = addDecimals(
    cartItems?.reduce((acc, item) => acc + item.product_price * item.qty, 0)
  )

  cartItems.totalPrice = (
    Number(cartItems.itemsPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { 
    newOrder, 
    success: orderCreateSuccess, 
     } = orderCreate


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if(!userInfo){
      history.push(`/login`)
    }
    else{
    dispatch(getCustomerAddress())
    if (orderCreateSuccess) {
        cartItems.forEach( (cartItem)=> {
          dispatch(createOrderDetails({
            order_id: newOrder.order_id,
            product_id: cartItem.product_id,
            vendor_id: cartItem.vendor_id, 
            qty: cartItem.qty,
            price: cartItem.product_price
          })) 
          dispatch(updateCountInStock(cartItem.product_id, cartItem.qty ))
          dispatch(deleteCartItem(cartItem.cart_id))
        })
      history.push(`/myorders`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }
    // eslint-disable-next-line
  }, [history, orderCreateSuccess, userInfo, dispatch])

  const placeOrderHandler = () => {
    const ss = JSON.stringify(addressCustomer, (k, v) => ( k=== 'address_id' || k === 'customer_id' || k === 'is_default'|| k === 'created_at') ? undefined : v)
    const str = ss.replace(/"|{|}/g, " ")
    dispatch(
      createOrder({
        total_price: cartItems.totalPrice,
        shipping_address: str
      })
    )
    
  }

  return (
    <>
    <center><h2>Checkout</h2></center>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping Address</h3>
              {!addressCustomer ? (
                  <LinkContainer to='/createaddress'>
                  <Button variant="outline-dark" type="button"> 
                     <i className='fas fa-plus'/>  Add Address
                   </Button>
                 </LinkContainer>
              ) : (

              
              <Row>
                <Col>
              <p>
                {addressCustomer.name}
                <br/>
                {addressCustomer.phone_number}
                <br/>
                {addressCustomer.city},{' '}
                {addressCustomer.area}
                <br/>
                {addressCustomer.address}
              </p>
              </Col>
              <Col>
              <LinkContainer to={`/editaddress`}>
                        <Button
                           variant='secondary'
                            className='btn-sm'
                        >
                             <i className='fas fa-edit'/> Edit
                        </Button>
                        </LinkContainer>
                 </Col>       
              </Row>  
              )}        
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <img src='/images/khalti_logo.png' alt='khalti' width='110px'/>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {cartItems.length === 0 ? (
                <Message>No items. Please select items from cart.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                        <Link to={`/products/${item.product_id}`}>
                          <Image
                            src={item.product_image}
                            alt={item.product_name}
                            fluid
                            rounded
                            style={{
                              width: '65px'
                            }}
                          />
                          </Link>
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product_id}`}>
                            {item.product_name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs {item.product_price} = Rs {item.qty * item.product_price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs {cartItems.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Charge</Col>
                  <Col>Rs 0.00</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs {cartItems.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems === 0 ||cartItems.length === 0|| !addressCustomer}
                  onClick={placeOrderHandler}
                >
                  Pay and Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
