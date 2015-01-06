var
  express = require('express'),
  router = express.Router(),
  profiler = require('../../lib/profiler');

router.get('/profile', getProfile);

module.exports = router;

function getProfile(req, res) {
  var
    email = req.query.email;

  profiler.get(email)
    .then(handleSuccess)
    .catch(handleError);

  function handleSuccess(data) {
    res.status(200).json({ url: data.url });
  }

  function handleError(err) {
    res.status(500).json({ error: err.message });
  }
}
