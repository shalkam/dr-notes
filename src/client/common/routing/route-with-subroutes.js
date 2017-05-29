import React from 'react';
import { Route } from 'react-router-dom';
export default route => {
  const Component = route.component;
  return (
    <Route
      path={route.path}
      render={props => (
        <Component
          {...props}
          routes={
            route.childRoutes
            // pass the sub-routes down to keep nesting
          }
        />
      )}
    />
  );
};
