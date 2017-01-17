const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', function (req, res, next) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
    if (!user) {
      res.sendStatus(401);
    } else if(user.correctPassword(req.body.password)){
      req.session.userId = user.id;
      //console.log(req.session)
      res.status(200).send(user.id.toString());
    }
  })
  .catch(next);
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.sendStatus(204);
});

router.post('/signup', function (req, res, next) {

  User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      password: req.body.password
    }
  })
  .then(function (user) {
    req.session.userId = user.id;
    res.sendStatus(204);
  });

});

router.get('/me', function (req, res, next) {
  console.log(req.user)
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(401);
  }
});

