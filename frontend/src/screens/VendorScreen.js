import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { listVendorDetails} from '../actions/vendorActions'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'

const VendorScreen = ({ match }) => {

    const dispatch = useDispatch()

  const vendorDetails = useSelector(state => state.vendorDetails)
  const { loading, error, vendor } = vendorDetails

  const productList = useSelector(state => state.productList)
  const { 
          loading: productListLoading,
          error: productListError,
          products 
        } = productList

    useEffect( () => {
            dispatch(listVendorDetails(match.params.id))
            dispatch(listProducts({ vendorId: match.params.id }))
    },[dispatch,match])

    return (
        <>
        { loading
            ? (<Loader />)
            : error
            ? ( <Message variant='danger'>{error}</Message> )
            : ( <Row>
                    <h2>I am {vendor.vendorName} </h2>
                </Row>
              )
        }
        {/* {productListLoading
        ? (<Loader />)
        : productListError
          ? (
            <Message variant='danger'>{ productListError}</Message>
            )

          : <Row>
            {products.length === 0 && <Message variant='danger'>No product found</Message>}
            {products.length > 0 &&
                products?.map(product => (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
            }
            </Row>
            } */}
        </>
        
    )
}

export default VendorScreen
