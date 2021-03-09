import React from 'react'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'

const SearchScreen = ({match}) => {

    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productSearch = useSelector(state => state.productSearch)
    const { 
            loading,
            error,
            products
          } = productSearch

          
    useEffect(() => {
       dispatch(searchProducts(keyword))
    }, [dispatch, keyword])

    return (
        <>
      <h1>searched for '{keyword}'</h1>
      {loading
        ? (<Loader />)
        : error
          ? (
            <Message variant='danger'>No product found</Message>
            )

          : <Row>

          {
            products?.map(product => (
              <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                <Product product = {product} />
              </Col>
            ))
          }
            </Row>   
      }
        </> 
    )
}

export default SearchScreen
