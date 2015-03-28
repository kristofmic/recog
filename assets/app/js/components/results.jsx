var
  React = require('react/addons'),
  ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  resultsStore = require('../stores/results_store'),
  Results;

Results = React.createClass({
  propTypes: {},

  getInitialState () {
    return getState();
  },

  componentDidMount () {
    resultsStore.addChangeListener(this.handleChange);
  },

  componentWillUnmount () {
    resultsStore.removeChangeListener(this.handleChange);
  },

  handleChange () {
    this.setState(getState());
  },

  clipboardCopy () {
    window.prompt("Copy to clipboard: Ctrl+C (Cmd+C), Enter", this.state.url);
  },

  render () {
    var
      encodedQuery,
      results;

    if (this.state.query && this.state.url) {
      encodedQuery = encodeURIComponent(this.state.query);

      results = (
        <div className="results clearfix">
          <div className="profile" style={{backgroundImage: 'url('+this.state.url+')'}}></div>
          <div style={{paddingTop: 24}}>
            <button type="button" className="btn btn-default" onClick={this.clipboardCopy}>
              <i className="glyphicon glyphicon-copy"></i>
            </button>
            <a className="btn btn-default" href={`https://www.google.com/search?q=${encodedQuery}&tbm=isch`} target="_blank">
              <i className="glyphicon glyphicon-new-window"></i>
            </a>
            <a className="btn btn-default" href={this.state.url} download={encodedQuery}>
              <i className="glyphicon glyphicon-download"></i>
            </a>
          </div>
        </div>
      );
    }

    return (
      <ReactCSSTransitionGroup transitionName="display-results">
        {results}
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = Results;

function getState() {
  var
    { result } = resultsStore.getState();

  return result;
}