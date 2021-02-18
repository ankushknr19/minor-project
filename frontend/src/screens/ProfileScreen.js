import React, {useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import { getCustomerAddress } from '../actions/customerActions'

const ProfileScreen = ({ history }) => {

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const customerAddress = useSelector((state) => state.customerAddress)
  const { loading: addressLoading,
    error: addressError, 
    address } = customerAddress

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        dispatch(getUserDetails('profile'))
        dispatch(getCustomerAddress())
      }
  }, [dispatch, history, userInfo])


  return (
    <Row>
      <Col md={4}>
        <h2>My Profile</h2>
        <br/>
        <h4> {user.name} </h4>
        <br/>
        <h4>Shipping Address</h4>


        {address ? (    
                <span> {address.name}
                <br/>
                {address.phone_number}
                <br/>
                {address.city}
                <br/>
                {address.area}
                <br/>
                {address.address} </span>
             ) : (
              <span> Address not set yet ! </span>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
