import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }: { children: React.ReactNode, user: any }) => {
  if (!user) {
    // Redirect to homepage or login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;