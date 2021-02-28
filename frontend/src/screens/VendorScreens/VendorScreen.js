import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listVendorProducts } from '../../actions/productActions'
// import { listVendorDetails } from '../../actions/vendorActions'
import { Col, Image, Jumbotron, Row } from 'react-bootstrap'
import Product from '../../components/Product'
import { listVendorDetails } from '../../actions/vendorActions'

const VendorScreen = ({match, id}) => {
  const dispatch = useDispatch()
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  let vendor_id
  if(userInfo?.is_vendor) {
     vendor_id = id
  } else{
     vendor_id = match.params.id
  }



  const vendorDetails = useSelector(state => state.vendorDetails)
  const { loading, error, vendor } = vendorDetails

  const vendorProductList = useSelector(state => state.vendorProductList)
  const { 
          loading: vendorProductListLoading,
          error: vendorProductListError,
          products
        } = vendorProductList

    useEffect( () => {
            dispatch(listVendorDetails(vendor_id))
            dispatch(listVendorProducts(vendor_id))
    },[dispatch,vendor_id])
    
    return (
        <>
          { loading
            ? (<Loader />)
            : error
            ? ( <Message variant='danger'>{error}</Message> )
                    
            : ( 
              <Row>
                  <Col md='2.5'>
                  <Image src = {`${vendor?.vendor_logo}`} style={{width: '200px'}} roundedCircle/>
                  </Col>
                  <Col >
              <Jumbotron >
                        <h1>{vendor?.vendor_name} </h1>
                        <h5>Joined: {vendor?.created_at.substring(0, 10)} </h5>
                        <h4>{products.length} items </h4>
                    </Jumbotron>
                    </Col>
                </Row>
              )
          }

      <h2>Products</h2>
      {vendorProductListLoading
        ? (<Loader />)
        : vendorProductListError
          ? (
            <Message variant='danger'>{error}</Message>
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

export default VendorScreen
