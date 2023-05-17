import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignIn = ({ onSignIn, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if(email && password){
        onSignIn(email, password)
    }else{
        alert('Fill All Fields')
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h2>Sign In</h2>
      <Form onSubmit={handleSignup} className="w-25 d-flex flex-column gap-2">
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

        <Button variant="primary" type="submit" className="w-100 mt-4" >
          Sign In
        </Button>
      </Form>

      <div className="mt-3">
        <p>Don't have an account? <Link to='/sign-up' onClick={onLogin}>Create Account</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
