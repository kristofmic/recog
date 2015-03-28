var
  React = require('react/addons'),
  ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  Results = require('./results'),
  ResultsHistory = require('./results_history'),
  Search = require('./search'),
  Toolbar = require('./toolbar'),
  h1Style,
  h2Style,
  Home;

h1Style = {
  fontSize: 52,
  color: '#1E88E5',
  textAlign: 'center',
  textShadow: '0 1px 1px rgba(0, 0, 0, .12)'
};

h2Style = {
  fontSize: 16,
  margin: '-20px 0 10px -36px',
  textAlign: 'center'
};

Home = React.createClass({
  propTypes: {
    doSearch: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      doSearch: false
    };
  },

  render () {
    var
      containerClass = 'search',
      toolbar,
      logo;

    if (!this.props.doSearch) {
      logo = (
        <div className="logo">
          <h1 style={h1Style}>Recog</h1>
          <h4 style={h2Style}>
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
          <ResultsHistory />
        </div>
      </div>
    );
  }
});

module.exports = Home;