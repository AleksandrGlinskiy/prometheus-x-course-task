import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element, path }) => {
  const isUserAuthenticated = () => {     
    return !!localStorage.getItem("username");
  };
  
  return isUserAuthenticated() ? (
    element
  ) : (
    <Navigate to="/" state={{ from: path }} />
  );
};