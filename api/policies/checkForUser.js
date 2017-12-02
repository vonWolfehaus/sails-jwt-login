/**
 * checkForUser
 *
 * @module      :: Policy
 * @description :: Simple policy to load an authenticated user, if any.  If we're not logged in, just continue.
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
	sails.helpers.verifyToken({
		req: req,
		res: res
	})
	.switch({
		error: function(err) {
			return res.serverError(err)
		},
		invalid: function(err) {
			// no token, no problem -- just continue in a logged-out state
			return next()
		},
		success: function() {
			// user has been attached to the req object (ie logged in) so that's cool too
			return next()
		}
	})
}
