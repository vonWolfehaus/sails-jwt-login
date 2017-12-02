# sails-jwt-login

This is an example of a simple device-agnostic backend that implements login, signup, and logout using [JSON Web Tokens](https://jwt.io/introduction/).  It is based on the [jwt-login](https://github.com/sails101/jwt-login) example, just upgraded to Sails 1.0 and modified to use cookies for web storage and the authorization header for other devices (eg mobile) to use.

This is a multiple page app using the built-in templating system (EJS) in order to demonstrate keeping a "session" by storing the JWT in a cookie. It also has server code (but not frontend code) that handles authorization using a header.

To be clear however, this is not intended as a tutorial on building SPAs, which would normally use a framework like Vue or React.

### Relevant bits

* `assets/js/main.js` contains the all of the front-end Javascript that makes the AJAX calls to register new users, login, and logout.
* `api/controllers/UserController.js` contains the back-end code for signing up and logging in users, including creating new JWTs.
* `api/helpers/verify-token.js` is a global helper that does the actual verification of JWTs for every request, as dictated by `config/policies.js`.
* `api/policies/isAuthenticated.js` contains the code for authenticating a user via JWT, and redirecting unauthorized users to the login page
* `api/policies/checkForUser.js` is similar to `isAuthenticated.js`, but allows logged-out users to continue.  This is useful for things like the home page, which can display a customized welcome message to logged-in users but should be available to everyone.
