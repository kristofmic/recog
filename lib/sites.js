var
  _ = require('lodash'),
  emailSites;

emailSites = {
  'gmail.com': ['plus.google.com', 'twitter.com', 'linkedin.com'],
  'yahoo.com': ['twitter.com', 'linkedin.com'],
  'outlook.com': ['twitter.com', 'linkedin.com'],
  'mail.com': ['twitter.com', 'linkedin.com'],
  'aol.com': ['twitter.com', 'linkedin.com'],
};

module.exports = {
  get: get,
  resolveSearchQuery: resolveSearchQuery
};

function get(email) {
  var
    domain = email.split('@')[1],
    siteDomains = emailSites[domain];

  if (!siteDomains) {
    siteDomains = [domain];
  }

  siteDomains.resolveSearchQuery   = resolveSearchQuery ;
  return siteDomains;
}

function resolveSearchQuery(domains) {
  var
    queries;

  domains = domains || this;

  if (!_.isArray(domains)) domains = [domains];

  queries = _.map(domains, getQuery);

  return queries.join('');

  function getQuery(domain, i) {
    var
      query = '';

    if (i) query += ' OR ';
    query += 'site:' + domain;
    return query;
  }
}


