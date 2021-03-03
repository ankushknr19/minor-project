import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cartList = useSelector((state) => state.cartList)
  const { cartItems } = cartList

  const newCartItem = useSelector(state => state.newCartItem)
  const { success: addCartSuccess } = newCartItem

useEffect(()=>{
  console.log(cartItems?.length)
})
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>

      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProjectOne</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>

              <LinkContainer to='/cart'  hidden = {userInfo?.is_vendor || userInfo?.is_admin}>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'/> 
                  Cart
                  { cartItems?.length >0 &&
                    <span>({cartItems?.length}) </span>
                  }
                  <Badge variant="secondary" hidden = {!addCartSuccess} > New </Badge>
                </Nav.Link>
              </LinkContainer>

               {userInfo && !userInfo?.is_vendor ? (    
                 <NavDropdown title={userInfo.name} id='username'  >
                 <LinkContainer to='/profile'>
                   <NavDropdown.Item hidden = {userInfo?.is_admin} >Profile</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to='/myorders'>
                   <NavDropdown.Item hidden = {userInfo?.is_admin} >My Orders</NavDropdown.Item>
                 </LinkContainer>
                 <NavDropdown.Item onClick={logoutHandler}>
                   Logout
                 </NavDropdown.Item>
               </NavDropdown>
             ) : (
              <NavDropdown title='Account' id='basic-nav-dropdown'  hidden = {userInfo?.is_vendor}>
                <NavDropdown.ItemText>
                  <i className='fas fa-user-circle' /> Customer
                </NavDropdown.ItemText>
                <LinkContainer to='/login'>
                  <NavDropdown.Item >
                    Sign In
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <NavDropdown.Item>
                    Sign Up
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.ItemText>
                  <i className='fas fa-user' /> Vendor
                </NavDropdown.ItemText>
                <LinkContainer to='/login/vendor'>
                  <NavDropdown.Item>
                    Login
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/register/vendor'>
                  <NavDropdown.Item>
                    Register
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
             )}
             

             {/* vendor header */}
             {userInfo && userInfo?.is_vendor && (
                    
                <NavDropdown title={userInfo.name} id='vendor'>
                  <LinkContainer to={`/vendor/productlist`}>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/vendororders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                 <LinkContainer to='/profile'>
                   <NavDropdown.Item>Profile</NavDropdown.Item>
                 </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                   Logout
                 </NavDropdown.Item>
                </NavDropdown>
  
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </header>
  )
}

export default Header
