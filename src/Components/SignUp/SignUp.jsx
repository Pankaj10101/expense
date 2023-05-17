import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SignUp = ({ onSignup, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if(email && password && confirmPassword && password===confirmPassword){
        onSignup(email, password)
    }else if(email && password && confirmPassword && password!==confirmPassword){
        alert('Password not match')
    }else{
        alert('Fill All Fields')
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h2>Signup</h2>
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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4" >
          Sign Up
        </Button>
      </Form>

      <div className="mt-3">
        <p>Already have an account? <a href="#" onClick={onLogin}>Login</a></p>
      </div>
    </div>
  );
};

export default SignUp;
