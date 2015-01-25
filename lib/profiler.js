var
  Bluebird = require('bluebird'),
  request = require('request'),
  cheerio = require('cheerio'),
  redis = require('redis'),
  sites = require('./sites'),
  googleImageSearchURL = 'https://www.google.com/search?q={{query}}&tbm=isch',
  cache;

cache = redis.createClient(6379, process.env.REDIS_HOST, {});

module.exports = {
  get: get
};

function get(email, options) {
  return getCache(email)
    .then(checkCache)
    .then(hydrateCache);

  function checkCache(url) {
    if (url) return url;
    return fetch(email, options);
  }

  function hydrateCache(url) {
    return setCache(email, url);
  }
  return fetch(email, options);
}

function fetch(email, options) {
  var
    deferredPromise = new Bluebird(defer);

  return deferredPromise;

  function defer(resolve, reject) {
    var
      siteQuery,
      query,
      searchURL;

    options = options || {};

    if (options.sites) {
      siteQuery = sites.resolveSearchQuery(options.sites);
    }
    else if (options.openSearch) {
      siteQuery = '';
    }
    else {
      siteQuery = sites.get(email).resolveSearchQuery();
    }

    query = email + ' ' + siteQuery;

    searchURL = googleImageSearchURL.replace(/{{query}}/, encodeURIComponent(query));

    console.log('search URL: ', searchURL);

    request.get(searchURL, handleResponse);

    function handleResponse(err, res, body) {
      var
        $,
        images,
        imageUrl;

      if (err || res.statusCode !== 200) {
        reject(err || new Error('Error retrieving profile image for ' + email));
      }
      else {
        $ = cheerio.load(body);
        images = $('.images_table td a img');

        if (images && images.length > 0) {
          imageUrl = $(images[0]).attr('src');
          resolve(imageUrl);
        }
        else {
          reject(new Error('Error retrieving profile image for ' + email));
        }
      }
    }
  }
}

function getCache(email) {
  var
    deferredPromise = new Bluebird(defer);

  return deferredPromise;

  function defer(resolve, reject) {
    cache.get(email, function(err, val) {
      if (err) reject(err);
      else resolve(val);
    });
  }
}

function setCache(email, url) {
  var
    deferredPromise = new Bluebird(defer);

  return deferredPromise;

  function defer(resolve, reject) {
    cache.set(email, url, 'NX', 'EX', 86400, function(err, res) {
      if (err) reject(err);
      else resolve(url);
    });
  }
}





