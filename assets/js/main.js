$(document).ready(function() {
	// When the "submit" button is clicked on the login page, attempt to log in
	$(document).on('click', '#submitLogin', function onSubmitLogin(e) {
		$('#errors').html('')
		e.preventDefault()
		$.ajax('/api/users/login', {
			method: 'patch',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify({
				email: $('input[name=email]').val(),
				password: $('input[name=password]').val()
			}),
			// If the login is successful, save the JWT token and load the home page
			success: function(newToken) {
				window.location = '/'
			},
			// If not, update the "errors" section on the page
			error: function(jqXHR, text) {
				$('#errors').html(jqXHR.responseText)
			}
		})
	})

	$(document).on('click', '#submitLogout', function onSubmitLogout(e) {
		$('#errors').html('')
		e.preventDefault()
		$.ajax('/api/users/logout', {
			method: 'patch',
			contentType: 'application/json',
			processData: false,
			success: function() {
				window.location = '/'
			},
			// If not, update the "errors" section on the page
			error: function(jqXHR, text) {
				$('#errors').html(jqXHR.responseText)
			}
		})
	})

	// When the "submit" button is clicked on the signup page, attempt to sign up
	$(document).on('click', '#submitSignup', function onSubmitSignup(e) {
		$('#errors').html('')
		e.preventDefault()
		$.ajax('/api/users/register', {
			method: 'post',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify({
				email: $('input[name=email]').val(),
				password: $('input[name=password]').val()
			}),
			// If the signup is successful, save the JWT token and load the welcome page
			success: function(newToken) {
				window.location = '/welcome'
			},
			// If not, update the "errors" section on the page
			error: function(jqXHR, text) {
				$('#errors').html(jqXHR.responseText)
			}
		})
	})
})
