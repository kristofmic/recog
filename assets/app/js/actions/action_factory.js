const
  SEARCH_API = '/api/profile?email=';

var
  dispatcher = require('../dispatcher'),
  { SEARCH_ACTION, SEARCH_RESULTS_ACTION } = require('../constants'),
  assign = require('lodash/object/assign'),
  ajax = require('axios'),
  actionFactory;

actionFactory = {
  searchAction
};

module.exports = actionFactory;

function searchAction (data) {
  dispatcher.handleViewAction({
    type: SEARCH_ACTION,
    data
  });

  var
    req = {
      url: `${SEARCH_API}` + data.query,
      method: 'get',
      responseType: 'json'
    };

  ajax(req)
    .then((res) => {
      if (res.status === 200) return res.data;
    })
    .then((resData) => {
      assign(resData, data);

      dispatcher.handleServerAction({
        type: SEARCH_RESULTS_ACTION,
        data: resData
      });
    });
}