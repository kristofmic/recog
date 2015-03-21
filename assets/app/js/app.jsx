var
  React = require('react'),
  Router = require('react-router'),
  HistoryLocation = Router.HistoryLocation,
  routes = require('./routes');

Router.run(routes, HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.getElementById('app'));
});