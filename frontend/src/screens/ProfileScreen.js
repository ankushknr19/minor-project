import React, {useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ history }) => {

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        // dispatch(getUserDetails('profile'))
      }
  }, [dispatch, history, userInfo, user])


  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        
      </Col>
    </Row>
  )
}

export default ProfileScreen
