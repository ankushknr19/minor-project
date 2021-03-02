import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Image, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getVendorOrderDetailsList } from '../../actions/orderDetailsActions'
import { Link } from 'react-router-dom'

const VendorOrderDetailsListScreen = ({ match, history }) => {


  const dispatch = useDispatch()

  const vendorOrderDetailsList = useSelector((state) => state.vendorOrderDetailsList)
  const { loading, error, vendorOrders } = vendorOrderDetailsList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo?.is_vendor) {
      dispatch(getVendorOrderDetailsList())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>OD ID</th>
              <th>DATE</th>
              <th>PRODUCT</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>AMOUNT</th>
              <th>CUSTOMER ID</th>
              <th>DISPATCHED</th>
            </tr>
          </thead>
          <tbody>
            {vendorOrders.map((orderItem) => (
              <tr key={orderItem.order_details_id}>
                    <td >
                          {orderItem.order_details_id}
                    </td>
                    <td>
                          {orderItem.created_at?.substring(0, 10)}
                    </td>
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
                          {orderItem.product_name}
                        </Link>
                    </td>
                <td>{orderItem.qty}</td>
                <td>Rs {orderItem.price}</td>
                <td>Rs {orderItem.qty * orderItem.price}</td>
                <td> {orderItem.customer_id}</td>
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

export default VendorOrderDetailsListScreen
