import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Image, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getVendorOrderDetails } from '../../actions/orderDetailsActions'
import { Link } from 'react-router-dom'

const VendorOrderDetailsScreen = ({ match, history }) => {

  const orderId = match.params.id

  const dispatch = useDispatch()

  const vendorOrderDetails = useSelector((state) => state.vendorOrderDetails)
  const { loading, error, orderDetails } = vendorOrderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo?.is_vendor) {
      dispatch(getVendorOrderDetails(orderId))
    } else {
      history.push('/login/vendor')
    }
  }, [dispatch, history, userInfo, orderId])

  return (
    <>
      <h1>Order Details</h1>
      <h5>Order ID: {orderId}</h5>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>PRODUCT NAME</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>AMOUNT</th>
              <th>DISPATCHED</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((orderItem) => (
              <tr key={orderItem.product_id}>
                    <td>
                    <Link to={`/products/${orderItem.product_id}`}>
                          <Image
                            src={orderItem.product_image}
                            alt={orderItem.product_name}
                            fluid
                            rounded
                            style={{
                              width: '100px'
                            }}
                          />
                          </Link>
                          </td>
                  <LinkContainer to={`/products/${orderItem.product_id}`}>
                    <td>
                          {orderItem.product_name}
                    </td>
                </LinkContainer>
                <td>{orderItem.qty}</td>
                <td>Rs {orderItem.price}</td>
                <td>Rs {orderItem.qty * orderItem.price}</td>
                <td>
                  {orderItem.is_fulfilled ? (
                    <center><i class="fa fa-check" style={{ color: 'green' }}></i></center>
                  ) : (
                    <center><i className='fas fa-times' style={{ color: 'red' }}></i></center>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default VendorOrderDetailsScreen
