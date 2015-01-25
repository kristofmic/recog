var
  express = require('express'),
  router = express.Router();

router.get('/health', getHealth);

module.exports = router;

function getHealth(req, res) {
  res.status(200).json({status: 'alive'});
}