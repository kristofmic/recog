var
  Bluebird = require('bluebird'),
  request = require('request'),
  cheerio = require('cheerio'),
  googleImageSearchQuery = 'https://www.google.com/search?as_st=y&tbm=isch&hl=en&as_q={{email}}&as_epq=&as_oq=&as_eq=&cr=&as_sitesearch={{site}}&safe=images&tbs=iar:s';

module.exports = {
  get: get
};

function get(email) {
  var
    deferredPromise = new Bluebird(defer);

  return deferredPromise;

  function defer(resolve, reject) {
    var
      encodedSite = encodeURIComponent('linkedin.com'),
      encodedEmail = encodeURIComponent(email),
      query;

    query = googleImageSearchQuery.replace(/{{email}}/, encodedEmail).replace(/{{site}}/, encodedSite);

    request.get(query, handleResponse);

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