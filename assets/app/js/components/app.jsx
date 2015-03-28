var
  React = require('react'),
  { RouteHandler } = require('react-router'),
  { SEARCH_ACTION } = require('../constants'),
  dispatcher = require('../dispatcher'),
  App;

App = React.createClass({
  propTypes: {},

  getInitialState () {
    return {
      doSearch: false
    };
  },

  componentDidMount () {
    this.dispatchToken = dispatcher.register(this.handleDispatch);
  },

  componentWillUnmount () {
    dispatcher.unregister(this.dispatchToken);
  },

  handleDispatch (payload) {
    var
      action = payload.action;

    if (action.type === SEARCH_ACTION) {
      this.setState({
        doSearch: true
      })
    }
  },

  render () {
    var
      coverClass = 'cover';

    if (this.state.doSearch) coverClass += ' transition';

    return (
      <div>
        <div className={coverClass}></div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-8 col-md-offset-2">
              <RouteHandler doSearch={this.state.doSearch} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
