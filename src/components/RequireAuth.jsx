import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading, isLoggingOut } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    if (!loading && !isAuthenticated && !isLoggingOut) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, loading, isLoggingOut, navigate, location]);

  // Show a loading indicator while the initial session check is running
  if (loading) {
    return <div>Loading session...</div>;
  }

  // Render the protected component if authenticated
  return isAuthenticated ? children : null;
};

export default RequireAuth;
