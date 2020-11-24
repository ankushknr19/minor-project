import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
    <Card className='my-3 p-3 rounded'>
        <Card.Img src={product.image} variant='top' />
     

      <Card.Body>

        <Card.Title>
          {product.vendor}
        </Card.Title>

        <Card.Text>
          {product.name}
        </Card.Text>

        {/* <Card.Text as='div'>
                    {product.rating} from {product.numReviews} reviews
                </Card.Text> */}

        <Card.Text as='h5'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
  )
}

export default Product
