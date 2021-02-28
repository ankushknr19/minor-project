import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Image, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  listVendorProducts,
  deleteProduct,
} from '../../actions/productActions'

const ProductListScreen = ({ history, match }) => {

  const dispatch = useDispatch()

  const vendorProductList = useSelector((state) => state.vendorProductList)
  const { loading, error, products } = vendorProductList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if (!userInfo || !userInfo?.is_vendor) {
      history.push('/login/vendor')
    }

    dispatch(listVendorProducts(userInfo?.vendor_id))
  }, [
    dispatch,
    match,
    history,
    userInfo,
    successDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
        <LinkContainer to={`/vendor/addproduct`}>
          <Button className='my-3'>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>Description</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.product_id}>
                  <td><Image src={product.product_image} alt={product.product_name} fluid 
                  style={{
                    height: '140px',
                    width: '120px'
                  }}/></td>
                  <td>{product.product_name}</td>
                  <td>Rs{product.product_price}</td>
                  <td style={{
                    width: '230px'
                  }}>{product.product_description}</td>
                  <td>{product.count_in_stock}</td>
                  <td>
                    <LinkContainer to={`/vendor/product/${product.product_id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product.product_id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} is_vendor={true} /> */}
        </>
      )}
    </>
  )
}

export default ProductListScreen
