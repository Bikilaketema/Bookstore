import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/navBar';
import Home from './userPages/Home';
import Profile from "./userPages/Profile";
import Users from './adminPages/Users';
import Dashboard from './userPages/Dashboard';
import Login from './userPages/Login';
import NoPage from './pages/NoPage';
import About from './pages/About';
import Signup from './userPages/Signup';
import Cart from './userPages/Cart';
import Books from './pages/Books';
import AdminLogin from './adminPages/AdminLogin';
import AddBooks from './adminPages/AddBooks';
import AddUser from './adminPages/AddUser';
import BookDetails from './pages/BookDetails';
import UpdateBooks from './adminPages/UpdateBooks';
import Checkout from './userPages/Checkout';
import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './index.css'; 

export default function App() {
  const isUserAuthenticated = () => {
    const userToken = localStorage.getItem('userToken');
    return userToken !== null;
  };

  const isAdminAuthenticated = () => {
    const adminToken = localStorage.getItem('adminToken');
    return adminToken !== null;
  };

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // Token is considered expired if it cannot be decoded
    }
  };

  const handleTokenExpiration = (isAdminRoute, isAuthenticated, token) => {
    if (isAuthenticated && isTokenExpired(token)) {
      // Token has expired; remove it from local storage
      localStorage.removeItem(isAdminRoute ? 'adminToken' : 'userToken');

      // Redirect to the login page
      return <Navigate to={isAdminRoute ? '/admin/login' : '/login'} />;
    }

    return null;
  };

  const ProtectedRoute = ({ element }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const userAuthenticated = isUserAuthenticated();
    const adminAuthenticated = isAdminAuthenticated();
    const tokenKey = isAdminRoute ? 'adminToken' : 'userToken';
    const token = localStorage.getItem(tokenKey);

        // Handle token expiration and redirection
        const tokenExpirationRedirect = handleTokenExpiration(isAdminRoute, isUserAuthenticated, token);
        if (tokenExpirationRedirect) {
          return tokenExpirationRedirect;
        }

    if (location.pathname === '/admin/login' && !adminAuthenticated) {
      return element;
    } else if (isAdminRoute && !adminAuthenticated) {
      return <Navigate to="/admin/login" />;
    } else if (!isAdminRoute && !userAuthenticated) {
      return <Navigate to="/login" />;
    } else {
      return element;
    }
  };
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="/books" element={<ProtectedRoute element={<Books />} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/" element={<ProtectedRoute element={<Books />} />} />
          <Route path="/admin/users" element={<ProtectedRoute element={<Users />} />} />
          <Route path="/admin/adduser" element={<ProtectedRoute element={<AddUser />} />} />
          <Route path="/admin/books" element={<ProtectedRoute element={<AddBooks />} />} />
          <Route path="/books/detail/:id" element={<ProtectedRoute element={<BookDetails />} />} />
          <Route path="/admin/books/update/:id" element={<ProtectedRoute element={<UpdateBooks />} />} />
          <Route path="/admin/books/:id" element={<ProtectedRoute element={<BookDetails />} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

