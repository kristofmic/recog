var
  React = require('react'),
  resultsStore = require('../stores/results_store'),
  HistoryItem = require('./results_history_item'),
  ResultsHistory;

ResultsHistory = React.createClass({
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

  render () {
    var
      title,
      history;

    if (this.state.results.length) {
      title = (<h4 style={{color: '#00BFA5'}}>Search History</h4>);

      history = this.state.results.map((result) => {
        return (
          <div className="col-md-3 col-sm-6 col-xs-12">
            <HistoryItem key={result.id} result={result} />
          </div>
        );
      });
    }

    return (
      <div className="row history">
        {title}
        {history}
      </div>
    );
  }
});

module.exports = ResultsHistory;

function getState () {
  var
    { history } = resultsStore.getState(),
    results = [].concat(history);

  return {
    results
  };
}