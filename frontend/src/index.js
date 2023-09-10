import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Header />}>
                  <Route index element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="login" element={<Login />} />
                  <Route path="about" element={<About />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="books" element={<Books />} />
                  <Route path="admin" element={<AdminLogin />} />
                  <Route path="admin/home" element={<AdminsHome />} />
                  <Route path="admin/books" element={<AddBooks />} />
                  <Route path="/books/detail/:id" element={<BookDetails />} />
                  <Route path="/admin/books/update/:id" element={<UpdateBooks />} />
                  <Route path="/admin/books/:id" element={<BookDetails />} />
                  <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);