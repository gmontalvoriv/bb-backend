/**
 * @module
 * @moduledesc JWT token validation module.
 */

var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/user');
var config = require('../config');

exports.checkForAuthentication = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    // compare tokens
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
};

