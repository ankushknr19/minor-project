import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getCustomerOrderDetails } from '../../actions/orderDetailsActions'

const CustomerOrderDetailsScreen = ({ match, history }) => {

  const orderId = match.params.id

  const dispatch = useDispatch()

  const customerOrderDetails = useSelector((state) => state.customerOrderDetails)
  const { loading, error, orderDetails } = customerOrderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo?.is_customer) {
      dispatch(getCustomerOrderDetails(orderId))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, orderId])

  return (
    <>
      <h1>Order Details</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>VENDOR NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>AMOUNT</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((orderItem) => (
              <tr key={orderItem.product_id}>
                  <LinkContainer to={`/products/${orderItem.product_id}`}>
                    <td>
                          {orderItem.product_name}
                    </td>
                  </LinkContainer>
                <td>{orderItem.vendor_name}</td>
                <td>Rs {orderItem.price}</td>
                <td>{orderItem.qty}</td>
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

export default CustomerOrderDetailsScreen
