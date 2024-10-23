import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// Move the isUserAuthenticated function outside of the component
function isUserAuthenticated() {
  const userToken = localStorage.getItem("userToken");
  return userToken !== null;
}

const Home = () => {
  const divStyle = {
    backgroundImage: `url('/hero.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
  };

  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (isUserAuthenticated()) {
      // Corrected the function invocation
      navigate("/books");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center p-8 bg-slate-500 min-h-screen gap-8"
      style={{
        backgroundImage: `url('hero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-2xl italic leading-normal text-white">
        Welcome to BB Online Book Store
      </h1>
      <h5 className="text-2xl text-gray-300">
        With us, you can shop online & help save your street at the same time.
        If you're looking for great value second-hand books, then World of Books
        is the place for you. As you may already know, we aren't like other
        online bookstores.
      </h5>
      <Button className="btn btn-primary mt-4" onClick={handleExploreClick}>
        Explore Books
      </Button>
    </div>
  );
};

export default Home;
