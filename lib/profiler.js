var
  Bluebird = require('bluebird'),
  request = require('request'),
  cheerio = require('cheerio'),
  sites = require('./sites'),
  googleImageSearchURL = 'https://www.google.com/search?q={{query}}&tbm=isch';

module.exports = {
  get: get
};

function get(email, options) {
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
    console.log('raw query: ', query);

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
          resolve({ url: imageUrl });
        }
        else {
          reject(new Error('Error retrieving profile image for ' + email));
        }
      }
    }
  }
}





