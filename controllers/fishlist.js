'use strict';

const logger = require('../utils/logger');
const fishlistStore = require('../models/fishlist-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const fishlist = {
index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const fishlistId = request.params.id;
     const userfishlists = fishlistStore.getUserFishlists(loggedInUser.id);
    let numFishes = 0;
    for (let i in userfishlists) {
        numFishes = numFishes + userfishlists[i].fishes.length 
      }
    logger.debug('Fishlist id = ' + fishlistId);
    if (loggedInUser) {
    const viewData = {
      title: 'Fishlist',
      fishlist: fishlistStore.getFishlist(fishlistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
      numFishes: numFishes
    };
    response.render('fishlist', viewData);
    }
    else response.redirect('/');
},
    deleteFish(request, response) {
    const fishlistId = request.params.id;
    const fishId = request.params.fishid;
    logger.debug(`Deleting Fish ${fishId} from Fishlist ${fishlistId}`);
    fishlistStore.removeFish(fishlistId, fishId);
    response.redirect('/fishlist/' + fishlistId);
  },
    addFish(request, response) {
    const fishlistId = request.params.id;
    const fishlist = fishlistStore.getFishlist(fishlistId);
    const newFish = {
      id: uuid(),
      specie: request.body.specie,
      length: request.body.length,
      weight: request.body.weight,
      picture: request.files.picture,
      placecaught: request.body.placecaught,
    };
    fishlistStore.addFish(fishlistId, newFish, function() {
      response.redirect('/fishlist/' + fishlistId);
      });
  },
  
  updateFish(request, response) {
    const fishlistId = request.params.id;
    const fishId = request.params.fishid;
    logger.debug("updating fish " + fishId);
    const updatedFish = {
      specie: request.body.specie,
      length: request.body.length,
      weight: request.body.weight,
      placecaught: request.body.placecaught
    };
    fishlistStore.editFish(fishlistId, fishId, updatedFish);
    response.redirect('/fishlist/' + fishlistId);
  }
};

module.exports = fishlist;