import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaShoppingCart, FaInfoCircle, FaHome, FaTachometerAlt, FaKey, FaBook, FaPlusCircle,FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
    navigate('/admin/home');
  };

  const handleAddBooksClick = () => {
    navigate('/admin/books');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <nav style={navstyle}>
        <ul style={ulstyle}>
          <li style={listyle}><img src="/BBLogo.jpg" alt="Logo" style={{
            width: '50px',
            borderRadius: '10px',
            marginLeft: '5px',
            alignSelf: 'center'
          }} /></li>

          {isAdminRoute && (
          <li style={listyle}>
            <Button onClick={handleAdminsHomeClick}> <FaHome />Admin Home</Button>
          </li>
          )}

          {isAdminRoute && (
          <li style={listyle}>
          <Button onClick={handleAddBooksClick}> <FaPlusCircle /> Add books </Button>
        </li>
          )}

        {isAdminRoute && (
        <li style={listyle}>
        <Button> <FaSignOutAlt /> Log out </Button>
      </li>
        )}

        {!isAdminRoute && (
          <li style={listyle}>
          <Button onClick={handleHomeClick}> <FaHome /> Home</Button>
          </li>
        )}  

          {!isAdminRoute && (
            <li style={listyle}>
              <Button onClick={handleBooksClick}> <FaBook /> Books </Button>
            </li>
          )}

          {!isAdminRoute && (
            <li style={listyle}>
              <Button onClick={handleDashboardClick}> <FaTachometerAlt />Dashboard</Button>
            </li>
          )}

          {!isAdminRoute && (
            <li style={listyle}>
              <Button onClick={handleLoginClick}> <FaKey /> Log in</Button>
            </li>
          )}

          {!isAdminRoute && (
            <li style={listyle}>
              <Button onClick={handleAboutClick}> <FaInfoCircle /> About</Button>
            </li>
          )}

          {!isAdminRoute && (
            <li style={listyle}>
              <Button onClick={handleCartClick}> <FaShoppingCart /> Your Cart </Button>
            </li>
          )}

          {isAdminRoute && (
            <>
              <li style={listyle}>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Header;
