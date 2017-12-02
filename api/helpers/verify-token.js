var jwt = require('jsonwebtoken')

module.exports = {
	friendlyName: 'Verify JWT',
	description: 'Verify a JWT token.',
	inputs: {
		req: {
			type: 'ref',
			friendlyName: 'Request',
			description: 'A reference to the request object (req).',
			required: true
		},
		res: {
			type: 'ref',
			friendlyName: 'Response',
			description: 'A reference to the response object (res).',
			required: true
		}
	},
	exits: {
		invalid: {
			description: 'Invalid token or no authentication present.',
		}
	},
	fn: function(inputs, exits) {
		var req = inputs.req
		var res = inputs.res
		// first check for a cookie (web client)
		if (req.signedCookies.sailsjwt) {
			// if there is something, attempt to parse it as a JWT token
			return jwt.verify(req.signedCookies.sailsjwt, sails.config.jwtSecret, async function(err, payload) {
				// if there's an error verifying the token (e.g. it's invalid or expired), no go
				if (err || !payload.user) return exits.invalid()
				// otherwise try to look up that user
				var user = await User.findOne(payload.user)
				// if the user can't be found, no go
				if (!user) return exits.invalid()
				// otherwise save the user object on the request (i.e. "log in") and continue
				req.user = user
				console.log('COOOOOOOOOKIIIIIIIIIIIEEEEEEEEEEEEEE')
				return exits.success(user)
			})
		}
		// no? then check for a JWT token in the header
		if (req.header('authorization')) {
			// if one exists, attempt to get the header data
			var token = req.header('authorization').split('Bearer ')[1]
			// if there's nothing after "Bearer", no go
			if (!token) return exits.invalid()
			// if there is something, attempt to parse it as a JWT token
			return jwt.verify(token, sails.config.jwtSecret, async function(err, payload) {
				if (err || !payload.user) return exits.invalid()
				var user = await User.findOne(payload.user)
				if (!user) return exits.invalid()
				// if it got this far, everything checks out, success
				req.user = user
				console.log('HEEEEEEEAAAAAAAAAAADDDDDEEEEEEEEEEEERR')
				return exits.success(user)
			})
		}
		// if neither a cookie nor auth header are present, then there was no attempt to authenticate
		return exits.invalid()
	}
}
