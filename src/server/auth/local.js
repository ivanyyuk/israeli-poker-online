'use strict'
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

module.exports = function (app, db) {
  var User = db.model('user')

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
  var strategyFn = function (email, password, done) {
   return User.findOne({
      where: {
        email: email
      }
    })
    .then((user) => {
        // user.correctPassword is a method from the User schema.
      if (!user || !user.correctPassword(password)) done(null, false)
      else done(null, user)
    })
    .catch(done)
  }

  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, strategyFn))

    // A POST /login route is created to handle login.
  app.post('/login', function (req, res, next) {
    var authCb = function (err, user) {
      if (err) return next(err)

      if (!user) {
        var error = new Error('Invalid login credentials.')
        error.status = 401
        return next(error)
      }

            // req.logIn will establish our session.
  return  req.logIn(user, function (loginErr) {
        if (loginErr) return next(loginErr)

        return res.send(req.user.sanitize())
        //user.getScAuthToken()
        //.then(token => {
          //if (token) {
            //res.send({ user: req.user.sanitize(), token: token.access_token })
          //} else {
            //res.send({ user: req.user.sanitize() })
          //}
        //})
        //.catch(err => console.log(err))
      })
    }

    passport.authenticate('local', authCb)(req, res, next)
  })
}
