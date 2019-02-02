//
// Users Routes for login and register
//

// Bring in express
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// User Register Form Post
router.post('/register', (req, res) => {
  let errors = [];

  if (req.body.password !== req.body.password2) {
    errors.push({
      text: 'Passwords do not match'
    });
  }

  if (req.body.password.length < 6) {
    errors.push({
      text: 'Passwords must be at least 6 characters long'
    });
  }

  if (errors.length > 0) {
    // Send the info back so that the form doesn't clear the info
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (user) {
          res.send('A user with the same email address already exists');
        } else {
          const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          };

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              db.User.create(newUser)
                .then(user => {
                  //res.send('You are now registered successfully');
                  res.redirect('/users/login');
                })
                .catch(error => {
                  console.log(error);
                  return;
                });
            });
          });
        }
      });
  }
});

module.exports = router;