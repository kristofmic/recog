const
  validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

var
  React = require('react'),
  { searchAction } = require('../actions/action_factory'),
  { SEARCH_ACTION } = require('../constants'),
  dispatcher = require('../dispatcher'),
  searchIconStyle,
  Search;

searchIconStyle = {
  fontSize: 16,
  verticalAlign: 'middle',
  textShadow: '0 1px 1px rgba(0, 0, 0, .12)'
};

Search = React.createClass({
  propTypes: {},

  getInitialState: function () {
    return {
      query: ''
    };
  },

  componentDidMount: function () {
    this.dispatchToken = dispatcher.register(this.handleDispatch);
  },

  componentWillUnmount: function () {
    dispatcher.unregister(this.dispatchToken);
  },

  handleDispatch (payload) {
    var
      action = payload.action;

    if (action.type === SEARCH_ACTION) {
      this.setState({
        query: action.data.query
      })
    }
  },

  handleSubmit (e) {
    var
      searchInput = this.refs.searchInput.getDOMNode(),
      query;

    e.preventDefault();

    query = searchInput.value;
    searchAction({ query: query });
    searchInput.blur();
  },

  handleChange (e) {
    this.setState({
      query: e.target.value
    });
  },

  render () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <div className="form-group">
            <label htmlFor="email" className="sr-only" >Enter an email address</label>
            <input type="text" className="form-control" id="email" ref="searchInput" value={this.state.query} onChange={this.handleChange} autoFocus autoComplete="off" placeholder="Email address"/>
          </div>
          <button type="submit" className="btn btn-primary">
            <i className="glyphicon glyphicon-search" style={searchIconStyle}></i>
          </button>
        </div>
      </form>
    );
  }
})

module.exports = Search;