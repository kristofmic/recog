var
  React = require('react'),
  Results = require('./results'),
  Search = require('./search'),
  Home;

Home = React.createClass({
  propTypes: {},

  render () {
    return (
      <div>
        <Search />
        <Results />
      </div>
    );
  }
});

module.exports = Home;