var
  React = require('react'),
  { RouteHandler } = require('react-router'),
  App;

App = React.createClass({
  propTypes: {},

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
