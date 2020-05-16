'use strict';

// import all required modules
const logger = require('../utils/logger');
const fishlistStore = require('../models/fishlist-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

  // create dashboard object
    const dashboard = {

  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const fishlists = fishlistStore.getUserFishlists(loggedInUser.id);
    if (loggedInUser) {
    const viewData = {
      title: 'Fishlist Dashboard',
      fishlists: fishlists,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
      totalFishlists: fishlists.length
    };
    logger.info('about to render' + viewData.fishlists);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  
  deleteFishlist(request, response){
    const fishlistID = request.params.id;
    logger.debug('Deleting Fishlist');
    fishlistStore.removeFishlist(fishlistID);
    response.redirect('/dashboard');
  },
  
    addFishlist(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newFishlist = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: request.body.date,
      fishes: [],
    };
    logger.debug('Creating a new Fishlist' + newFishlist);
    fishlistStore.addFishlist(newFishlist, function(){
      response.redirect("/dashboard");
     });
  }
};

// export the dashboard module
module.exports = dashboard;