import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaShoppingCart, FaInfoCircle, FaHome, FaTachometerAlt, FaKey, FaBook, FaPlusCircle, FaSignOutAlt, FaUser, FaEnvelope } from 'react-icons/fa';
import jwt_decode from 'jwt-decode';

const navstyle = {
  backgroundColor: 'skyblue',
  display: 'flex',
  alignItems: 'center'
}

const ulstyle = {
  display: 'flex',
  alignItems: 'center'
}

const listyle = {
  margin: '30px',
  listStyleType: 'none'
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleBooksClick = () => {
    navigate('/books');
  };

  const handleAdminsHomeClick = () => {
    navigate('/admin/');
  };

  const handleAddBooksClick = () => {
    navigate('/admin/books');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserAuthenticated = !!localStorage.getItem('userToken'); 
  const isAdminAuthenticated = !!localStorage.getItem('adminToken'); 

  const handleUserLogout = () => {
   
    localStorage.removeItem('userToken'); 

    navigate('/login'); 
  };

  
  const [adminInfo, setAdminInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const fetchAdminInfo = () => {
    const adminToken = localStorage.getItem('adminToken');

    if (adminToken) {
      const decodedAdmin = jwt_decode(adminToken);

      setAdminInfo({
        firstName: decodedAdmin.firstName,
        lastName: decodedAdmin.lastName,
        email: decodedAdmin.email
      });
    }
  };

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    fetchAdminInfo();
  }, [isAdminAuthenticated]); 


  const handleAdminLogout = () => {
    
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
  
    navigate('/admin/login'); 
  };
  

  const token = localStorage.getItem("userToken");
  let userData = null; 
  
  if (token) {
    
    const decoded = jwt_decode(token);
  
    userData = {
      username: decoded.username,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };
  } 
  

  return (
    <>
      <nav style={navstyle}>
        <ul style={ulstyle}>
          <li style={listyle}>
            <img
              src="/BBLogo.jpg"
              alt="Logo"
              style={{
                width: "50px",
                borderRadius: "10px",
                marginLeft: "5px",
                alignSelf: "center",
              }}
            />
          </li>

          {isAdminAuthenticated && isAdminRoute && (
            <>
              <li style={listyle}>
                <Button onClick={handleAdminsHomeClick}>
                  {" "}
                  <FaHome />
                  Admin Home
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleAddBooksClick}>
                  {" "}
                  <FaPlusCircle /> Add books{" "}
                </Button>
              </li>

              <li style={listyle}>
                <Button>
                  {" "}
                  <FaUser /> {adminInfo.firstName} {adminInfo.lastName}{" "}
                </Button>
              </li>

              <li style={listyle}>
                <Button>
                  {" "}
                  <FaEnvelope /> {adminInfo.email}{" "}
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleAdminLogout}>
                  {" "}
                  <FaSignOutAlt /> Log out{" "}
                </Button>
              </li>
            </>
          )}

          {!isAdminRoute && isUserAuthenticated && (
            <>
              <li style={listyle}>
                <Button onClick={handleBooksClick}>
                  {" "}
                  <FaBook /> Books{" "}
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleDashboardClick}>
                  {" "}
                  <FaTachometerAlt />
                  Dashboard
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleCartClick}>
                  {" "}
                  <FaShoppingCart /> Your Cart{" "}
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleProfileClick}>
                  {" "}
                  <FaUser /> {userData.firstName} {userData.lastName}{" "}
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleUserLogout}>
                  {" "}
                  <FaSignOutAlt /> Log out{" "}
                </Button>
              </li>
            </>
          )}

          {!isAdminRoute && !isUserAuthenticated && (
            <>
              <li style={listyle}>
                <Button onClick={handleHomeClick}>
                  {" "}
                  <FaHome /> Home
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleAboutClick}>
                  {" "}
                  <FaInfoCircle /> About
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleLoginClick}>
                  {" "}
                  <FaKey /> Log in
                </Button>
              </li>
            </>
          )}

          {isAdminRoute && (
            <>
              <li style={listyle}></li>
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Header;
