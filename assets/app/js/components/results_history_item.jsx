var
  React = require('react'),
  { searchAction } = require('../actions/action_factory'),
  ResultsHistoryItem;

ResultsHistoryItem = React.createClass({
  propTypes: {
    result: React.PropTypes.shape({
      query: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired
    }).isRequired
  },

  doSearch () {
    searchAction({
      query: this.props.result.query
    });
  },

  render () {
    var
      style = {
        backgroundImage: 'url('+this.props.result.url+')',
        margin: '30px auto',
        float: 'none',
        cursor: 'pointer'
      };

    return (
      <div className="profile" style={style} onClick={this.doSearch}></div>
    );
  }
});

module.exports = ResultsHistoryItem;