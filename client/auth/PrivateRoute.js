import { rest } from 'lodash';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth-helper';

// Components to be rendered into the PrivateRoute will load
// only when the user's authenticated; determined by a call to
// isAuthenticated() which otherwise, will be redirected to Signin component.

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
