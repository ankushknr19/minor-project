import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardDeck } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.product_id}`}>
      <CardDeck>
    <Card className='my-3 p-3 rounded'>
        <Card.Img src={product.product_image} variant='top'/>
      <Card.Body>
        <Card.Title>
          {product.product_name}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.vendor_name}
          </Card.Subtitle>
        <Card.Text as='h5'>
          Rs {product.product_price}
        </Card.Text>
      </Card.Body>
    </Card>
    </CardDeck>
    </Link>
  )
}

export default Product
