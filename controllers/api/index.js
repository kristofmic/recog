var
  express = require('express'),
  router = express.Router(),
  Promise = require('bluebird'),
  profiler = require('../../lib/profiler');

router.get('/profile', getProfile);

module.exports = router;

function getProfile(req, res) {
  var
    email = req.query.email;

  Promise.settle([
    profiler.get(email),
    profiler.get(email, {openSearch: true})
  ])
    .then(handleSuccess)
    .catch(handleError);

  function handleSuccess(data) {
    var
      getEmailRestricted = data[0],
      getEmailOpen = data[1];

    if (getEmailRestricted.isFulfilled()) {
      res.status(200).json({ url: getEmailRestricted.value().url });
    }
    else if (getEmailOpen.isFulfilled()) {
      res.status(200).json({ url: getEmailOpen.value().url });
    }
    else {
      return Promise.reject(new Error('Error retrieving profile image for ' + email));
    }
  }

  function handleError(err) {
    res.status(500).json({ error: err.message });
  }
}
