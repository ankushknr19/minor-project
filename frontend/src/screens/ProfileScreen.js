import React, {useEffect } from 'react'
import { Table, Form, Button, Row, Col, ListGroup, Jumbotron, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import { deleteCustomerAddress, getCustomerAddress } from '../actions/addressActions'
import { Link } from 'react-router-dom'

const ProfileScreen = ({ history }) => {

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const customerAddress = useSelector((state) => state.customerAddress)
  const { loading: addressLoading,
    error: addressError, 
    address } = customerAddress

  const customerAddressDelete = useSelector((state) => state.customerAddressDelete)
  const { loading: deleteLoading,
    error: deleteError, 
    success: successDelete } = customerAddressDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        dispatch(getUserDetails('profile'))
        dispatch(getCustomerAddress())
      }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCustomerAddress())
    }
  }


  return (
    <>
        <h2>My Profile</h2>
        <Row>
          <Col md={8}>
        <Jumbotron>
            <h1>{user?.name} </h1>
        <span> {user?.email}</span>
        </Jumbotron>
        <LinkContainer to={`/updateprofile`}>
                        <Button
                           variant='secondary'
                            className='btn-sm'
                        >
                             <i className='fas fa-edit'/> Edit Profile 
                        </Button>
                        </LinkContainer>
        </Col>
        <Col md={4}>
        <h3>Shipping Address</h3>
        {address?.length === 0 ? (  
            <LinkContainer to='/createaddress'>
            <Button variant="outline-dark" type="button"> 
               <i className='fas fa-plus'/>  Add Address
             </Button>
           </LinkContainer>
        ) : ( 
          <ListGroup variant='flush'>
            {
              userInfo?.customer_id === address?.customer_id &&
              <ListGroup.Item key={address?.product_id}>
                <Row>
                  <Col>
                  <Row>
                    {address?.name}
                  </Row>
                  <Row>
                      {address?.phone_number}
                  </Row>
                  <Row> 
                      {address?.city}
                  </Row> 
                  <Row> 
                       {address?.area}
                  </Row> 
                  <Row> 
                       {address?.address}
                  </Row> 
                    <Row>
                      <Col>
                      <LinkContainer to={`/editaddress`}>
                        <Button
                           variant='secondary'
                            className='btn-sm'
                        >
                             <i className='fas fa-edit'/> Edit
                        </Button>
                        </LinkContainer>
                      </Col>
                      <Col>
                        <Button
                           variant='secondary'
                            className='btn-sm'
                            onClick={() => deleteHandler()}
                        >
                             <i className='fas fa-trash'/> Delete
                        </Button>
                      </Col>
                      </Row>
                  
                  </Col>
                </Row>
              </ListGroup.Item>
            }
          </ListGroup>    
        )}
      </Col>
    </Row>
    </>
  )
}

export default ProfileScreen
