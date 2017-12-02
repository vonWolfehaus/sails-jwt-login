/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user, or else redirect to login page
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken')

module.exports = async function(req, res, next) {
	sails.helpers.verifyToken({
		req: req,
		res: res
	})
	.switch({
		error: function(err) {
			return res.serverError(err)
		},
		invalid: function(err) {
			// if this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
			// send a 401 response letting the user agent know they need to login to
			// access this endpoint.
			if (req.wantsJSON) {
				return res.sendStatus(401)
			}
			// otherwise if this is an HTML-wanting browser, do a redirect.
			return res.redirect('/login')
		},
		success: function() {
			// user has been attached to the req object (ie logged in) so we're set, they may proceed
			return next()
		}
	})
}
