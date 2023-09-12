import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Books from "./pages/Books";
import AdminLogin from "./pages/AdminLogin";
import AdminsHome from "./pages/AdminsHome";
import AddBooks from "./pages/AddBooks";
import BookDetails from "./pages/BookDetails";
import UpdateBooks from "./pages/UpdateBooks";
import { useLocation } from 'react-router-dom';

export default function App() {

  function isUserAuthenticated() {
    const userToken = localStorage.getItem("userToken");
    return userToken !== null;
  }

  function isAdminAuthenticated() {
    const adminToken = localStorage.getItem("adminToken");
    return adminToken !== null;
  }

  function ProtectedRoute({ element }) {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const userAuthenticated = isUserAuthenticated();
    const adminAuthenticated = isAdminAuthenticated();

    if (location.pathname === '/admin/login' && !adminAuthenticated) {
      return element;
    } else if (isAdminRoute && !adminAuthenticated) {
      return <Navigate to="/admin/login" />;
    } else if (!isAdminRoute && !userAuthenticated) {
      return <Navigate to="/login" />;
    } else {
      return element;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="books" element={<ProtectedRoute element={<Books />} />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/" element={<ProtectedRoute element={<AdminsHome />} />} />
          <Route path="admin/books" element={<ProtectedRoute element={<AddBooks />} />} />
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
