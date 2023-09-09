import React from 'react';

const Dashboard = () => {
  const user = {
    id: 1,
    username: 'bookworm123',
    email: 'bookworm@example.com',
    firstName: 'John',
    lastName: 'Doe',
  };

  return (
    <div className="container mt-5">
      <h4 style={{textAlign:'center',marginBottom:'5%'}}>User Dashboard</h4>
      <div className="row">
        <div className="col-md-4" >
          <div className="card" style={{backgroundColor:'skyblue'}}>
            <div className="card-body">
              <h5 className="card-title">User Information</h5>
              <p className="card-text">Username: {user.username}</p>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">Name: {user.firstName} {user.lastName}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8 card" style={{backgroundColor:'skyblue'}}>
          <h5>Your Books</h5>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
