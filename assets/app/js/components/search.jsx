const
  validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

var
  React = require('react'),
  { searchAction } = require('../actions/action_factory'),
  Search;

Search = React.createClass({
  propTypes: {},

  handleSubmit (e) {
    var
      query;

    e.preventDefault();

    query = this.refs.searchInput.getDOMNode().value;
    searchAction({ query: query });
  },

  render () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <div className="form-group">
            <label htmlFor="email" className="sr-only" >Enter an email address</label>
            <input type="text" className="form-control" id="email" ref="searchInput" autoFocus placeholder="Email address"/>
          </div>
          <button type="submit" className="btn btn-primary">
            <i className="glyphicon glyphicon-search" style={{fontSize: 16, verticalAlign: 'middle'}}></i>
          </button>
        </div>
      </form>
    );
  }
})

module.exports = Search;