//
// Users Routes for login and register
//

// Bring in express
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');

// User Login Page Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now');
  res.redirect('/');
});

// User Login Form Post Route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',  
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// User Register Page Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// User Register Form Post Route
router.post('/register', (req, res) => {
  let errors = [];

  // Verify "Password" === "Confirm Password"
  if (req.body.password !== req.body.password2) {
    errors.push({
      text: 'Passwords do not match'
    });
  }

  // Ensure password is at least 6 characters long
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
          req.flash('error_msg', 'A user with the same email address already exists');
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
                  req.flash('success_msg', 'You are registered successfully');
                  // auto-login
                  req.login(user, err => console.log(err));
                  // TO-DO: auto-login and redirect to the user's personalized page
                  req.login(user, err => console.log(err));
                  res.redirect('/');
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