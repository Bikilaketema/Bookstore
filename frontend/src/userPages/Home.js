import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "../styledComponents/navButton";

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
      className="relative flex flex-col justify-center items-center p-8 bg-slate-500 min-h-screen gap-8"
      style={{
        backgroundImage: `url('hero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute w-full h-full bg-black opacity-80"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl italic leading-normal text-white text-center">
          Welcome to BB Online Book Store
        </h1>
        <h5 className="lg:text-2xl text-white text-center">
          With us, you can shop online & help save your street at the same time.
          If you're looking for great value second-hand books, then World of
          Books is the place for you. As you may already know, we aren't like
          other online bookstores.
        </h5>
        <Button text="Explore Books" onClick={handleExploreClick}/>
      </div>
    </div>
  );
};

export default Home;
