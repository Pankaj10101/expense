import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../../Context/context';

const MyNavbar = () => {
  const { isLogin, onLogout, isCompleteProfile } = useContext(Store);

  return (
    <Navbar bg="light" expand="lg">
      <Link to="/">
        <Navbar.Brand className="ms-5">My App</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="me-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
        </Nav>
        <Nav>
          <div className="ml-auto">
            {isLogin ? (
              <React.Fragment>
                {!isCompleteProfile && (
                  <Nav.Link as={Link} to="/profile">
                    Your profile is incomplete.. <span>Complete Now</span>
                  </Nav.Link>
                )}
                {isCompleteProfile && (
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                )}
                <Button variant="outline-primary" onClick={onLogout}>
                  Logout
                </Button>
              </React.Fragment>
            ) : (
              <>
                <Link to="/sign-up">
                  <Button variant="primary" className="me-4">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/sign-in">
                  <Button variant="primary" className="me-4">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
