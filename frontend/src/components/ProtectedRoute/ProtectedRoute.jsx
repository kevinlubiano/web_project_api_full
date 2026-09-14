import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ loggedIn, isCheckingAuth }) {
  if (isCheckingAuth) {
    return null;
  }

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
