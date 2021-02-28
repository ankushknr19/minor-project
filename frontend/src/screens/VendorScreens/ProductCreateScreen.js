import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

const ProductCreateScreen = ({ match, history }) => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [count_in_stock, setCount_in_stock] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('male')
  // const [brand, setBrand] = useState('')
  // const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo?.is_vendor) {
      history.push('/login/vendor')
    }

    if (successCreate) {
      history.push('/vendor/productlist')
    }
  }, [dispatch, history, userInfo, successCreate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct(
        name,
        image,
        description,
        price,
        count_in_stock,
        category
      )
    )
  }

  const discardHandler = (e) => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    window.history.back()
  }



  return (
    <>
      <FormContainer>
        <h1>Create Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {(
          <Form onSubmit={submitHandler}>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
                  <Form.Control 
                  as="select" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  >
                      <option>male</option>
                      <option>female</option>
                      <option>unisex</option>
                  </Form.Control>
            </Form.Group>

            <Form.Group controlId='count_in_stock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count In Stock'
                value={count_in_stock}
                onChange={(e) => setCount_in_stock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Create
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

export default ProductCreateScreen
