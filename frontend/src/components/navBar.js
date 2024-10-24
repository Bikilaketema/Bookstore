import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { NavButton } from "../styledComponents/navButton";
import {
  FaShoppingCart,
  FaInfoCircle,
  FaHome,
  FaTachometerAlt,
  FaKey,
  FaBook,
  FaPlusCircle,
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import jwt_decode from "jwt-decode";

const navstyle = {
  backgroundColor: "skyblue",
  display: "flex",
  alignItems: "center",
};

const ulstyle = {
  display: "flex",
  alignItems: "center",
};

const listyle = {
  margin: "30px",
  listStyleType: "none",
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleBooksClick = () => {
    navigate("/books");
  };

  const handleAdminsHomeClick = () => {
    navigate("/admin/");
  };

  const handleAddBooksClick = () => {
    navigate("/admin/books");
  };

  const handleUsersClick = () => {
    navigate("/admin/users");
  };

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserAuthenticated = !!localStorage.getItem("userToken");
  const isAdminAuthenticated = !!localStorage.getItem("adminToken");

  const handleUserLogout = () => {
    localStorage.removeItem("userToken");

    navigate("/login");
  };

  const [adminInfo, setAdminInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const fetchAdminInfo = () => {
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) {
      const decodedAdmin = jwt_decode(adminToken);

      setAdminInfo({
        firstName: decodedAdmin.firstName,
        lastName: decodedAdmin.lastName,
        email: decodedAdmin.email,
      });
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    fetchAdminInfo();
  }, [isAdminAuthenticated]);

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");

    navigate("/admin/login");
  };

  return (
    <>
      <nav className="bg-blue-400 p-2 flex flex-row items-center">
        <ul className="gap-8 flex flex-row p-2 items-center">
          <li>
            <img
              src="/BBLogo.jpg"
              alt="Logo"
              className="w-[50px] h-[50px] rounded-xl"
            />
          </li>

          {isAdminAuthenticated && isAdminRoute && (
            <>
              <li className="bg-blue-500 flex rounded-xl">
                <button onClick={handleAdminsHomeClick}>
                  {" "}
                  <FaHome />
                  Admin Home
                </button>
              </li>

              <li style={listyle}>
                <Button onClick={handleAddBooksClick}>
                  {" "}
                  <FaPlusCircle /> Add books{" "}
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleUsersClick}>
                  {" "}
                  <FaUser /> Users
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
                  <FaShoppingCart /> My Cart{" "}
                </Button>
              </li>

              <li style={listyle}>
                <Button onClick={handleProfileClick}>
                  {" "}
                  <FaUser /> My profile{" "}
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
              <NavButton
                onClick={handleHomeClick}
                lick
                text="Home"
                icon={<FaHome />}
              />
              <NavButton
                onClick={handleAboutClick}
                text="About"
                icon={<FaInfoCircle />}
              />
              <NavButton
                onClick={handleLoginClick}
                text="Log in"
                icon={<FaKey />}
              />
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
