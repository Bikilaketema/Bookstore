import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert } from "react-bootstrap";
import axios from "axios";
import capitalize from "../helperFunctions/helper";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Make a GET request to fetch users
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin`)
      .then((response) => {
        // Update the state with the fetched users
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const deleteUserHandler = async (userId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/deleteuser/${userId}`
      );
      // Update the deletedUsers state to keep track of deleted users
      setDeletedUsers([...deletedUsers, userId]);
      // Show the alert
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = () => {
    navigate("/admin/adduser");
  };

  return (
    <Container>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          User deleted successfully!
        </Alert>
      )}
      <Button
        style={{ width: "100%", marginTop: "10px" }}
        onClick={handleAddUser}
      >
        Add User
      </Button>
      {users.map(
        (user) =>
          !deletedUsers.includes(user._id) && (
            <Card
              key={user._id}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
                backgroundColor: "skyblue",
                padding: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h6>
                  {capitalize(user.firstName)} {capitalize(user.lastName)}
                </h6>
              </div>
              <div>
                <Button
                  title="Delete"
                  onClick={() => deleteUserHandler(user._id)}
                  variant="danger"
                  className="btn-sm"
                >
                  {" "}
                  Delete{" "}
                </Button>
              </div>
            </Card>
          )
      )}
    </Container>
  );
};

export default Users;
