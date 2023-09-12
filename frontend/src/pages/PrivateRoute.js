import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" state={{ from: rest.location }} />
  );
};

export default PrivateRoute;
