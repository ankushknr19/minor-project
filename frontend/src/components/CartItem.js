import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const CartItem = ({ cart }) => {
  return (
    <Link to={`/products/${cart.product_id}`}>
    <Card className='my-3 p-3 rounded'>
        <Card.Img src={cart.product_image} variant='top'/>
      <Card.Body>
        <Card.Title>
          {cart.product_name}
        </Card.Title>
        <Card.Text as='h5'>
          Rs {cart.product_price}
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
  )
}

export default CartItem