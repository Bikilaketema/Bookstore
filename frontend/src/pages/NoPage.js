import React from "react";

const NoPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#ffffff", 
      }}
    >
      <img
      src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=2000" 
      alt="Page not found"
      style={{
        width: "300px", 
      }}
    />
      <p
        style={{
          fontSize: "1.2rem",
          color: "#555", // Text color
          margin: "10px 0",
        }}
      >
        Oops! The page you're looking for does not exist.
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#555", // Text color
          margin: "10px 0",
        }}
      >
        Maybe you mistyped the URL or the page has been moved.
      </p>
    </div>
  );
};

export default NoPage;
