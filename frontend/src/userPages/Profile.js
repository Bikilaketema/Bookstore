import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import ProfilePic from "../uploads/profile.png";
import jwt_decode from "jwt-decode";
import axios from "axios";
import capitalize from "../helperFunctions/helper";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    profilePicture: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);

  const handleEditPassword = () => {
    setPasswordEditMode(true);
  };

  const handleSavePassword = async () => {
    const userToken = localStorage.getItem("userToken");
    const password = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/user/profile/${userData._id}/password`,
        { password, newPassword, confirmNewPassword },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.data.success) {
        setPasswordEditMode(false);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log("Error saving new password:", error);
      setErrorMessage("Error saving new password.");
    }
  };

  const handleCancelPasswordEdit = () => {
    setPasswordEditMode(false);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        setErrorMessage("User not logged in.");
        return;
      }
      const decoded = jwt_decode(userToken);
      const userId = decoded.id;
      try {
        const response = await axios.get(
          `http://localhost:5000/user/profile/${userId}`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        const user = response.data.user;
        user.profilePicture = `http://localhost:5000${user.profilePicture}`;
        console.log(user.profilePicture);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setErrorMessage("Error fetching user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    // Save the edited profile information here
    const userToken = localStorage.getItem("userToken");
    const updatedUserData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/user/profile/${userData._id}`,
        updatedUserData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.data.success) {
        setUserData(updatedUserData);
        setEditMode(false);

      } else {
        setErrorMessage("Error saving profile information.");
      }
    } catch (error) {
      console.error("Error saving profile information:", error);
      setErrorMessage("Error saving profile information.");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  if (errorMessage) {
    return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <h4 style={{ marginBottom: '10%' }}>Error fetching your profile. Refresh the page and try again!</h4>
  </div>;
  }

  const firstName = capitalize(userData.firstName);
  const lastName = capitalize(userData.lastName);

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <Card className="mt-5">
            <Card.Header>
              <h4>Profile</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={ProfilePic}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Col>
                <Col md={8}>
                  {!editMode ? (
                    <>
                      <h5>
                        {firstName} {lastName}
                      </h5>
                      <p>
                        <b>Username:</b> {userData.username}
                      </p>
                      <p>
                        <b>Email:</b> {userData.email}
                      </p>
                      {!passwordEditMode ? (
                        <>
                          <Button
                            variant="primary"
                            onClick={handleEditProfile}
                            className="mr-2"
                            style={{ marginRight: "10px" }}
                          >
                            Edit Profile
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={handleEditPassword}
                          >
                            Change Password
                          </Button>
                        </>
                      ) : (
                        <>
                          <Form inline>
                            <Form.Group controlId="oldPassword">
                              <Form.Label>Old Password</Form.Label>{" "}
                              <Form.Control
                                type="password"
                                placeholder="Enter old password"
                              />
                            </Form.Group>{" "}
                            <Form.Group controlId="newPassword">
                              <Form.Label>New Password</Form.Label>{" "}
                              <Form.Control
                                type="password"
                                placeholder="Enter new password"
                              />
                            </Form.Group>{" "}
                            <Form.Group controlId="confirmNewPassword">
                              <Form.Label>Confirm New Password</Form.Label>{" "}
                              <Form.Control
                                type="password"
                                placeholder="Enter new password again"
                              />
                            </Form.Group>{" "}
                            <Button
                              variant="primary"
                              onClick={handleSavePassword}
                              style={{ marginRight: "10px" }}
                            >
                              Save Changes
                            </Button>{" "}
                            <Button
                              variant="secondary"
                              onClick={handleCancelPasswordEdit}
                            >
                              Cancel
                            </Button>
                          </Form>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Form>
                        <Form.Group controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={userData.firstName}
                          />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={userData.lastName}
                          />
                        </Form.Group>
                        <Form.Group controlId="username">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={userData.username}
                          />
                        </Form.Group>
                        <Form.Group controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue={userData.email}
                          />
                        </Form.Group>
                        {/* Add more fields as necessary */}
                        <div style={{marginTop:"10px"}}>
                        <Button
                          variant="primary"
                          onClick={handleSaveProfile}
                          style={{ marginRight: "10px"}}
                        >
                          Save Changes
                        </Button>{" "}
                        <Button variant="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        </div>
                      </Form>
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
