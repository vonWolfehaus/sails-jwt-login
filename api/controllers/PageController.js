/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function (req, res) {
		return res.view('pages/home')
	},

	welcome: function (req, res) {
		return res.view('pages/welcome')
	},

	login: function(req, res) {
		if (req.user) return res.redirect('pages/home')
		return res.view('pages/login')
	},

	logout: function(req, res) {
		return res.view('pages/logout')
	},

	register: function(req, res) {
		return res.view('pages/register')
	},

	profile: function(req, res) {
		return res.view('pages/profile')
	}
}
