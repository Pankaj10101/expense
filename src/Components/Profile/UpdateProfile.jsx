import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";
import { Store } from "../../Context/context";

const UpdateProfile = () => {
  const {
    updateProfile,
    profileData,
    isCompleteProfile,
    setProfileData,
    sendVerificationEmail,
    isVerified
  } = useContext(Store);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateProfile(name, profilePhoto);
    setProfileData({ name, photo: profilePhoto });
  };

  const handleSendVerificationEmail = () => {
    sendVerificationEmail();
  };

  useEffect(() => {
    if (isCompleteProfile) {
      const { name, photo } = profileData;
      setName(name);
      setProfilePhoto(photo);
    } else {
      setName("");
      setProfilePhoto("");
    }
  }, [isCompleteProfile]);

  return (
    <div className="container">
      <h2 className="mt-5">Update Profile</h2>
      {!isVerified && (
        <Alert variant="warning">
          Your account is not verified. Click the button below to send a
          verification email.
          <Button variant="link" onClick={handleSendVerificationEmail}>
            Send verification email
          </Button>
        </Alert>
      )}
      {isVerified && <Alert variant="success">Your account is verified.</Alert>}


      {isCompleteProfile && (
        <Container className="my-3 py-3 border rounded">
          <Row className="align-items-center">
            <Col md={4}>
              <h4>Profile Name: {profileData.name}</h4>
            </Col>
            <Col md={8} className="text-center">
              <img
                src={profileData.photo}
                alt="Profile"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Col>
          </Row>
        </Container>
      )}
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

        <Form.Group controlId="profile-photo" className="mt-3">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;
