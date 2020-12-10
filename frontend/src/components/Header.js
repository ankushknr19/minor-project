import React from 'react'
// import { Route } from 'react-router-dom'
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
              <LinkContainer to='/wishlist'>
                <Nav.Link>
                  <i className='fas fa-heart' /> Wishlist
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart' /> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (    
                 <NavDropdown title={userInfo.name} id='username'>
                 <LinkContainer to='/profile'>
                   <NavDropdown.Item>Profile</NavDropdown.Item>
                 </LinkContainer>
                 <NavDropdown.Item onClick={logoutHandler}>
                   Logout
                 </NavDropdown.Item>
               </NavDropdown>
             ) : (
              <NavDropdown title='Account' id='basic-nav-dropdown'>
                <NavDropdown.ItemText>
                  <i className='fas fa-user-circle' /> Customer
                </NavDropdown.ItemText>
                <LinkContainer to='/login'>
                <NavDropdown.Item >Sign In</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/register'>
                <NavDropdown.Item>Sign Up</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.ItemText>
                  <i className='fas fa-user' /> Vendor
                </NavDropdown.ItemText>
                <NavDropdown.Item href='#action/3.3'>Sign In</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Register</NavDropdown.Item>
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
