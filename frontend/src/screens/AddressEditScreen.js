import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { CUSTOMER_ADDRESS_UPDATE_RESET } from '../constants/addressConstants'
import { getCustomerAddress, updateCustomerAddress } from '../actions/addressActions'

const AddressEditScreen = ({ match, history }) => {

  const [name, setName] = useState('')
  const [phone_number, setPhoneNumber] = useState()
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const [addressForm, setAddressForm] = useState('')

  const dispatch = useDispatch()

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerAddress = useSelector((state) => state.customerAddress)
  const { loading, error, address } = customerAddress

  const customerAddressUpdate = useSelector((state) => state.customerAddressUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customerAddressUpdate

  useEffect(() => {

    if (!userInfo || !userInfo?.is_customer) {
      history.push('/login')
    }

    if (successUpdate) {
      dispatch({ type: CUSTOMER_ADDRESS_UPDATE_RESET })
      window.history.back()
    } else {
      if (!address) {
        dispatch(getCustomerAddress())
      } else {
        setName(address.name)
        setPhoneNumber(address.phone_number)
        setCity(address.city)
        setArea(address.area)
        setAddressForm(address.address)
      }
    }  
  }, [dispatch, history, userInfo, address, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCustomerAddress({
        name,
        phone_number, 
        city, 
        area, 
        address: addressForm
      })
    )
  }

  const discardHandler = (e) => {
    dispatch({ type: CUSTOMER_ADDRESS_UPDATE_RESET })
    window.history.back()
  }

  return (
    <>
      <FormContainer>
        <h1>Edit Address</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
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
                placeholder='Enter city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='area'>
              <Form.Label>Area</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter area'
                value={area}
                onChange={(e) => setArea(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='addressForm'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={addressForm}
                onChange={(e) => setAddressForm(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update Address
            </Button>
            <Button type='submit' variant='secondary' onClick={discardHandler}>
              Cancel
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AddressEditScreen
