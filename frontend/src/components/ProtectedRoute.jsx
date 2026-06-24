import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // 1. If no token, kick them to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. If a specific role is required, check if the user has it
  if (requiredRole && user?.role !== requiredRole) {
    // If they don't have the role, kick them back to the home page
    return <Navigate to="/" replace />; 
  }

  // 3. If they are logged in and have the correct role, let them in
  return children;
}