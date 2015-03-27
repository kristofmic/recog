var
  React = require('react/addons'),
  ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  Results = require('./results'),
  Search = require('./search'),
  Toolbar = require('./toolbar'),
  { SEARCH_ACTION } = require('../constants'),
  dispatcher = require('../dispatcher'),
  Home;

Home = React.createClass({
  propTypes: {},

  getInitialState () {
    return {
      doSearch: false
    };
  },

  componentDidMount () {
    this.dispatchToken = dispatcher.register(this.handleDispatch);
  },

  componentWillUnMount () {
    dispatcher.unregister(this.dispatchToken);
  },

  render () {
    var
      containerClass = 'search',
      toolbar,
      logo;

    if (!this.state.doSearch) {
      logo = (
        <div className="logo">
          <h1 style={{fontSize: 52, color: '#1E88E5', textAlign: 'center'}}>Recog</h1>
          <h4 style={{fontSize: 16, margin: '-20px 0 10px -36px', textAlign: 'center'}}>
            <small style={{color: '#9E9E9E'}}>Profile image search</small>
          </h4>
        </div>
      );
    }
    else {
      containerClass += ' do-search';
      toolbar = <Toolbar />;
    }

    return (
      <div>
      <ReactCSSTransitionGroup transitionName="do-search-toolbar">
        {toolbar}
      </ReactCSSTransitionGroup>
        <div className={containerClass}>
          <ReactCSSTransitionGroup transitionName="do-search-logo">
            {logo}
          </ReactCSSTransitionGroup>
          <Search />
          <Results />
        </div>
      </div>
    );
  },

  handleDispatch (payload) {
    var
      action = payload.action;

    if (action.type === SEARCH_ACTION) {
      this.setState({
        doSearch: true
      })
    }
  }
});

module.exports = Home;