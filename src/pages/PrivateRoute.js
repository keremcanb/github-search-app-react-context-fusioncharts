import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Children is dashboard, grap rest of the props
const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Route
      // Spread all props from route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
