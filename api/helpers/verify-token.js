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
			description: 'Invalid token.',
		},
		notAuthenticated: {
			description: 'Not authenticated.'
		}
	},
	fn: function(inputs, exits) {
		var req = inputs.req
		var res = inputs.res
		// first check for a cookie (web client)
		if (req.signedCookies.sailsjwt) {
			// If there is something, attempt to parse it as a JWT token
			return jwt.verify(req.signedCookies.sailsjwt, sails.config.jwtSecret, async function(err, payload) {
				// If there's an error verifying the token (e.g. it's invalid or expired), redirect to the login page.
				if (err || !payload.user) return exits.invalid()
				// Otherwise try to look up that user
				var user = await User.findOne(payload.user)
				// If the user can't be found, redirect to the login page
				if (!user) return exits.invalid()
				// Otherwise save the user object on the request (i.e. "log in") and continue
				req.user = user
				console.log('COOOOOOOOOKIIIIIIIIIIIEEEEEEEEEEEEEE')
				return exits.success(user)
			})
		}
		// no? then check for a JWT token in the header
		if (req.header('authorization')) {
			// If one exists, attempt to get the header data
			var token = req.header('authorization').split('Bearer ')[1]
			// If there's nothing after "Bearer", just redirect to login
			if (!token) return exits.invalid()
			// If there is something, attempt to parse it as a JWT token
			return jwt.verify(token, sails.config.jwtSecret, async function(err, payload) {
				if (err || !payload.user) return exits.invalid()
				var user = await User.findOne(payload.user)
				if (!user) return exits.invalid()
				req.user = user
				console.log('HEEEEEEEAAAAAAAAAAADDDDDEEEEEEEEEEEERR')
				return exits.success(user)
			})
		}
		return exits.notAuthenticated()
	}
}
