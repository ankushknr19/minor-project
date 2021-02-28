import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { addCartItem } from '../actions/cartActions'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const newCartItem = useSelector(state => state.newCartItem)
  const { success: addCartSuccess,
          newCartItem: cartNewItem } = newCartItem

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    if(!userInfo){
      history.push(`/login?redirect=products/${product.product_id}`)
    }
    else{
      dispatch(addCartItem(product.product_id, qty))
    }
  }


  return (
    <>
      {loading
      ? (
        <Loader />
      )
      : error
      ? (
        <Message variant='danger'>{error}</Message>
      )
      : (
        <Row>
          <Col md={6}>
            <Image src={product.product_image} alt={product.product_name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.product_name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4> Price: Rs {product.product_price} </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.product_description}
              </ListGroup.Item>
              <ListGroup.Item>
                      <h4> {product.vendor_name} </h4>
                   <Link to={`/vendors/${product.vendor_id}`}>
                   <Button variant="outline-dark" size="sm" type='button'>
                   View Shop
                  </Button>
                   </Link>
               </ListGroup.Item>
            </ListGroup>
          </Col>


          <Col md={3} hidden = {userInfo?.is_vendor}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Rs {product.product_price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.count_in_stock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity: </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {
                              Array.from({length: product.count_in_stock}, (v,i) => i).map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )
                            }
                            
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                <ListGroup.Item hidden = {addCartSuccess && cartNewItem[0]?.product_id === product.product_id}>
                  <Button
                  onClick = {addToCartHandler}
                  className='btn-block' type='button' 
                  disabled={product.count_in_stock === 0 }
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item 
                  hidden = { !userInfo || !addCartSuccess || cartNewItem[0]?.product_id !== product.product_id}
                >
                <Link to={'/cart'}>
                   <Button className='btn-block' variant="outline-dark" type='button'>
                   Go to Cart
                  </Button>
                   </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Home delivery (2-5 days)
                      Payment Option:  Khalti 
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
