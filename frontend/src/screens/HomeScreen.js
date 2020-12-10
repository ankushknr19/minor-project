import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { listVendors } from '../actions/vendorActions'
import Vendor from '../components/Vendor'
// import axios from 'axios'

const HomeScreen = () => {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const vendorList = useSelector(state => state.vendorList)
  const { loading: vendorListLoading , error: vendorListError, vendors } = vendorList

  useEffect(() => {
    dispatch(listProducts())
    dispatch(listVendors())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading
        ? (<Loader />)
        : error
          ? (
            <Message variant='danger'>{error}</Message>
            )

          : <Row>
            {products.length === 0 && <Message variant='danger'>No product found</Message>}
            {products.length > 0 &&
                products?.map(product => (
                  <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
            }
            </Row>}
            <h1>Shops</h1>
            {vendorListLoading
            ? (<Loader/>)
          : vendorListError
          ? ( <Message variant='danger'>{error}</Message> )
        :(
          <Row>
          {
            vendors.map(vendor => (
              <Col key={vendor.vendor_id} sm={12} md={6} lg={4} xl={3}>
                <Vendor vendor = {vendor} />
              </Col>
            ))
          }

        </Row>
        )
        }
            

    </>
  )
}

export default HomeScreen
