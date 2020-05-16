'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('fishlist', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  //Registers the user in the DB hashes the password
 register(request, response) {
    let user = request.body;
    let plaintextpass = request.body.password;
    let hashedpass = null;
    bcrypt.hash(plaintextpass, 10, function(err, hash){
     hashedpass = hash;
    }),
    user.id = uuid();
    user.picture = request.files.picture;
    user.password = bcrypt.hashSync(plaintextpass, 10);
    logger.info(`registering ${user.email}`);
    userstore.addUser(user, function () {
      response.redirect('/login');
    });
  },

  //checks the input email and password with the corresponding email and hash in json db
   authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && bcrypt.compareSync(request.body.password, user.password)) {
      response.cookie('fishlist', user.email);
      logger.info('logging in' + user.email);
      response.redirect('/welcome');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser (request) {
    const userEmail = request.cookies.fishlist;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;