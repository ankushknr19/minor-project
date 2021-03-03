import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getVendorOrderList } from '../../actions/orderActions'
import { Link } from 'react-router-dom'
import { VENDOR_ORDER_DETAILS_RESET } from '../../constants/orderConstants'

const VendorOrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const vendorOrderList = useSelector((state) => state.vendorOrderList)
  const { loading, error, vendorOrders } = vendorOrderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo?.is_vendor) {
      dispatch(getVendorOrderList())
      dispatch({type: VENDOR_ORDER_DETAILS_RESET})
    } else {
      history.push('/login/vendor')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders For You</h1>
      <h5>Click details to see the order items</h5>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        vendorOrders.length===0 ? 
          <Message variant='danger'>
         No orders yet !
          </Message> 
        :
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>Order Date</th>
              <th>Customer Name</th>
              <th>TOTAL PRICE</th>
              <th>DELIVERED</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody>
            {vendorOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.created_at?.substring(0, 10)}</td>
                <td>{order.name}</td>
                <td>Rs {order.total_price}</td>
                <td>
                  {order.is_fulfilled ? (
                    <center><i class="fa fa-check" style={{ color: 'green' }}></i></center>
                  ) : (
                    <center><i className='fas fa-times' style={{ color: 'red' }}></i></center>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/vendororders/${order.order_id}`}>
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

export default VendorOrderListScreen
