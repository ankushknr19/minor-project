import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getCustomerOrderList } from '../../actions/orderActions'

const CustomerOrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const customerOrderList = useSelector((state) => state.customerOrderList)
  const { loading, error, customerOrders } = customerOrderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo?.is_customer) {
      dispatch(getCustomerOrderList())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>My Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>Order Date</th>
              <th>TOTAL PRICE</th>
              <th>PAYMENT ID</th>
              <th>SHIPPING ADDRESS</th>
              <th>DELIVERED</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody>
            {customerOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.created_at.substring(0, 10)}</td>
                <td>Rs {order.total_price}</td>
                <td>{order.payment_id}</td>
                <td>{order.shipping_address}</td>
                <td>
                  {order.is_fulfilled ? (
                    <center><i class="fa fa-check" style={{ color: 'green' }}></i></center>
                  ) : (
                    <center><i className='fas fa-times' style={{ color: 'red' }}></i></center>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/myorders/${order.order_id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default CustomerOrderListScreen
