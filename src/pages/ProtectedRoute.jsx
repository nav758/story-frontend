import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function ProtectedRoute({ Component }) {
  const [token] = useState(localStorage.getItem("token"));
  const [isLoggedIn] = useState(!!token);
  return (<div>{isLoggedIn ? <Component /> : <Navigate to="/home" />}</div>);
}
