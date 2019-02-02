
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    console.log(email);
    db.User.findOne({ where: { email: email }})
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'No user found'});
        }
        
        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) throw error;
          
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password'});
          }
        })
      })
  }));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};