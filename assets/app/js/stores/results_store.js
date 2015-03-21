const
  CHANGE_EVENT = 'change:resultsStore';

var
  Store = require('./store'),
  { SEARCH_RESULTS_ACTION } = require('../constants'),
  actionHandlers,
  state,
  storeTemplate;

state = {
  query: '',
  url: ''
};

actionHandlers = {
  [SEARCH_RESULTS_ACTION]: setResults
};

storeTemplate = new Store(CHANGE_EVENT, actionHandlers);
storeTemplate.getState = getState;

module.exports = storeTemplate;

function getState () {
  return state;
}

function setResults (data) {
  var
    { query, url } = data;

  state.query = query;
  state.url = url;

  this.emitChange();
}