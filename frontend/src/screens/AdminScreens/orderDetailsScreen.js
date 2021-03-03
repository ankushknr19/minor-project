import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Image, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getAllOrderDetails } from '../../actions/orderDetailsActions'
import { Link } from 'react-router-dom'

const OrderDetailsScreen = ({ match, history }) => {

  const orderId = match.params.id

  const dispatch = useDispatch()

  const allOrderDetails = useSelector((state) => state.allOrderDetails)
  const { loading, error, orderDetails } = allOrderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo?.is_admin) {
      dispatch(getAllOrderDetails(orderId))
    } else {
      history.push('/login')
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
              <th>VENDOR NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>AMOUNT</th>
              <th>DISPATCHED BY VENDOR</th>
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
                  <LinkContainer to={`/vendors/${orderItem.vendor_id}`}>
                <td>{orderItem.vendor_name}</td>
                </LinkContainer>
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

export default OrderDetailsScreen
