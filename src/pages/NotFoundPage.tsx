// src/pages/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "5rem",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#d9534f" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#0275d8",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
