import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createCustomerAddress, getCustomerAddress } from '../../actions/addressActions'
import { CUSTOMER_ADDRESS_CREATE_RESET } from '../../constants/addressConstants'

const AddressCreateScreen = ({ match, history }) => {

  const [name, setName] = useState('')
  const [phone_number, setPhoneNumber] = useState()
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const customerAddressCreate = useSelector((state) => state.customerAddressCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = customerAddressCreate

  useEffect(() => {
    dispatch({ type: CUSTOMER_ADDRESS_CREATE_RESET })

    if (!userInfo || !userInfo?.is_customer) {
      history.push('/login')
    }

    if (successCreate) {
    dispatch(getCustomerAddress())
    window.history.back()
    }
  }, [dispatch, history, userInfo, successCreate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createCustomerAddress(
        name,
        phone_number, 
        city, 
        area, 
        address
      )
    )
  }

  const discardHandler = (e) => {
    dispatch({ type: CUSTOMER_ADDRESS_CREATE_RESET })
    window.history.back()
  }
 
  return (
    <>
      <FormContainer>
        <h2>Add Shipping Address</h2>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {(
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter full name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone_number'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter phone number'
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='area'>
              <Form.Label>Area</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Area'
                value={area}
                onChange={(e) => setArea(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Add Address
            </Button>
          </Form>
        )}
        <Button type='submit' variant='secondary' onClick={discardHandler}>
              Cancel
            </Button>
      </FormContainer>
    </>
  )
}

export default AddressCreateScreen
