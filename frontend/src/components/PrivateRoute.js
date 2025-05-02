import { useEffect, useState } from "react";
import React from "react";

const PrivateRoute = ({ page }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated")
  );

  return isAuthenticated ? (
    { page }
  ) : (
    <div>
      <h1>Access Denied</h1>
      <p>
        You need to log in to access this page.{" "}
        <a href="/">click here for login</a>
      </p>
    </div>
  );
};

export default PrivateRoute;
