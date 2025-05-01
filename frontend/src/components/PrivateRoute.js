import React from "react";

const PrivateRoute = ({ page }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (!isAuthenticated) {
    return isAuthenticated ? (
      <div>{page}</div>
    ) : (
      <div>
        <h1>Access Denied</h1>
        <p>
          You need to log in to access this page.{" "}
          <a href="/">click here for login</a>
        </p>
      </div>
    );
  }
};

export default PrivateRoute;
