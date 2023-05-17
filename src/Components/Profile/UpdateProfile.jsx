import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UpdateProfile = ({updateProfile}) => {
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(name, profilePhoto)
    setName('');
    setProfilePhoto('')
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <Form onSubmit={handleUpdateProfile}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="profile-photo">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;
