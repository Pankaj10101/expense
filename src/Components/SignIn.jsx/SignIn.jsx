import React, { useContext, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../../Context/context';

const SignIn = () => {
  const { onSignIn, onForgetPassword } = useContext(Store);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      onSignIn(email, password);
    } else {
      alert('Fill All Fields');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    onForgetPassword(email)
    alert('Password Reset Mail Sent');
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h2>Sign In</h2>
      <Form onSubmit={handleSignIn} className="w-25 d-flex flex-column gap-2">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4">
          Sign In
        </Button>
      </Form>

      <div className="mt-3 text-center">
        <p>
          <Link to="#" onClick={()=>setShowForgotPassword(true)}>
            Forgot Password?
          </Link>
        </p>
        <p>
          Don't have an account?{' '}
          <Link to="/sign-up">
            Create Account
          </Link>
        </p>
      </div>

      <Modal show={showForgotPassword} onHide={()=>setShowForgotPassword(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForgotPasswordSubmit}>
            <Form.Group controlId="forgotPasswordEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-3'>
              Reset Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignIn;
