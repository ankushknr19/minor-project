import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listVendorProducts } from '../actions/productActions'
import { listVendorDetails} from '../actions/vendorActions'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'

const VendorScreen = ({ match }) => {

    const dispatch = useDispatch()

  const vendorDetails = useSelector(state => state.vendorDetails)
  const { loading, error, vendor } = vendorDetails

  const vendorProductList = useSelector(state => state.vendorProductList)
  const { 
          loading: vendorProductListLoading,
          error: vendorProductListError,
          products
        } = vendorProductList

    useEffect( () => {
            dispatch(listVendorDetails(match.params.id))
            dispatch(listVendorProducts(match.params.id))
    },[dispatch,match])

    console.log(products)
    return (
        <>
          { loading
            ? (<Loader />)
            : error
            ? ( <Message variant='danger'>{error}</Message> )
            : ( <Row>
                    <h1>{vendor.vendor_name} </h1>
                </Row>
              )
          }

      <h2>Our Products</h2>
      {vendorProductListLoading
        ? (<Loader />)
        : vendorProductListError
          ? (
            <Message variant='danger'>{error}</Message>
            )

          : <Row>

          {
            products.map(product => (
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

export default VendorScreen
