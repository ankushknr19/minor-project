import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Jumbotron } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { listVendors } from '../actions/vendorActions'
import Vendor from '../components/Vendor'
import VendorScreen from './VendorScreen'
import { getCart } from '../actions/cartActions'
import { getCustomerOrderList } from '../actions/orderActions'
import {VENDOR_DETAILS_RESET} from '../constants/vendorConstants'
import { LinkContainer } from 'react-router-bootstrap'

const HomeScreen = ({history}) => {

  const dispatch = useDispatch()

  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const vendorList = useSelector(state => state.vendorList)
  const { loading: vendorListLoading , error: vendorListError, vendors } = vendorList

  useEffect(() => {
    
    dispatch(listProducts())
    dispatch(listVendors())
    if(userInfo && userInfo?.is_customer){
      dispatch(getCart())
      dispatch(getCustomerOrderList())
    }
    dispatch({type: VENDOR_DETAILS_RESET})
  }, [dispatch, userInfo, history])

  return (
    <>
    {userInfo?.is_admin &&
      history.push('/admin')
    }
    {/* vendor home screen */}
    { userInfo && userInfo?.is_vendor ? 
      (
        <div>
        <VendorScreen id= { `${userInfo?.vendor_id}` } />
      </div>
      ):(

      


    <div>

    {/* <h1> Product Categories </h1> */}
    <Row>
      <Col>
      <LinkContainer to='/productscategory/male'>
          <Jumbotron > <center> <h1> Men Items </h1></center> </Jumbotron>
      </LinkContainer>
      </Col>
      <Col>
      <LinkContainer to='/productscategory/female'>
      <Jumbotron > <center> <h1> Women Items </h1></center> </Jumbotron>
      </LinkContainer>
      </Col>
      </Row>

      <Jumbotron style={{minWidth: '200px', height:'100px'}}> <center> <h1> Shops </h1></center> </Jumbotron>
            {vendorListLoading
            ? (<Loader/>)
          : vendorListError
          ? ( <Message variant='danger'>{error}</Message> )
        :(
          <Row>
          {
            vendors?.map(vendor => (
              <Col key={vendor.vendor_id} sm={6} md={4} lg={2} xl={2}>
                <Vendor vendor = {vendor} />
              </Col>
            ))
          }
        </Row>
        )
        }

      {/* <center><h1>Latest Products</h1></center> */}
      <br/>
      <Jumbotron style={{minWidth: '200px', height:'100px'}}> <center> <h1> Latest Products </h1></center> </Jumbotron>
      {loading
        ? (<Loader />)
        : error
          ? (
            <Message variant='danger'>{error}</Message>
            )

          : <Row>
            
            {products?.length === 0 && <Message variant='danger'>No product found</Message>}
            {products?.length > 0 &&
                products?.map(product => (
                  <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
            }
        
            </Row>
      }
            
    </div>
    )}
    </>
  )
}

export default HomeScreen
