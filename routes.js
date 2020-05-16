'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const welcome = require('./controllers/welcome.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const fishlist = require('./controllers/fishlist.js');
const accounts = require ('./controllers/accounts.js');


// connect routes to controllers
router.get('/welcome', welcome.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/fishlist/:id', fishlist.index);
router.get('/fishlist/:id/deleteFish/:fishid', fishlist.deleteFish);
router.get('/dashboard/deletefishlist/:id', dashboard.deleteFishlist);
router.post('/fishlist/:id/addfish', fishlist.addFish);
router.post('/dashboard/addfishlist', dashboard.addFishlist);
router.post('/fishlist/:id/updatefish/:fishid', fishlist.updateFish);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/about/deletecomment/:id', about.deleteComment);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/about/addcomment', about.addComment);
router.post('/about/editcomment/:commentid', about.editComment);




// export router module
module.exports = router;