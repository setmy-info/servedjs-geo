var express = require('express');
var router = express.Router();

router.get('/picture', function (req, res) {
    var security = {
    };
    res.send({headers: req.headers, security: security});
});

module.exports = router;
