import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const Header = () => {
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
              <NavDropdown title='Account' id='basic-nav-dropdown'>
                <NavDropdown.ItemText>
                  <i className='fas fa-user-circle' /> Customer
                </NavDropdown.ItemText>
                <NavDropdown.Item href='#action/3.1'>Sign In</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Sign Up</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.ItemText>
                  <i className='fas fa-user' /> Vendor
                </NavDropdown.ItemText>
                <NavDropdown.Item href='#action/3.3'>Sign In</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Register</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </header>
  )
}

export default Header
