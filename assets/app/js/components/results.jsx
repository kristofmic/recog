var
  React = require('react'),
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

  render () {
    var
      results;

    if (this.state.query && this.state.url) {
      results = (
        <div style={{marginTop: 30}}>
          <h4 style={{color: '#00BFA5'}}>Results</h4>
          <div className="panel panel-default">
            <div className="panel-body">
              <img src={this.state.url} class="img-thumbnail" />
              <p>{this.state.query}</p>
              <div>
                <button type="button" className="btn btn-default">
                  <i className="glyphicon glyphicon-copy"></i>
                </button>
                <button type="button" className="btn btn-default">
                  <i className="glyphicon glyphicon-floppy-save"></i>
                </button>
                <button type="button" className="btn btn-default">
                  <i className="glyphicon glyphicon-new-window"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>{results}</div>
    );
  }
});

module.exports = Results;

function getState() {
  var
    state =  resultsStore.getState();

  return {
    query: state.query,
    url: state.url
  };
}