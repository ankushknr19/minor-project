import React from 'react'
// import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>

      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProjectOne</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>

              <LinkContainer to='/cart'  hidden = {userInfo?.is_vendor}>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'/> Cart
                </Nav.Link>
              </LinkContainer>

               {userInfo ? (    
                 <NavDropdown title={userInfo.name} id='username'  hidden = {userInfo?.is_vendor}>
                 <LinkContainer to='/profile'>
                   <NavDropdown.Item>Profile</NavDropdown.Item>
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
                    Sign In
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
             {userInfo && userInfo.is_vendor && (
                <NavDropdown title={userInfo.name} id='vendor'>
                  <LinkContainer to={`/vendor/productlist`}>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                 <LinkContainer to='/profile'>
                   <NavDropdown.Item>Profile</NavDropdown.Item>
                 </LinkContainer>
                  {/* <LinkContainer to='/vendor/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer> */}
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
