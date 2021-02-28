import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { Col, Jumbotron, Row } from 'react-bootstrap'
import Product from '../components/Product'

const CategoryScreen = ({match, category}) => {

  const productCategory = match.params.category

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

    useEffect( () => {
        dispatch(listProducts())
    },[dispatch])
    
    return (
        <>
          {/* { loading
            ? (<Loader />)
            : error
            ? ( <Message variant='danger'>{error}</Message> )
            : (  */}
            <Row>
            <Jumbotron style={{minWidth: '200px'}}>
                        <h1> Category: {productCategory} </h1>
                    </Jumbotron>
            </Row>

       <Row>
          {
            products?.map(product => (
                (product.category === productCategory ) &&
              <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                <Product product = {product} />
              </Col>
            ))
          }
        </Row> 
         {/* )}   */}
      </> 
    )     
}

export default CategoryScreen