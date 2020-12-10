import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.product_id}`}>
    <Card className='my-3 p-3 rounded'>
        <Card.Img src={product.product_image} variant='top' />
     
      <Card.Body>

        <Card.Title>
          {product.product_name}
        </Card.Title>

        <Card.Text>
          {product.vendor_name}
        </Card.Text>

        <Card.Text as='h5'>
          Rs {product.product_price}
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
  )
}

export default Product
