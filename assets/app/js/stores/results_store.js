const
  CHANGE_EVENT = 'change:resultsStore';

var
  Store = require('./store'),
  { SEARCH_RESULTS_ACTION } = require('../constants'),
  ids = 0,
  actionHandlers,
  state,
  storeTemplate;

state = {
  result: {},
  history: []
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
    { query, url } = data,
    id = ids++;

  if (id) {
    state.history.unshift(state.result);
  }

  state.result = {
    query,
    url,
    id
  };

  this.emitChange();
}