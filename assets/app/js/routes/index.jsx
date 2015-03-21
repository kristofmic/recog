var
  React = require('react'),
  { Route, DefaultRoute, Redirect } = require('react-router'),
  { App, Home } = require('../components'),
  routes;

routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="search" handler={Home} />
    <DefaultRoute handler={Home} />
    <Redirect from="*" to="search" />
  </Route>
);

module.exports = routes;

