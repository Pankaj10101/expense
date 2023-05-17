import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = ({ isLogin, onLogout, onSignIn }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Link to='/'><Navbar.Brand className='ms-5'>My App</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='me-5' style={{display:'flex', justifyContent:'space-between'}}>
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
        <Nav>
          <div className="ml-auto">
            {isLogin ? (
              <React.Fragment>
                <Nav.Link href="/profile">Your profile is incomplete..<Link to='/profile'> Complete Now</Link></Nav.Link>
                <Button variant="outline-primary" onClick={onLogout}>Logout</Button>
              </React.Fragment>
            ) : (
                <>
              <Link to='/sign-up'><Button variant="primary" className='me-4' onClick={onSignIn}>Sign Up</Button></Link>
              <Button variant="primary" onClick={onSignIn}>Sign In</Button>
              </>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
